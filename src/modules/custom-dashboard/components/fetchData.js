import axios from '@/plugins/axios';
import { groupIndicator } from '@/util/helper';

async function indicatorAvailableYears(value) {
  console.log('the value is : ', value);
  // return an array of available years for indicator
  const indicatorId = value.id;
  const yearsAvailable = await axios.get(`/indicators/${indicatorId}/years_available/`);
  return yearsAvailable.data.years;
}

async function datasourceAvailableYears(value) {
  // return an array of available years for datasource
  const datasourceId = value.id;
  const yearsAvailable = await axios.get(`/datasources/${datasourceId}/years_available/`);
  return yearsAvailable.data.years;
}

export default {
  data() {
    return {
      programAreaIndicators: [],
      groupedDataSource: [],
      distinctYears: [],
      sourceAvailableYears: '',
    };
  },
  async mounted() {
    const arrayOfSources = [axios.get('/indicators'), axios.get('/datasources')];
    const result = await Promise.all(arrayOfSources);
    const grouped = groupIndicator(result[0].data, 'program_area');
    // refactor the groupIndicator function  to not only be for indicators
    const groupedDataSource = groupIndicator(result[1].data, 'classification');
    this.programAreaIndicators = grouped;
    this.groupedDataSource = groupedDataSource;
  },

  methods: {
    async setDatasourceAvailableYears(datasource) {
      const storeValue = this.dataSourceSelected;
      const index = storeValue.indexOf(datasource);
      await datasourceAvailableYears(datasource).then((el) => {
        storeValue[index].distinctYears = el;
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setDataSourceSelected', storeValue);
        this.$forceUpdate();
      });
    },

    setIndicatorAvailableYears() {
      // set availableYears key and value to selected indicators objects and commit to store
      // eslint-disable-next-line prefer-const
      let indicators = this.indicatorsSelected;
      indicators.forEach(async (element, index) => {
        console.log(element.id);
        await indicatorAvailableYears(element).then((el) => {
          indicators[index].distinctYears = el;
        });
      });
      this.$store.commit('CUSTOM_DASHBOARD_STORE/setIndicatorSelected', indicators);
      this.getIndicatorsMissingYears();
    },

    async getIndicatorsMissingYears() {
      const selectedIndicators = this.indicatorsSelected;
      // eslint-disable-next-line prefer-const
      let indicatorNames = [];
      // eslint-disable-next-line prefer-const
      let missingIndicatorYears = [];
      const selectedPeriod = this.periodSelected;
      selectedIndicators.forEach((element) => {
        indicatorNames.push(element.short_name);
        const elmts = selectedPeriod.filter((i) => {
          if (element.distinctYears === undefined) {
            return true;
          }
          return element.distinctYears.indexOf(i) < 0;
        });
        missingIndicatorYears.push(elmts);
      });
      this.generateNotes(indicatorNames, missingIndicatorYears);
    },
  },

  watch: {
    // async indicatorsSelected(newValue) {
    //   const years = await Promise.all(newValue.map(indicatorAvailableYears));
    //   const allYears = years.flat(1);
    //   this.distinctYears = [...new Set(allYears)];
    // },
    // dataSourceSelected(newValue) {
    // },
  },
};
