import sidenavVue from './sidenav.vue';

export default [
  {
    path: '/account',
    name: 'Account',
    component: sidenavVue,
    meta: {
      // requiresAuth: true,
      title: 'Account',
    },
  },
];
