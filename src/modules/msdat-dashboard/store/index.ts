import state from './state';
import mutations from './mutations';
import getters from './getters';
import { store as AUTH_STORE } from '../../auth';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  AUTH_STORE,
};
