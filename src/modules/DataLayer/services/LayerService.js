/* eslint-disable no-await-in-loop */
import { pullAll } from 'lodash';
import { formatDate } from './helper';
import apiServices from './ApiServices';
import DB from './indexedDB';

const DATA = 'data';
const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';

export default class DataLayer {
  constructor(store) {
    this.DB = new DB();
    this.store = store;
    this.indicatorList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18];
    this.defaultIndicators = [7, 5, 8];
    this.indicatorsInIdb = [];
    this.LOCAL_STORAGE_KEY = 'dataTimestamp';
  }

  /**
   *
   * @param {object} object object containing the default set up for the data
   * @param {array}  object.dashboardIndicators array of the indicator required for the dashboard
   * @param {array}  object.defaultIndicators default indicators required to load the dashboard
   * usually the first and 2 related indicators
   *
   */

  setup(object) {
    this.indicatorList = object.dashboardIndicators;
    this.defaultIndicators = object.defaultIndicators;
  }

  /**
       * This gets the default indicator from the Indexed DB database
       * reason for this is to initialize the dashboard with minimum data required
       */
  populateIndicatorsForCustomDashboard() {
    if (this.defaultIndicators.length <= 0) {
      this.setAllIndicators();
    }
  }

  /**
   * Gets ids of all indicators from the
   * indicators list and populates the
   * with all of it then populates the
   * with the first three in the list
   */
  setAllIndicators() {
    const allIndicators = this.DB.listAllIndicators();
    this.indicatorList = allIndicators;
    this.defaultIndicators = allIndicators.slice(0, 3);
  }

  /**
   * data layer initialization
   */

  async init(object) {
    this.setup(object);
    const count = await this.DB.data.count();
    console.log('DB count is', count);
    console.time('fetching');
    if (count <= 0) {
      this.storeTimestampInLocal();
      console.log('fetching other endpoint');
      /**
       * The apiServices returns all the and array of response for the
       * axios call of all other apiEndpoints.getOtherEndpoint
       * it uses and {Promise.all()}
       *
       * @see {@link apiServices.getOtherEndpoint()}
       */
      const data = await apiServices.getOtherEndpoint();
      /**
       * we would also need to created a component then display the activities  of the service layer
       * per time
       */
      console.log('storing other endpoint to index db');
      await this.DB.storeDataForOtherEndPointToDB(data);
      this.addDataToStore(data);
      this.populateIndicatorsForCustomDashboard();
      const dataValue = await this.getIndicatorsFromApi(this.defaultIndicators);
      //
      if (dataValue.length > 0) {
        for (let index = 0; index < dataValue.length; index += 1) {
          const element = dataValue[index].data;
          await this.DB.storeDataInDB(element);
          this.addDataToStore(element, DATA);
        }
      }
    } else {
      await this.initOtherTablesFromDB();
      await this.initData(this.defaultIndicators);
    }

    setTimeout(async () => {
      //
      const indicatorsExceptDefault = pullAll(this.indicatorList, this.defaultIndicators);
      /**
       * getting the indicators one after the order seems to help the performance
       * as against getting it all at once
       */

      /**
       * also always ensure to use for Loop with async operations
       * forEach loop doesn't  take asynchronous operations into consideration
       */
      // console.log(this.indicatorsInIdb);
      console.log('in set timeout');
      await this.initData(indicatorsExceptDefault);
    }, 500);

    this.updatedStoreAvailableIndicator();
    /*
     *This compares then the indicator Array with the indicator Array of the dashboard
     * */
    console.timeEnd('fetching');

    // setTimeout(() => {
    //   this.updateData();
    // }, 2000);

    return Promise.resolve(true);
  }

  async initOtherTablesFromDB() {
    let dataItem = await this.DB.DSI.toArray();
    this.setDataInStore(dataItem, DSI);
    dataItem = await this.DB.location.toArray();
    this.setDataInStore(dataItem, LOCATION);
    dataItem = await this.DB.indicators.toArray();
    this.setDataInStore(dataItem, INDICATORS);
    dataItem = await this.DB.datasources.toArray();
    this.setDataInStore(dataItem, DATA_SOURCE);
    dataItem = await this.DB.valuetypes.toArray();
    this.setDataInStore(dataItem, VALUE_TYPES);
    dataItem = await this.DB.factors.toArray();
    this.setDataInStore(dataItem, FACTORS);
  }

  async initData(indicator) {
    const indicatorInDB = await this.DB.checkIndicatorsInIdb();
    //
    for (let index = 0; index < indicator.length; index += 1) {
      if (indicatorInDB.indexOf(indicator[index]) >= 0) {
        // eslint-disable-next-line no-await-in-loop
        const dataItem = await this.DB.getIndicatorFromDB(indicator[index]);

        /**
         * Then stores the data from the default indicators to the Store
         */
        this.addDataToStore(dataItem, DATA);
      } else {
        // eslint-disable-next-line no-await-in-loop
        const dataValue = await this.getIndicatorsFromApi(indicator[index]);

        if (dataValue.data.length > 0) {
          // eslint-disable-next-line no-await-in-loop

          await this.DB.storeDataInDB(dataValue.data);
          //

          this.addDataToStore(dataValue.data, DATA);
        }
      }
    }
  }

  /**
   *
   * @returns {true or false} based on if the data
   * on the dashboard is up to date or not
   */
  async isDataUpToDate() {
    const serverDate = await apiServices.getLatestDate();
    const localDate = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    console.log({ serverDate, localDate });
    // Check if its more recent than the date in localStorage
    const oldDateObject = new Date(localDate);
    const newDateObject = new Date(serverDate.data);
    if (oldDateObject.getTime() === newDateObject.getTime()) {
      return true;
    }
    if (oldDateObject <= newDateObject) {
      return false;
    }
    return true;
  }

  /**
   * this does the actual updating of the data
   */
  async updateData() {
    // console.log('updating')
    const truthyVal = await this.isDataUpToDate();
    const localDate = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (!truthyVal) {
      apiServices
        .getUpdatedData(formatDate(localDate))
        .then(async (val) => {
          const { created, updated } = val.data;
          if (created.length !== 0) {
            await this.storeDataInDB(created);
            this.addDataToStore(created);
          }
          if (updated.length !== 0) {
            await this.storeDataInDB(updated);
            this.addDataToStore(updated);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**
   *
   * @param {array} data, array of data objects
   * @param {string} table
   */

  addDataToStore(data, table) {
    console.log('storing in vue state');
    const stateTableName = table || false;
    if (!stateTableName) {
      /**
       * because we know ths the data
       * coming is a return  of a Promise.all()
       */
      data.forEach((e) => {
        /**
         * The logic to this is
         * the configUrl follow the same name as the state
         * object keys for the data
         */
        const configUrl = e.config.url;
        const tableName = configUrl.replace(/\\|\/|\?.*/g, '');
        this.store.commit('DL/ADD_DATA', {
          tableName,
          data: e.data,
        });
      });
    } else {
      this.store.commit('DL/ADD_DATA', {
        tableName: stateTableName,
        data,
      });
    }

    console.log('done storing in the state');
  }

  /**
   *
   * @param {array|number} indicators
   * @returns {array} all data objects in the database related to
   * the given indicator(s)
   */
  // eslint-disable-next-line class-methods-use-this
  async getIndicatorsFromApi(indicators) {
    let data;
    if (Array.isArray(indicators)) {
      data = await Promise.all(indicators.map((id) => apiServices.getSingleIndicator(id)));
      return data;
    }
    data = await apiServices.getSingleIndicator(indicators);
    return data;
  }

  /**
   * sets data timestamp to localStorage.
   * Also to vuex using @method this.setDataInStore
   */
  storeTimestampInLocal() {
    const currentDate = new Date().toJSON();
    localStorage.setItem(this.LOCAL_STORAGE_KEY, currentDate);
    this.setDataInStore(currentDate, this.LOCAL_STORAGE_KEY);
  }

  /**
   *
   * @param {array} data, array of data objects
   * @param {string} tableName
   */
  setDataInStore(data, tableName) {
    this.store.commit('DL/SET_DATA', {
      tableName,
      data,
    });
  }

  /**
   * Fetches a unique list of indicators available in iDB
   */

  async updatedStoreAvailableIndicator() {
    const indicatorsIDs = await this.indicatorsInIdb;
    this.store.commit('DL/SET_DATA', {
      tableName: 'dashboardIndicator',
      data: indicatorsIDs,
    });
  }
}
