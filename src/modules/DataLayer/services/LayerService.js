/* eslint-disable no-await-in-loop */
// import { difference } from 'lodash';
import { take, difference } from 'lodash';
import Vue from 'vue';
import { formatDate } from './helper';
import apiServices from './ApiServices';
import Database from './database.worker';

const DATA = 'data';
const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';
const AVAILABLE_DASHBOARD_INDICATOR = 'availableDashboardIndicator';
const DASHBOARD_DATESOURCE = 'dashboardDataSource';

export default class DataLayer {
  constructor(store) {
    this.DB = '';
    this.store = store;
    this.indicatorList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18];
    this.defaultIndicators = [7, 5, 8];
    this.dataSourceList = [];
    this.LOCAL_STORAGE_KEY = 'dataTimestamp';
    this.Changes = [];
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
    this.dataSourceList = object.dashboardDataSources;
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
    try {
      this.DB = await new Database();
      this.setup(object);
      console.time('fetching');

      // check if data is already initialized i store
      if (this.store.state.DL.indicators.length <= 0) {
        /** Fetching other endpoints */
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
         * we would also need to created a component
         * then display the activities  of the service layer
         * per time
         */

        /**
         * now initializing other tables in the store from the database directly as against the
         * previous implementation
         */
        this.setDataInStore(data[6].data, DSI);
        this.setDataInStore(data[0].data, LOCATION);
        this.setDataInStore(data[1].data, INDICATORS);
        this.setDataInStore(data[3].data, VALUE_TYPES);
        this.setDataInStore(data[5].data, FACTORS);
        this.setDataInStore(data[7].data, DATA_SOURCE);

        console.log('done');
        /** End Featching other enpoints */

        const count = await this.DB.data.count();
        console.log('DB count is', count);
      }

      const indicatorIDArray = await this.DB.checkIndicatorsInIdb();
      // Check if the current related indicator is already in the database
      // then no need to check if the Years exist in the database
      // on th else statement
      if (difference(this.defaultIndicators, indicatorIDArray).length === 0) {
        this.storeTimestampInLocal();
        await this.initDataWithYears(this.defaultIndicators, 8);
        await this.setAvailableDashboardIndicator();
      } else {
        this.storeTimestampInLocal();
        await this.initDataWithYearsWithYearlyChecks(this.defaultIndicators, 8);
        await this.setAvailableDashboardIndicator();
      }

      // await this.initOtherTablesFromDB();

      setTimeout(async () => {
        //
        /**
         * getting the indicators one after the order seems to help the performance
         * as against getting it all at once
         */

        /**
         * also always ensure to use for Loop with async operations
         * forEach loop doesn't  take asynchronous operations into consideration
         */
        console.log('in set timeout');
        //
        const alert = this.sweetAlert();
        await this.initDataWithYears(this.indicatorList);
        alert.close();

        await this.setAvailableDashboardIndicator();
        const alert1 = this.sweetAlert();
        await this.updateData();
        alert1.close();
      }, 500);

      /*
       *This compares then the indicator Array with the indicator Array of the dashboard
       * */
      console.timeEnd('fetching');
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
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
            await this.DB.storeDataInDB(created, DATA);
          }
          if (updated.length !== 0) {
            await this.DB.storeDataInDB(updated, DATA);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  async updatedStoreAvailableIndicator(indicatorsIDs) {
    let indicators = indicatorsIDs;
    if (!Array.isArray(indicatorsIDs)) {
      indicators = [indicatorsIDs];
    }

    this.store.commit('DL/ADD_DATA', {
      tableName: AVAILABLE_DASHBOARD_INDICATOR,
      data: indicators,
    });
  }

  /**
   * set dashboard available  indicator in store
   */
  async setAvailableDashboardIndicator() {
    const indicatorsInDB = await this.DB.checkIndicatorsInIdb();

    const dashboardIndicators = indicatorsInDB.filter((item) => this.indicatorList.includes(item));

    const dashboardDataSource = this.dataSourceList;
    this.setDataInStore(dashboardIndicators, AVAILABLE_DASHBOARD_INDICATOR);
    this.setDataInStore(dashboardDataSource, DASHBOARD_DATESOURCE);
  }

  async checkAllYearsExistInDB(indicatorID) {
    const dataResult = await apiServices.getIndicatorsWithAvailable(indicatorID);
    const dataValue = dataResult.data.years;
    const yearsNotAvailable = [];
    for (let index = 0; index < dataValue.length; index += 1) {
      const element = dataValue[index];
      const bb = await this.DB.checkIfIndicatorWithYearExist(indicatorID, element);
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
        const arrayOfPromises = theYears.map(
          (item) => apiServices.getIndicatorsWithPeriod(indicatorID, item),
        );
        const results = await Promise.all(arrayOfPromises);
        for (let index2 = 0; index2 < results.length; index2 += 1) {
          const requestResult = results[index2].data;
          await this.DB.storeDataInDB(requestResult);
        }
        this.updatedStoreAvailableIndicator(indicatorID);
      }
    }
  }

  async initDataWithYearsWithYearlyChecks(indicator, limit = 0) {
    for (let index = 0; index < indicator.length; index += 1) {
      const indicatorID = indicator[index];
      const dataResult = await apiServices.getIndicatorsWithAvailable(indicatorID);
      const dataValue = dataResult.data.years;
      // take only the at least 8 years
      const yearsToTake = limit;
      const theYears = take(dataValue, yearsToTake);
      const arrayOfPromises = theYears.map(
        (item) => apiServices.getIndicatorsWithPeriod(indicatorID, item),
      );
      const results = await Promise.all(arrayOfPromises);
      for (let index2 = 0; index2 < results.length; index2 += 1) {
        const requestResult = results[index2].data;
        await this.DB.storeDataInDB(requestResult);
      }
      this.updatedStoreAvailableIndicator(indicatorID);
    }
  }

  //  static sweetAlert(title, text, type) {
  // eslint-disable-next-line class-methods-use-this
  sweetAlert() {
    return Vue.swal({
      toast: true,
      position: 'bottom-end',
      icon: 'info',
      title: 'Data Synchronization in progress',
      text: 'Updating dashboard with more data',
      showConfirmButton: false,
      timerProgressBar: false,
      allowOutsideClick: false,
      showLoading: true,
    });
  }
}
