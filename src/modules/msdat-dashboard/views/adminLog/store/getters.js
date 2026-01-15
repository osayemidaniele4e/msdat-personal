const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  progress: (state) => state.app.requestProgress,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  permissions: (state) => state.users.permissions,

  allRoutes: (state) => state.permission.allRoutes,
  generatedRoutes: (state) => state.permission.addedRoutes,
  routesGenerated: (state) => state.permission.routesGenerated,

  indicators: (state) => state.MSDAT_STORE.dashboard.indicators,
  datasources: (state) => state.MSDAT_STORE.dashboard.datasources,
  dashboards: (state) => state.MSDAT_STORE.dashboard.dashboards || [],
  dashboardError: (state) => state.MSDAT_STORE.dashboard.error,
};

export default getters;
