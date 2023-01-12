export default {
  getIndicators: (state) => state.indicators,
  getInteraction: (state) => state.interaction,
  getInteractions: (state) => state.interactions,
  getInternetStatus: (state) => state.status,
  getSuccessMessage: (state) => state.success !== '' && state.success,
};
