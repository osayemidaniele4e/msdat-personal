import Vue from 'vue';
import ContextPlugin from './components/index.vue';

export default {
  install(vue) {
    // Create plugin's root Vue instance
    const root = new Vue({
      // data: { targets: options.data.targets },
      render: (createElement) => createElement(ContextPlugin),
    });
    vue.component('context-plugin', ContextPlugin);

    // Mount root Vue instance on new div element added to body
    root.$mount(document.body.appendChild(document.createElement('div')));

    // Make the root instance available in all components
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$contextplugin = root;

    // Listen for global enable/disable events to toggle UI and tasks
    const pluginKey = 'contextPlugin';
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
      // Also respond to generic toggle payloads
      bus.$on('plugin:toggle', ({ plugin, enabled }) => {
        if (plugin === pluginKey) (enabled ? enable : disable)();
      });
    }
  },
};
