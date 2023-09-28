export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./profile.vue'),
    meta: {
      title: 'Multisource Data Analytics and Triangulation',
    },
  },
  {
    path: '/activity-history',
    name: 'ActivityHistory',
    component: () => import('./activityHistory.vue'),
    meta: {
      title: 'Multisource Data Analytics and Triangulation',
    },
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: () => import('./passwordRecovery.vue'),
    meta: {
      title: 'Multisource Data Analytics and Triangulation',
    },
  },
];
