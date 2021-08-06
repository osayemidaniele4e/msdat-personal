export default [
  {
    path: '/state-profile',
    name: 'comming soon',
    component: () => import('./views/comingSoon.vue'),
  },
  {
    path: '/state-profile/intro',
    name: 'intro',
    component: () => import('./views/intro.vue'),
  },
  {
    path: '/state-profile/state/:state',
    name: 'state-profile',
    component: () => import('./views/stateProfile.vue'),
    props: true,
  },
];

// {
//   path: '/state-profile/:state',
//   name: 'state-profile',
//   component: () => import('./views/intro.vue'),
//   props: true,
//   children: [{
//     path: '/:state/',
//     name: 'state',
//     component: () => import('./views/stateProfile.vue'),
//     props: true,
//   }],
// },
