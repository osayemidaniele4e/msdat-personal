/* eslint-disable no-param-reassign */
// import { uniq, sortBy, groupBy } from 'lodash';
import { uniq, sortBy } from 'lodash';
import { isDataYearly } from '../../../util/helper';
import { groupIndicator } from './util';

export default {
  data() {
    return {
      defaultIndicator: '',
      defaultDataSource: '',
      defaultLocation: '',
      defaultYear: '2015',
      defaultIndicatorDropdown: [],
      defaultDataSourceDropdown: [],
      defaultLocationDropdown: [],
      defaultYearDropdown: [],
      cpIsLoading: false,
    };
  },
  methods: {
    cpGetAvailableYears(dataValues) {
      const years = dataValues.map((item) => item.period);
      const uniqueYears = uniq(years);
      return sortBy(uniqueYears);
    },
    setUpControlPanelDropDown() {
      this.defaultIndicatorDropdown = groupIndicator(
        this.dlGetAvailableIndicators(),
        'program_area',
      );
      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();
      this.defaultLocationDropdown = this.dlGetLocation({
        level: 3,
      });
      const location = this.dlGetLocation(1); // get nigerian Location object
      // add nigeria to the top of the array
      this.defaultLocationDropdown.unshift(location);
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
      console.log(data);
      const onlyYearData = data.filter((item) => {
        if (isDataYearly(item.period)) {
          return item.period;
        }
        return false;
      });
      const years = onlyYearData.map((item) => item.period);
      const unqiueYears = uniq(years);
      const sortedYears = unqiueYears.sort((a, b) => b - a);
      // debugger;
      this.defaultYearDropdown = sortedYears;
      return sortedYears;
      // console.log(sortedYears);
    },
  },
  async created() {
    this.setDefaults();
    this.setUpControlPanelDropDown();
    // await this.setYearDropdown();
    this.cpIsLoading = true;
  },
};
