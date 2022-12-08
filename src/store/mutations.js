export default {
  setIndicators(state, payload) {
    state.indicators = payload;
  },
  setInteraction(state, payload) {
    state.interaction = payload;
  },
  setInteractions(state, payload) {
    state.interactions = payload;
  },
  setSuccess(state, success) {
    state.success = '';
    state.success = success;
  },
};
