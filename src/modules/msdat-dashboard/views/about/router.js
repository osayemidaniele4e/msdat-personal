import index from './index.vue';
import IndicatorTable from '../../components/sections/indicator-overview/IndicatorTable.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: index,
  },
  {
    path: '/indicator-table',
    name: 'Indicator-Table',
    component: IndicatorTable,
  },
];
