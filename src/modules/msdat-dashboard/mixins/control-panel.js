import { uniq, sortBy } from 'lodash';

export default {
  data() {
    return {
      availableYears: [],
      defaultIndicator: 5,
      defaultDataSource: 4,
      defaultLocation: 1,
    };
  },
  computed: {
    cpIndicators() {
      return this.dlGetAvailableIndicators();
    },
    cpDataSources() {
      return this.dlGetDashboardDataSource();
    },
    cpYears() {

    },
    /**
     *
     * @param {array} data  array of data Object
     * filtered for indicators and dataSource
     * @returns {array} an array of available years
     *
     */
    cpGetAvailableYears() {
      const dataValue = this.dlQuery({
        datasource: this.defaultIndicator,
        indicator: this.defaultDataSource,
        location: this.defaultLocation,
      });
      const years = dataValue.map((item) => item.period);
      const uniqueYears = uniq(years);
      return sortBy(uniqueYears);
    },

    /**
     *
     * @param {array} data  array of data Object
     * filtered for indicators and dataSource
     * @returns {array} an array of available Location
     *
     */
    cpGetLocation() {
      const dataValue = this.dlQuery({
        datasource: this.defaultIndicator,
        indicator: this.defaultDataSource,
      });
      const location = dataValue.map((item) => item.location);
      const uniqueLocation = sortBy(uniq(location));
      const locationArray = [];
      uniqueLocation.forEach((item) => {
        locationArray.push(this.dlGetLocation(item));
      });
      return locationArray;
    },

  },
  methods: {

  },
};
