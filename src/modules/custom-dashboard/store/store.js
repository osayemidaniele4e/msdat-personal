// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

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
