import state from './state';
import mutations from './mutations';
import { store as AUTH_STORE } from '../../auth';

export default {
  namespaced: true,
  state,
  mutations,
  AUTH_STORE,
};
