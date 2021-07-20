/* eslint-disable no-param-reassign */
// import { uniq, sortBy, groupBy } from 'lodash';
import { uniq, sortBy } from 'lodash';
import { groupIndicator } from './util';

export default {
  data() {
    return {
      defaultIndicator: '',
      defaultDataSource: '',
      defaultLocation: '',
      defaultYear: '',
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
    async setUpControlPanelDropDown() {
      this.defaultIndicatorDropdown = groupIndicator(
        this.dlGetAvailableIndicators(),
        'program_area',
      );
      this.defaultDataSourceDropdown = this.dlGetDashboardDataSource();
      this.defaultLocationDropdown = this.dlGetLocation({ level: 3 });

      // add nigeria to the top of the array
    },
    setDefaults() {
      this.defaultIndicator = this.dlGetIndicator(this.$store.state.MSDAT_STORE.default.indicator);
      this.defaultDataSource = this.dlGetDataSource(
        this.$store.state.MSDAT_STORE.default.datasource,
      );
      this.defaultLocation = this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location);
    },
  },
  async created() {
    this.setDefaults();
    await this.setUpControlPanelDropDown();
    this.cpIsLoading = true;
  },
};
