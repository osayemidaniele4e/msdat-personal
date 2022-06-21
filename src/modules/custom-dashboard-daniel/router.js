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
        path: 'details',
        name: 'my-dashboard-details',
        component: () => import('./views/dashboardDetails.vue'),
      },
      {
        path: 'preference-table',
        name: 'preference-table',
        component: () => import('./views/preferenceTable.vue'),
      },
      {
        path: 'data-table',
        name: 'data-table',
        component: () => import('./views/DataTable.vue'),
      },
      {
        path: 'sections',
        name: 'sections',
        component: () => import('./views/ArrangeSections.vue'),
      },

    ],
  },
  {
    path: '/my-custom-dashboard/:title',
    name: 'my-custom-dashboard',
    props: true,
    component: () => import('./views/CustomDashboard.vue'),
  },

];
