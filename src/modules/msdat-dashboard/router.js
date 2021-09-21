import routertest from '@/components/maps/router';
import aboutRoute from './views/about/router';
import faqRoute from './views/faq/router';
import Dashboard from './views/index.vue';
import TableHome from './views/Table.vue';
import NotFound from './views/NotFound.vue';

export default [
  {
    path: '/',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('./views/dashboard/dashboard.vue'),
      },
    ],
  },
  {
    path: '/instance',
    component: () => import('./views/dashboard/instance.vue'),
  },
  ...aboutRoute,
  ...faqRoute,
  {
    path: '/table',
    name: 'table',
    component: TableHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },

  ...routertest,
];
