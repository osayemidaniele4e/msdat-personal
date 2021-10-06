import axios from '@/plugins/axios';
import { groupIndicator } from '@/util/helper';

// function getIndicatorAvailableYears(value, index, array) {
//   const indicator_id = value.id;

// }

export default {
  data() {
    return {
      programAreaNIndicators: [],
      groupedDataSource: [],
    };
  },
  async mounted() {
    const arrayOfSources = [axios.get('/indicators'), axios.get('/datasources')];
    const result = await Promise.all(arrayOfSources);
    // const indicators = result[0].data;
    // indicators.map(getIndicatorAvailableYears);
    const grouped = groupIndicator(result[0].data, 'program_area');
    // refactor the groupIndicator function  to not only be for indicators
    const groupedClassification = groupIndicator(result[1].data, 'classification');
    // console.log(groupedClassification);
    this.programAreaNIndicators = grouped;
    this.groupedDataSource = groupedClassification;
  },

  // computed: {
  // },
};
