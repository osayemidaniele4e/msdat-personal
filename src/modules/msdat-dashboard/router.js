import routertest from '@/components/maps/router';
import Home from './views/index.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },

  ...routertest,
];
