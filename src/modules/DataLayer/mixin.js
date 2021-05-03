import { createNamespacedHelpers } from 'vuex';
import { filter, matches } from 'lodash';
// import SampleData from './sample_data';
import { MSDAT } from '@/config/dashboardGroups';

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
    return {

    };
  },
  computed: {
    ...mapState({
      dlData: (state) => state.data,
      dlDatasource: (state) => state.datasources,
      dlIndicator: (state) => state.indicators,
      dlLocation: (state) => state.location,
      dlValue_type: (state) => state.valuetypes,
      dlDashboardIndicator: (state) => state.dashboardIndicator,
      dlFactors: (state) => state.factors,
    }),
    // ...mapGetters([
    //   'indicators',
    // ]),
    // dL_getIndicator() {
    //   return this.dlIndicators;
    // },
  },
  methods: {
    dlMapping(arr) {
      const map = arr.map((x) => {
        const newObject = {};
        if (x.datasource !== undefined) {
          newObject.datasource = this.dlDatasource.find((datasrc) => datasrc.id === x.datasource);
        }
        newObject.value = x.value;
        return newObject;
      });
      console.log(map);
    },
    map(arr) {
      console.log(this.dlDatasource);
      console.time('test');
      const map = arr.map((x) => {
        const newObject = {};
        const objectKey = Object.keys(x);
        const notIncludedKeys = ['id', 'period', 'value', 'created_at', 'updated_at'];
        objectKey.forEach((e) => {
          debugger;
          if (!notIncludedKeys.includes(e)) {
            if (x[e] !== undefined) {
              newObject[e] = this[e].find((datasrc) => datasrc.id === x[e]);
            }
          } else {
            newObject[e] = x[e];
          }
        });

        return newObject;
      });
      console.timeEnd('test');
      console.log(map);
    },

    optionsIndicators() {
      return this.dlIndicator.filter((e) => this.dlDashboardIndicator.includes(e.id));
    },

    /**
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    dlQuery(queryObject) {
      return filter(this.dlData, matches(queryObject));
    },

    /**
   * @param {Object} queryObject  The query Object
   * @param {number} queryObject.indicator The id of the indicator
   * @param {number} queryObject.datasource The id of the datasource
   * @returns {dataObjectType}
   */
    dlGetLatestSourceAndIndicatorData(queryObject) {
      debugger;
      const filteredIndicator = this.dlQuery(queryObject);
      if (filteredIndicator.length > 0) {
        const maxValue = filteredIndicator.reduce((prev, current) => (
          (Number(prev.period) > Number(current.period)) ? prev : current));
        if (maxValue) {
          return maxValue;
        }
        return null;
      }
      return null;
    },
    dlGetDashboardDataSource() {
      return MSDAT.dataSources;
    },
    /**
     * @param {number} id The indicator ID
     * @return {indicatorObjectType}
     */
    dlGetIndicatorDataObject(id) {
      return this.dlIndicator.find((item) => item.id === id);
    },
    /**
     * @param {number} id The Factore ID
     * @return {indicatorObjectType}
     */
    dlGetFactor(id) {
      return this.dlFactors.find((item) => item.id === id);
    },
    dlGetDataSource(id) {
      debugger;
      return this.dlDatasource.find((item) => item.id === id);
    },
    dlGetAvailableIndicators() {
      return this.dlDashboardIndicator;
    },
  },
  mounted() {
  },

};
