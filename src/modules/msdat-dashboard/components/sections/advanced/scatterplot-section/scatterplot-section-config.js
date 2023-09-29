export default {
  label: 'Scatterplot Analysis',
  setup: [
    {
      options: [],
    },
  ],
  payload: {
    indicator: '',
    location: '',
    datasource: '',
    year: '',
    compareBy: '',
    visualization: '',
    target: {
      national: false,
      sdg: false,
    },
    numdenum: false,
  },
};
