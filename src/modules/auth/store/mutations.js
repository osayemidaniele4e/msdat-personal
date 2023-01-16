export default {
  setUser(state, payload) {
    state.user = payload;
    state.isAuthenticated = true;
  },
  setToken(state, payload) {
    state.authToken = payload;
  },
  logout(state) {
    state.user = {};
    state.isAuthenticated = false;
  },
};
