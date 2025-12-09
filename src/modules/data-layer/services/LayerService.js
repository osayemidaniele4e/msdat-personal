/* eslint-disable no-await-in-loop */
// import { difference } from 'lodash';

import Vue from 'vue';
import apiServices from './ApiServices';
// import Database from './database.worker';

const INDICATORS = 'indicators';
const FACTORS = 'factors';
const DSI = 'datasource_specific_indicator';
const VALUE_TYPES = 'valuetypes';
const DATA_SOURCE = 'datasources';
const LOCATION = 'location';
const AVAILABLE_DASHBOARD_INDICATOR = 'availableDashboardIndicator';
const DASHBOARD_DATESOURCE = 'dashboardDataSource';
const ALL_DASHBOARD_SOURCES = 'allSources';
const ALL_INDICATOR = 'allIndicator';
const NHMIS_MONTHLY = 'nhmis_monthly';

export default class DataLayer {
  constructor(store) {
    this.DB = '';
    this.store = store;
    this.indicatorList = [];
    this.defaultIndicators = [];
    this.dataSourceList = [];
    this.LOCAL_STORAGE_KEY = 'dataTimestamp';
    this.Changes = [];
    this.dashboardID = '';
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
    this.dashboardID = object.dashboardID;

    // This allows the dashboard datasources to be available
    // to the dashboard early instead of waiting for all
    // data fetching to be complete, leading to
    // empty tables on Initial load
    this.setDataInStore(this.dataSourceList, ALL_DASHBOARD_SOURCES);
    this.setDataInStore(this.indicatorList, ALL_INDICATOR);
  }

  /**
   * This gets the default indicator from the Indexed DB database
   * reason for this is to initialize the dashboard with minimum data required
   */
  // populateIndicatorsForCustomDashboard() {
  //   if (this.defaultIndicators.length <= 0) {
  //     this.setAllIndicators();
  //   }
  // }

  /**
   * Gets ids of all indicators from the
   * indicators list and populates the
   * with all of it then populates the
   * with the first three in the list
  //  */

  /**
   * data layer initialization
   */
  async init(object) {
    try {
      // this.DB = await new Database();
      this.setup(object);

      console.time('fetching');

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
      this.setDataInStore(data[6].data.results, DSI);
      this.setDataInStore(data[0].data.results, LOCATION);
      this.setDataInStore(data[1].data.results, INDICATORS);
      this.setDataInStore(data[3].data.results, VALUE_TYPES);
      this.setDataInStore(data[5].data.results, FACTORS);
      this.setDataInStore(data[7].data.results, DATA_SOURCE);
      this.setDataInStore(data[8].data.results, NHMIS_MONTHLY);

      let filteredIndicatorIDArray = [];

      if (this.dashboardID) {
        const dashboardIndicators = await apiServices.getDashboardIndicators(this.dashboardID);

        const dashboardIndicatorIDs = dashboardIndicators.data.indicators.map((item) => item.id);

        filteredIndicatorIDArray = dashboardIndicatorIDs.filter(
          (value) => value !== undefined && !Number.isNaN(value)
        );

        if (filteredIndicatorIDArray.length !== 0) {
          // debugger;
          this.storeTimestampInLocal();

          await this.setAvailableDashboardIndicator();
          // await this.initDataWithYears(this.defaultIndicators);
        }
      }
      // await this.initOtherTablesFromDB();
      setTimeout(async () => {
        if (filteredIndicatorIDArray.length > 0) {
          const alert = this.sweetAlert();

          alert.close();
        }
      }, 500);

      /*
       * This compares then the
       * indicator Array with the indicator
       * Array of the dashboard
       * */
      // console.timeEnd('fetching');
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
    // const serverDate = await apiServices.getLatestDate();
    // const localDate = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    // // Check if its more recent than the date in localStorage
    // const oldDateObject = new Date(localDate);
    // const newDateObject = new Date(serverDate.data);
    // if (oldDateObject.getTime() === newDateObject.getTime()) {
    //   return true;
    // }
    // if (oldDateObject <= newDateObject) {
    //   return false;
    // }
    // return true;

    const serverDateResponse = await apiServices.getLatestDate();
    const serverDate = new Date(serverDateResponse.data.results[0].updated_at);

    const localDate = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const oldDateObject = new Date(localDate);

    if (Number.isNaN(serverDate.getTime())) {
      // Invalid server date, return true to avoid unnecessary data update
      return true;
    }
    return oldDateObject >= serverDate;
  }

  /**
   * this does the actual updating of the data
   */
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
    // storeDataInDBTable
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
    // const indicatorsInDB = await this.DB.checkIndicatorsInIdb();
    const response = await apiServices.fetchAllIndicators()

    const dashboardIndicatorIDs = response.data.results.map((item) => item.id);

    const dashboardIndicators = dashboardIndicatorIDs.filter((item) => this.indicatorList.includes(item));

    const dashboardDataSource = this.dataSourceList;
    this.setDataInStore(dashboardIndicators, AVAILABLE_DASHBOARD_INDICATOR);
    this.setDataInStore(dashboardDataSource, DASHBOARD_DATESOURCE);
  }

  /**
   *
   */

  // eslint-disable-next-line class-methods-use-this
  sweetAlert() {
    return Vue.swal({
      toast: true,
      position: 'bottom-end',
      imageWidth: 100,
      imageHeight: 100,
      title:
        '<div style="display: flex; align-items: center; margin-left: 66px;">Data Synchronizing</div>',
      html: '<div style="margin-top: -14px; margin-bottom: -10px;;"> <img src="https://my.vsu.edu.ph/assets/img/green_spinner.gif" style="width: 55px; height: 55px; margin-right: 13px; margin-top: -21px" alt="Loading"/>Updating dashboard with more data</div>',
      showConfirmButton: false,
      timerProgressBar: false,
      allowOutsideClick: false,
      showLoading: true,
      customClass: {
        image: 'custom-swal-image',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
}
