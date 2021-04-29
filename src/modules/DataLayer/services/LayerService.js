import { chunk, difference } from 'lodash';
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
   * data initialization
   */

  async init() {
    // this.updatedStoreAvailableIndicator();
    console.time('fetching');
    console.time('minimal');
    console.log(JSON.parse(localStorage.getItem(this.localStorageKey)));
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
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
      this.updatedStoreAvailableIndicator();

      console.log('fetching other endpoint');
      /**
       * The apiServices returns all the and array of response for the
       * axios call of all other apiEndpoints.getOtherEndpoint
       * it uses and {Promise.all()}
       *
       * @see {@link apiServices.getOtherEndpoint()}
       */
      const data = apiServices.getOtherEndpoint();
      /**
       * we would also need to created a component then display the activities  of the service layer
       * pet time
       */
      console.log('storing other endpoint to index db');
      const val = this.storeDataForOtherEndPointToDB(data);
      console.log(val);
      this.storeOtherEndpointsInState(data);
      console.log('done');
      const dataValue = this.getIndicatorsAndRelatedIndicators(this.defaultIndicators);
      if (dataValue.length > 0) {
        this.storeDataInDB(dataValue, this.defaultIndicators);
      }

      this.storeOtherEndpointsInState(dataValue, DATA);
    } else {
      /**
       * need to find a way to check if it already exist in the store
       * before querying the DB
       */
      let dataItem = this.DSI.toArray();
      this.setOtherTableInStore(dataItem, DSI);

      dataItem = this.location.toArray();
      this.setOtherTableInStore(dataItem, LOCATION);

      dataItem = this.indicators.toArray();
      this.setOtherTableInStore(dataItem, INDICATORS);

      dataItem = this.datasources.toArray();
      this.setOtherTableInStore(dataItem, DATA_SOURCE);

      dataItem = this.valuetypes.toArray();
      this.setOtherTableInStore(dataItem, VALUE_TYPES);

      dataItem = this.factors.toArray();
      this.setOtherTableInStore(dataItem, FACTORS);

      dataItem = this.getIndicatorDataThatExistInDB();
      this.setOtherTableInStore(dataItem, DATA);
      // this.storeOtherEndpointsInState(['james testing stuff']);

      // updated store indicator Array
      this.updatedStoreAvailableIndicator();
    }
    console.timeEnd('minimal');
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
     * This spilt the array into 3
     */
    const arrayGrouped = chunk(indicatorsNotInDB, 3);
    // console.log(arrayGrouped)
    arrayGrouped.forEach((arrayItems) => {
      setTimeout(async () => {
        console.log(arrayItems);
        const dataValue = await this.getIndicatorsAndRelatedIndicators(arrayItems);
        if (dataValue.length > 0) {
          await this.storeDataInDB(dataValue, arrayItems);
          this.storeOtherEndpointsInState(dataValue);
        }
      }, 3000);
    });
    console.timeEnd('fetching');
    return Promise.resolve(true);
  }

  // async updateData() {

  // }

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

  storeOtherEndpointsInState(data, table) {
    console.log('storing in vue state');
    const stateTableName = table || false;
    if (typeof data[0] === 'object') {
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
        stateTableName,
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
    await this.db.transaction('rw', this.data, async () => {
      data.forEach(async (dataArray) => this.data.bulkPut(dataArray.data));
      this.storeIndicatorIdInLocalStorage(indicatorIDs);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  storeDataInState(data) {
    // data.forEach((dataArray: []) => this.$store.commit(dataArray))
    // this.store.commit
    console.log(data);
  }

  async getIndicatorDataThatExistInDB() {
    return this.db.transaction('r', this.data, async () => this.db.data.where('indicator').anyOf(this.indicatorList).toArray());
  }

  setOtherTableInStore(data, tableName) {
    this.store.commit('DL/SET_DATA', {
      tableName,
      data,
    });
  }

  /**
   * @param {array} ids and array of indicator to be store in local Storage
   */
  storeIndicatorIdInLocalStorage(ids) {
    if (localStorage.getItem(this.localStorageKey) === null) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
    const indicatorsIDs = JSON.parse(localStorage.getItem(this.localStorageKey));
    indicatorsIDs.push(...[...new Set(ids)]);
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
}
