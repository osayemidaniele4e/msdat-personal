import Vue from 'vue';
import Vuex from 'vuex';
import { store as MSDAT_STORE } from '../modules/msdat-dashboard';
import { store as CUSTOM_DASHBOARD_STORE } from '../modules/custom-dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    MSDAT_STORE,
    CUSTOM_DASHBOARD_STORE,
  },
});
