export default {
  label: 'GIS Indicator Comparison',
  setup: [
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
