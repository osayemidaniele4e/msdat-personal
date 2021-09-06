import Vue from 'vue';
import VueRouter from 'vue-router';
// import { router as MSDAT_ROUTE } from '../modules/msdat-dashboard';
import { router as CUSTOM_DASHBOARD_ROUTE } from '../modules/custom-dashboard';
import { router as STATE_PROFILE_ROUTE } from '../modules/state-profile';
import { router as HEALTH_THINK_ROUTE } from '../modules/health-think';
import DYNAMICS_DASHBOARD_ROUTE from '../modules/dynamic_dashboard/router';

Vue.use(VueRouter);

const routes = [
  // ...MSDAT_ROUTE,
  ...CUSTOM_DASHBOARD_ROUTE,
  ...STATE_PROFILE_ROUTE,
  ...HEALTH_THINK_ROUTE,
  ...DYNAMICS_DASHBOARD_ROUTE,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
