import axiosInstance from '@/plugins/axios';

export default {
  /**
   * @Function to send data and get prediction for the data sent
   * @Author samuel
   * @param {*} commit
   * @param {string} payload
   * @description function to get prediction for data sent
   * @returns {Promise}
   */
  async PREDICTIVE_ANALYSIS({ commit }, payload) {
    console.log(payload, 'DATA@DATA');
    try {
      const { data } = await axiosInstance.post('https://msdat-api.fmohconnect.gov.ng/api/data/predictive_analysis/', payload);
      commit('setPredictedData', data);
      console.log(data, 'DATA@');
      return data;
    } catch (error) {
      commit('setError', error);
      return 'Error';
    }
  },
  /**
   * @Function to set section title in the state
   * @Author moses
   * @param {*} commit
   * @param {string} payload
   * @description function to set section title in the state
   * @returns {Promise}
   */
  setSectionTitle({ commit }, payload) {
    commit('setSectionTitle', payload);
  },
};
