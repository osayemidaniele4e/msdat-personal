import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './plugins/bootstrap-vue';
import './plugins/highchart';
import './scss/main.scss';
import router from './router';
import store from './store';
import './assets/styles/styles.css';
import './assets/styles/fonts.css';

import 'vue-multiselect/dist/vue-multiselect.min.css';
import './assets/styles/MultiSelectOverrides.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
