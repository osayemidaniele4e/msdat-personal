import axios from 'axios';
import VueCookies from 'vue-cookies';

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
    getUser(state) { return state.user; },
    getToken(state) { return state.authToken; },
  },
};
