import aboutRoute from './views/about/router';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  ...aboutRoute,
];
