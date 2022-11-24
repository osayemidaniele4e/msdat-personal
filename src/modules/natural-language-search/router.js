export default [
  {
    path: '/indicator-search',
    name: 'Indicator-Search',
    component: () => import('./index.vue'),
    // children: [
    //   {
    //     path: 'custom_dashboard',
    //     name: 'Custom-Dashboard',
    //     component: () => import('./custom_dashboard.vue'),
    //   },
    // ],
  },
];
