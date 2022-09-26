export default [

  {
    path: '/custom/login',
    name: 'login',
    component: () => import('./views/login.vue'),
  },
  {
    path: '/custom/register',
    name: 'register',
    component: () => import('./views/register.vue'),
    // props: true,
  },
];
