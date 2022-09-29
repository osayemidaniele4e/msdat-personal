import axios from 'axios';
import Vue from 'vue';
// import VueCookies from 'vue-cookies';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL1,
});
const AUTH_TOKEN = sessionStorage.getItem('custom-access-token');
// eslint-disable-next-line dot-notation
instance.defaults.headers.common['Authorization'] = `token ${AUTH_TOKEN}`;
// instance.interceptors.request.use(
//   (request) => {
//     if (AUTH_TOKEN) {
//       // eslint-disable-next-line no-param-reassign
//       // request.headers.Authorization = `Bearer `;
//       // eslint-disable-next-line no-param-reassign
//       // request.headers.Authorization = ` ${AUTH_TOKEN}`;
//     }
//     return request;
//   },
//   (error) => Promise.reject(error),
// );

Vue.prototype.$axios = instance;

export default instance;
