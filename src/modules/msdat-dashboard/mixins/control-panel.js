import { uniq, sortBy, groupBy } from 'lodash';

export default {
  data() {
    return {
      cpIsLoading: true,
      availableYears: [],
      defaultIndicator: 5,
      defaultDataSource: 4,
      defaultLocation: 1,
      cpAvailableYears: [],
      cpLocation: [],
    };
  },
  computed: {
    cpIndicators() {
      const indicators = this.dlGetAvailableIndicators();
      return this.groupIndicator(indicators, 'program_area');
    },
    cpDataSources() {
      return this.dlGetDashboardDataSource();
    },
    cpYears() {

    },

  },
  methods: {
  /**
     *
     * @param {array} data  array of data Object
     * filtered for indicators and dataSource
     * @returns {array} an array of available years
     *
     */
    async cpGetAvailableYears() {
      const dataValue = await this.dlQuery({
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
    async cpGetLocation() {
      const dataValue = await this.dlQuery({
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

    /**
     * This return the array of indicators pass in the group and
     * formats to a format compatible for vue-multiselect
     * @param {*} indicators an array of indicator Objects
     * @param {*} by items you wish to group the indicator by
     * @returns
     */
    groupIndicator(indicators, by) {
      const groupedIndicator = groupBy(indicators, by);
      const entries = Object.entries(groupedIndicator);
      const multiSelectFormat = entries.map((item) => ({
        [by]: item[0],
        indicators: item[1],
      }));
      console.log(multiSelectFormat);

      return multiSelectFormat;
    },
  },
  async mounted() {
    this.cpIsLoading = false;
    this.cpAvailableYears = await this.cpGetAvailableYears();
    this.cpLocation = await this.cpGetLocation();
    this.cpIsLoading = true;
  },
};
