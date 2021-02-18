import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import '@/plugins/bootstrap-vue';
import '@/plugins/highchart';
import './scss/custom.scss';
import router from '@/modules/custom-dashboard/router';
import store from '@/modules/custom-dashboard/store';

Vue.config.productionTip = true;
// Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
