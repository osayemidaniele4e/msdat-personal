<!-- eslint-disable camelcase -->
<!-- eslint-disable camelcase -->
/* eslint-disable camelcase */
<template>
  <div>
  <Highmaps :options="defaultOptions" ref="mapChart" />

  </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import exportData from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';
import noData from 'highcharts/modules/no-data-to-display';
import loadDrilldown from 'highcharts/modules/drilldown';
import offlineExporting from 'highcharts/modules/offline-exporting';
import { genComponent } from 'vue-highcharts';

// default map
import NigerianMap from './ng-all.geo.json';

// default map options
import defaultOptions from './defaultOptions';

// map data
import regionsMap from './mapData/regions';

import {
  // eslint-disable-next-line camelcase
  AkwaIbom as Akwa_Ibom,
  Bayelsa,
  // eslint-disable-next-line camelcase
  CrossRiver as Cross_River,
  Rivers,
  Delta,
  Edo,
} from './mapData/south-south';

import {
  Abia, Ebonyi, Imo, Enugu, Anambra,
} from './mapData/south-east';

import {
  Ondo, Ogun, Osun, Lagos, Ekiti, Oyo,
} from './mapData/south-west';

import {
  Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe,
} from './mapData/north-east';

import {
  Jigawa, Kano, Katsina, Kebbi, Sokoto, Kaduna, Zamfara,
} from './mapData/north-west';

import {
  Nasarawa, Niger, Plateau, Kwara, Kogi, Benue, Fct as FCT,
} from './mapData/north-central';

// load map
loadMap(Highcharts);
exporting(Highcharts);
offlineExporting(Highcharts);
exportData(Highcharts);
noData(Highcharts);
loadDrilldown(Highcharts);

export default {
  name: 'BaseMap',
  components: {
    Highmaps: genComponent('Highmaps', Highcharts),
  },
  props: {
    mapObject: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
    lgaState: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      defaultOptions: { ...defaultOptions },
      lgaMapData: {
        Jigawa,
        Kano,
        Katsina,
        Kebbi,
        Sokoto,
        Kaduna,
        Zamfara,
        Nasarawa,
        Niger,
        Plateau,
        Kwara,
        Kogi,
        Benue,
        FCT,
        Abia,
        Ebonyi,
        Imo,
        Enugu,
        Anambra,
        Ondo,
        Ogun,
        Osun,
        Lagos,
        Ekiti,
        Oyo,
        Akwa_Ibom,
        Bayelsa,
        Cross_River,
        Rivers,
        Delta,
        Edo,
        Adamawa,
        Bauchi,
        Borno,
        Gombe,
        Taraba,
        Yobe,
      },
      _tableRefreshTimer: null,
    };
  },
  methods: {
    getLoadEvent() {
      return function() {
        // Watermark Image - Top Left
        this.renderer
          .image('https://i.imgur.com/yyqklZM.png', 150, 62, 230, 53)
          .attr({
            zIndex: 1000,
            x: '2%', // Top Left
            y: '2%', // Top Left
            width: '116',
            height: '25',
          })
          .add();

        // Source Text - Top Left under image
        const chartWidth = this.chartWidth;
        const chartHeight = this.chartHeight;
        
        const x = (chartWidth / 100) * 2; 
        const y = (chartHeight / 100) * 7;

        this.renderer
          .text('Source: MSDAT', x, y)
          .css({
            color: 'rgba(0, 0, 0, 0.5)',
            fontSize: '12px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
            textAlign: 'left',
          })
          .add();
      };
    },
    // Remove a leading "Distribution of" (case-insensitive) from titles
    sanitizedExportTitle(title) {
      if (!title || typeof title !== 'string') return title;
      return title.replace(/^\s*distribution\s+of\s+/i, '').trim();
    },
    getChart() {
      return this.$refs.mapChart && this.$refs.mapChart.chart;
    },

    getDataTableElement(chart) {
      if (!chart) return null;
      const byId = document.getElementById(`highcharts-data-table-${chart.index}`);
      if (byId) return byId;
      const parent = chart && chart.renderTo && chart.renderTo.parentNode;
      if (!parent) return null;
      return parent.querySelector('.highcharts-data-table');
    },

    removeExistingDataTable(chart) {
      if (!chart) return;
      const parent = chart && chart.renderTo && chart.renderTo.parentNode;
      if (!parent) return;
      const byId = document.getElementById(`highcharts-data-table-${chart.index}`);
      if (byId) {
        const container = (byId.classList && byId.classList.contains('highcharts-data-table'))
          ? byId
          : byId.parentNode;
        const closeBtn = container && container.querySelector && container.querySelector('.hc-data-close');
        if (closeBtn) closeBtn.remove();
        if (byId.classList && byId.classList.contains('highcharts-data-table')) {
          byId.remove();
        } else if (
          byId.tagName === 'TABLE' &&
          byId.parentNode &&
          byId.parentNode.classList &&
          byId.parentNode.classList.contains('highcharts-data-table')
        ) {
          byId.parentNode.remove();
        } else {
          byId.remove();
        }
      }
      const tables = parent.querySelectorAll('.highcharts-data-table');
      tables.forEach((tbl) => tbl.remove());
    },

    refreshDataTableIfVisible() {
      const chart = this.getChart();
      if (!chart) return;
      const tableEl = this.getDataTableElement(chart);
      if (tableEl) {
        if (this._tableRefreshing) return;
        this._tableRefreshing = true;
        setTimeout(() => {
          try {
            this.removeExistingDataTable(chart);
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

    patchHighchartsViewDataOnce() {
      if (Highcharts.Chart.prototype._viewDataWithClosePatched) return;
      const originalView = Highcharts.Chart.prototype.viewData;
      const originalHide = Highcharts.Chart.prototype.hideData;
      if (typeof originalView !== 'function') return;

      Highcharts.Chart.prototype.viewData = function patchedViewData() {
        const ret = originalView.apply(this, arguments);
        try {
          this.isDataTableVisible = true;
          const table = document.getElementById(`highcharts-data-table-${this.index}`) ||
            (this.renderTo && this.renderTo.parentNode && this.renderTo.parentNode.querySelector('.highcharts-data-table'));
          if (table && !table.parentNode.querySelector('.hc-data-close')) {
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
            btn.style.zIndex = '10';
            const wrapper = table.parentNode;
            if (wrapper && getComputedStyle(wrapper).position === 'static') {
              wrapper.style.position = 'relative';
            }
            btn.addEventListener('click', () => {
              if (typeof this.hideData === 'function') this.hideData();
              this.isDataTableVisible = false;
            });
            wrapper.insertBefore(btn, table);
          }
        } catch (e) {
          // ignore
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
      Highcharts.Chart.prototype._viewDataWithClosePatched = true;
    },

    plotMapLevel(level) {
      // check space is in string and add underscore
      let lgaState = '';
      if (this.lgaState) {
        lgaState = this.lgaState.replace(/\s/g, '_');
      }

      switch (level) {
        case 1:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        case 2:
          this.defaultOptions.plotOptions.map.mapData = regionsMap;
          break;
        case 3:
          this.defaultOptions.plotOptions.map.mapData = this.lgaMapData[lgaState].data;
          break;
        case 4:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        default:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
      }
      this.defaultOptions = { ...this.defaultOptions };
      this.$nextTick(() => this.refreshDataTableIfVisibleDebounced());
    },

    handleFullscreenChange() {
      setTimeout(() => {
        if (!document.fullscreenElement) {
          // Exited fullscreen, reset chart size to auto
          const chart = this.getChart();
          if (chart) {
            chart.setSize(null, null, false);
          }
        }
      }, 100);
    },
  },
  watch: {
    mapObject: {
      handler(newVal) {
        this.defaultOptions = Object.assign(this.defaultOptions, newVal);
        this.$nextTick(() => this.refreshDataTableIfVisibleDebounced());
      },
      immediate: true,
      deep: true,
    },
    level(newVal) {
      this.plotMapLevel(newVal);
    },
    lgaState() {
      this.plotMapLevel(this.level);
    },
  },
  created() {
    this.plotMapLevel(this.level);
  },

  mounted() {
    // Patch Highcharts viewData once to add red Close button & state sync
    this.patchHighchartsViewDataOnce();
    // changing the title of the text when downloaded
    if (this.defaultOptions.exporting && this.defaultOptions.exporting.chartOptions) {
      // Ensure exported title doesn't include leading "Distribution of"
      this.defaultOptions.exporting.chartOptions.title.text = this.sanitizedExportTitle(this.title);

      // Add load event for watermark
      if (!this.defaultOptions.exporting.chartOptions.chart) {
        this.defaultOptions.exporting.chartOptions.chart = {};
      }
      if (!this.defaultOptions.exporting.chartOptions.chart.events) {
        this.defaultOptions.exporting.chartOptions.chart.events = {};
      }
      this.defaultOptions.exporting.chartOptions.chart.events.load = this.getLoadEvent();
    }
    // keep exported title in sync when prop changes
    this.$watch(
      'title',
      (newTitle) => {
        if (this.defaultOptions.exporting && this.defaultOptions.exporting.chartOptions) {
          this.defaultOptions.exporting.chartOptions.title.text = this.sanitizedExportTitle(newTitle);
        }
      },
      { immediate: false }
    );
    // Add fullscreen change listener
    window.addEventListener('fullscreenchange', this.handleFullscreenChange);
  },
  beforeDestroy() {
    clearTimeout(this._tableRefreshTimer);
    window.removeEventListener('fullscreenchange', this.handleFullscreenChange);
  },
};
</script>
