import Vue from 'vue';
import '@/components/ui-components';
import './scss/main.scss';
import GAuth from 'vue-google-oauth2';
import VueCookies from 'vue-cookies';
import VueHtml2Canvas from 'vue-html2canvas';
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueSweetalert2 from 'vue-sweetalert2';
import VueSocialSharing from 'vue-social-sharing';
import DataLayer from '@/modules/data-layer';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/element-ui';
import './plugins/highchart';
import './plugins/multiselect';
import './plugins/vue-sweetalert/sweetalert';
import router from './router';
import store from './store';
import 'regenerator-runtime';
import './plugins/veevalidate';
import './assets/styles/fonts.css';

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
  plugin_name: 'social-auth',
};
Vue.use(GAuth, gauthOption);

Vue.use(VueSocialSharing);

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
}).$mount('#app', true);
