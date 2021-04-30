export default {

  methods: {
    tableComponentDataFormatter(indicatorObject, dataObjectArray) {
      const data = {};
      data.indicator = indicatorObject;
      data.values = [];
      dataObjectArray.forEach((e) => {
        if (e) {
          const datasource = this.dlGetDataSource(e.datasource);
          const factor = this.dlGetFactor(indicatorObject.factor);
          data.values.push({
            dataSources: datasource.datasource,
            value: e.value,
            factor: factor.display_factor,
            year: e.period,
            classification: datasource.classification,
          });
        }
      });
      return data;
    },
  },

};
