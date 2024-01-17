/* eslint no-use-before-define: 0 */
import axiosInstance from '@/config/axios';
import axios from 'axios';

export default {
  async SET_INTERACTIONS({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post('/user_interactions/', payload);
      commit('setInteraction', data);
    } catch (error) {
      console.log(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async SET_INDICATOR_TIME_SPENT({ commit }, payload) {
    try {
      await axios.post('http://172.93.52.240:3001/api/indicator_timespent/', payload);
    } catch (error) {
      console.log(error);
    }
  },
  // eslint-disable-next-line no-unused-vars
  async SET_DATASOURCE_TIME_SPENT({ commit }, payload) {
    try {
      await axios.post('http://172.93.52.240:3001/api/datasource_timespent/', payload);
    } catch (error) {
      console.log(error);
    }
  },
  async SET_DATASOURCE_DASHBOARD_LOCATION(payload) {
    try {
      await axios.post('http://172.93.52.240:3001/api/user_dashboard_location/', payload);
    } catch (error) {
      console.log(error);
    }
  },
  async GET_INTERACTIONS({ commit }, payload) {
    try {
      const response = await axiosInstance.get(`/user_interactions/?user=${payload}&size=10000`);
      const { results } = response.data;
      commit('setInteractions', results);
    } catch (error) {
      console.log(error);
    }
  },
  async DELETE_INTERACTION({ commit }, payload) {
    try {
      const response = await axiosInstance.delete(`/user_interactions/${payload}/`);
      commit('set_success', response);
    } catch (error) {
      console.log(error);
    }
  },
  setInternetStatus({ commit }, payload) {
    commit('setInternetStatus', payload);
  },

  // submitting a plugin
  // eslint-disable-next-line no-unused-vars
  async SUBMIT_PLUGIN({ commit }, payload) {
    console.log('submit payload', payload);
    try {
      const { data } = await axios.post(
        'https://msdat2api.e4eweb.space/api/plugin-submissions/',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': 'https://msdat2-staging.e4eweb.space',
            // Add other headers if needed
          },
        },
      );
      // commit('setInteraction', data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },

  // approving a plugin
  // eslint-disable-next-line no-unused-vars
  async APPROVE_PLUGIN({ commit }, payload) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        'https://msdat2api.e4eweb.space/api/plugin-submissions/approval/',
        payload,
      );
      // commit();
    } catch (error) {
      console.log(error);
    }
  },

  // getting all submitted plugins
  // eslint-disable-next-line no-unused-vars
  async GET_PLUGINS({ commit }, payload) {
    try {
      const response = await axiosInstance.get(
        'https://msdat2api.e4eweb.space/api/plugin-submissions/',
      );
      const { results } = response.data;
      commit('setSubmittedPlugins', results);
    } catch (error) {
      console.log(error);
    }
  },

  async SET_DASHBOARD_LOCATION(payload) {
    try {
      const { data } = await axios.post(
        'https://msdat2api.e4eweb.space/api/user_dashboard_location/',
        payload,
      );
      console.log(data);
      // commit('setInteraction', data);
    } catch (error) {
      console.log(error);
    }
  },

  // set plugins imported
  async SET_PLUGINS_IMPORTED({ commit }, payload) {
    try {
      commit('setPluginsImported', payload);
    } catch (error) {
      console.log(error);
    }
  },
};
