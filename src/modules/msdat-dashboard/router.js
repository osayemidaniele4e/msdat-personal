import routertest from '@/components/maps/router';
import aboutRoute from './views/about/router';
import Home from './views/index.vue';
import TableHome from './views/Table.vue';
import contact from '../../components/contact';
import NotFound from './views/NotFound.vue';
// import Home from './components/table/TableComponent.vue';
// import table from './components/table/TableComponent.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  ...aboutRoute,
  ...contact,
  {
    path: '/table',
    name: 'table',
    component: TableHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },

  ...routertest,
];
