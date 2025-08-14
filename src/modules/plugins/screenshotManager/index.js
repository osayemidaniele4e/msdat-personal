import Vue from 'vue';
import ScreenshotManagerActive from './components/index.vue';

export default {
  install(vue) {
    const root = new Vue({
      render: (createElement) => createElement(ScreenshotManagerActive),
    });
    vue.component('screenshot-manager', ScreenshotManagerActive);
    root.$mount(document.body.appendChild(document.createElement('div')));
    vue.prototype.$screenshotmanager = root;

    const pluginKey = 'screenshotManager';
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
