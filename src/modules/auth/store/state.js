import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');
console.log(userDetails, 'uuuuu');
export default {
  isAuthenticated: false,
  user: userDetails || {},
  dashboards: {}
};
