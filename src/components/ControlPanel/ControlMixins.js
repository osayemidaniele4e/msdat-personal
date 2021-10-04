export default {
  data() {
    return {
      payload: {
        indicator: 'indicator 2',
        location: '',
        datasource: 'NHMIS 1',
        year: '',
        compareBy: '',
        visualization: 'state_map',
        target: {
          national: false,
          sdg: false,
        },
        numdenum: false,
      },
    };
  },
  watch: {
    payload: {
      handler(newValue) {
        this.$emit('data:options', newValue);
      },
      immediate: true,
      deep: true,
    },
  },
};
