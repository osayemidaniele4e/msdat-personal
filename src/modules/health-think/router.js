export default [
  {
    path: '/health-think',
    component: () => import(/* webpackChunkName: "about" */ './views/index.vue'),
    meta: {
      title: 'Health Think',
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "about" */ './views/landing.vue'),
        meta: {
          title: 'Health Think',
        },
      },
      {
        path: 'signup',
        component: () => import(/* webpackChunkName: "about" */ './views/auth/signup.vue'),
        meta: {
          title: 'Health Think',
        },
      },
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "about" */ './views/auth/profile.vue'),
        meta: {
          title: 'Health Think',
        },
      },
    ],
  },
];
