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
  setInternetStatus(state, payload) {
    state.status = payload;
  },
  setSuccess(state, success) {
    state.success = '';
    state.success = success;
  },
  setSubmittedPlugins(state, payload) {
    state.submittedPlugins = payload;
  },
  setPluginsImported(state, payload) {
    state.pluginsImported = payload;
  },
  setUsers(state, users) {
    state.users = users;
  },
  setActiveDashboards(state, dashboards) {
    state.activeDashboards = dashboards;
  },
};
