import aboutRoute from './views/about/router';

export default [
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
    },
  },
  ...aboutRoute,
];
