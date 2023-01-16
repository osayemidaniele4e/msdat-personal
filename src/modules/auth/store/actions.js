import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
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
};
