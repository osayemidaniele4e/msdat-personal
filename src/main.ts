import Vue from 'vue';
import '@/components/ui-components';
import './scss/main.scss';
import VueCookies from 'vue-cookies';
import VueHtml2Canvas from 'vue-html2canvas';
import VueFriendlyIframe from 'vue-friendly-iframe';
import DataLayer from '@/modules/DataLayer';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/highchart';
import './plugins/multiselect';
import './plugins/vue-sweetalert/sweetalert';
import router from './router';
import store from './store';
import './plugins/veevalidate';
import './assets/styles/fonts.css';

// import Vue from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

Vue.use(VueFriendlyIframe);
// import Vue from 'vue';
Vue.use(VueSweetalert2);
Vue.use(DataLayer, {
  store,
});
Vue.use(VueHtml2Canvas);
Vue.use(VueCookies);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
