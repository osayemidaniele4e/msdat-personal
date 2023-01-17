import VueCookies from 'vue-cookies';
import axiosInstance from '../config/axios';

export default {
// eslint-disable-next-line consistent-return
  async CREATE_USER({ commit }, payload) {
    try {
      const response = await axiosInstance.post('/users/', payload);
      commit('setUser', response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // eslint-disable-next-line consistent-return
  async LOGIN_USER({ commit }, payload) {
    try {
      const response = await axiosInstance.post('/login/', payload);
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
