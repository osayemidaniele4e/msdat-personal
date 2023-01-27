import Vue from 'vue';
import '@/components/ui-components';
import './scss/main.scss';
import GAuth from 'vue-google-oauth2';
import VueCookies from 'vue-cookies';
import VueHtml2Canvas from 'vue-html2canvas';
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueSweetalert2 from 'vue-sweetalert2';
import DataLayer from '@/modules/DataLayer';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/highchart';
import './plugins/multiselect';
import './plugins/vue-sweetalert/sweetalert';
import router from './router';
import store from './store';
import 'regenerator-runtime';
import './plugins/veevalidate';
import './assets/styles/fonts.css';

const gauthOption = {
  clientId: '1049612850562-rg9dcooe3o2589bva85p3kcsfieuic0t.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  plugin_name: 'social-auth',
};
Vue.use(GAuth, gauthOption);

// import firebase from 'firebase';
// import GAuth from 'vue-google-oauth2';

// const gauthOption = {
//   clientId: '1015559969016-0td102ag1odnn0vcc6golaf8n65cqr18.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'consent',
//   fetch_basic_profile: true,
// };
// Vue.use(GAuth, gauthOption);

// const firebaseConfig = {
//   apiKey: 'AIzaSyCUnDadQjgK7XGtCWfWlMyC-FDBq0i1EVg',
//   authDomain: 'e4e--auth.firebaseapp.com',
//   projectId: 'e4e--auth',
//   storageBucket: 'e4e--auth.appspot.com',
//   messagingSenderId: '125707950263',
//   appId: '1:125707950263:web:a38ff9022872473e065532',
// };

// firebase.initializeApp(firebaseConfig);

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
