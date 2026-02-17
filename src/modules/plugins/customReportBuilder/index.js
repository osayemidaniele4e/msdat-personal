import Vue from 'vue';
import store from '@/store';
import CustomReportBuilder from './components/index.vue';
import ReportBuilderPlugin from './components/ReportBuilderPlugin.vue';

export default {
  // eslint-disable-next-line no-param-reassign
  install(vue) {
    // Create plugin's root Vue instance with the app's Vuex store
    const root = new Vue({
      store,
      render: (createElement) => createElement(CustomReportBuilder),
    });
    vue.component('custom-report-builder', CustomReportBuilder);

    // Mount root Vue instance on new div element added to body
    root.$mount(document.body.appendChild(document.createElement('div')));

    // Make the root instance available in all components
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$customreportbuilder = root;
    // expose plugin helper (export/save/load)
    // create a Vue instance from the plugin helper component
    const helper = new Vue(ReportBuilderPlugin);
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$customReportBuilderHelper = helper;

    // expose programmatic API to add items with context
    // usage: this.$customreportbuilder.addItemWithContext(type, context)
    // context example for chart: { chartSelector: '#myChart' } or { chartConfig: {...} }
    // context example for table: { query: { indicator: ..., location: ... } }
    // root is the mounted Vue instance whose first child is the plugin component
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$customreportbuilder.addItemWithContext = async (type, context = {}) => {
      try {
        const child = root.$children && root.$children[0];
        if (child && typeof child.$children !== 'undefined') {
          // find ReportBuilderMain instance if mounted
          const main = child.$children.find(
            (c) => c.$options && c.$options.name === 'ReportBuilderMain',
          );
          if (main && typeof main.addItemWithContext === 'function') {
            return await main.addItemWithContext(type, context);
          }
          // fallback: if main not found but the child itself has method
          if (child && typeof child.addItemWithContext === 'function') return await child.addItemWithContext(type, context);
        }
        // eslint-disable-next-line no-console
        console.warn('ReportBuilder main not available to accept context');
        return null;
      } catch (e) {
        // swallow errors to avoid breaking host
        // eslint-disable-next-line no-console
        console.error('addItemWithContext error', e);
        return null;
      }
    };

    // Listen for global enable/disable events
    const pluginKey = 'customReportBuilder';
    const bus = Vue.prototype.$pluginBus;
    if (bus) {
      const disable = () => {
        if (root && root.$el) root.$el.style.display = 'none';
        const child = root.$children && root.$children[0];
        if (child && typeof child.onPluginDisable === 'function') child.onPluginDisable();
      };
      const enable = () => {
        if (root && root.$el) root.$el.style.display = '';
        const child = root.$children && root.$children[0];
        if (child && typeof child.onPluginEnable === 'function') child.onPluginEnable();
      };
      bus.$on(`plugin:disable:${pluginKey}`, disable);
      bus.$on(`plugin:enable:${pluginKey}`, enable);
      bus.$on('plugin:toggle', ({ plugin, enabled }) => {
        if (plugin === pluginKey) (enabled ? enable : disable)();
      });
    }
  },
};
