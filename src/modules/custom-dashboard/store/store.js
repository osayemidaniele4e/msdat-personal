// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state: {
    step: 0,
    indicators: [],
    dataSource: [],
    selectedIndicator: [],
    selectedDataSource: [],
    selectedYears: [],
    selectedLevels: [],
    rmnchs: [],
    program_area: [],
    SurveyArray: [],
    levels: [],
    years: [],
    indicatorValue: '',
  },
  mutations,
  actions,
  getters,
};
