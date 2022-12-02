import Middleware from '@/modules/auth/middleware/route-guard';
import index from './index.vue';
import dashboard from './userActivity.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: index,
  },
  {
    path: '/userHistory',
    name: 'Dashboard',
    component: dashboard,
    meta: {
      middleware: Middleware,
    },
  },
];
