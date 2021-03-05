import Vue from 'vue';
import VueRouter from 'vue-router';
import { router as MSDAT_ROUTE } from '../modules/msdat-dashboard';

Vue.use(VueRouter);

const routes = [
  ...MSDAT_ROUTE,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
