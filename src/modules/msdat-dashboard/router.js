// import Home from './views/index.vue';
import Home from './components/map/map';

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
