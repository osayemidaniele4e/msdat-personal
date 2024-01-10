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
  async SUBMIT_PLUGIN(payload) {
    try {
      const { data } = await axios.post('http://172.93.52.240:3001/api/plugins/', 
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );
      // commit('setInteraction', data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },


  // getting all submitted plugins 

  async GET_PLUGINS({ commit }, payload) {
    try {
      const response = await axiosInstance.get(`http://172.93.52.240:3001/api/plugins/`);
      const { results } = response.data;
      commit('setSubmittedPlugins', results);
    } catch (error) {
      console.log(error);
    }
  },

  async SET_DASHBOARD_LOCATION(payload) {
    try {
      const { data } = await axios.post('http://172.93.52.240:3001/api/user_dashboard_location/', payload);
      console.log(data);
      // commit('setInteraction', data);
    } catch (error) {
      console.log(error);
    }
  },
};
