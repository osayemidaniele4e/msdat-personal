import axios from 'axios';
import Vue from 'vue';

const apiConfigs = {
  default: process.env.VUE_APP_API_BASE_URL,
  instance1: process.env.VUE_APP_API_BASE_URL1,
  instance3: process.env.VUE_APP_API_BASE_URL3,
};

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
  });

  instance.interceptors.request.use(
    (config) => {
      const newConfig = { ...config, retryCount: config.retryCount || 0 };
      return newConfig;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;

      if (config.retryCount >= config.retries) {
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
      }

      config.retryCount += 1;

      await new Promise((resolve) => setTimeout(resolve, config.retryDelay));

      return instance(config);
    },
  );

  return instance;
};

const AxiosInstances = {
  default: createAxiosInstance(apiConfigs.default),
  instance1: createAxiosInstance(apiConfigs.instance1),
  instance3: createAxiosInstance(apiConfigs.instance3),
};

export const { instance1, instance3 } = AxiosInstances;
export default AxiosInstances.default;
