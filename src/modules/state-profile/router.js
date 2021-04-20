export default [
  {
    path: '/state-profile',
    name: 'custom-profile',
    component: () => import(/* webpackChunkName: "about" */ './views/comingSoon.vue'),
  },
];
