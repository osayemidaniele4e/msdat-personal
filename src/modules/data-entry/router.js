export default [
  {
    path: '/data-entry',
    name: 'data-entry',
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('./views/dashboard.vue'),
      },
    ],
  },
];
