import axios from 'axios';
import Vue from 'vue';
// import VueCookies from 'vue-cookies';

const authInstance = axios.create({
  baseURL: process.env.VUE_APP_API_DEMO_URL,
});
// const AUTH_TOKEN = sessionStorage.getItem('msdat-access-token');
// eslint-disable-next-line dot-notation
// instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
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

Vue.prototype.$axios = authInstance;

export default authInstance;
