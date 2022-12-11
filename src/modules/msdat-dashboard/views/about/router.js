import Middleware from '@/modules/auth/middleware/route-guard';
import index from './index.vue';
import sidenavVue from './sidenav.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: index,
  },
  {
    path: '/account',
    name: 'Account',
    component: sidenavVue,
    meta: {
      middleware: Middleware,
    },
  },
];
