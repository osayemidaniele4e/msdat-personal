export default {
  getUser: (state) => state.user,
  // eslint-disable-next-line camelcase
  getToken: (state) => state.user?.tokens?.access_token,
  getDashboards: (state) => state.dashboards,
  getDashboardDetails: (state) => state.dashboardDetails,
  // eslint-disable-next-line camelcase
  isAuthenticated: (state) => state.user?.tokens?.access_token !== '' && state.user?.tokens?.access_token !== undefined,
  usersCount: (state) => state.users.length,

};
