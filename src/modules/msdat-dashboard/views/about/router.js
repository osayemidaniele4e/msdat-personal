import index from './index.vue';
// import IndicatorTable from '../../components/sections/indicator-overview/IndicatorTable.vue';
import Testimonials from './Testimonials.vue';
import DataTriangulationDashboard from '../dashboard/DataTriangulationDashboard.vue';
import IndicatorTaggingSystem from '../indicator-tagging-system/index.vue'

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
    path: '/advanced-triangulation-dashboard',
    name: 'DataTriangulationDashboard',
    component: DataTriangulationDashboard,
    meta: {
      title: 'Advanced Triangulation Dashboard',
    },
  },
  {
    path: '/indicator-tagging-system',
    name: 'IndicatorTaggingSystem',
    component: IndicatorTaggingSystem,
    meta: {
      title: 'Indicator Tagging System',
    },
  },
  // {
  //   path: '/indicator-table',ss
  //   name: 'Indicator-Table',
  //   component: IndicatorTable,
  // },
];
