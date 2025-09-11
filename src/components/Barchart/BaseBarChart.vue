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
  resizeObserver: null,
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

        // Debounced refresh of data table only when options change (e.g., indicator change)
        this.$nextTick(() => {
          this.refreshDataTableIfVisibleDebounced();
        });
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
    // Patch Highcharts viewData once to add a Close button after the table renders
    this.patchHighchartsViewDataOnce();

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

  // No redraw hook to avoid repeated rebuilds; we refresh on options change only
  },
  
  beforeDestroy() {
    // Clean up event listeners
    window.removeEventListener('resize', this.handleResize);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  clearTimeout(this._tableRefreshTimer);
  },
  
  methods: {
    removeExistingDataTable(chart) {
      if (!chart) return;
      const parent = chart && chart.renderTo && chart.renderTo.parentNode;
      if (!parent) return;
      // Remove by ID if present
      const byId = document.getElementById(`highcharts-data-table-${chart.index}`);
      if (byId) {
        // Remove associated close button in the same container
        const container = (byId.classList && byId.classList.contains('highcharts-data-table'))
          ? byId
          : byId.parentNode;
        const closeBtn = container && container.querySelector && container.querySelector('.hc-data-close');
        if (closeBtn) closeBtn.remove();

        if (byId.classList && byId.classList.contains('highcharts-data-table')) {
          // ID is on the wrapper div
          byId.remove();
        } else if (
          byId.tagName === 'TABLE' &&
          byId.parentNode &&
          byId.parentNode.classList &&
          byId.parentNode.classList.contains('highcharts-data-table')
        ) {
          // ID on table inside wrapper div
          byId.parentNode.remove();
        } else {
          // Fallback: just remove the element itself
          byId.remove();
        }
      }
      // Remove any stray tables for this chart under parent
      const tables = parent.querySelectorAll('.highcharts-data-table');
      tables.forEach((tbl) => {
        // Only remove the data table wrapper itself
        tbl.remove();
      });
    },
  refreshDataTableIfVisible() {
      const chart = this.$refs.lineCharts && this.$refs.lineCharts.chart;
      if (!chart) return;
      const tableEl = this.getDataTableElement(chart);
      if (tableEl) {
        // Table exists, rebuild it to ensure it reflects latest series
        if (this._tableRefreshing) return;
        this._tableRefreshing = true;
        // Rebuild with a short delay to let chart update settle
        setTimeout(() => {
          try {
      // Ensure previous table is fully removed to prevent stacking
      this.removeExistingDataTable(chart);
      // Make sure Highcharts state is reset before re-creating
      chart.isDataTableVisible = false;
      if (typeof chart.viewData === 'function') chart.viewData();
          } catch (e) {
            // ignore
          } finally {
            this._tableRefreshing = false;
          }
        }, 50);
      }
    },

    refreshDataTableIfVisibleDebounced() {
      clearTimeout(this._tableRefreshTimer);
      this._tableRefreshTimer = setTimeout(() => {
        this.refreshDataTableIfVisible();
      }, 120);
    },

    getDataTableElement(chart) {
      if (!chart) return null;
      // Try by known id first
      const byId = document.getElementById(`highcharts-data-table-${chart.index}`);
      if (byId) return byId;
      // Fallback to searching within chart container parent
      const parent = chart && chart.renderTo && chart.renderTo.parentNode;
      if (!parent) return null;
      return parent.querySelector('.highcharts-data-table');
    },

    patchHighchartsViewDataOnce() {
      if (Highcharts.Chart.prototype._viewDataWithClosePatched) return;
      const originalView = Highcharts.Chart.prototype.viewData;
      const originalHide = Highcharts.Chart.prototype.hideData;
      if (typeof originalView !== 'function') return;

      // eslint-disable-next-line no-param-reassign
      Highcharts.Chart.prototype.viewData = function patchedViewData() {
        const ret = originalView.apply(this, arguments);
        try {
          this.isDataTableVisible = true;
          const table = document.getElementById(`highcharts-data-table-${this.index}`) ||
            (this.renderTo && this.renderTo.parentNode && this.renderTo.parentNode.querySelector('.highcharts-data-table'));
          if (table) {
            const wrapper = table.parentNode;
            if (wrapper) {
              // Keep that table inside the chart window; to avoid covering the control panels; please don't remove.
              wrapper.style.position = 'relative';
              wrapper.style.maxWidth = '100%';
              wrapper.style.maxHeight = '60vh'; // prevent overstretching the window
              wrapper.style.overflowX = 'auto';
              wrapper.style.overflowY = 'auto';
              wrapper.style.zIndex = '10'; 
              wrapper.style.background = '#fff';
              wrapper.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              wrapper.style.borderRadius = '6px';
              wrapper.style.padding = '16px 8px 56px 8px';
              wrapper.style.marginBottom = '8px';
            }
            // Table itself
            table.style.maxWidth = '100%';
            table.style.overflowX = 'auto';
            table.style.display = 'block';
            table.style.zIndex = '11';
            
            if (!wrapper.querySelector('.hc-data-close')) {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = 'hc-data-close';
              btn.textContent = 'Close';
              btn.style.position = 'absolute';
              btn.style.right = '8px';
              btn.style.top = '8px';
              btn.style.padding = '4px 8px';
              btn.style.fontSize = '12px';
              btn.style.border = 'none';
              btn.style.borderRadius = '3px';
              btn.style.background = '#e53935';
              btn.style.color = '#fff';
              btn.style.cursor = 'pointer';
              btn.style.zIndex = '12';
              
              btn.style.marginBottom = '9px';
              btn.addEventListener('click', () => {
                if (typeof this.hideData === 'function') this.hideData();
                this.isDataTableVisible = false;
              });
              wrapper.insertBefore(btn, table);
            }
          }
        } catch (e) {
         
        }
        return ret;
      };
      if (typeof originalHide === 'function') {
        Highcharts.Chart.prototype.hideData = function patchedHideData() {
          const r = originalHide.apply(this, arguments);
          this.isDataTableVisible = false;
          return r;
        };
      }
      // eslint-disable-next-line no-param-reassign
      Highcharts.Chart.prototype._viewDataWithClosePatched = true;
    },

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
