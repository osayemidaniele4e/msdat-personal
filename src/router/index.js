import Vue from 'vue';
import VueRouter from 'vue-router';
import { router as MSDAT_ROUTE } from '../modules/msdat-dashboard';
import { router as CUSTOM_DASHBOARD_ROUTE } from '../modules/custom-dashboard';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  ...MSDAT_ROUTE,
  ...CUSTOM_DASHBOARD_ROUTE,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
