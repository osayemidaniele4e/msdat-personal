import ncdc from './dashboards/ncdc.vue';
import ndr1 from './dashboards/ndr1.vue';
import ndr2 from './dashboards/ndr2.vue';

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
];
