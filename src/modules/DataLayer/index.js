import store from './store/index';
import DB from './config/dexie';
import DataBase from './services/LayerService';
import mixin from './mixin';
import ActivityLogger from './components/ActivityLogger.vue';

export default {
  install(Vue, options) {
    if (!options || !options.store) {
      throw new Error('Please initialize plugin with a Vuex store.');
    }
    // Register modals vuex module
    options.store.registerModule('DL', store);
    // install Mixins
    Vue.mixin(mixin);
    // install components
    Vue.component(ActivityLogger);

    const db = new DataBase(DB, options.store);
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$DL = db;
  },
};
