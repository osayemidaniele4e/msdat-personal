import TableHome from './views/Table.vue';
import Home from './components/table/TableComponent.vue';
// import table from './components/table/TableComponent.vue';

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
    name: 'table',
    component: TableHome,
    meta: {
      requiresAuth: true,
    },
  },
];
