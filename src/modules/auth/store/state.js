import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');
console.log(userDetails, 'userDetails@');

export default {
  isAuthenticated: false,
  user: userDetails || {},
  dashboards: [],
};
