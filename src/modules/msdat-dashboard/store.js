export default {
  namespaced: true,
  state: {
    localData: [{
      period: 2010,
      source: 'NHMIS',
    }],
  },
  mutations: {
    ADD_DATA: (state, data) => {
      state.localData.push(data);
    },
  },
  actions: {

  },
};
