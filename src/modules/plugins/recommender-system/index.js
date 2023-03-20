import Vue from 'vue';
// import drag from 'v-drag';
import RecommenderView from './RecommenderView';

// Vue.use(drag, {
//   // options here
// });

export default {
  install(vue, opts) {
    // Create plugin's root Vue instance
    const root = new Vue({
      // data: { targets: options.data.targets },
      render: (createElement) => createElement(RecommenderView),
    });

    vue.component('reco-view', RecommenderView);

    // Mount root Vue instance on new div element added to body
    root.$mount(document.body.appendChild(document.createElement('div')));

    // Register data mutation handlers on root instance

    // Make the root instance available in all components
    vue.prototype.$recommenderSystem = root;
  },
};
