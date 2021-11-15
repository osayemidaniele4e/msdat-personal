export default [
  {
    path: '/gis-mapping/coming-soon',
    name: 'Gis_ComingSoon',
    component: () => import('./GisMapping.vue'),
  },
  {
    path: '/advanced-analytics/coming-soon',
    name: 'AdvancedAnalytics_ComingSoon',
    component: () => import('./AdvancedAnalytics.vue'),
  },
];
