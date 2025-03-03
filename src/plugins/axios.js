import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';

// const userDetails = VueCookies.get('msdat-user-details');
let userDetails = null;
if (typeof window !== 'undefined') {
  userDetails = VueCookies.get('msdat-user-details');
}

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const AxiosInstance1 = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL1,
});

const AxiosInstance3 = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL1,
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Vue.swal({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      icon: 'error',
      title: 'Error Occurred',
      text: error.message,
    });
    return Promise.reject(error);
  },
);

AxiosInstance3.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }; // Create a shallow copy
    const token = userDetails.tokens.access_token;

    if (token) {
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

export { AxiosInstance1, AxiosInstance3 };
export default AxiosInstance;
