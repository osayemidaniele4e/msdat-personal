import aboutRoute from './views/about/router';
import Home from './views/index.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  ...aboutRoute,
];
