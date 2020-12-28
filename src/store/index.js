import Vue from 'vue';
import Vuex from 'vuex';
import { store as MSDAT_STORE } from '../modules/msdat-dashboard';

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
  },
});
