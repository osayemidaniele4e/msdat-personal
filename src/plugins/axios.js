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
  authInstance: process.env.VUE_APP_API_BASE_URL, // Add an API base URL for authenticated requests
};

const createAxiosInstance = (baseURL, withAuth = false) => {
  const instance = axios.create({ baseURL });

  if (withAuth) {
    instance.interceptors.request.use(
      (config) => {
        const newConfig = { ...config };
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
  }

  instance.interceptors.request.use(
    (config) => {
      const newConfig = { ...config };
      newConfig.headers = {
        ...newConfig.headers,
        'X-MSDAT-AUTH': 'e4e@devoP$ysadmin2025',
      };
      return newConfig;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

const AxiosInstances = {
  default: createAxiosInstance(apiConfigs.default),
  instance1: createAxiosInstance(apiConfigs.instance1),
  instance3: createAxiosInstance(apiConfigs.instance3),
  authInstance: createAxiosInstance(apiConfigs.authInstance, true), // Authenticated instance
};

export const { instance1, instance3, authInstance } = AxiosInstances;
export default AxiosInstances.default;
