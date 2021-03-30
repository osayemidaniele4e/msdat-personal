import { createNamespacedHelpers } from 'vuex';
// import SampleData from './sample_data';

const { mapState } = createNamespacedHelpers('DL');

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      data: (state) => state.data,
      datasource: (state) => state.datasources,
      indicator: (state) => state.indicators,
      location: (state) => state.location,
      value_type: (state) => state.valuetypes,
      dashboardIndicator: (state) => state.dashboardIndicator,
    }),
    // ...mapGetters([
    //   'indicators',
    // ]),
    // dL_getIndicator() {
    //   return this.indicators;
    // },
  },
  methods: {
    dlMapping(arr) {
      const map = arr.map((x) => {
        const newObject = {};
        if (x.datasource !== undefined) {
          newObject.datasource = this.datasource.find((datasrc) => datasrc.id === x.datasource);
        }
        newObject.value = x.value;
        return newObject;
      });
      console.log(map);
    },
    map(arr) {
      console.log(this.datasource);
      console.time('test');
      const map = arr.map((x) => {
        const newObject = {};
        const objectKey = Object.keys(x);
        const notIncludedKeys = ['id', 'period', 'value', 'created_at', 'updated_at'];
        objectKey.forEach((e) => {
          debugger;
          if (!notIncludedKeys.includes(e)) {
            if (x[e] !== undefined) {
              newObject[e] = this[e].find((datasrc) => datasrc.id === x[e]);
            }
          } else {
            newObject[e] = x[e];
          }
        });

        return newObject;
      });
      console.timeEnd('test');
      console.log(map);
    },
    optionsIndicators() {
      // debugger;
      return this.indicator.filter((e) => this.dashboardIndicator.includes(e.id));
    },
  },
  mounted() {
    // const a = this.map(SampleData);
    // console.log(this.optionsIndicators());
  },

};
