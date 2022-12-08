import axios from 'axios';

export default {
  async SET_INTERACTIONS({ commit }, payload) {
    try {
      const { data } = await axios.post('https://msdat-api.fmohconnect.gov.ng/api/user_interactions/', payload);
      commit('setInteraction', data);
      console.log('interactions', data);
    } catch (error) {
      console.log(error);
    }
  },
  async GET_INTERACTIONS({ commit }) {
    try {
      const response = await axios.get('https://msdat-api.fmohconnect.gov.ng/api/user_interactions/?size=12');
      const { results } = response.data;
      commit('setInteractions', results);
      console.log('results', results);
    } catch (error) {
      console.log(error);
    }
  },
  async DELETE_INTERACTION({ commit }, payload) {
    try {
      const response = await axios.delete(`https://msdat-api.fmohconnect.gov.ng/api/user_interactions/${payload}/`);
      commit('set_success', response);
    } catch (error) {
      console.log(error);
    }
  },
};
