import VueCookies from 'vue-cookies';
import axios from 'axios';
import ApiServices from '@/modules/data-layer/services/ApiServices';
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
  // get all users
  // eslint-disable-next-line consistent-return
  async GET_USERS({ commit }) {
    try {
      const response = await axiosInstance.get('/users/');
      commit('setUsers', response.data.results);
      console.log(response.data.results);
      return response;
    } catch (err) {
      // console.log(err);
    }
  },

  // eslint-disable-next-line consistent-return, no-unused-vars
  async SAVE_USER_DASHBOARD({ commit }, payload) {
    try {
      // const response = await axiosInstance.post('/dashboards/', payload);
      const res = await ApiServices.saveCustomDashboard(payload);
      // const response = await axios.put(
      //   `https://msdat-fmoh-default-rtdb.firebaseio.com/custom/private/${payload.id}.json`,
      //   payload,
      // );
      this.SAVE_DASHBOARDS();
      return res;
    } catch (err) {
      // console.log(err);
    }
  },

  // eslint-disable-next-line consistent-return, no-unused-vars
  async SAVE_DASHBOARDS({ commit }, payload) {
    try {
      const { data } = await ApiServices.getCustomDashboard();
      commit('setDashboards', Object.values(data.data.results));
      return data;
    } catch (err) {
      // console.log(err);
    }
  },

  // eslint-disable-next-line consistent-return
  async LOGIN_USER({ commit }, payload) {
    try {
      const response = await axios.post('https://msdat2api.e4eweb.space/api/login/', payload);
      const user = response.data;

      const savedUser = VueCookies.get('msdat-user-details');
      if (savedUser) {
        commit('setUser', savedUser);
      }

      // Create the formatted user without role initially
      const formattedUser = {
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        username: user.username,
        tokens: {
          access_token: user.token,
        },
        role: {
          value: '', // Will be updated after fetching user details
          label: '',
        },
      };

      // Fetch the user details to get the role
      try {
        const userDetailsResponse = await axios.get(
          `https://msdat2api.e4eweb.space/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        // Get the role from the user details response
        const role = userDetailsResponse.data.role || '';

        // Update the formattedUser with the role information
        formattedUser.role = {
          value: role,
          label: role,
        };
      } catch (detailsErr) {
        console.log('Failed to fetch user details:', detailsErr);
      }

      // Save user details and commit regardless of whether role fetch succeeded
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
      console.log('this userrrr', user);

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
      const response = await axios.post(
        'https://msdat2api.e4eweb.space/api/social/auth/linkedin/',
        payload,
      );
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
