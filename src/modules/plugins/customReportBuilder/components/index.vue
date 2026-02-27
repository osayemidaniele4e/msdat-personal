<template>
  <div>
    <ReportBuilderMain @setActiveComponent="setActiveComponent" @preview="onPreview" @export="onExport" v-if="activeComponent === 'main'" />
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
    // eslint-disable-next-line global-require
    const VueLib = require('vue').default || require('vue');
    const pluginBus = (this.$pluginBus) || (VueLib.prototype && VueLib.prototype.$pluginBus) || null;
    if (pluginBus) {
      pluginBus.$on('plugin:enable:customReportBuilder', this.onPluginEnable);
      pluginBus.$on('plugin:disable:customReportBuilder', this.onPluginDisable);
      pluginBus.$on('plugin:toggle', ({ plugin, enabled }) => {
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
      // Auto-capture on open removed to avoid unexpected snapshots; captures must be triggered explicitly
    },

    async autoCaptureCurrentView() {
      try {
        // prefer selected configuration from store (more likely to be current)
        let currentPayload = null;
        try {
          if (this.$store && this.$store.getters) {
            currentPayload = this.$store.getters['MSDAT_STORE/getSelectedConfig'] || this.$store.getters.getSelectedConfig || null;
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
              const sel = (this.$store && this.$store.getters) ? (this.$store.getters['MSDAT_STORE/getSelectedConfig'] || this.$store.getters.getSelectedConfig) : null;
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

        // eslint-disable-next-line no-unused-vars
        const resolvedPayload = currentPayload || (await waitForPayload());

        // Always add a table screenshot first (forceSnapshot)
        {
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

          const tableQuery = currentPayload ? {
            indicator: normalize(currentPayload.indicator),
            datasource: normalize(currentPayload.datasource),
            location: currentPayload.location || null,
            year: normalize(currentPayload.year || currentPayload.period),
          } : {};
          await main.addItemWithContext('table', { query: tableQuery, forceSnapshot: true });
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
    async onExport(exportData) {
      const { items, title, format } = exportData;
      // eslint-disable-next-line no-console
      console.info(`Exporting to ${format.toUpperCase()}:`, { items, title });

      if (format === 'docx') {
        this.exportAsDOCX(items, title);
      } else {
        this.exportAsPDF(items, title);
      }
    },
    exportAsPDF(items, title) {
      try {
        // Create a well-formatted HTML document with consistent styling
        let htmlContent = `
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; padding: 0; }
              h1 { text-align: center; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
              .item { margin: 30px 0; page-break-inside: avoid; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
              .item h3 { color: #555; margin-top: 0; text-align: center; }
              .item img { display: block; margin: 15px auto; max-width: 90%; height: auto; border: 1px solid #ccc; }
              .text-content { text-align: left; font-size: 14px; line-height: 1.6; margin: 15px 0; }
              @media print { 
                body { margin: 20px; }
                .item { break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
        `;

        for (let idx = 0; idx < items.length; idx++) {
          const item = items[idx];
          htmlContent += '<div class="item">';
          htmlContent += `<h3>${item.title}</h3>`;

          if (item.image) {
            htmlContent += `<img src="${item.image}" alt="${item.type} snapshot" />`;
          } else if (item.type === 'text' && item.data && item.data.text) {
            // Handle text items specially
            const styles = item.data.styles || {};
            const textStyle = `
              font-size: ${styles.fontSize || 14}px; 
              font-weight: ${styles.bold ? 'bold' : 'normal'}; 
              color: ${styles.color || '#000'};
            `;
            const formattedText = (item.data.text || '').replace(/\n/g, '<br/>');
            htmlContent += `<div class="text-content" style="${textStyle}">${formattedText}</div>`;
          }

          htmlContent += '</div>';
        }

        htmlContent += `
          </body>
        </html>`;

        // Open in new window for print/save as PDF
        const newWindow = window.open('', '_blank');
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        newWindow.document.title = title;
        newWindow.focus();

        // Auto-trigger print dialog
        setTimeout(() => {
          newWindow.print();
        }, 1000);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('PDF Export failed:', e);
        // eslint-disable-next-line no-alert
        alert('PDF Export failed. Please try again.');
      }
    },
    exportAsDOCX(items, title) {
      try {
        // Create an editable HTML document that can be saved as DOCX
        let htmlContent = `
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              h1 { text-align: center; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 30px; }
              .item { margin: 30px 0; padding: 20px; border: 1px solid #ddd; }
              .item h3 { color: #555; margin-top: 0; margin-bottom: 15px; }
              .item img { display: block; margin: 15px auto; max-width: 90%; height: auto; }
              .text-content { font-size: 14px; line-height: 1.6; margin: 15px 0; }
              .editable { border: 1px dashed #ccc; padding: 10px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <h1 contenteditable="true" class="editable">${title}</h1>
        `;

        for (let idx = 0; idx < items.length; idx++) {
          const item = items[idx];
          htmlContent += '<div class="item">';
          htmlContent += `<h3 contenteditable="true" class="editable">${item.title}</h3>`;

          if (item.image) {
            htmlContent += `<img src="${item.image}" alt="${item.type} snapshot" />`;
            htmlContent += '<div contenteditable="true" class="editable">Add your commentary here...</div>';
          } else if (item.type === 'text' && item.data && item.data.text) {
            const styles = item.data.styles || {};
            const textStyle = `
              font-size: ${styles.fontSize || 14}px; 
              font-weight: ${styles.bold ? 'bold' : 'normal'}; 
              color: ${styles.color || '#000'};
            `;
            const formattedText = (item.data.text || '').replace(/\n/g, '<br/>');
            htmlContent += `<div contenteditable="true" class="editable text-content" style="${textStyle}">${formattedText}</div>`;
          }

          htmlContent += '</div>';
        }

        htmlContent += `
            <p><small><i>This document is editable. Click on any dashed border area to edit content. Save this page as a complete HTML file, then open in Microsoft Word to convert to DOCX format.</i></small></p>
          </body>
        </html>`;

        // Create a downloadable HTML file
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Also open in new window for immediate editing
        const newWindow = window.open('', '_blank');
        newWindow.document.write(htmlContent);
        newWindow.document.close();
        newWindow.document.title = title;
        newWindow.focus();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('DOCX Export failed:', e);
        // eslint-disable-next-line no-alert
        alert('DOCX Export failed. Please try again.');
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
