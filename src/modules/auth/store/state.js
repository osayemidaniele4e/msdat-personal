import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');
export default {
  isAuthenticated: false,
  user: userDetails || {},
};
