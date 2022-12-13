export default [
  {
    path: '/indicator-search',
    name: 'Indicator-Search',
    component: () => import('./views/index.vue'),
    children: [
      {
        path: 'indicator-table-view',
        name: 'indicator-table-view',
        component: () => import('./views/IndicatorTablePage.vue'),
      },
      {
        path: 'barchart-view',
        name: 'barchart-view',
        component: () => import('./views/BarchartPage.vue'),
      },
      {
        path: 'state-table-view',
        name: 'state-table-view',
        component: () => import('./components/stateTable.vue'),
      },
    ],
  },
];
