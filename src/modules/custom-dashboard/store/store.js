// import Vue from 'vue';
// import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = new Vuex.Store({
export default {

  state: {
    loader: {
      indicator: false,
      datasource: false,
      levels: false,
      years: false,
    },
    allSelected: false,
    // loading: false,
    step: 0,
    dashboardDetails: {},
    rmnchs: [],
    masterData: [],
    SurveyArray: [],
    notes: [],
    ArrangedSections: [
      {
        id: 0,
        name: 'Indicator Overview',
      },
      {
        id: 1,
        name: 'Zonal Analysis',
      },
      {
        id: 2,
        name: 'Indicator Comparsion - By Period',
      },
      {
        id: 3,
        name: 'Dataset Comparison',
      },
      {
        id: 4,
        name: 'Multi-source Indicator Comparison',
      },
    ],
  },

  mutations,
  actions,
  getters,
};
