import router from './router';
import state from './store/state';
import mutations from './store/mutations';
import actions from './store/actions';
import getters from './store/getters';

const store = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export {
  router,
  store,
};
