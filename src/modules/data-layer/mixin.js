import { createNamespacedHelpers } from 'vuex';
import {
  filter, omit, matches, isObject,
} from 'lodash';
import formatter from '../msdat-dashboard/mixins/formatter';
// import SampleData from './sample_data';
// import { MSDAT } from '@/config/dashboardGroups';

import DB from './services/database.worker';
import apiServices from './services/ApiServices';
import store from '../msdat-dashboard/store';

const { mapState } = createNamespacedHelpers('DL');

/**
 * Data Object return Type
 *
 * @typedef {Object} dataObjectType
 * @property {number} id
 * @property {number} indicator
 * @property {number} datasource
 * @property {number} location
 * @property {string} value
 * @property {string} period
 * @property {string} value_type
 * @property {string} updated_at
 * @property {string} created_at

 */

export default {
  mixins: [formatter],
  data() {
    return {
      // valueType: [],
      valueType: [
        {
          id: 1,
          value_type: 'Estimate',
          created_at: null,
          updated_at: null,
        },
        {
          id: 2,
          value_type: 'Survey',
          created_at: null,
          updated_at: null,
        },
        {
          id: 3,
          value_type: 'Lower bound',
          created_at: null,
          updated_at: null,
        },
        {
          id: 4,
          value_type: 'Upper bound',
          created_at: null,
          updated_at: null,
        },
        {
          id: 5,
          value_type: 'Routine',
          created_at: null,
          updated_at: null,
        },
        {
          id: 6,
          value_type: 'Numerator',
          created_at: '2021-07-02T08:45:20.707139Z',
          updated_at: '2021-07-02T08:45:20.707348Z',
        },
        {
          id: 7,
          value_type: 'Denominator',
          created_at: '2021-07-02T08:56:10.401735Z',
          updated_at: '2021-07-02T08:56:10.401798Z',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      dlDataSourceSpecificIndicator: (state) => state.datasource_specific_indicator,
      dlDatasource: (state) => state.datasources,
      dlIndicator: (state) => state.indicators,
      dlLocation: (state) => state.location,
      dlValue_type: (state) => state.valuetypes,
      dlDashboardIndicator: (state) => state.availableDashboardIndicator,
      dlDashboardDataSource: (state) => state.dashboardDataSource,
      dlAllPossibleSources: (state) => state.allSources,
      dlFactors: (state) => state.factors,
    }),

    dlGetAvailableIndicators() {
      return this.dlIndicator.filter((e) => this.dlDashboardIndicator.includes(e.id));
    },
  },
  methods: {
    /**
     * Fetches NUMERATOR-DENOMINATOR data
     * specifically
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    async queryDBForNumDenum(query) {
      const result = await DB.queryDBForNumDenum(query);
      return result;
    },
    /**
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    // eslint-disable-next-line consistent-return
    async dlQuery(queryObject) {
      // console.log(store.state.configObject, '@LINUS');
      // if (queryObject.datasource !== undefined && queryObject.datasource === 30) {
      //   const { data } = await apiServices.getNHMISData(queryObject);
      //   return data.results;
      // }
      // i could do this in individual component when making request with the
      // function by after this it will after all at once
      const query = queryObject;
      // query.dashboardId = store.state.configObject.id;

      // if (query.datasource === 25) {
      //   query.value_type = 1;
      // } else if (!has(query, 'value_type')) {
      //   const datasource = await this.dlGetDataSource(query.datasource);
      //   // if (this.valueType?.length <= 0) {
      //   //   this.valueType = await this.getDexieTableValues('valuetypes');
      //   //   return false;
      //   // }

      //   // const valuetype = this.dlGetValueTypes({ value_type: datasource.classification });
      //   const valuetype = this.valueType?.filter(
      //     (item) => item.value_type === datasource?.classification
      //   );
      //   query.value_type = valuetype[0]?.id;
      // }

      const datasource = await this.dlGetDataSource(query.datasource);
      // if (this.valueType?.length <= 0) {
      //   this.valueType = await this.getDexieTableValues('valuetypes');
      //   return false;
      // }

      // const valuetype = this.dlGetValueTypes({ value_type: datasource.classification });
      const valuetype = this.valueType?.filter(
        (item) => item.value_type === datasource?.classification
      );
      query.value_type = query.value_type || valuetype[0]?.id || 2;

      // check for undefined
      function hasUndefinedOrNullValues(obj) {
        if (obj === null || obj === undefined) return true;

        if (typeof obj === 'object' && !Array.isArray(obj)) {
          // eslint-disable-next-line no-unused-vars
          return Object.entries(obj).some(([_, value]) => hasUndefinedOrNullValues(value));
        }

        return false;
      }

      function hasInvalidValues(obj) {
        if (obj === null || obj === undefined || obj === '') return true;

        if (typeof obj === 'object' && !Array.isArray(obj)) {
          // eslint-disable-next-line no-unused-vars
          return Object.entries(obj).some(([_, value]) => hasInvalidValues(value));
        }

        return false;
      }

      if (isObject(query.location) && hasInvalidValues(query) === false) {
        // const { location } = query;
        // const newQueryObject = omit(query, ['location']);
        // const locationValues = this.dlGetLocation(location);
        // const locationID = locationValues.map((item) => item.id);
        // console.log(newQueryObject, 'LocationsID');
        // const resultValue = await DB.queryDB(newQueryObject, locationID);
        // console.log(resultValue, 'LocationsID 2');
        // return resultValue;

        // using API
        const { location } = query;
        const baseQuery = omit(query, ['location']);
        const locationValues = this.dlGetLocation(location);
        const locationID = locationValues.map((item) => item.id);
        console.log(location, 'LocationsID 1');
        console.log(locationID, 'LocationsID');
        // Map each location ID to an API call
        const apiCalls = locationID.map(async (locationSID) => {
          const queryObjectWithLocation = {
            ...baseQuery,
            location: locationSID,
          };
          console.log(queryObjectWithLocation, 'query@zX Locations');

          // Replace this with your actual API call function
          return apiServices.getDashboardData(store.state.configObject.id, queryObjectWithLocation); // 👈 async function
        });

        const allResponses = await Promise.all(apiCalls);

        // Extract and flatten only the "results" from each API response
        const allResults = allResponses.flatMap((response) => response.data.results);

        console.log(allResults, 'LocationsID data');

        return allResults;
      }

      // check for undefined
      // function hasUndefinedOrNullValues(obj) {
      //   return Object.values(obj).some((val) => val === undefined || val === null);
      // }

      if (hasUndefinedOrNullValues(query) === false) {
        console.log('mappedResponse@R@ 1', query);
        const temp = await apiServices.getDashboardData(store.state.configObject.id, query);
        const result = temp.data.results;
        console.log(result, '@LINUS');
        return result;
        // const result = await DB.queryDB(query);
        // return result;
      }
    },
    // get yeardropdown by Datasource
    async queryDBForYearByDs(query) {
      const { data } = await apiServices.getPeriodByDatasource(query);
      return data.periods;
    },
    async queryDBForAvailableLocation(sourceId, indId) {
      const { data } = await apiServices.getLocations({ datasource: sourceId, indicator: indId });
      return data.locations;
    },
    /**
     * @function dlGetDashboardDataSource
     * @description filter the config
     */
    dlGetDashboardDataSource() {
      return this.dlDatasource.filter((e) => this.dlAllPossibleSources.includes(e.id));
    },
    /**
     * @param {number} id The indicator ID
     * @return {indicatorObjectType}
     */
    dlGetIndicator(id) {
      return this.dlIndicator.find((item) => item.id === id);
    },
    /**
     * @param {number|array} values The Location ID or and Object you like to get
     *
     * @return {indicatorObjectType}
     */
    dlGetLocation(values) {
      if (typeof values === 'object') {
        return filter(this.dlLocation, matches(values));
      }
      return this.dlLocation.find((item) => item.id === values);
    },
    dlGetLocationsByLevel(value) {
      return this.dlLocation.filter((item) => item.level === value);
    },
    dlGetByName(values) {
      return this.dlLocation.find((item) => item.name === values);
    },
    dlGetFactor(id) {
      const factor = this.dlFactors.find((item) => item.id === id);
      if (factor && factor.display_factor === '1') factor.display_factor = ' ';
      return factor;
    },
    dlGetDataSource(id) {
      return this.dlDatasource.find((item) => item.id === id);
    },
    dlGetValueTypes(values) {
      if (typeof values === 'object') {
        return filter(this.valueType, matches(values));
      }
      return this.valueType.find((item) => item.id === values);
    },
    dlGetDataSourceSpecificIndicator(values) {
      if (typeof values === 'object') {
        return filter(this.dlDataSourceSpecificIndicator, matches(values));
      }
      return this.dlDataSourceSpecificIndicator.find((item) => item.id === values);
    },
    /**
     *
     * @param {value} Chosen indicator ID |
     * Uses @function {getAvailableSoucesForIndicator}
     * from database.worker class to fetch
     * available datasources from dexie
     * @returns array of datasource objects
     */
    async getDataSourcesFromIndicator(value) {
      const indicatorId = value || 1;
      const { data } = await apiServices.getIndicatorDataSources(indicatorId);
      const sourcesAvailable = data.datasources;
      console.log(sourcesAvailable, 'getDataSourcesFromIndicator');
      if (sourcesAvailable.length <= 0) {
        return [];
      }
      // const sourceObjects = sourcesAvailable.map((source) => this.dlGetDataSource(source));
      return sourcesAvailable;
    },
    async getAllDatasources() {
      const { data } = await apiServices.getAllDataSources();
      return data.results;
    },

    /**
     *
     * @param {value} Chosen indicator ID |
     * Uses @function {getIndicatorFromDexie}
     * from database.worker class to fetch
     * available datasources from dexie
     * @returns array of datasource objects
     */
    async getIndicatorsFromDatasource(value) {
      const datasourceId = value || 1;
      const { data } = await apiServices.getDataSourceIndicators(datasourceId);
      const sourcesAvailable = data.indicators;
      if (sourcesAvailable.length <= 0) {
        return [];
      }
      // const sourceObjects = sourcesAvailable.map((source) => this.dlGetIndicator(source));
      return sourcesAvailable;
    },
    async getLatestDate() {
      const { data } = await apiServices.getLatestDate();
      return data.results[0].updated_at;
    },
    /**
     * @function getNhmisData
     * @author davebenard
     * @description get the data based on th query parameter and return a single object
     * rewrite to standard 'result[result.length - 1]' to get latest month data
     */
    async getNhmisData(query) {
      const { data } = await apiServices.getNHMISDataObj(query);
      return data.results[0];
      // return result[result.length - 1];
    },
    async getDexieTableValues(query) {
      if (query === '') {
        return false;
      }
      const result = await DB.queryTableByName(query);
      return result;
    },
  },
  async mounted() {
    // this.valueType = await this.getDexieTableValues('valuetypes');
  },
};
