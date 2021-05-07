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
    this.indicatorsInIdb = this.checkIndicatorsInIdb();
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
   * Gets ids of all indicators from the
   * indicators list and populates the @param {this.indicatorList}
   * with all of it then populates the @param {this.defaultIndicators}
   * with the first three in the list
   */
  async setAllIndicators() {
    const allIndicators = await this.listAllIndicators();
    this.indicatorList = allIndicators;
    this.defaultIndicators = allIndicators.slice(0, 3);
  }

  /**
   * data layer initialization
   */

  async init(object) {
    this.setup(object);
    // console.time('fetching');
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
      const val = await this.storeDataForOtherEndPointToDB(data);
    //  console.log(val);
      this.addDataToStore(data);
     // console.log('done');
      if (this.defaultIndicators.length <= 0) {
        this.setAllIndicators();
      }
      const dataValue = await this.getIndicatorsAndRelatedIndicators(this.defaultIndicators);
      if (dataValue.length > 0) {
       // console.log(1, {dataValue})
        await this.storeDataInDB(dataValue);
      }

      this.addDataToStore(dataValue, DATA);
    } else {
      const savedIndicators = await this.indicatorsInIdb;
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
      if (this.defaultIndicators.length <= 0) {
        this.setAllIndicators();
      }
      for (let index = 0; index < this.defaultIndicators.length; index+= 1) {
        // console.log({savedIndicators})
        if (savedIndicators.indexOf(this.defaultIndicators[index]) >= 0) {
          dataItem = await this.getIndicatorFromDB(this.defaultIndicators[index]);
          /**
           * Then stores the data from the default indicators to the Store
           */
          this.setDataInStore(dataItem, DATA);
        } else {
          const dataValue = await this.getIndicatorsAndRelatedIndicators(this.defaultIndicators[index]);
          if (dataValue.length > 0) {
          //  console.log(2, {dataValue})
            await this.storeDataInDB(dataValue);
            this.addDataToStore(dataValue);
          }
        }
      }

      setTimeout(async () => {
        const indicatorsExceptDefault = pullAll(this.indicatorList, this.defaultIndicators);
        /**
         * getting the indicators one after the order seems to help the performance
         * as against getting it all at once
         */

        /**
         * also always ensure to use for Loop with async operations
         * forEach loop don't take asynchronous operations into consideration
         */
        for (let index = 0; index < indicatorsExceptDefault.length; index += 1) {
          if (savedIndicators.indexOf(this.defaultIndicators[index]) >= 0) {
            // eslint-disable-next-line no-await-in-loop
            const dataArray = await this.getIndicatorFromDB(indicatorsExceptDefault[index]);
            this.addDataToStore(dataArray, DATA);
          } else {
            const dataValue = await this.getIndicatorsAndRelatedIndicators(indicatorsExceptDefault[index]);
            if (dataValue.length > 0) {
             // console.log(3, {dataValue})
              await this.storeDataInDB(dataValue);
              this.addDataToStore(dataValue);
            }
          }
        }
      }, 500);
    }
    this.updatedStoreAvailableIndicator();
    /*
     *This compares then the indicator Array with the indicator Array of the dashboard
     *
     * */
    // Check directly from idb if the ids are available
    const arrOfIndicatorIDInDB = await this.indicatorsInIdb;
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
          // console.log(4, {dataValue})
          await this.storeDataInDB(dataValue);
          this.addDataToStore(dataValue);
        }
      }, 3000);
    }

    console.timeEnd('fetching');
    return Promise.resolve(true);
  }

  /**
   *
   * @returns {true or false} based on if the data
   * on the dashboard is up to date or not
   */
  async isDataUpToDate() {
    const serverDate = await apiServices.getLatestDate();
    const localDate = localStorage.getItem('dataTimestamp');
    console.log({ serverDate, localDate });
    // Check if its more recent than the date in localStorage
    const oldDateObject = new Date(localDate);
    const newDateObject = new Date(serverDate.data);
    if (oldDateObject.getTime() === newDateObject.getTime()) {
      return true;
    } if (oldDateObject <= newDateObject) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param {string} theDate, a date string in JSON format
   * @returns a date object formatted to fit the API requirements
   */
  formatDate(theDate) {
    const theDateParts = theDate.split('T');
    const theTime = theDateParts[1].split('.');
    const formatted = `${theDateParts[0]} ${theTime[0]}`;
    return formatted;
  }

  // Returns an array of indicator Ids from a an array
  // of data objects
  // extractIndicatorIds(dataArray) {
  //   let uniqueIds = dataArray.map(el => el.indicator)
  //   return [...new Set(uniqueIds)]
  // }

  /**
   * this does the actual updating of the data
   */
  async updateData() {
   // console.log('updating')
    const truthyVal = await this.isDataUpToDate();
    const localDate = localStorage.getItem('dataTimestamp');
    if (!truthyVal) {
      apiServices.getUpdatedData(this.formatDate(localDate)).then((val) => {
        const { created, updated } = val.data;
        if (created.length !== 0) {
          this.storeDataInDB(created);
          this.addDataToStore(created);
        }
        if (updated.length !== 0) {
          this.storeDataInDB(updated);
          this.addDataToStore(updated);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  /**
   *
   * @returns {array} a unique array of all the indicator
     * indexes available in iDB.
     * This is considerably less cpu-intensive than toArray()
   */
  async checkIndicatorsInIdb() {
    return this.db.data.orderBy('indicator').uniqueKeys();
  }

  /**
   *
   * @returns {array} containing a list of all indicator ids
   * available to the api
   */
  async listAllIndicators() {
    return this.indicators.orderBy('id').uniqueKeys();
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
      await this.DSI.bulkPut(data[6].data);
      await this.location.bulkPut(data[0].data);
      await this.indicators.bulkPut(data[1].data);
      await this.valuetypes.bulkPut(data[3].data);
      await this.factors.bulkPut(data[5].data);
      await this.datasources.bulkPut(data[7].data);
    });
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

  /**
   *
   * @param {array|number} indicators
   * @returns {array} all data objects in the database related to
   * the given indicator(s)
   */
  // eslint-disable-next-line class-methods-use-this
  async getIndicatorsAndRelatedIndicators(indicators) {
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
    localStorage.setItem('dataTimestamp', currentDate);
    this.setDataInStore(currentDate, 'dataTimestamp');
  }

  /**
   *
   * @param {array} data array of indicator data
   *
   */
  async storeDataInDB(data) {
    this.db.transaction('rw', this.data, async () => {
      const mapOutData = data.map((item) => item.data);
      await this.data.bulkPut(...mapOutData);
      this.updatedStoreAvailableIndicator();
    });
    this.storeTimestampInLocal();
    // provide a mixin for getting this from store
  }

  /**
   *
   * @param {array} arrayOfIndicatorIds
   * @returns {array} data from the database related to
   * the given ids
   */
  async getIndicatorDataThatExistInDB(arrayOfIndicatorIds) {
    return this.db.transaction('r', this.data, () => this.db.data.where('indicator').anyOf(arrayOfIndicatorIds).toArray());
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

  /**
   *
   * @param {number} id , an indicator id
   * @returns {array} of data objects for the indicator
   */
  getIndicatorFromDB(id) {
    return this.data.where('indicator').equals(id).toArray();
  }
}
