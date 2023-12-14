export default [
  {
    path: '/indicator-search',
    name: 'Indicator-Search',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'Indicator Search',
    },
    children: [
      {
        path: '/',
        name: 'indicator-table-view',
        component: () => import('./views/IndicatorTablePage.vue'),
        meta: {
          title: 'Indicator Search',
        },
      },
      {
        path: 'barchart-view',
        name: 'barchart-view',
        component: () => import('./views/BarchartPage.vue'),
        meta: {
          title: 'Indicator Search',
        },
      },
      {
        path: 'state-table-view',
        name: 'state-table-view',
        component: () => import('./components/stateTable.vue'),
        meta: {
          title: 'Indicator Search',
        },
      },
      {
        path: 'datasource-search/:indicator/:datasource/:period/',
        name: 'datasource-search-view',
        component: () => import('./views/datasourceSearch.vue'),
        meta: {
          title: 'Indicator Search',
        },
      },
    ],
  },
];
