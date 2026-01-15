export default {
  label: 'Disaggregation',
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
