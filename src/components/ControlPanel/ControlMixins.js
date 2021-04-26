export default {
  data() {
    return {
      payload: {
        indicator: '',
        location: '',
        data: '',
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
      default: () => ([
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ]),
    },
    locationOptions: {
      type: Array,
      default: () => ([
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ]),
    },
    dataSourceOptions: {
      type: Array,
      default: () => ([
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ]),
    },
    yearOptions: {
      type: Array,
      default: () => ([
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ]),
    },
    compareOptions: {
      type: Array,
      default: () => ([
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ]),
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
