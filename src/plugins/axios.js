import axios from 'axios';
import Vue from 'vue';

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

AxiosInstance.interceptors?.response.use(
  (response) => response,
  (error) => {
    // console.trace(error);
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

export default AxiosInstance;
