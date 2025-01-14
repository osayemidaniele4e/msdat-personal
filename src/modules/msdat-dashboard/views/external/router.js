import ncdc from './dashboards/ncdc.vue';
import ndr1 from './dashboards/ndr1.vue';
import ndr2 from './dashboards/ndr2.vue';
import ministers from './dashboards/ministers.vue';
import quarterReview from './dashboards/quarter-review.vue';
import HealthFacilityDashboard from './dashboards/health-facility.vue';
import goggleForm from './dashboards/goggleForm.vue';
import healthServiceUptake from './dashboards/health-service-uptake.vue';
import IndicatorPreview from './dashboards/Minister of Health Dashboard/dashboard-landing-page.vue';

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
    path: '/ministers-dashboard',
    name: 'ministers-dashboard',
    component: ministers,
    meta: {
      title: 'Minister of Health Dashboard',
    },
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
    path: '/health-service-uptake',
    name: 'quarter-review',
    component: healthServiceUptake,
    meta: {
      title: 'Health Service Uptake (NHMIS-Quarterly)',
    },
  },
  {
    path: '/data-partnership',
    name: 'quarter-review',
    component: goggleForm,
    meta: {
      title: 'MSDAT DATA PARTNERSHIP REQUEST FORM',
    },
  },
  {
    path: '/state-health-facility',
    name: 'state-health-facility',
    component: HealthFacilityDashboard,
    meta: {
      title: 'Health Facilities Finder',
    },
  },
  {
    path: '/dashboard-landing-page',
    name: 'state-health-facility',
    component: IndicatorPreview,
    meta: {
      title: 'SECTOR WIDE APPROACH PLATFORM Minister of Health Dashboard',
    },
  },
];
