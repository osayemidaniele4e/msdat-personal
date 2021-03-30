export default {
  /**
     * @param {array} payload
     */
  SET_DATA(state, payload) {
    state[payload.tableName] = payload.data;
  },

  /**
     * @param {object} payload
     * @param {array} payload.data the data to be added to the state
     * @param {string} payload.tableName the state Object you want to add to usually
     * related to the data
     */
  ADD_DATA(state, payload) {
    console.log(state[payload.tableName]);
    state[payload.tableName].push(...payload.data);
  },

};
