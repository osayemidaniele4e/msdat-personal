import Vue from 'vue';
import DataLayer from '@/modules/DataLayer';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/highchart';
import './scss/main.scss';
import router from './router';
import store from './store';

import './assets/styles/fonts.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import './assets/styles/MultiSelectOverrides.css';

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
