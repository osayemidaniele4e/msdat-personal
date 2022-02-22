const token = sessionStorage.getItem('username');
export default [
  {
    path: '/custom',
    name: 'custom-dashboard',
    component: () => import('./views/landing.vue'),
  },
  {
    path: '/login',
    name: 'custom-dashboard-login',
    component: () => import('./views/login.vue'),

  },
  // {
  //   path: '/custom/details',
  //   name: 'dashboard-details',
  //   component: () => import('./views/dashboardDetails.vue'),
  // },
  {
    path: '/my-dashboard',
    name: 'my-dashboard',
    beforeEnter: (to, from, next) => {
      if (!token) {
        next('/login');
      } else {
        return next();
      }
      return null;
    },
    component: () => import('./views/myDashboard.vue'),
    children: [

      {
        path: 'preference-table',
        name: 'preference-table',
        component: () => import('./views/preferenceTable.vue'),
      },
      {
        path: 'details',
        name: 'my-dashboard-details',
        component: () => import('./views/dashboardDetails.vue'),
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
    beforeEnter: (to, from, next) => {
      if (!token) {
        next('/login');
      } else {
        next();
      }
      return null;
    },
    props: true,
    component: () => import('./views/CustomDashboard.vue'),
  },

];
