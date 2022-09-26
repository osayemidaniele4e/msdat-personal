import { createNamespacedHelpers } from 'vuex';
import {
  filter, omit, matches, isObject, has,
} from 'lodash';
import axios from '@/plugins/axios';
import formatter from '../msdat-dashboard/mixins/formatter';
// import SampleData from './sample_data';
// import { MSDAT } from '@/config/dashboardGroups';

import DB from './services/database.worker';
import apiServices from './services/ApiServices';

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
      hardCordedValueType: [
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
      dlFactors: (state) => state.factors,
    }),

    dlGetAvailableIndicators() {
      return this.dlIndicator.filter((e) => this.dlDashboardIndicator.includes(e.id));
    },
  },
  methods: {
    /**
     * @param {{[indicator]: number, [datasource]: number}} queryObject query objects properties
     * @returns {dataObjectType}
     */
    async dlQuery(queryObject) {
      // i could do this in individual component when making request with the
      // function by after this it will after all at once
      const query = queryObject;
      if (query.datasource === 25) {
        query.value_type = 1;
      } else if (!has(query, 'value_type')) {
        const datasource = this.dlGetDataSource(query.datasource);
        // const valuetype = this.dlGetValueTypes({ value_type: datasource.classification });
        const valuetype = this.hardCordedValueType?.filter(
          (item) => item.value_type === datasource?.classification,
        );
        query.value_type = valuetype[0]?.id;
      }

      if (isObject(query.location)) {
        const { location } = query;
        const newQueryObject = omit(query, ['location']);
        const locationValues = this.dlGetLocation(location);
        const locationID = locationValues.map((item) => item.id);
        const resultValue = await DB.queryDB(newQueryObject, locationID);
        // console.log('yeye', newQueryObject);
        return resultValue;
      }

      const result = await DB.queryDB(query);
      const dataResult = result.map((element) => {
        const temp = {};
        temp.id = element.id;
        temp.period = element.period;
        // temp.value = this.singlePointDecimalValue(element.value);
        temp.value = element.value;
        temp.created_at = element.created_at;
        temp.updated_at = element.updated_at;
        temp.indicator = element.indicator;
        temp.location = element.location;
        temp.datasource = element.datasource;
        temp.value_type = element.value_type;
        return temp;
      });
      return dataResult;
    },

    dlGetDashboardDataSource() {
      return this.dlDatasource.filter((e) => this.dlDashboardDataSource.includes(e.id));
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
      if (typeof (values) === 'object') {
        return filter(this.dlLocation, matches(values));
      }
      // console.log(this.dlLocation.find((item) => item.id === values), 'lalala')
      return this.dlLocation.find((item) => item.id === values);
    },
    dlGetByName(values) {
      console.log(this.dlLocation.find((item) => item.name === values), 'lalala');
      return this.dlLocation.find((item) => item.name === values);
    },
    dlGetFactor(id) {
      return this.dlFactors.find((item) => item.id === id);
    },
    dlGetDataSource(id) {
      return this.dlDatasource.find((item) => item.id === id);
    },
    dlGetValueTypes(values) {
      // console.log(this.dlValue_type);
      if (typeof values === 'object') {
        // return filter(this.dlValue_type, matches(values));
        return filter(this.hardCordedValueType, matches(values));
      }
      return this.hardCordedValueType.find((item) => item.id === values);
    },
    dlGetDataSourceSpecificIndicator(values) {
      if (typeof values === 'object') {
        return filter(this.dlDataSourceSpecificIndicator, matches(values));
      }
      return this.dlDataSourceSpecificIndicator.find((item) => item.id === values);
    },
    // New Feature
    // function to get data_sources based on indicator
    async getDataSourceByIndicator(value) {
      const indicatorId = value || 1;
      const dataSourceAvailable = await axios.get(`/indicators/${indicatorId}/datasources/`);
      return dataSourceAvailable.data.datasources?.filter((e) => e.id !== 33);
    },
    //  function to get indicators based on data_source
    async getIndicatorByDataSource(value) {
      const dataSourceId = value || 1;
      const indicatorAvailable = await axios.get(`/datasources/${dataSourceId}/indicators/`);
      return indicatorAvailable.data.indicators;
    },
    // Function to store the latest database date
    // !! Seems Redundant
    async getLatestDate() {
      const { data } = await apiServices.getLatestDate();
      return data.date;
    },
  },
  mounted() {
    // const data = await this.dlQuery({ datasource: 6, indicator: 7, period: '2020' });
    // console.log(data);
    // console.trace(this.dlGetLocation({ level: 3 }));
  },
};
