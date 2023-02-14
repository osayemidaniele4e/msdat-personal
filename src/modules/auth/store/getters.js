export default {
  getUser: (state) => state.user,
  getToken: (state) => state.user?.token,
  isAuthenticated: (state) =>
    state.user?.tokens?.access_token !== '' && state.user?.tokens?.access_token !== undefined,
};
