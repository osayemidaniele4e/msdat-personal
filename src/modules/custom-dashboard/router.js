export default [
  {
    path: '/custom',
    name: 'custom-dashboard',
    component: () => import(/* webpackChunkName: "about" */ './views/landing.vue'),
  },
  {
    path: '/custom/details',
    name: 'dashboard-details',
    component: () => import(/* webpackChunkName: "about" */ './views/dashboardDetails.vue'),
  },
  {
    path: '/custom/preferences',
    name: 'dashboard-preferences',
    component: () => import(/* webpackChunkName: "about" */ './views/preferences.vue'),
  },
];
