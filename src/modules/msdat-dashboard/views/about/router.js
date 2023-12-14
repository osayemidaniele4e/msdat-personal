import index from './index.vue';
import IndicatorTable from '../../components/sections/indicator-overview/IndicatorTable.vue';
import Testimonials from './Testimonials.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: index,
    meta: {
      title: 'About',
    },
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials,
    meta: {
      title: 'Testimonials',
    },
  },
  {
    path: '/indicator-table',
    name: 'Indicator-Table',
    component: IndicatorTable,
  },
];
