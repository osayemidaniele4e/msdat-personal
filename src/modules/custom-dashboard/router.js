export default [
  {
    path: '/custom',
    name: 'custom-dashboard',
    component: () => import('./views/landing.vue'),
  },
  {
    path: '/my-dashboard',
    name: 'my-dashboard',
    component: () => import('./views/myDashboard.vue'),
    children: [
      {
        path: 'preference-table',
        name: 'preference-table',
        component: () => import('./components/preferenceTable.vue'),
      },
      {
        path: 'details',
        name: 'my-dashboard-details',
        component: () => import('./views/dashboardDetails.vue'),
      },
      {
        path: 'preview',
        component: () => import('./views/TablePreview.vue'),
      },
      {
        path: 'config',
        component: () => import('./views/configShow.vue'),
      },
    ],
  },
];
