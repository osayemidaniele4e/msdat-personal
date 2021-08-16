import Vue from 'vue';

import '@/components/ui-components/index';
import './scss/main.scss';
import DataLayer from '@/modules/DataLayer';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/highchart';
import './plugins/multiselect';

import router from './router';
import store from './store';

// dbd.init();
Vue.use(DataLayer, {
  store,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
