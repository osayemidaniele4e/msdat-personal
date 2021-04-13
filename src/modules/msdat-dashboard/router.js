import Home from './views/index.vue';
// import Home from './components/table/TableComponent.vue';
import table from './components/table/tableComp.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/table',
    name: 'Dashboard',
    component: table,
    meta: {
      requiresAuth: true,
    },
  },
];
