export default {
  getIndicators: (state) => state.indicators,
  getInteraction: (state) => state.interaction,
  getInteractions: (state) => state.interactions,
  getInternetStatus: (state) => state.status,
  getSubmittedPlugins: (state) => state.submittedPlugins,
  getSuccessMessage: (state) => state.success !== '' && state.success,
  getPluginsImported: (state) => state.pluginsImported,
  usersCount: (state) => (state.users ? state.users.length : 0),
  getAllusers: (state) => state.users,
  activeDashboardsCount: (state) => (state.activeDashboards ? state.activeDashboards.length : 0),
  availablePluginsCount: (state) => (state.pluginsImported ? state.pluginsImported.length : 0),
};
