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
      const indicator = groupIndicator(this.dlGetAvailableIndicators(), 'program_area');
      const datasource = this.dlGetDashboardDataSource();
      const location = this.dlGetLocation({ level: 3 });
      // add nigeria to the top of the array
      location.unshift(this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location));

      const dataValue = await this.dlQuery({
        datasource: this.defaultDataSource.id,
        indicator: this.defaultIndicator.id,
        location: this.defaultLocation.id,
      });
      const years = this.cpGetAvailableYears(dataValue);
      if (years.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.defaultYear = years[0];
      }

      this.$store.state.MSDAT_STORE.controlConfig.forEach((item, panelIndex) => {
        item.setup.forEach((controlItem, controlIndex) => {
          if ((controlItem.key === 'indicator')) {
            this.$store.commit('MSDAT_STORE/SETUP_CONTROL_OPTIONS', {
              panelIndex,
              controlIndex,
              values: indicator,
            });
          }
          if ((controlItem.key === 'datasource')) {
            this.$store.commit('MSDAT_STORE/SETUP_CONTROL_OPTIONS', {
              panelIndex,
              controlIndex,
              values: datasource,
            });
          }
          if ((controlItem.key === 'location')) {
            this.$store.commit('MSDAT_STORE/SETUP_CONTROL_OPTIONS', {
              panelIndex,
              controlIndex,
              values: location,
            });
          }
          if ((controlItem.key === 'year')) {
            this.$store.commit('MSDAT_STORE/SETUP_CONTROL_OPTIONS', {
              panelIndex,
              controlIndex,
              values: years,
            });
          }
        });
      });
    },
  },
  async  created() {
    this.cpIsLoading = false;
    this.defaultIndicator = this.dlGetIndicator(this.$store.state.MSDAT_STORE.default.indicator);
    this.defaultDataSource = this.dlGetDataSource(this.$store.state.MSDAT_STORE.default.datasource);
    this.defaultLocation = this.dlGetLocation(this.$store.state.MSDAT_STORE.default.location);
    await this.setUpControlPanelDropDown();
    this.cpIsLoading = true;
  },
};
