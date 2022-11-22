import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    authToken: '',
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.isAuthenticated = true;
    },
    setToken(state, payload) {
      state.authToken = payload;
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
        VueCookies.set('custom-access-token', accessToken);
        VueCookies.set('custom-refresh-token', refreshToken);
        VueCookies.set('custom-user-details', user);
        commit('setUser', user);
        // commit(' setToken', accessToken);
        return response;
      } catch (err) {
        console.log(err);
        VueCookies.remove('custom-access-token');
        VueCookies.remove('custom-refresh-token');
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.authToken,
    isAuthenticated: (state) => state.isAuthenticated && state.user?.id !== '',
  },
};
