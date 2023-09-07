import Vue from 'vue';
import ContextPlugin from './components';

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
    vue.prototype.$contextplugin = root;
  },
};
