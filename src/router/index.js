import Vue from 'vue';
import VueRouter from 'vue-router';
import MSDAT_ABOUT_ROUTE from '../modules/msdat-dashboard/views/about/router';
import MSDAT_FAQ_ROUTE from '../modules/msdat-dashboard/views/faq/router';
import { router as CUSTOM_DASHBOARD_ROUTE } from '../modules/custom-dashboard';
import { router as STATE_PROFILE_ROUTE } from '../modules/state-profile';
import { router as HEALTH_THINK_ROUTE } from '../modules/health-think';
import DYNAMICS_DASHBOARD_ROUTE from '../modules/dynamic_dashboard/router';
import NotFound from '../modules/msdat-dashboard/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  ...MSDAT_ABOUT_ROUTE,
  ...MSDAT_FAQ_ROUTE,
  ...CUSTOM_DASHBOARD_ROUTE,
  ...STATE_PROFILE_ROUTE,
  ...HEALTH_THINK_ROUTE,
  ...DYNAMICS_DASHBOARD_ROUTE,
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
