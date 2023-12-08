export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./profile.vue'),
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('./notifications.vue'),
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/activity-history',
    name: 'ActivityHistory',
    component: () => import('./activityHistory.vue'),
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: () => import('./passwordRecovery.vue'),
    meta: {
      title: 'Settings',
    },
  },
];
