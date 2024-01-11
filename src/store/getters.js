export default {
  getIndicators: (state) => state.indicators,
  getInteraction: (state) => state.interaction,
  getInteractions: (state) => state.interactions,
  getInternetStatus: (state) => state.status,
  getSubmittedPlugins: (state) => state.submittedPlugins,
  getSuccessMessage: (state) => state.success !== '' && state.success,
  getPluginsImported: (state) => state.pluginsImported 
};
