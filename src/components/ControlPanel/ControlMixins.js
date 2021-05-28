export default {
  data() {
    return {
      payload: {
        indicator: '',
        location: '',
        datasource: '',
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
  props: {
    indicatorOptions: {
      type: Array,
      default: () => ([]),
    },
    locationOptions: {
      type: Array,
      default: () => ([]),
    },
    dataSourceOptions: {
      type: Array,
      default: () => ([]),
    },
    yearOptions: {
      type: Array,
      default: () => ([]),
    },
    compareOptions: {
      type: Array,
      default: () => ([]),
    },
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
  mounted() {
    // this.$emit('data:options', this.payload);
  },

};
