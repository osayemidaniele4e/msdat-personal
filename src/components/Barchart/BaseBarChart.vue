<template>
  <highcharts :options="options" ref="lineCharts"></highcharts>
</template>

<script>
/**
 * highchart package imports
 */
import Highcharts from 'highcharts';
import loadHighchartsMore from 'highcharts/highcharts-more';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';
import exportData from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';
import noData from 'highcharts/modules/no-data-to-display';
import { genComponent } from 'vue-highcharts';
import { cloneDeep } from 'lodash';
/**
 * The default options
 */
import defaultOptions from './defaultOption';

loadMap(Highcharts);
loadDrilldown(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
noData(Highcharts);
loadHighchartsMore(Highcharts);

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

    title: {
      type: String,
      default: '',
    },
  },

  watch: {
    /**
     * when to chartOptions changes
     * and when the component is rendered
     */
    chartOptions: {
      handler(passedObj) {
        // eslint-disable-next-line prefer-object-spread
        this.options = cloneDeep(Object.assign({}, this.options, passedObj));

        console.log('chartOptions', this.chartOptions);

        this.options.exporting.chartOptions.title.text = this.title;
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    highcharts: genComponent('Highcharts', Highcharts),
  },

  mounted() {
    // changing the title of the text when downloaded
    this.options.exporting.chartOptions.title.text = this.title;
    console.log('chartOptions', this.chartOptions);
  },
};
</script>
