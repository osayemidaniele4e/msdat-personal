// import axios from 'axios';
// import Vue from 'vue';

// const AxiosInstance = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL,
// });

// const AxiosInstance1 = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL1,
// });

// const AxiosInstance3 = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL3,
// });

// // eslint-disable-next-line no-unused-expressions
// AxiosInstance.interceptors?.response.use(
//   (response) => response,
//   (error) => {
//     // console.trace(error);
//     Vue.swal({
//       toast: true,
//       position: 'bottom',
//       showConfirmButton: false,
//       timer: 5000,
//       icon: 'error',
//       title: 'Error Occurred',
//       text: error.message,
//     });
//     return Promise.reject(error);
//   },
// );

// export { AxiosInstance1 };

// export default AxiosInstance;

import axios from 'axios';
import Vue from 'vue';

const apiConfigs = {
  default: process.env.VUE_APP_API_BASE_URL,
  instance1: process.env.VUE_APP_API_BASE_URL1,
  instance3: process.env.VUE_APP_API_BASE_URL3,
};

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });

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
};

export const { instance1, instance3 } = AxiosInstances;
export default AxiosInstances.default;
