import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL2,
});

export default instance;
