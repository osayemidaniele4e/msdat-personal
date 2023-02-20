import axios from 'axios';
import Vue from 'vue';

const authInstance = axios.create({
  baseURL: process.env.VUE_APP_API_DEMO_URL,
});

Vue.prototype.$axios = authInstance;

export default authInstance;
