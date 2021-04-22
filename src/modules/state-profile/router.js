export default [
  {
    path: '/state-profile',
    name: 'custom-profile',
    component: () => import('./views/comingSoon.vue'),
  },
  {
    path: '/state-profile/intro',
    name: 'intro',
    component: () => import('./views/intro.vue'),
  },
];
