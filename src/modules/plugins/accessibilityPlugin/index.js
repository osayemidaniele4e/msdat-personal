import Vue from 'vue';
import AccessibilityActive from './components/index.vue';

export default {
  install(vue) {
    // Add ARIA live region for announcements
    if (!document.getElementById('aria-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.margin = '-1px';
      liveRegion.style.border = '0';
      liveRegion.style.padding = '0';
      liveRegion.style.overflow = 'hidden';
      liveRegion.style.clip = 'rect(0 0 0 0)';
      document.body.appendChild(liveRegion);
    }

    // Add announce method
    vue.prototype.$announceForAccessibility = function (message) {
      const liveRegion = document.getElementById('aria-live-region');
      if (liveRegion) {
        liveRegion.textContent = '';
        // Force DOM update for screen readers
        setTimeout(() => {
          liveRegion.textContent = message;
        }, 100);
      }
    };

    // Add high-contrast toggle method
    vue.prototype.$toggleHighContrast = function () {
      document.body.classList.toggle('high-contrast');
    };

    // Create and mount the accessibility component
    const root = new Vue({
      render: (createElement) => createElement(AccessibilityActive),
    });
    vue.component('accessibility-manager', AccessibilityActive);
    root.$mount(document.body.appendChild(document.createElement('div')));
    vue.prototype.$accessibilitymanager = root;

    const pluginKey = 'accessibilityPlugin';
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
