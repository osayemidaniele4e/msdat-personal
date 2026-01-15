export default [
  {
    path: '/health-profiles/',
    name: 'intro',
    component: () => import('./views/intro.vue'),
    meta: {
      title: 'Health Profiles',
    },
  },
  {
    path: '/health-profiles/:state',
    name: 'health-profiles',
    component: () => import('./views/stateProfile.vue'),
    meta: {
      title: 'Health Profiles',
    },
    props: true,
  },
];
