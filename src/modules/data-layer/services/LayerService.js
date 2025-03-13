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
const ALL_DASHBOARD_SOURCES = 'allSources';
const ALL_INDICATOR = 'allIndicator';
const NHMIS_MONTHLY = 'nhmis_monthly';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

//  utility function
async function retry(fn, retries = MAX_RETRIES, delay = RETRY_DELAY) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts remaining`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
}

export default class DataLayer {
  constructor(store) {
    this.DB = '';
    this.store = store;
    this.indicatorList = [];
    this.defaultIndicators = [];
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
    console.log(this.indicatorList);
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

      const indicatorArray = await this.DB.listAllIndicators();

      // check if data is already initialized iN DEXIE DB
      // this.DB.getIndicatorDataThatExistInDB()
      if (indicatorArray.length === 0) {
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
        await this.DB.storeDataInDBTable(data[0].data.results, 'location');
        await this.DB.storeDataInDBTable(data[1].data.results, 'indicators');
        await this.DB.storeDataInDBTable(data[3].data.results, 'valuetypes');
        await this.DB.storeDataInDBTable(data[5].data.results, 'factors');
        await this.DB.storeDataInDBTable(data[6].data.results, 'datasource_specific_indicator');
        await this.DB.storeDataInDBTable(data[7].data.results, 'datasources');
        await this.DB.storeDataInDBTable(data[8].data.results, 'nhmisMonthly');
      } else {
        // Populate vuex using dexie
        this.setDataInStore(await this.DB.fetchTableData('datasource_specific_indicator'), DSI);
        this.setDataInStore(await this.DB.fetchTableData('location'), LOCATION);
        this.setDataInStore(await this.DB.fetchTableData('indicators'), INDICATORS);
        this.setDataInStore(await this.DB.fetchTableData('valuetypes'), VALUE_TYPES);
        this.setDataInStore(await this.DB.fetchTableData('factors'), FACTORS);
        this.setDataInStore(await this.DB.fetchTableData('datasources'), DATA_SOURCE);
        this.setDataInStore(await this.DB.fetchTableData('nhmisMonthly'), NHMIS_MONTHLY);
      }

      const indicatorIDArray = await this.DB.checkIndicatorsInIdb();
      // Filter out undefined and NaN values from indicatorIDArray
      const filteredIndicatorIDArray = indicatorIDArray.filter(
        (value) => value !== undefined && !Number.isNaN(value),
      );

      // Filter out undefined and NaN values from this.defaultIndicators
      const filteredDefaultIndicators = this.defaultIndicators.filter(
        (value) => value !== undefined && !Number.isNaN(value),
      );

      // Find the difference after filtering
      const indicatorsNotOnIdb = difference(filteredDefaultIndicators, filteredIndicatorIDArray);
      // const indicatorsNotOnIdb = difference(this.defaultIndicators, indicatorIDArray); // A more conclusive check can be done
      // const defaultInd = this.defaultIndicators;
      // console.log(defaultInd);
      if (indicatorsNotOnIdb.length !== 0) {
        // debugger;
        this.storeTimestampInLocal();
        // await this.initDataWithYearsWithYearlyChecks([7, 6, 1], 8);
        await this.initDataWithYearsWithYearlyChecks(indicatorsNotOnIdb, 8);
        await this.setAvailableDashboardIndicator();
        // await this.initDataWithYears(this.defaultIndicators);
      }
      // await this.initOtherTablesFromDB();
      setTimeout(async () => {
        // await this.initDataWithYearsWithYearlyChecks(this.defaultIndicators);
        const lateIndicators = await this.DB.checkIndicatorsInIdb();
        const indicatorsUnavailable = difference(this.indicatorList, lateIndicators);
        indicatorsUnavailable.unshift(...this.defaultIndicators);

        if (indicatorsUnavailable.length > 0) {
          const alert = this.sweetAlert();
          await this.initDataWithYears(indicatorsUnavailable);
          alert.close();
          await this.initDataWithRemainingYears(indicatorsUnavailable);
          await this.setAvailableDashboardIndicator();
          const alert1 = this.sweetAlert();
          await this.updateData();
          alert1.close();
          this.handleShowLoaded();
        } else {
          await this.setAvailableDashboardIndicator();
        }
        //
        /**
         * getting the indicators one after the order seems to help the performance
         * as against getting it all at once
         */

        /**
         * also always ensure to use for Loop with async operations
         * forEach loop doesn't  take asynchronous operations into consideration
         */
        //
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

  async handlePeripheralData() {
    const locationCheck = await this.DB.listLocations();
    // Simple check to see if peripheral data exists on
    // idb
    if (locationCheck.length <= 0) {
      // fetch from api and store in vuex and dexie
      const data = await apiServices.getOtherEndpoint();
      this.setDataInStore(data[6].data.results, DSI);
      this.setDataInStore(data[0].data.results, LOCATION);
      this.setDataInStore(data[1].data.results, INDICATORS);
      this.setDataInStore(data[3].data.results, VALUE_TYPES);
      this.setDataInStore(data[5].data.results, FACTORS);
      this.setDataInStore(data[7].data.results, DATA_SOURCE);
      this.setDataInStore(data[8].data.results, NHMIS_MONTHLY);
      // store the rest of the data
      await this.DB.storeDataInDBTable(data[0].data.results, 'location');
      await this.DB.storeDataInDBTable(data[1].data.results, 'indicators');
      await this.DB.storeDataInDBTable(data[3].data.results, 'valuetypes');
      await this.DB.storeDataInDBTable(data[5].data.results, 'factors');
      await this.DB.storeDataInDBTable(data[6].data.results, 'datasource_specific_indicator');
      await this.DB.storeDataInDBTable(data[7].data.results, 'datasources');
      await this.DB.storeDataInDBTable(data[8].data.results, 'nhmisMonthly');
    } else {
      // Populate vuex using dexie
      this.setDataInStore(await this.DB.fetchTableData('datasource_specific_indicator'), DSI);
      this.setDataInStore(await this.DB.fetchTableData('location'), LOCATION);
      this.setDataInStore(await this.DB.fetchTableData('indicators'), INDICATORS);
      this.setDataInStore(await this.DB.fetchTableData('valuetypes'), VALUE_TYPES);
      this.setDataInStore(await this.DB.fetchTableData('factors'), FACTORS);
      this.setDataInStore(await this.DB.fetchTableData('datasources'), DATA_SOURCE);
      this.setDataInStore(await this.DB.fetchTableData('nhmisMonthly'), NHMIS_MONTHLY);
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
  async updateData() {
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
    const indicatorsInDB = await this.DB.checkIndicatorsInIdb();

    const dashboardIndicators = indicatorsInDB.filter((item) => this.indicatorList.includes(item));

    const dashboardDataSource = this.dataSourceList;
    this.setDataInStore(dashboardIndicators, AVAILABLE_DASHBOARD_INDICATOR);
    this.setDataInStore(dashboardDataSource, DASHBOARD_DATESOURCE);
  }

  async checkAllYearsExistInDB(indicatorID) {
    const dataResult = await apiServices.getIndicatorsWithAvailable(indicatorID);
    // const dataResult = await apiServices.getIndicatorsWithAvailable(7);
    const dataValue = dataResult.data.years;
    const yearsNotAvailable = [];
    for (let i = 0; i < dataValue.length; i++) {
      const element = dataValue[i];
      const bb = await this.DB.checkIfIndicatorWithYearExist(indicatorID, element);
      if (bb === undefined) {
        yearsNotAvailable.push(element);
      }
    }
    return yearsNotAvailable;
  }

  /**
   * this was reverted back because the implementation was interrupting the update of the indicator count on the footer
   * and also the total population on demographics dashboard
   *reverted by henry
   */
  // /**
  //  * check available datasources
  //  * @author davebenard
  //  */
  // async initDataWithYears(indicator, limit = 0) {
  //   const unavailableIndicators = [64, 78, 329, 382, 64, 78, 37, 81, 70, 395, 117, 192, 90, 548, 62, 477, 507, 508, 628];
  //   for (let i = 0; i < indicator.length; i++) {
  //     // eslint-disable-next-line no-continue
  //     if (unavailableIndicators.includes(indicator[i])) continue;
  //     try {
  //       const indicatorID = indicator[i];
  //       const yearsNotAvailableInDB = await this.checkAllYearsExistInDB(indicatorID);
  //       // take only the at least 8 years
  //       if (yearsNotAvailableInDB.length > 0) {
  //         const yearsToTake = limit === 0 ? yearsNotAvailableInDB.length : limit;
  //         const theYears = take(yearsNotAvailableInDB, yearsToTake);
  //         const arrayOfPromises = theYears.map((item) => apiServices.getIndicatorsWithPeriod(indicatorID, item));
  //         const results = await Promise.all(arrayOfPromises);
  //         for (let j = 0; j < results.length; j++) {
  //           const requestResult = results[j].data.results;
  //           // check if empty
  //           await this.DB.storeDataInDB(requestResult);
  //         }
  //         this.updatedStoreAvailableIndicator(indicatorID);
  //       }
  //     } catch (e) {
  //       unavailableIndicators.push(indicator[i]);
  //       console.log('unavailableIndicators', unavailableIndicators);
  //     }
  //   }
  // }

  /**
   * check available datasources
   * @author davebenard
   */

  async initDataWithYears(indicator) {
    const validIndicators = indicator.filter((value) => !Number.isNaN(value));
    const errors = [];

    await Promise.all(
      validIndicators.map(async (indicatorID) => {
        try {
          // Wrap network calls in retry logic
          const yearsNotAvailableInDB = await retry(async () => this.checkAllYearsExistInDB(indicatorID));

          const sortedYears = this.sortYearsDescending(yearsNotAvailableInDB);

          if (yearsNotAvailableInDB.length > 0) {
            const yearsToTake = 3;
            const theYears = take(sortedYears, yearsToTake);

            // Process years sequentially to better handle failures
            await Promise.all(
              theYears.map(async (year) => {
                try {
                  const result = await retry(async () => apiServices.getIndicatorsWithPeriod(indicatorID, year));

                  const requestResult = result.data.results;
                  await this.DB.storeDataInDB(requestResult);
                  this.updatedStoreAvailableIndicator(indicatorID);
                } catch (yearError) {
                  errors.push({
                    indicatorID,
                    year,
                    error: yearError.message,
                  });
                  console.error(
                    `Failed to process indicator ${indicatorID} for year ${year}:`,
                    yearError,
                  );
                }
              }),
            );
          }
        } catch (indicatorError) {
          errors.push({
            indicatorID,
            error: indicatorError.message,
          });
          console.error(`Failed to process indicator ${indicatorID}:`, indicatorError);
        }
      }),
    );

    // Log summary of errors
    if (errors.length > 0) {
      console.error('Data retrieval completed with errors:', errors);
      this.store.commit('DL/SET_DATA', {
        tableName: 'syncErrors',
        data: errors,
      });
    }
  }

  async initDataWithRemainingYears(indicator) {
    console.log('Phase 2 started');
    const validIndicators = indicator.filter((value) => !Number.isNaN(value));
    const errors = [];

    for (let i = 0; i < validIndicators.length; i++) {
      const indicatorID = validIndicators[i];
      try {
        await this.processIndicator(indicatorID, errors);
      } catch (indicatorError) {
        errors.push({
          indicatorID,
          error: indicatorError.message,
        });
        console.error(`Failed to process indicator ${indicatorID}:`, indicatorError);
      }
    }

    this.handleErrors(errors);
  }

  // Extract the batch processing logic
  async processIndicator(indicatorID, errors) {
    const yearsNotAvailableInDB = await retry(async () => this.checkAllYearsExistInDB(indicatorID));

    if (yearsNotAvailableInDB.length > 0) {
      const years = this.prepareYearsArray(yearsNotAvailableInDB);
      const RemainingResults = years.slice(3);
      await this.processBatches(indicatorID, RemainingResults, errors);
    }
  }

  // Process batches of years
  async processBatches(indicatorID, years, errors) {
    const BATCH_SIZE = 5;

    for (let j = 0; j < years.length; j += BATCH_SIZE) {
      const batch = years.slice(j, j + BATCH_SIZE);
      const success = await this.processBatch(indicatorID, batch, j, years.length);

      if (!success) {
        errors.push({
          indicatorID,
          yearBatch: batch,
          error: 'Batch processing failed',
        });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  sortYearsDescending(years) {
    // Filter valid years (numbers) and invalid ones (months or incorrect values)
    const validYears = [];
    const invalidEntries = [];

    years.forEach((item) => {
      const trimmed = item.trim();
      if (/^\d{4}$/.test(trimmed)) {
        validYears.push(Number(trimmed));
      } else {
        invalidEntries.push(trimmed);
      }
    });

    // Sort valid years in descending order
    validYears.sort((a, b) => b - a);

    // Return sorted years with invalid entries at the bottom
    return [...validYears, ...invalidEntries];
  }

  handleShowLoaded() {
    const loadedAlert = this.sweetAlert2();
    setTimeout(async () => {
      loadedAlert.close();
    }, 10000);
  }

  /**
   *
   */
  async initDataWithYearsWithYearlyChecks(indicator, limit = 0) {
    for (let i = 0; i < indicator.length; i++) {
      const indicatorID = indicator[i];
      const dataResult = await apiServices.getIndicatorsWithAvailable(indicatorID);
      const dataValue = dataResult.data.years;
      const sortedYears = this.sortYearsDescending(dataValue);
      const yearsToTake = limit;
      const theYears = take(sortedYears, yearsToTake);

      // STEP 2: Get dataPoint by indicator and yearsAvailable
      const arrayOfPromises = theYears.map((item) => apiServices.getIndicatorsWithPeriod(indicatorID, item));
      const results = await Promise.all(arrayOfPromises);
      for (let j = 0; j < results.length; j++) {
        const requestResult = results[j].data.results;
        await this.DB.storeDataInDB(requestResult);
      }
      this.updatedStoreAvailableIndicator(indicatorID);
    }
  }

  //  static sweetAlert(title, text, type) {
  // eslint-disable-next-line class-methods-use-this
  // sweetAlert() {
  //   return Vue.swal({
  //     toast: true,
  //     position: 'bottom-end',
  //     // icon: 'info',
  //     imageUrl: "https://my.vsu.edu.ph/assets/img/green_spinner.gif",
  //     imageWidth: 100,
  //   imageHeight: 100,
  //     title: 'Data Synchronizing',
  //     text: 'Updating dashboard with more data',
  //     showConfirmButton: false,
  //     timerProgressBar: false,
  //     allowOutsideClick: false,
  //     showLoading: true,
  //     customClass: {
  //       image: 'custom-swal-image',
  //     },
  //   });

  //   // Return a Promise that resolves when data synchronization is complete
  //   // return new Promise((resolve) => {
  //   //   setTimeout(() => {
  //   //     // Close the alert
  //   //     Vue.swal.close();
  //   //     resolve(); // Resolve the Promise to signal completion
  //   //   }, 15000); // Modify the timeout value as needed
  //   // });
  // }

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
  sweetAlert2() {
    return Vue.swal({
      toast: true,
      position: 'bottom-end',
      imageWidth: 100,
      imageHeight: 100,
      // title:
      //   '<div style="display: flex; align-items: center; margin-left: 66px; font-weight: 600 ">Number of loaded indicators and</div>',
      html:
        '<div style="display: flex; align-items: center; justify-content: space-between; font-size: 15px; font-weight: 500;">'
        + '<div>Number of loaded indicators and datasources</div>'
        + '<div style="margin-left: 20px;"><img src="/img/loader.gif" style="width: 55px; height: 55px; background-color: #DFF3F3; border-radius: 50px;" alt="Loading"/></div>'
        + '</div>',
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
  showSyncStatus() {
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

  async processBatch(indicatorID, batch, currentIndex, totalLength) {
    try {
      const batchPromises = batch.map((year) => retry(async () => {
        const result = await apiServices.getIndicatorsWithPeriod(indicatorID, year);
        const requestResult = result.data.results;
        await this.DB.storeDataInDB(requestResult);
        return true;
      }));

      const results = await Promise.all(batchPromises);

      // Update store with successful indicator
      this.updatedStoreAvailableIndicator(indicatorID);

      // Log progress
      console.log(
        `Processed ${currentIndex + batch.length}/${totalLength} years for indicator ${indicatorID}`,
      );

      return results.every((result) => result === true);
    } catch (error) {
      console.error(`Batch processing failed for indicator ${indicatorID}:`, error);
      return false;
    }
  }

  // Add this method inside the DataLayer class
  // eslint-disable-next-line class-methods-use-this
  handleErrors(errors) {
    if (errors.length > 0) {
      console.error('Data synchronization completed with errors:', errors);

      // Store errors in Vuex
      this.store.commit('DL/SET_DATA', {
        tableName: 'syncErrors',
        data: errors,
      });

      // Show error notification
      Vue.swal({
        toast: true,
        position: 'bottom-end',
        icon: 'warning',
        title: 'Synchronization Warning',
        text: `${errors.length} items failed to sync`,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  }

  // Add method to prepare years array if it's missing
  prepareYearsArray(years) {
    return this.sortYearsDescending(years);
  }
}
