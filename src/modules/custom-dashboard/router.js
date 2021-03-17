export default [
  {
    path: '/custom',
    name: 'custom-dashboard',
    component: () => import(/* webpackChunkName: "about" */ './views/landing.vue'),
  },
];
