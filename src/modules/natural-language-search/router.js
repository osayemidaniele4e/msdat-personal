export default [
  {
    path: '/indicator-search',
    name: 'Indicator-Search',
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '/',
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
      {
        path: 'datasource-search/:indicator/:datasource/:period/',
        name: 'datasource-search-view',
        component: () => import('./views/datasourceSearch.vue'),
      },
    ],
  },
];
