/* eslint-disable no-await-in-loop */

import dexie from '../config/dexie';
import { getIndicatorsFromApi } from './helper';

const DATA = 'data';
const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const LINK = 'links';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';

export default class DataBase {
  constructor() {
    this.db = dexie;
    console.log(this.db);
    this.data = this.db.table(DATA);
    this.countries = this.db.table('countries');
    this.indicators = this.db.table(INDICATORS);
    this.location = this.db.table(LOCATION);
    this.factors = this.db.table(FACTORS);
    this.DSI = this.db.table(DSI);
    this.location_hierarchy_level = this.db.table(LINK);
    this.valuetypes = this.db.table(VALUE_TYPES);
    this.datasources = this.db.table(DATA_SOURCE);
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
    console.log(data);
    return this.db.transaction(
      'rw',
      this.DSI,
      this.location,
      this.indicators,
      this.valuetypes,
      this.factors,
      this.datasources,
      async () => {
        await this.DSI.bulkPut(data[6].data);
        await this.location.bulkPut(data[0].data);
        await this.indicators.bulkPut(data[1].data);
        await this.valuetypes.bulkPut(data[3].data);
        await this.factors.bulkPut(data[5].data);
        await this.datasources.bulkPut(data[7].data);
      },
    );
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
    return this.db.transaction('r', this.data, () => this.db.data
      .where('indicator')
      .anyOf(arrayOfIndicatorIds)
      .toArray());
  }

  /**
   *
   * @param {number} id , an indicator id
   * @returns {array} of data objects for the indicator
   */
  getIndicatorFromDB(id) {
    return this.data
      .where('indicator')
      .equals(id)
      .toArray();
  }

  async initData(indicator) {
    const indicatorInDB = await this.checkIndicatorsInIdb();
    debugger;
    for (let index = 0; index < indicator.length; index += 1) {
      if (!(indicatorInDB.indexOf(indicator[index]) >= 0)) {
        const dataValue = await getIndicatorsFromApi(indicator[index]);
        if (dataValue.data.length > 0) {
          await this.storeDataInDB(dataValue.data);
        }
      }
    }
  }

  /**
 *
 * @param {*} query the objet  to be queried
 * @returns {array} result of the Query
 */
  static async queryDB(query = {}) {
    return dexie.table(DATA).where(query).toArray();
  }
}
