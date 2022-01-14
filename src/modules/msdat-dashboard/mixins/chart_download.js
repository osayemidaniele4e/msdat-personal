export default {
  methods: {
    /* PLEASE REMEMBER TO SET THE REF TO "BaseChart" AND ON THE BASE
    CHART COMPONENT IN YOUR  DIFFERENT CHILD COMPONENT
    */

    /*
      @param {string} b.indicator
      @param {string} b.datasource
      @param {string} b.year
     */
    downLoadType(e, b = {}) {
      let filename = '';
      if (b.indicator) {
        filename = `${b.indicator}_${b.datasource}_${b.year}`;
      } else {
        filename = 'Chart';
      }
      switch (e.type) {
        case 'svg':
          this.$refs.BaseChart.$children[0].chart.downloadSVG();
          break;
        case 'png':
          this.$refs.BaseChart.$children[0].chart.exportChart({
            type: 'image/png',
            filename,
          });
          break;
        case 'jpeg':
          this.$refs.BaseChart.$children[0].chart.exportChart({
            type: 'image/jpeg',
            filename,
          });
          break;
        case 'pdf':
          this.$refs.BaseChart.$children[0].chart.exportChart({
            type: 'application/pdf',
            filename,
          });
          break;
        case 'csv':
          this.$refs.BaseChart.$children[0].chart.exportChart({
            type: 'application/csv',
            filename,
          });
          break;
        case 'xls':
          this.$refs.BaseChart.$children[0].chart.downloadXLS();
          break;
        default:
          this.$refs.BaseChart.$children[0].chart.exportChart();
          break;
      }
      // console.trace(e);
      // console.log(this.$refs.BaseC.$children[0]);
      // console.log(this.$refs.BaseC.$children[0].chart.downloadCSV());
    },

    downLoadTypeMap(e, b = {}) {
      let filename = '';
      if (b.indicator) {
        filename = `${b.indicator}_${b.datasource}_${b.year}`;
      } else {
        filename = 'Chart';
      }
      switch (e.type) {
        case 'svg':
          this.$refs.BaseMap.$children[0].chart.downloadSVG();
          break;
        case 'png':
          this.$refs.BaseMap.$children[0].chart.exportChart({
            type: 'image/png',
            filename,
          });
          break;
        case 'jpeg':
          this.$refs.BaseMap.$children[0].chart.exportChart({
            type: 'image/jpeg',
            filename,
          });
          break;
        case 'pdf':
          this.$refs.BaseMap.$children[0].chart.exportChart({
            type: 'application/pdf',
            filename,
          });
          break;
        case 'csv':
          this.$refs.BaseMap.$children[0].chart.exportChart({
            type: 'application/csv',
            filename,
          });
          break;
        case 'xls':
          this.$refs.BaseMap.$children[0].chart.downloadXLS();
          break;
        default:
          this.$refs.BaseMap.$children[0].chart.exportChart();
          break;
      }
    },
  },
};
