import Vue from 'vue';
import VueRouter from 'vue-router';
import createPersistedState from 'vuex-persistedstate';
import store from '@/store/index';
import USER_ROUTE from '@/modules/msdat-dashboard/views/userLog/router';
import MSDAT_ABOUT_ROUTE from '@/modules/msdat-dashboard/views/about/router';
import CREATE_PLUGIN_ROUTE from '@/modules/msdat-dashboard/views/create_plugin/router';
import MSDAT_SETTINGS_ROUTE from '@/modules/msdat-dashboard/views/settings/router';
import MSDAT_EXTERNAL_ROUTE from '@/modules/msdat-dashboard/views/external/router';
import MSDAT_FAQ_ROUTE from '@/modules/msdat-dashboard/views/faq/router';
import MSDAT_UPDATE_LOG from '@/modules/msdat-dashboard/views/update_log/router';
import { router as CUSTOM_DASHBOARD_ROUTE } from '@/modules/custom-dashboard';
import { router as STATE_PROFILE_ROUTE } from '@/modules/state-profile';
import { router as HEALTH_THINK_ROUTE } from '@/modules/health-think';
import DYNAMICS_DASHBOARD_ROUTE from '@/modules/dynamic-dashboard/router';
import COMING_SOON from '@/modules/coming-soon/router';
import NATURAL_LANGUAGE_SEARCH from '@/modules/natural-language-search/router';
import NotFound from '@/modules/msdat-dashboard/views/NotFound.vue';
import AUTH_ROUTE from '@/modules/auth/router';
import DATA_ENTRY from '@/modules/data-entry/router';

Vue.use(VueRouter);

const routes = [
  ...MSDAT_ABOUT_ROUTE,
  ...MSDAT_SETTINGS_ROUTE,
  ...MSDAT_EXTERNAL_ROUTE,
  ...MSDAT_FAQ_ROUTE,
  ...MSDAT_UPDATE_LOG,
  ...CUSTOM_DASHBOARD_ROUTE,
  ...STATE_PROFILE_ROUTE,
  ...HEALTH_THINK_ROUTE,
  ...DYNAMICS_DASHBOARD_ROUTE,
  ...COMING_SOON,
  ...NATURAL_LANGUAGE_SEARCH,
  ...AUTH_ROUTE,
  ...USER_ROUTE,
  ...DATA_ENTRY,
  ...CREATE_PLUGIN_ROUTE,
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['AUTH_STORE/isAuthenticated'];
  const requireAuth = to.matched.some((record) => record.meta.requiresAuth);

  window.document.title = to.meta && to.meta.title ? `MSDAT Nigeria | ${to.meta.title.trim()}` : 'MSDAT Nigeria';

  if (window.document.location.pathname.startsWith('/dashboard/')) {
    const pageTitle = `MSDAT Nigeria | ${window.document.location.pathname.split('/')[2].replaceAll('_', ' ')}`;

    const titleEl = document.querySelector('head meta[property="og:title"]');
    const titleEl2 = document.querySelector('head meta[name="twitter:title"]');
    titleEl.setAttribute('content', pageTitle);
    titleEl2.setAttribute('content', pageTitle);
  }

  if (!isAuthenticated && requireAuth) {
    // eslint-disable-next-line no-alert
    alert('Access Denied, Please Login');
    next({
      path: '/',
    });
  } else {
    next(); // make sure to always call next()!
  }
});
export default router;
