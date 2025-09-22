<template>
  <div>
    <ReportBuilderMain @setActiveComponent="setActiveComponent" v-if="activeComponent === 'main'" />
    <ReportBuilderMainLauncher @setActiveComponent="setActiveComponent" v-else />
  <ReportPreviewModal v-if="showingPreview" :items="previewItems" @close="closePreview" />
  </div>
</template>

<script>
import ReportBuilderMain from './ReportBuilderMain.vue';
import ReportBuilderMainLauncher from './ReportBuilderMainLauncher.vue';
import ReportPreviewModal from './ReportPreviewModal.vue';

export default {
  name: 'CustomReportBuilder',
  components: {
    ReportBuilderMain,
    ReportBuilderMainLauncher,
  ReportPreviewModal,
  },
  data() {
    return {
      activeComponent: 'launcher',
      isEnabled: true,
    showingPreview: false,
    previewItems: [],
    };
  },
  created() {
    // listen to plugin bus for external toggles
    const bus = (this.$root && this.$root.$options && this.$root.$options.Vue && this.$root.$options.Vue.prototype && this.$root.$options.Vue.prototype.$pluginBus) || (this.$pluginBus) || (typeof Vue !== 'undefined' && Vue.prototype && Vue.prototype.$pluginBus) || null;
    if (typeof Vue !== 'undefined' && Vue.prototype && Vue.prototype.$pluginBus) {
      Vue.prototype.$pluginBus.$on(`plugin:enable:customReportBuilder`, this.onPluginEnable);
      Vue.prototype.$pluginBus.$on(`plugin:disable:customReportBuilder`, this.onPluginDisable);
      Vue.prototype.$pluginBus.$on('plugin:toggle', ({ plugin, enabled }) => {
        if (plugin === 'customReportBuilder') this.activeComponent = enabled ? 'main' : 'launcher';
      });
    }
  },
  methods: {
    onPluginDisable() {
      this.isEnabled = false;
      this.activeComponent = 'launcher';
    },
    onPluginEnable() {
      this.isEnabled = true;
      this.activeComponent = 'main';
    },
    setActiveComponent(component) {
      this.activeComponent = component;
      // when opening the main builder automatically capture current view
      if (component === 'main') {
        // give the DOM a tick to ensure plugin child is mounted
        this.$nextTick(() => {
          this.autoCaptureCurrentView();
        });
      }
    },

    async autoCaptureCurrentView() {
      try {
        // prefer selected configuration from store (more likely to be current)
        let currentPayload = null;
        try {
          if (this.$store && this.$store.getters && typeof this.$store.getters.getSelectedConfig !== 'undefined') {
            currentPayload = this.$store.getters.getSelectedConfig || null;
          }
        } catch (e) {
          currentPayload = null;
        }
        // fallback to first controlConfig payload
        if (!currentPayload) {
          const controlConfig = (this.$store && this.$store.state && this.$store.state.MSDAT_STORE && this.$store.state.MSDAT_STORE.controlConfig) || null;
          if (controlConfig && controlConfig.length) currentPayload = controlConfig[0].payload || null;
        }

        // find the plugin's main child instance
        const main = this.$children.find((c) => c.$options && c.$options.name === 'ReportBuilderMain');
        if (!main || typeof main.addItemWithContext !== 'function') return;

        // Wait briefly for selected config or controlConfig payload to be populated
        const waitForPayload = async (timeout = 1000, interval = 100) => {
          const start = Date.now();
          while (Date.now() - start < timeout) {
            try {
              const sel = (this.$store && this.$store.getters && typeof this.$store.getters.getSelectedConfig !== 'undefined') ? this.$store.getters.getSelectedConfig : null;
              if (sel && Object.keys(sel).length > 0) return sel;
              const controlConfig = (this.$store && this.$store.state && this.$store.state.MSDAT_STORE && this.$store.state.MSDAT_STORE.controlConfig) || null;
              if (controlConfig && controlConfig.length && controlConfig[0].payload) return controlConfig[0].payload;
            } catch (e) {
              // ignore and retry
            }
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, interval));
          }
          return null;
        };

        const resolvedPayload = currentPayload || (await waitForPayload());

        // add table if we have a meaningful payload
        if (resolvedPayload) {
          // normalize fields to ids where possible and support both datasource/dataSource casing
          const normalize = (v) => {
            if (v === null || v === undefined) return v;
            if (typeof v === 'number' || typeof v === 'string') return v;
            if (typeof v === 'object') {
              if (v.id) return v.id;
              if (v.item) return v.item;
              if (v.datasource) return (typeof v.datasource === 'object' ? (v.datasource.id || v.datasource) : v.datasource);
              if (v.dataSource) return (typeof v.dataSource === 'object' ? (v.dataSource.id || v.dataSource) : v.dataSource);
              return v;
            }
            return v;
          };

          const tableQuery = {
            indicator: normalize(resolvedPayload.indicator),
            datasource: normalize(resolvedPayload.datasource || resolvedPayload.dataSource),
            // keep location object if present (dlQuery supports object locations)
            location: resolvedPayload.location || null,
            year: normalize(resolvedPayload.year || resolvedPayload.period),
          };
          await main.addItemWithContext('table', { query: tableQuery });
        }

        // capture all charts: prefer global Highcharts instances, otherwise snapshot all chart elements
        try {
          if (window.Highcharts && Array.isArray(window.Highcharts.charts)) {
            const charts = window.Highcharts.charts.filter((ch) => ch && ch.series && ch.series.length > 0);
            for (let i = 0; i < charts.length; i += 1) {
              const c = charts[i];
              const chartConfig = { options: c.options || {}, series: (c.series || []).map((s) => s.options || s) };
              // add each chart
              // eslint-disable-next-line no-await-in-loop
              await main.addItemWithContext('chart', { chartConfig });
            }
          } else {
            const els = Array.from(document.querySelectorAll('[data-highcharts-chart], #main-chart'));
            for (let i = 0; i < els.length; i += 1) {
              const el = els[i];
              // eslint-disable-next-line no-await-in-loop
              await main.addItemWithContext('chart', { chartSelector: el });
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('chart capture failed', e);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('autoCaptureCurrentView failed', e);
      }
    },
    async onExport(items) {
      if (this.$customReportBuilderHelper && typeof this.$customReportBuilderHelper.exportToPDF === 'function') {
        await this.$customReportBuilderHelper.exportToPDF(items);
      } else {
        console.warn('Export helper not available');
      }
    },
    onPreview(items) {
      this.previewItems = items;
      this.showingPreview = true;
    },
    closePreview() {
      this.showingPreview = false;
      this.previewItems = [];
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
