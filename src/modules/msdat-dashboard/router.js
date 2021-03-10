import Home from './views/index.vue';
import routertest from './components/maps/router';

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
