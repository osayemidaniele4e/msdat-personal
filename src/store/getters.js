export default {
  getIndicators: (state) => state.indicators,
  getInteraction: (state) => state.interaction,
  getInteractions: (state) => state.interactions,
  getSuccessMessage: (state) => state.success !== '' && state.success,
};
