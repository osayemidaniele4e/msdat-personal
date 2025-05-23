import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

let userDetails = null;
if (typeof window !== 'undefined') {
  userDetails = VueCookies.get('msdat-user-details');
}

const apiConfigs = {
  default: process.env.VUE_APP_API_BASE_URL,
  instance1: process.env.VUE_APP_API_BASE_URL1,
  instance3: process.env.VUE_APP_API_BASE_URL3,
  authInstance: process.env.VUE_APP_API_BASE_URL,
};

const createAxiosInstance = (baseURL, withAuth = false, skipHeaders = false) => {
  const instance = axios.create({ baseURL });

  if (!skipHeaders) {
    if (withAuth) {
      instance.interceptors.request.use(
        (config) => {
          const newConfig = { ...config };
          // eslint-disable-next-line camelcase
          const token = userDetails?.tokens?.access_token;
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
    }

    instance.interceptors.request.use(
      (config) => {
        const newConfig = { ...config };
        newConfig.headers = {
          ...newConfig.headers,
          // 'X-MSDAT-AUTH': 'e4e@devoP$ysadmin2025',
        };
        return newConfig;
      },
      (error) => Promise.reject(error),
    );
  }
  instance.interceptors.response.use(
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

  return instance;
};

const AxiosInstances = {
  default: createAxiosInstance(apiConfigs.default),
  instance1: createAxiosInstance(apiConfigs.instance1),
  instance3: createAxiosInstance(apiConfigs.instance3),
  authInstance: createAxiosInstance(apiConfigs.authInstance, true),
  noHeadersInstance: createAxiosInstance(apiConfigs.instance3, false, true), // <- No headers
};

export const {
  instance1, instance3, authInstance, noHeadersInstance,
} = AxiosInstances;

export default AxiosInstances.default;
