import instance from './axios';

const baseURL = process.env.VUE_APP_API_BASE_API2;

const Request = (
  url,
  method = 'POST',
  body = null,
) => new Promise((resolve, reject) => {
  instance({
    url: `${baseURL}${url}`,
    method,
    data: body,
  })
    .then(
      (response) => {
        resolve(response.data);
      },
    )
    .catch((err) => {
      console.log(err, 'error');
      const data = err.response?.data;
      reject(data);
      throw err;
    });
});

export default Request;
