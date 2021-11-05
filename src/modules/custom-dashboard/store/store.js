// import Vue from 'vue';
// import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = new Vuex.Store({
export default {

  state: {
    step: 0,
    dashboardDetails: {},
    rmnchs: [],
    masterData: [],
    SurveyArray: [],
    notes: [],
  },

  mutations,
  actions,
  getters,
};
