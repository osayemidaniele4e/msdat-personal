import { createNamespacedHelpers } from 'vuex';
import { filter, omit, matches, isObject } from 'lodash';
import formatter from '../msdat-dashboard/mixins/formatter';
// import SampleData from './sample_data';
// import { MSDAT } from '@/config/dashboardGroups';

// import DB from './services/database.worker';
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
        {
          id: 8,
          value_type: 'Report',
          created_at: '2025-10-17T03:33:55.266612Z',
          updated_at: '2025-10-17T03:33:55.266625Z',
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
      // const result = await DB.queryDBForNumDenum(query);
      const data = await this.dlQuery(query);
      const results = data.filter((item) => item.value_type === 6 || item.value_type === 7);
      return results;
    },
    /**
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    // eslint-disable-next-line consistent-return
    async dlQuery(queryObject) {
      const query = queryObject;

      const datasource = await this.dlGetDataSource(query.datasource);

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
        // using API
        const { location } = query;
        const baseQuery = omit(query, ['location']);
        const locationValues = this.dlGetLocation(location);

        console.log(locationValues, '@@<HHH>@@');

        const locationID = locationValues.map((item) => item.id);
        // Map each location ID to an API call
        const apiCalls = locationID.map(async (locationSID) => {
          const queryObjectWithLocation = {
            ...baseQuery,
            location: locationSID,
          };

          // Replace this with your actual API call function
          return apiServices.getDashboardData(store.state.configObject.id, queryObjectWithLocation); // 👈 async function
        });

        const allResponses = await Promise.all(apiCalls);

        // Extract and flatten only the "results" from each API response
        const allResults = allResponses.flatMap((response) => response.data.results);

        return allResults;
      }

      if (!isObject(query.location) && hasUndefinedOrNullValues(query) === false) {
        const temp = await apiServices.getDashboardData(store.state.configObject.id, query);
        const result = temp.data.results;
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
      // console.log('API Response:', data.datasources);
      // Use the datasources directly from the API response
      const sourcesAvailable = data.datasources;

      if (sourcesAvailable.length <= 0) {
        return [];
      }
      // console.log('Sources before sorting:', sourcesAvailable);
      const sorted = sourcesAvailable.sort((a, b) => {
        const nameA = a.datasource || '';
        const nameB = b.datasource || '';
        return nameA.localeCompare(nameB);
      });
      // console.log('Sources after sorting:', sorted);
      return sorted;
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
  },
};
