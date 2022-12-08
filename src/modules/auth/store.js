import axios from 'axios';
import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    authToken: '',
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
        const accessToken = response.data.token;
        const refreshToken = response.data.refresh_token;
        VueCookies.set('msdat-access-token', accessToken);
        VueCookies.set('msdat-refresh-token', refreshToken);
        VueCookies.set('msdat-user-details', user);
        commit('setUser', user);
        // commit(' setToken', accessToken);
        return response;
      } catch (err) {
        console.log(err);
        VueCookies.remove('msdat-access-token');
        VueCookies.remove('msdat-refresh-token');
      }
    },
    logout({ commit }) {
      VueCookies.remove('msdat-access-token');
      VueCookies.remove('msdat-refresh-token');
      VueCookies.remove('msdat-user-details');
      commit('logout');
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.authToken,
    isAuthenticated: (state) => state.isAuthenticated && state.user?.id !== '',
  },
};
