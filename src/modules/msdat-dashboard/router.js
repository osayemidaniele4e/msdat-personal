// import Home from './views/index.vue';
import Home from './components/table.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
];
