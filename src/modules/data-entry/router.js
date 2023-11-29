export default [
  {
    path: '/data-entry',
    name: 'data-entry',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'Data Entry',
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('./views/dashboard.vue'),
        meta: {
          title: 'Data Entry',
        },
      },
      {
        path: 'approval',
        name: 'Approval',
        component: () => import('./views/approval.vue'),
        meta: {
          title: 'Data Entry',
        },
      },
    ],
  },
];
