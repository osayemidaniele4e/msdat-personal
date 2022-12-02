export default function ({ next, router }) {
  if (this.store.getters['AUTH_STORE/isAuthenticated'] === false) {
    console.log(' ', 'You must be logged in to access this page', 'warning');
    return router.push('/');
  }
  return next();
}
