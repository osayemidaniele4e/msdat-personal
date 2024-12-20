import adminsidenav from './adminsidenav.vue';

export default [
  {
    path: '/admin',
    name: 'Admin',
    component: adminsidenav,
    meta: {
      requiresAuth: true,
      title: 'Admin Page',
    },
  },
];
