export default [
  {
    path: '/coming-soon',
    name: 'Index',
    component: () => import('./index.vue'),
    children: [
      {
        path: 'custom_dashboard',
        name: 'Custom-Dashboard',
        component: () => import('./custom_dashboard.vue'),
      },
      {
        path: 'advanced_analytics',
        name: 'Advanced-Analytics',
        component: () => import('./advanced_analytics.vue'),
      },
      {
        path: 'gis_mapping',
        name: 'Gis-Mapping',
        component: () => import('./gis_mapping.vue'),
      },
      {
        path: 'health_surveillance',
        name: 'Health-Surveillance',
        component: () => import('./health_surveillance.vue'),
      },
    ],
  },
];
