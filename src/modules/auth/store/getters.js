export default {
  getUser: (state) => state.user,
  getToken: (state) => state.user?.token,
  getDashboards: (state) => state.dashboards,
  isAuthenticated: (state) => state.user?.tokens?.access_token !== '' && state.user?.tokens?.access_token !== undefined,
};
