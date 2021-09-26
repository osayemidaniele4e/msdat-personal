<template>
  <highcharts :options="options" ref="lineCharts"></highcharts>
</template>

<script>
/**
 * highchart package imports
 */
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';
import exportData from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';
import noData from 'highcharts/modules/no-data-to-display';
import { genComponent } from 'vue-highcharts';
/**
 * The default options
 */
import defaultOptions from './defaultOption';

loadMap(Highcharts);
loadDrilldown(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
noData(Highcharts);

export default {
  data() {
    return {
      /**
       * so we have a copy of the default option
       * This sets a copy of the default option
       */
      options: { ...defaultOptions },
    };
  },
  props: {
    /**
     * This prop of the chart Options
     * is what to use to passHighChart options to the component
     *
     */
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    /**
     * when to chartOptions changes
     * and when the component is rendered
     */
    chartOptions: {
      handler(passedObj) {
        this.options = Object.assign(this.options, passedObj);
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    highcharts: genComponent('Highcharts', Highcharts),
  },
};
</script>
