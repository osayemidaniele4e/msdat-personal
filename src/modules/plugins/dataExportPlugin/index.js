import Vue from 'vue';
import DataExportPlugin from './components/index.vue';

export default {
  install(vue) {
    const root = new Vue({
      render: (h) => h(DataExportPlugin),
    });
    vue.component('data-export-plugin', DataExportPlugin);
    root.$mount(document.body.appendChild(document.createElement('div')));
    vue.prototype.$dataexportplugin = root;
  },
};
