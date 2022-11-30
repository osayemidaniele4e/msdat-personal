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
  },
];
