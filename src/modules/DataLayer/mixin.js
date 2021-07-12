import { createNamespacedHelpers } from 'vuex';
import {
  filter, has, omit, isMatch, matches,
} from 'lodash';
// import SampleData from './sample_data';
import { MSDAT } from '@/config/dashboardGroups';
import DB from './services/database.worker';

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
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dlDatasource: (state) => state.datasources,
      dlIndicator: (state) => state.indicators,
      dlLocation: (state) => state.location,
      dlValue_type: (state) => state.valuetypes,
      dlDashboardIndicator: (state) => state.availableDashboardIndicator,
      dlFactors: (state) => state.factors,
    }),
  },
  methods: {
    dlGetAvailableIndicators() {
      return this.dlIndicator.filter((e) => this.dlDashboardIndicator.includes(e.id));
    },

    /**
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    async dlQuery(queryObject) {
      if (has(queryObject, 'location.level')) {
        const { location } = queryObject;
        const newQueryObject = omit(queryObject, ['location']);
        const resultValue = await DB.queryDB(newQueryObject);
        return filter(resultValue, (item) => {
          const locationValue = this.dlGetLocation(item.location);
          if (isMatch(locationValue, location)) {
            return item;
          }
          return null;
        });
      }
      const result = await DB.queryDB(queryObject);
      return result;
    },
    dlGetDashboardDataSource() {
      return this.dlDatasource.filter((e) => MSDAT.dataSources.includes(e.id));
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
    dlGetFactor(id) {
      return this.dlFactors.find((item) => item.id === id);
    },
    dlGetDataSource(id) {
      return this.dlDatasource.find((item) => item.id === id);
    },
    dlGetValueTypes(id) {
      console.log(this.dlValue_type);
      return this.dlValue_type.find((item) => item.id === id);
    },
  },
  mounted() {
  },
};
