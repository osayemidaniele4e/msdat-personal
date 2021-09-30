export default [
  // {
  //   path: '/state-profile',
  //   name: 'comming soon',
  //   component: () => import('./views/comingSoon.vue'),
  // },
  {
    path: '/state-profile/',
    name: 'intro',
    component: () => import('./views/intro.vue'),
  },
  {
    path: '/state-profile/:state',
    name: 'state-profile',
    component: () => import('./views/stateProfile.vue'),
    props: true,
  },
];
