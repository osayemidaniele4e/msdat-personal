/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */

import { take } from 'lodash';
import dexie from '../config/dexie';
import { getIndicatorsFromApi } from './helper';
import apiServices from './ApiServices';

const DATA = 'data';
const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const LINK = 'links';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';
const NHMIS_MONTHLY = 'nhmisMonthly';

export default class DataBase {
  constructor() {
    this.db = dexie;
    this.data = this.db.table(DATA);
    this.countries = this.db.table('countries');
    this.indicators = this.db.table(INDICATORS);
    this.location = this.db.table(LOCATION);
    this.factors = this.db.table(FACTORS);
    this.DSI = this.db.table(DSI);
    this.location_hierarchy_level = this.db.table(LINK);
    this.valuetypes = this.db.table(VALUE_TYPES);
    this.datasources = this.db.table(DATA_SOURCE);
    this.nhmisMonthly = this.db.table(NHMIS_MONTHLY);
  }

  /**
   *
   * @returns {array} a unique array of all the LOCATION
   * objects available in iDB.
   */
  async listLocations() {
    return this.db.location.orderBy('id').uniqueKeys();
  }

  async fetchTableData(tableName) {
    return this.db[tableName].orderBy('id').toArray();
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
  listAllIndicators() {
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
    return this.db
      .transaction(
        'rw',
        this.DSI,
        this.location,
        this.indicators,
        this.valuetypes,
        this.factors,
        this.datasources,
        this.nhmisMonthly,
        async () => {
          await this.DSI.bulkPut(data[6].data);
          await this.location.bulkPut(data[0].data);
          await this.indicators.bulkPut(data[1].data);
          await this.valuetypes.bulkPut(data[3].data);
          await this.factors.bulkPut(data[5].data);
          await this.datasources.bulkPut(data[7].data);
          await this.nhmisMonthly.bulkPut(data[8].data);
        },
      )
      .catch((error) => {
        throw new Error(error);
      });
  }

  async storeDataInDBTable(data, tableName) {
    return this.db.transaction('rw', this.db.table(tableName), async () => {
      await this.db.table(tableName).bulkPut(data);
    });
  }

  /**
   *
   * @param {array} data array of indicator data
   *
   */
  // async storeLastUpdateYearInDB() {
  //   return this.db.transaction('rw', this.data, async () => {
  //     await this.updateddate.bulkPut('hello');
  //   });
  // }

  async storeDataInDB(data) {
    return this.db.transaction('rw', this.data, async () => {
      await this.data.bulkPut(data);
    });

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
   * @param {number} id , an indicator id
   * @returns {array} of data objects for the indicator
   */
  getIndicatorFromDB(id) {
    return this.data.where('indicator').equals(id).toArray();
  }

  static async getAvailableSoucesForIndicator(id) {
    const allDataPoints = await dexie.table(DATA).where('indicator').equals(id).toArray();
    if (allDataPoints.length <= 0) {
      return [];
    }
    const uniqueArray = [...new Map(allDataPoints.map((item) => [item.datasource, item])).values()];
    return uniqueArray.map((item) => item.datasource);
  }

  static async getAvailableIndicatorByDataSource(id) {
    const allDataPoints = await dexie.table(DATA).where('datasource').equals(id).toArray();
    if (allDataPoints.length <= 0) {
      return [];
    }
    const uniqueArray = [...new Map(allDataPoints.map((item) => [item.indicator, item])).values()];
    return uniqueArray.map((item) => item.indicator);
  }

  async checkAllYearsExistInDB(indicatorID) {
    const dataResult = await apiServices.getIndicatorsWithAvailable(indicatorID);
    const dataValue = dataResult.data.years;
    const yearsNotAvailable = [];
    for (let index = 0; index < dataValue.length; index += 1) {
      const element = dataValue[index];
      const bb = await this.db.data.where({ indicator: indicatorID, period: element }).first();
      if (bb === undefined) {
        yearsNotAvailable.push(element);
      }
    }
    return yearsNotAvailable;
  }

  async initDataWithYears(indicator, limit = 0) {
    for (let index = 0; index < indicator.length; index += 1) {
      const indicatorID = indicator[index];
      const yearsNotAvailableInDB = await this.checkAllYearsExistInDB(indicatorID);
      // take only the at least 8 years
      if (yearsNotAvailableInDB.length > 0) {
        const yearsToTake = limit === 0 ? yearsNotAvailableInDB.length : limit;
        const theYears = take(yearsNotAvailableInDB, yearsToTake);
        // eslint-disable-next-line max-len
        const arrayOfPromises = theYears.map((item) => apiServices.getIndicatorsWithPeriod(indicatorID, item));
        const results = await Promise.all(arrayOfPromises);
        for (let index2 = 0; index2 < results.length; index2 += 1) {
          const requestResult = results[index2].data;
          await this.storeDataInDB(requestResult);
        }
      }
    }
  }

  async checkIfIndicatorWithYearExist(indicatorID, Period) {
    return this.data.where({ indicator: indicatorID, period: Period }).first();
  }

  async initData(indicator) {
    const indicatorInDB = await this.checkIndicatorsInIdb();
    for (let index = 0; index < indicator.length; index += 1) {
      if (!(indicatorInDB.indexOf(indicator[index]) >= 0)) {
        const dataValue = await getIndicatorsFromApi(indicator[index]);
        if (dataValue.data.length > 0) {
          await this.storeDataInDB(dataValue.data);
        }
      }
    }
  }

  // This dexie query filter checks for value type 6 and 10 for num-denum
  static async queryDBForNumDenum(query = {}) {
    return dexie.table(DATA).where(query).filter((value) => value.value_type === 6 || value.value_type === 10).toArray();
  }

  /**
   * @function queryDBForNumDenum
   * @author davebenard
   * @description function to query the DATA table from num-denum data
   * @param {*} query the objet  to be queried
   * @returns {array} result of the Query
   */
  static async queryDBForNumDenum(query = {}) {
    const {
      datasource, period, indicator, location,
    } = query;
    return dexie
      .table(DATA)
      .where('[datasource+indicator+period+location]')
      .equals([datasource, indicator, period, location])
      .filter((value) => value.value_type === 6 || value.value_type === 10)
      .toArray();
  }

  /**
   * @function queryDBForNhmisMonthly
   * @author davebenard
   * @description function to query the NHMIS_MONTHLY table
   * @param {*} query the objet  to be queried
   * @returns {array} result of the Query
   */
  static async queryDBForNhmisMonthly(query = {}) {
    const {
      datasource, indicator, location,
    } = query;
    const result = await dexie
      .table(NHMIS_MONTHLY)
      .where('[datasource+indicator+location]')
      .equals([datasource, indicator, location])
      .toArray();
    return result;
  }

  /**
   * @function queryDB
   * @author davebenard
   * @description function to query the DATA table
   * @param {*} query the objet  to be queried
   * @returns {array} result of the Query
   */
  static async queryDB(query = {}, locationIDArray = []) {
    const {
      datasource, indicator, period, location, value_type,
    } = query;
    if (indicator === undefined) {
      return [];
    }

    let compoundQuery = [];
    let compoundTable = [];

    // query => datasource, indicator , location and value_type
    if ('indicator' in query && 'datasource' in query && 'location' in query && 'value_type' in query && (!('period' in query)) && (Object.keys(query).length === 4)) {
      compoundQuery = [datasource, indicator, location, value_type];
      compoundTable = '[datasource+indicator+location+value_type]';
    }

    // query => datasource indicator and value_type
    if ('indicator' in query && 'datasource' in query && 'value_type' in query && !('period' in query && 'location' in query) && (Object.keys(query).length === 3)) {
      compoundQuery = [datasource, indicator, value_type];
      compoundTable = '[datasource+indicator+value_type]';
    }

    // query => datasource, indicator , period and value_type
    if ('indicator' in query && 'datasource' in query && 'period' in query && 'value_type' in query && (!('location' in query)) && (Object.keys(query).length === 4)) {
      compoundQuery = [datasource, indicator, period, value_type];
      compoundTable = '[datasource+indicator+period+value_type]';
    }

    // query => datasource, indicator , period and location
    if ('indicator' in query && 'datasource' in query && 'period' in query && 'location' in query && (!('value_type' in query)) && (Object.keys(query).length === 4)) {
      compoundQuery = [datasource, indicator, period, location];
      compoundTable = '[datasource+indicator+period+location]';
    }

    // query => datasource, indicator , period, location and value_type
    if ('indicator' in query && 'datasource' in query && 'period' in query && 'location' in query && 'value_type' in query && (Object.keys(query).length === 5)) {
      compoundQuery = [datasource, indicator, period, location, value_type];
      compoundTable = '[datasource+indicator+period+location+value_type]';
    }

    // console.log('checking', compoundQuery, compoundTable, query);

    // if (locationIDArray.length > 0) {
    //   return dexie
    //     .table(DATA)
    //     .where(query)
    //     .filter((value) => locationIDArray.includes(value.location))
    //     .toArray();
    // }
    // return dexie.table(DATA).where(query).toArray();
    if (locationIDArray.length > 0) {
      const data = await dexie
        .table(DATA)
        .where(compoundTable)
        .equals(compoundQuery)
        .filter((value) => locationIDArray.includes(value.location))
        .toArray();
      return data;
    }

    const data = await dexie.table(DATA).where(compoundTable).equals(compoundQuery).toArray();

    return data;
  }

  /**
   * @function queryDBForNumDenum
   * @author davebenard
   * @description function to query the DATA table from num-denum data
   * @param {*} query the objet  to be queried
   * @returns {array} result of the Query
   */
  static async queryTableByName(tableName = '') {
    if (tableName === '') {
      return [];
    }
    return dexie
      .table(tableName)
      .toArray();
  }
}
