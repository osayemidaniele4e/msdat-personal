/* eslint-disable import/named */
import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import MSDAT_STORE from '../modules/msdat-dashboard/store';
import { store as CUSTOM_DASHBOARD_STORE } from '../modules/custom-dashboard';
import { store as AUTH_STORE } from '../modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    MSDAT_STORE,
    CUSTOM_DASHBOARD_STORE,
    AUTH_STORE,
  },
  strict: process.env.NODE_ENV !== 'production',
});
