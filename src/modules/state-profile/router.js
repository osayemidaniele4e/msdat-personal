export default [
  // {
  //   path: '/health-profiles',
  //   name: 'comming soon',
  //   component: () => import('./views/comingSoon.vue'),
  // },
  {
    path: '/health-profiles/',
    name: 'intro',
    component: () => import('./views/intro.vue'),
  },
  {
    path: '/health-profiles/:state',
    name: 'health-profiles',
    component: () => import('./views/stateProfile.vue'),
    props: true,
  },
];
