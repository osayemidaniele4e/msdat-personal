export default [

  {
    path: '/login',
    name: 'login',
    component: () => import('./views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/register.vue'),
    // props: true,
  },
];
