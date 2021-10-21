import axios from '@/plugins/axios';
import { groupIndicator } from '@/util/helper';

// async function indicatorAvailableYears(value) {
//   const indicatorId = value.id;
//   const yearsAvailable = await axios.get(`/indicators/${indicatorId}/years_available/`);
//   return yearsAvailable.data.years;
// }

async function datasourceAvailableYears(value) {
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
    async availableYears(datasource) {
      const storeValue = this.dataSourceSelected;
      const index = storeValue.indexOf(datasource);
      await datasourceAvailableYears(datasource).then((el) => {
        storeValue[index].distinctYears = el;
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setDataSourceSelected', storeValue);
        this.$forceUpdate();
      });
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
