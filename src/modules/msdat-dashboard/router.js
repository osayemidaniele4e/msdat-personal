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
    component: () => import('./about/views/index.vue'),
  },
];
