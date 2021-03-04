export default [
  {
    path: '/',
    name: 'Dashboard',
    // component: () => import('./about/views/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./about/views/index.vue'),
  },
];
