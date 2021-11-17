import Vue from 'vue';
import Vuex from 'vuex';
import MSDAT_STORE from '../modules/msdat-dashboard/store';
import { store as CUSTOM_DASHBOARD_STORE } from '../modules/custom-dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    MSDAT_STORE,
    CUSTOM_DASHBOARD_STORE,
  },
  strict: process.env.NODE_ENV !== 'production',
});
