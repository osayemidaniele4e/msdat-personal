export default [
  {
    path: '/health-think',
    component: () => import(/* webpackChunkName: "about" */ './views/index.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "about" */ './views/landing.vue'),
      },
      {
        path: 'signup',
        component: () => import(/* webpackChunkName: "about" */ './views/auth/signup.vue'),
      },
    ],
  },
];
