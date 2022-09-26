import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isAuthtenticated: false,
    authToken: '',
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async CREATE_USER({ commit }, payload) {
      const { ...data } = payload;
      try {
        const response = await axios.post('https://msdat-api.fmohconnect.gov.ng/api/users/', data);
        commit('setUser', response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
};
