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
    disableAnimation: {
      type: Boolean,
      default: false,
    },
    hasSideControl: {
      type: Boolean,
      default: false,
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
        
        // Apply animation setting based on props
        if (this.disableAnimation || this.hasSideControl) {
          if (this.options.chart) {
            this.options.chart.animation = false;
          }
        }
        
        // Increase spacing for charts with side controls
        if (this.hasSideControl && this.options.chart) {
          this.options.chart.spacingRight = 30;
          this.options.chart.marginRight = 30;
        }
      },
      deep: true,
      immediate: true,
    },
    hasSideControl: {
      handler(newValue) {
        if (newValue && this.options.chart) {
          this.options.chart.animation = false;
          this.options.chart.spacingRight = 30;
          this.options.chart.marginRight = 30;
          
          // Force chart redraw when side control status changes
          this.$nextTick(() => {
            this.forceChartReflow();
          });
        }
      },
      immediate: true
    }
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
    
    // Force immediate chart redraw
    this.forceChartReflow();
    
    // Add window resize listener to handle any size changes
    window.addEventListener('resize', this.handleResize);
    
    // Use a MutationObserver to detect DOM changes that might affect the chart
    this.setupResizeObserver();
  },
  
  beforeDestroy() {
    // Clean up event listeners
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  },
  
  methods: {
    forceChartReflow() {
      if (this.$refs.lineCharts && this.$refs.lineCharts.chart) {
        // For charts with side control, we need to be more aggressive with redraws
        if (this.hasSideControl) {
          // Temporarily disable animations for the reflow
          const originalAnimation = this.$refs.lineCharts.chart.options.chart.animation;
          this.$refs.lineCharts.chart.options.chart.animation = false;
          
          this.$refs.lineCharts.chart.reflow();
          
          // Force an additional reflow after a small delay to ensure rendering
          setTimeout(() => {
            if (this.$refs.lineCharts && this.$refs.lineCharts.chart) {
              this.$refs.lineCharts.chart.reflow();
              this.$refs.lineCharts.chart.redraw(false); // false = without animation
              
              // Restore original animation setting after redraw
              setTimeout(() => {
                if (this.$refs.lineCharts && this.$refs.lineCharts.chart) {
                  this.$refs.lineCharts.chart.options.chart.animation = originalAnimation;
                }
              }, 100);
            }
          }, 50);
        } else {
          // For normal charts, just do a standard reflow
          this.$refs.lineCharts.chart.reflow();
        }
      }
    },
    
    handleResize() {
      this.forceChartReflow();
    },
    
    setupResizeObserver() {
      // Use MutationObserver to watch for DOM changes
      if (window.MutationObserver) {
        const target = this.$el.parentElement;
        if (!target) return;
        
        this.resizeObserver = new MutationObserver(() => {
          this.forceChartReflow();
        });
        
        this.resizeObserver.observe(target, { 
          attributes: true, 
          childList: true, 
          subtree: true 
        });
      }
    }
  },
};
</script>
