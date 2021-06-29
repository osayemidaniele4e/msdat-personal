export default {
  data() {
    return {
      payload: {
        indicator: 'indicator 2',
        location: '',
        datasource: 'NHMIS 1',
        year: '',
        visualization: '',
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
      immediate: false,
      deep: true,
    },
  },
};
