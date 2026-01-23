import Vue from 'vue';
import HighchartsVue from 'vue-highcharts';
import Highcharts from 'highcharts';

// Import offline exporting modules for client-side export (bypasses export.highcharts.com)
import OfflineExporting from 'highcharts/modules/offline-exporting';
import ExportingModule from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

// Initialize exporting modules
ExportingModule(Highcharts);
OfflineExporting(Highcharts);
ExportData(Highcharts);

// Configure Highcharts to use client-side (offline) exporting by default
Highcharts.setOptions({
  exporting: {
    fallbackToExportServer: false, // Never fall back to export.highcharts.com
  },
});

Vue.use(HighchartsVue);
