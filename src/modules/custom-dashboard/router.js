import VueCookies from 'vue-cookies';
// import Dashboard from '../dynamic_dashboard/index.vue';

export default [
  {
    path: '/custom',
    name: 'custom-dashboard',
    component: () => import('./views/landing.vue'),
  },
  {
    path: '/custom/login',
    name: 'custom-dashboard-login',
    component: () => import('../auth/views/login.vue'),
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
      // const token = sessionStorage.getItem('username');
      const { token } = VueCookies.get('msdat-user-details');
      console.log('In before Enter', token);
      if (!token) {
        next('/custom/login');
      } else {
        return next();
      }
      return null;
    },
    component: () => import('./views/myDashboard.vue'),
    children: [
      // Page 1
      {
        path: 'details',
        name: 'my-dashboard-details',
        component: () => import('./views/dashboardDetails.vue'),
      },
      // Page 2
      {
        path: 'preference-table',
        name: 'preference-table',
        component: () => import('./views/preferenceTable.vue'),
      },
      // Page 3
      {
        path: 'data-table',
        name: 'data-table',
        component: () => import('./views/DataTable.vue'),
      },
      // Page 3
      {
        path: 'sections',
        name: 'sections',
        component: () => import('./views/ArrangeSections.vue'),
      },
    ],
  },
  {
    path: '/account-settings',
    name: 'account-settings',
    beforeEnter: (to, from, next) => {
      const token = VueCookies.get('custom-access-token');
      if (!token) {
        next('/custom/login');
      } else {
        next();
      }
      return null;
    },
    props: true,
    component: () => import('./views/AccountSettings.vue'),
  },
  {
    path: '/my-custom-dashboard/:title',
    name: 'my-custom-dashboard',
    beforeEnter: (to, from, next) => {
      // const token = sessionStorage.getItem('username');
      const token = VueCookies.get('msdat-access-token');
      if (!token) {
        next('/custom/login');
      } else {
        next();
      }
      return null;
    },
    props: true,
    component: () => import('./views/CustomDashboard.vue'),
    // component: () => import('../dynamic_dashboard/index.vue'),
  },
];
