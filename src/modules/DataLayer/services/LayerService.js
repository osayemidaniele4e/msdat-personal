import { chunk, difference, pullAll } from 'lodash';
import apiServices from './ApiServices';

const DATA = 'data';
const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const LINK = 'links';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';

export default class DataBase {
  constructor(db, store) {
    this.db = db;
    this.store = store;
    this.data = this.db.table(DATA);
    this.countries = this.db.table('countries');
    this.indicators = this.db.table(INDICATORS);
    this.location = this.db.table(LOCATION);
    this.factors = this.db.table(FACTORS);
    this.DSI = this.db.table(DSI);
    this.location_hierarchy_level = this.db.table(LINK);
    this.valuetypes = this.db.table(VALUE_TYPES);
    this.datasources = this.db.table(DATA_SOURCE);
    this.indicatorList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18];
    this.defaultIndicators = [7, 5, 8];
    this.localStorageKey = 'storedIndicatorIDs';
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
   * data layer initialization
   */

  async init(object) {
    this.setup(object);
    // this.updatedStoreAvailableIndicator();
    console.time('fetching');
    // console.log(JSON.parse(localStorage.getItem(this.localStorageKey)));
    const count = await this.data.count();
    console.log('DB count is', count);

    if (count <= 0) {
      /**
       * clear data  other table in the db so they can be fetched again to aviod
       * error with indexedDB db
       */
      this.countries.clear();
      this.indicators.clear();
      this.location.clear();
      this.factors.clear();
      this.DSI.clear();
      this.location_hierarchy_level.clear();
      this.valuetypes.clear();
      this.datasources.clear();
      /**
       * indicator ID are stored in local storage to keep track of the available
       * reason is to avoid making multiple queries in the database
       */

      /**
       * i suggest we make a table in indexed DB to track this
       * possible refactoring idea
       */
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));

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
      const val = await this.storeDataForOtherEndPointToDB(data);
      console.log(val);
      this.addDataToStore(data);
      console.log('done');
      const dataValue = await this.getIndicatorsAndRelatedIndicators(this.defaultIndicators);
      if (dataValue.length > 0) {
        await this.storeDataInDB(dataValue, this.defaultIndicators);
      }

      this.addDataToStore(dataValue, DATA);
    } else {
      /**
       * need to find a way to check if it already exist in the store
       * before querying the DB
       * but it just assumed that the data already exist in the database
       */
      let dataItem = await this.DSI.toArray();
      this.setDataInStore(dataItem, DSI);
      dataItem = await this.location.toArray();
      this.setDataInStore(dataItem, LOCATION);
      dataItem = await this.indicators.toArray();
      this.setDataInStore(dataItem, INDICATORS);
      dataItem = await this.datasources.toArray();
      this.setDataInStore(dataItem, DATA_SOURCE);
      dataItem = await this.valuetypes.toArray();
      this.setDataInStore(dataItem, VALUE_TYPES);
      dataItem = await this.factors.toArray();
      this.setDataInStore(dataItem, FACTORS);
      /**
       * This gets the default indicator from the Indexed DB database
       * reason for this is to initialize the dashboard with minimum data required
       */
      dataItem = await this.getIndicatorDataThatExistInDB(this.defaultIndicators);
      /**
       * Then stores the data from the default indicators to the Store
       */
      this.setDataInStore(dataItem, DATA);

      setTimeout(async () => {
        const indicatorsExceptDefault = pullAll(this.indicatorList, this.defaultIndicators);
        /**
         * getting the indicators one after the order seems to help the performance
         * as against getting it all at once
         */

        /**
         * also alway ensure to use for Loop with async operations
         * forEach loop don't take asynchronous operations into consideration
         */
        for (let index = 0; index < indicatorsExceptDefault.length; index += 1) {
          // eslint-disable-next-line no-await-in-loop
          const dataArray = await this.getIndicatorFromDB(indicatorsExceptDefault[index]);
          this.addDataToStore(dataArray, DATA);
        }
      }, 500);
    }
    this.updatedStoreAvailableIndicator();
    /*
     *This compares then the indicator Array with the indicator Array of the dashboard
     *
     * */
    // Check directly from idb if the ids are available
    const arrOfIndicatorIDInDB = JSON.parse(localStorage.getItem(this.localStorageKey));
    // console.log({arrOfIndicatorIDInDB})
    // console.log(this.indicatorList)
    const indicatorsNotInDB = difference(this.indicatorList, arrOfIndicatorIDInDB);
    // console.log({indicatorsNotInDB})
    /**
     * This groups indicator in arrays of  length 3
     */
    const arrayGrouped = chunk(indicatorsNotInDB, 3);

    for (let index = 0; index < arrayGrouped.length; index += 1) {
      setTimeout(async () => {
        console.log('in async');
        const dataValue = await this.getIndicatorsAndRelatedIndicators(arrayGrouped[index]);
        if (dataValue.length > 0) {
          await this.storeDataInDB(dataValue, arrayGrouped[index]);
          this.addDataToStore(dataValue);
        }
      }, 3000);
    }

    console.timeEnd('fetching');
    return Promise.resolve(true);
  }

  /**
   *
   * @param {Promise} data
   * @description let be cautions with this function so cause it follows the same other as
   * it follow the id of the return time
   * anyways i will suggest a refactoring  of this function
   */

  async storeDataForOtherEndPointToDB(data) {
    return this.db.transaction('rw', this.DSI, this.location, this.indicators, this.valuetypes, this.factors, this.datasources, async () => {
      await this.DSI.bulkAdd(data[6].data);
      await this.location.bulkAdd(data[0].data);
      await this.indicators.bulkAdd(data[1].data);
      await this.valuetypes.bulkAdd(data[3].data);
      await this.factors.bulkAdd(data[5].data);
      await this.datasources.bulkAdd(data[7].data);
    });
  }

  addDataToStore(data, table) {
    console.log('storing in vue state');
    const stateTableName = table || false;
    if (!stateTableName) {
    // }
      // if (typeof data[0] === 'object') {
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

  // eslint-disable-next-line class-methods-use-this
  async getIndicatorsAndRelatedIndicators(indicators) {
    // need a way to store ids of indicators fetch in local storage;
    const data = await Promise.all(indicators.map((id) => apiServices.getSingleIndicator(id)));
    return data;
  }

  /**
   *
   * @param {array} data array of indicator data
   * @param {array} indicatorIDs indicator id to be stored
   */
  async storeDataInDB(data, indicatorIDs) {
    this.db.transaction('rw', this.data, async () => {
      const mapOutData = data.map((item) => item.data);
      // for (let index = 0; index < data.length; index += 1) {
      await this.data.bulkAdd(...mapOutData);
      // }
      this.storeIndicatorIdInLocalStorage(indicatorIDs);
    });
  }

  async getIndicatorDataThatExistInDB(arrayOfIndicatorIds) {
    return this.db.transaction('r', this.data, () => this.db.data.where('indicator').anyOf(arrayOfIndicatorIds).toArray());
  }

  setDataInStore(data, tableName) {
    this.store.commit('DL/SET_DATA', {
      tableName,
      data,
    });
  }

  /**
   * @param {array} ids and array of indicator to be store in local Storage
   */
  storeIndicatorIdInLocalStorage(ids) {
    let indicatorIds = ids;
    if (typeof ids === 'number') {
      indicatorIds = [ids];
    }

    if (localStorage.getItem(this.localStorageKey) === null) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }

    const indicatorsIDs = JSON.parse(localStorage.getItem(this.localStorageKey));
    indicatorsIDs.push(...indicatorIds);
    localStorage.setItem(this.localStorageKey, JSON.stringify(indicatorsIDs));

    this.updatedStoreAvailableIndicator();
  }

  updatedStoreAvailableIndicator() {
    const indicatorsIDs = JSON.parse(localStorage.getItem(this.localStorageKey));
    this.store.commit('DL/SET_DATA', {
      tableName: 'dashboardIndicator',
      data: indicatorsIDs,
    });
  }

  getIndicatorFromDB(id) {
    console.log(this.data);
    return this.data.where('indicator').equals(id).toArray();
  }
}
