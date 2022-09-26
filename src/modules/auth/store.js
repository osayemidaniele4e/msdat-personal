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
    async CREATE_USER({ commit }, payload) {
      try {
        const response = await axios.post('https://msdat-api.fmohconnect.gov.ng/api/users/', payload);
        commit('setUser', response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async LOGIN_USER({ commit }, payload) {
      try {
        const response = await axios.post('/login/', payload)
          .then((res) => {
            const user = res.data;
            const accessToken = response.data.token;
            const refreshToken = response.data.refresh_token;
            VueCookies.set('custom-access-token', accessToken); // store the token in cookie
            VueCookies.set('custom-refresh-token', refreshToken); // store the token in cookie
            VueCookies.set('custom-user-details', user);
            commit('setUser', user);
            commit(' setToken', accessToken);
            // this.$cookies.set('medinstance_token', response.access)
            // this.$cookies.set('loggedIn', true)
            return res;
          })
          .catch((error) => {
            VueCookies.remove('custom-access-token'); // if the request fails, remove any possible user token
            VueCookies.remove('custom-refresh-token'); // if the request fails, remove any possible user token
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    },
    getters: {
      getUser(state) { return state.user; },
      getToken(state) { return state.authToken; },
    },
  },
};
