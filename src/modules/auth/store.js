import axios from 'axios';
import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: userDetails || {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    setToken(state, payload) {
      state.authToken = payload;
    },
    logout(state) {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  actions: {
    // eslint-disable-next-line consistent-return
    async CREATE_USER({ commit }, payload) {
      try {
        const response = await axios.post('https://msdat-api.fmohconnect.gov.ng/api/users/', payload);
        commit('setUser', response);
        // console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line consistent-return
    async LOGIN_USER({ commit }, payload) {
      try {
        const response = await axios.post('https://msdat-api.fmohconnect.gov.ng/api/login/', payload);
        // console.log(response);
        const user = response.data;
        VueCookies.set('msdat-user-details', user);
        commit('setUser', user);
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    logout({ commit }) {
      VueCookies.remove('msdat-user-details');
      commit('logout');
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.user?.token,
    isAuthenticated: (state) => (state.user?.token !== '' && state.user?.token !== undefined),
  },
};
