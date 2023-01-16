export default {
  getUser: (state) => state.user,
  getToken: (state) => state.user?.token,
  isAuthenticated: (state) => (state.user?.token !== '' && state.user?.token !== undefined),
};
