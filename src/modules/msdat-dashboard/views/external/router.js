import ncdc from './dashboards/ncdc.vue';
import ndr1 from './dashboards/ndr1.vue';
import ndr2 from './dashboards/ndr2.vue';
import quarterReview from './dashboards/quarter-review.vue';
import HealthFacilityDashboard from './dashboards/health-facility.vue';

export default [
  {
    path: '/external-ncdc',
    name: 'ncdc',
    component: ncdc,
  },
  {
    path: '/external-ndr1',
    name: 'ndr1',
    component: ndr1,
  },
  {
    path: '/external-ndr2',
    name: 'ndr2',
    component: ndr2,
  },
  {
    path: '/quarterly-review',
    name: 'quarter-review',
    component: quarterReview,
    meta: {
      title: 'Quarterly Performance Assessment',
    },
  },
  {
    path: '/state-health-facility',
    name: 'state-health-facility',
    component: HealthFacilityDashboard,
    meta: {
      title: 'Health Facilities Profile (GIS)',
    },
  },
];
