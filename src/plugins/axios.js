import axios from 'axios';
import Vue from 'vue';
import store from '@/store';
import frontendAuthService from '@/modules/auth/services/frontendAuthService';

const apiConfigs = {
  default: process.env.VUE_APP_API_BASE_URL,
  instance1: process.env.VUE_APP_API_BASE_URL1,
  instance3: process.env.VUE_APP_API_BASE_URL3,
  authInstance: process.env.VUE_APP_API_BASE_URL,
};

const createAxiosInstance = (baseURL, withAuth = false, skipHeaders = false) => {
  const instance = axios.create({ 
    baseURL,
    withCredentials: true, 
  });

  if (!skipHeaders) {
    if (withAuth) {
      instance.interceptors.request.use(
        (config) => {
          const newConfig = { ...config };
          // eslint-disable-next-line camelcase
          const token = store.getters['AUTH_STORE/getToken'];
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

    // Add frontend JWT interceptor to all instances
    instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await frontendAuthService.getValidToken();
          config.headers = {
            ...config.headers,
            'X-Frontend-JWT': `Token ${token}`,
          };
        } catch (error) {
          console.error('❌ Failed to add frontend JWT header:', error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  // Add response interceptor to handle 401 errors and retry with new token
  instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
      const originalRequest = error.config;
      
   
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('🔄 Received 401 error, attempting to refresh frontend token...');
        
        originalRequest._retry = true; // Mark request as retried
        
        try {
          // Force refresh the frontend token
          const newToken = await frontendAuthService.refreshToken();
          
          // Update the failed request with new token
          originalRequest.headers['X-Frontend-JWT'] = `Token ${newToken}`;
          
          // Retry the original request
          console.log('✓ Retrying request with new token...');
          return instance(originalRequest);
          
        } catch (refreshError) {
          console.error('❌ Token refresh failed, cannot retry request:', refreshError);
          
          // Show error notification to user
          Vue.swal({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 5000,
            icon: 'error',
            title: 'Authentication Error',
            text: 'Failed to refresh authentication. Please reload the page.',
          });
          
          return Promise.reject(refreshError);
        }
      }
      
    
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
