import axios from 'axios';

const testInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export default testInstance;
