// import Home from './views/index.vue';
import Home from './components/table/TableComponent.vue';

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
]
