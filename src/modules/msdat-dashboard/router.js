import routertest from '@/components/maps/router';
import aboutRoute from './views/about/router';
import Dashboard from './views/index.vue';
import TableHome from './views/Table.vue';

export default [
  {
    path: '/',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [{
      path: '',
      component: () => import('./views/dashboard/dashboard.vue'),
    }],
  },
  ...aboutRoute,
  {
    path: '/table',
    name: 'table',
    component: TableHome,
    meta: {
      requiresAuth: true,
    },
  },

  ...routertest,
];
