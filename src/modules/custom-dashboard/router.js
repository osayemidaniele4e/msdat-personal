import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/custom',
      name: 'custom-dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/landing.vue'),
    },
    {
      path: '/custom/details',
      name: 'dashboard-details',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboardDetails.vue'),
    },
    {
      path: '/custom/preferences',
      name: 'dashboard-preferences',
      component: () => import(/* webpackChunkName: "about" */ './views/preferences.vue'),
    },
  ],
});
