<template>
  <div>
    <highcharts :options="options" ref="lineCharts"></highcharts>
  </div>
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
      options: { ...defaultOptions },
    };
  },
  props: {
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    chart: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    chartOptions: {
      handler(passedObj) {
        this.options = cloneDeep({ ...this.options, ...passedObj });
        // Update the exporting title without modifying the default options
        if (this.options.exporting && this.options.exporting.chartOptions) {
          this.options.exporting.chartOptions.title = {
            text: this.title,
          };
        }
        console.log('title was set');
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    highcharts: genComponent('Highcharts', Highcharts),
  },
  mounted() {
    if (this.title) {
      // Set the title in the exporting object if a custom title is provided
      if (this.options.exporting && this.options.exporting.chartOptions) {
        this.options.exporting.chartOptions.title = {
          text: this.title,
        };
      }
    }
  },
};
</script>
