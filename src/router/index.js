import Vue from 'vue';
import VueRouter from 'vue-router';
import createPersistedState from 'vuex-persistedstate';
import MSDAT_ABOUT_ROUTE from '../modules/msdat-dashboard/views/about/router';
import MSDAT_FAQ_ROUTE from '../modules/msdat-dashboard/views/faq/router';
import MSDAT_UPDATE_LOG from '../modules/msdat-dashboard/views/update_log/router';
import { router as ADVANCED_ANALYTICS_ROUTE } from '../modules/advanced-analytics';
import { router as CUSTOM_DASHBOARD_ROUTE } from '../modules/custom-dashboard';
import { router as STATE_PROFILE_ROUTE } from '../modules/state-profile';
import { router as HEALTH_THINK_ROUTE } from '../modules/health-think';
import DYNAMICS_DASHBOARD_ROUTE from '../modules/dynamic_dashboard/router';
import COMING_SOON from '../modules/coming-soon/router';
import NotFound from '../modules/msdat-dashboard/views/NotFound.vue';
import AUTH_ROUTE from '../modules/auth/router';

Vue.use(VueRouter);

const routes = [
  ...MSDAT_ABOUT_ROUTE,
  ...MSDAT_FAQ_ROUTE,
  ...MSDAT_UPDATE_LOG,
  ...ADVANCED_ANALYTICS_ROUTE,
  ...CUSTOM_DASHBOARD_ROUTE,
  ...STATE_PROFILE_ROUTE,
  ...HEALTH_THINK_ROUTE,
  ...DYNAMICS_DASHBOARD_ROUTE,
  ...COMING_SOON,
  ...AUTH_ROUTE,
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  plugins: [createPersistedState()],
  base: process.env.BASE_URL,
  routes,
});

export default router;
