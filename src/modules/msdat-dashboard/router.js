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
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/about.vue'),
  },
];
