/* eslint-disable no-param-reassign */
// import { uniq, sortBy, groupBy } from 'lodash';
import { sortBy, uniq } from 'lodash';
import { groupIndicator, isDataYearly } from '@/util/helper';

export default {
  data() {
    return {
      defaultIndicator: '',
      defaultDataSource: '',
      defaultLocation: '',
      defaultYear: '2022',
      defaultIndicatorDropdown: [],
      defaultDataSourceDropdown: [],
      defaultLocationDropdown: [],
      defaultYearDropdown: [],
      cpIsLoading: false,
    };
  },
  watch: {
    // The is the updated the control panels dropdown as indicator are gotten from the API
    // in the background (async)
    dlGetAvailableIndicators(newValue) {
      console.log('new indicators', newValue);
      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'indicator',
        payload: groupIndicator(newValue, 'program_area'),
      });
    },
  },
  methods: {
    cpGetAvailableYears(dataValues) {
      const years = dataValues?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return sortBy(uniqueYears);
    },
    setUpControlPanelDropDown() {
      // debugger;
      this.defaultIndicatorDropdown = groupIndicator(this.dlGetAvailableIndicators, 'program_area');

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'indicator',
        payload: this.defaultDataSourceDropdown,
      });
      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'datasource',
        payload: this.defaultDataSourceDropdown,
      });

      this.defaultLocationDropdown = this.dlGetLocation({
        level: 3,
      });

      const location = this.dlGetLocation(1); // get nigerian Location object
      // add nigeria to the top of the array
      this.defaultLocationDropdown.unshift(location);

      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();

      this.$store.commit('MSDAT_STORE/SET_ALL_CONTROL_OPTIONS', {
        key: 'location',
        payload: this.defaultLocationDropdown,
      });
    },
    setDefaults() {
      this.defaultIndicator = this.dlGetIndicator(this.$store.state.MSDAT_STORE.default.indicator);
      this.defaultDataSource = this.dlGetDataSource(
        this.$store.state.MSDAT_STORE.default.datasource,
      );
      this.defaultLocation = this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location);
    },

    async setYearDropdown(
      indicatorID = this.defaultIndicator.id,
      dataSourceID = this.defaultDataSource.id,
      locationID = this.defaultLocation.id,
    ) {
      const data = await this.dlQuery({
        indicator: indicatorID,
        datasource: dataSourceID,
        location: locationID,
      });
      // debugger;
      // console.log(data);
      const onlyYearData = data?.filter((item) => {
        if (isDataYearly(item.period)) {
          return item.period;
        }
        return false;
      });
      const years = onlyYearData?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return uniqueYears.sort((a, b) => b - a);
    },
    // get years by datasource
    async setYearDropdownByDatasource(dataSourceID = this.defaultDataSource.id) {
      const data = await this.queryDBForYearByDs(dataSourceID);
      // debugger;
      const onlyYearData = data?.filter((item) => {
        if (isDataYearly(item.period)) {
          return item.period;
        }
        return false;
      });
      const years = onlyYearData?.map((item) => item.period);
      const uniqueYears = uniq(years);
      return uniqueYears.sort((a, b) => b - a);
    },
    // Get available DataSources
    async setDataSourcesDropdown(indicatorID = this.defaultIndicator.id) {
      const data = await this.getDataSourcesFromDexie(indicatorID);
      return data;
    },
    // Get available Indicator
    async setIndicatorDropdown(datasourceID = this.defaultDataSource.id) {
      const data = await this.getIndicatorFromDexie(datasourceID);
      const formattedData = groupIndicator(data, 'program_area');
      return formattedData;
    },
  },
};
