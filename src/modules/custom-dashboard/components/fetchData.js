import axios from '@/plugins/axios';
import { groupIndicator } from '@/util/helper';

async function indicatorAvailableYears(value) {
  const indicatorId = value.id;
  const yearsAvailable = await axios.get(`/indicators/${indicatorId}/years_available`);
  return yearsAvailable.data.years;
}

export default {
  data() {
    return {
      programAreaNIndicators: [],
      groupedDataSource: [],
      distinctYears: [],
    };
  },
  async mounted() {
    const arrayOfSources = [axios.get('/indicators'), axios.get('/datasources')];
    const result = await Promise.all(arrayOfSources);
    const grouped = groupIndicator(result[0].data, 'program_area');
    // refactor the groupIndicator function  to not only be for indicators
    const groupedDataSource = groupIndicator(result[1].data, 'classification');
    this.programAreaNIndicators = grouped;
    this.groupedDataSource = groupedDataSource;
  },

  watch: {
    async indicatorsSelected(newValue) {
      const years = await Promise.all(newValue.map(indicatorAvailableYears));
      const allYears = years.flat(1);
      this.distinctYears = [...new Set(allYears)];
      console.log(this.distinctYears);
    },
  },
};
