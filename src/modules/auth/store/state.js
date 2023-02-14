import VueCookies from 'vue-cookies';

const userDetails = VueCookies.get('msdat-user-details');
console.log(userDetails);
export default {
  isAuthenticated: false,
  user: userDetails || {},
};
