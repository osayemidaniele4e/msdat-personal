import VueCookies from 'vue-cookies';
import axiosInstance from '../config/axios';
import authInstance from '../config/axiosAuth';

export default {
  // eslint-disable-next-line consistent-return
  async CREATE_USER({ commit }, payload) {
    try {
      const response = await axiosInstance.post('/users/', payload);
      commit('setUser', response);
      return response;
    } catch ({ response }) {
      throw response.data;
      // return err.username[0] || err.email[0] || err.password[0];
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
      // console.log(err);
    }
  },

  async AUTHENTICATE({ commit }, payload) {
    try {
      const response = await authInstance.post(`/api/auth/register/${payload.provider}/user/`, {
        auth_token: payload.auth_token,
      });
      const user = response.data.data;

      VueCookies.set('msdat-user-details', user);
      commit('setUser', user);
      return response;
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  async AUTHENTICATE_LINKEDIN({ commit }, payload) {
    try {
      const user = payload.data;

      VueCookies.set('msdat-user-details', user);
      commit('setUser', user);
      return payload;
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  logout({ commit }) {
    VueCookies.remove('msdat-user-details');
    commit('logout');
  },
};
