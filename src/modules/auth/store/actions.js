import VueCookies from 'vue-cookies';
import axios from 'axios';
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

  // eslint-disable-next-line consistent-return, no-unused-vars
  async SAVE_USER_DASHBOARD({ commit }, payload) {
    try {
      const response = await axiosInstance.post('/dashboards/', payload);
      return response;
    } catch (err) {
      // console.log(err);
    }
  },

  // eslint-disable-next-line consistent-return, no-unused-vars
  async SAVE_DASHBOARDS({ commit }, payload) {
    try {
      const response = await axiosInstance.get('/dashboards/');
      commit('setDashboards', response);
      return response;
    } catch (err) {
      // console.log(err);
    }
  },

  // eslint-disable-next-line consistent-return
  async LOGIN_USER({ commit }, payload) {
    try {
      const response = await axiosInstance.post('/login/', payload);
      const user = response.data;
      console.log(user);

      const formattedUser = {
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        username: user.username,
        tokens: {
          access_token: user.token,
        },
      };

      VueCookies.set('msdat-user-details', formattedUser);
      commit('setUser', formattedUser);
      return response;
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  async AUTHENTICATE({ commit }, payload) {
    try {
      const response = await authInstance.post(`/api/auth/register/${payload.provider}/user/`, {
        auth_token: payload.auth_token,
      });
      const user = response.data.data;
      console.log(user);

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
      const response = await axios.post('https://msdat2api.e4eweb.space/api/social/auth/linkedin/', payload);
      console.log('linkedln login', response);
      const user = response.data.data;

      VueCookies.set('msdat-user-details', user);
      commit('setUser', user);
      return response;
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
