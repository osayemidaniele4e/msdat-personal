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
  },
};
