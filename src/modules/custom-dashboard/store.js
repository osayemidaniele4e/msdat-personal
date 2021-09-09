// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    step: 0,
    indicatorsSelected: [],
    dataSourceSelected: [],
    periodSelected: [],
    levelSelected: [],
  },
  mutations: {
    updateStep(state, payload) {
      state.step = payload;
    },
    setIndicatorSelected(state, payload) {
      state.indicatorsSelected = payload;
    },
    setDataSourceSelected(state, payload) {
      state.dataSourceSelected = payload;
    },
    setPeriodSelected(state, payload) {
      state.periodSelected = payload;
    },
    setLevelSelected(state, payload) {
      state.levelSelected = payload;
    },
  },
  actions: {},
  getters: {
    indicatorsSelectedLength(state) {
      return state.indicatorsSelected.length;
    },
    dataSourceSelectedLength(state) {
      return state.dataSourceSelected.length;
    },
    periodSelectedLength(state) {
      return state.periodSelected.length;
    },
    levelSelectedLength(state) {
      return state.levelSelected.length;
    },
  },
};
