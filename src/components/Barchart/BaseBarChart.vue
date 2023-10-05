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
    chart: {
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
        // eslint-disable-next-line prefer-object-spread
        this.options = cloneDeep(Object.assign({}, this.options, passedObj));

        this.options.exporting.chartOptions.title.text = this.title;
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    highcharts: genComponent('Highcharts', Highcharts),
  },

  methods: {
    async shareChart() {
      // Get a reference to the Highchart component
      const chartComponent = this.$refs.lineCharts;

      // Wait for the next Vue tick to ensure that the Highchart component is fully rendered
      this.$nextTick(async () => {
        // Generate a screenshot of the chart using vue-html2canvas
        const chartCanvas = await this.$html2canvas(chartComponent.$el, {
          useCORS: true, // Ensure CORS is used for external images
        });

        // Convert the chart canvas to a data URL
        const chartDataURL = chartCanvas.toDataURL('image/png');

        // Create a WhatsApp share link with the chart image
        const whatsappURL = `https://api.whatsapp.com/send?text=Check out this chart!&amp;data=${encodeURIComponent(
          chartDataURL,
        )}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
      });
    },
  },

  mounted() {
    // changing the title of the text when downloaded
    this.options.exporting.chartOptions.title.text = this.title;
  },
};
</script>
