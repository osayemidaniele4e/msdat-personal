// mockVuexStore.js
export default {
  state: {
    // Mock state data
    DL: {
      data: [],
      location: [],
      indicators: [],
      valuetypes: [],
      factors: [],
      datasource_specific_indicator: [],
      datasources: [],
      availableDashboardIndicator: [],
      dashboardDataSource: [],
    },
  },
  getters: {
    // Mock getters
    indicators: (state) => state.indicators,
  },
  mutations: {
    // Mock mutations
    SET_DATA(state, payload) {
      state[payload.tableName] = payload.data;
    },
    ADD_DATA(state, payload) {
      state[payload.tableName].push(...payload.data);
    },
  },
  actions: {
    // Mock actions
    DELETE_DB() {
      return Promise.resolve(true);
    },
    CLEAR_DB() {
      localStorage.removeItem('defaultClear');
      return Promise.resolve(true);
    },
  },
};
