<template>
  <div class="position-relative" id="app">
    <router-view />
    <feedback />
    <div v-if="showDataSourceListComponent" class="position-fixed datasource-list">
      <ShowDataSourcesList />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import feedback from './views/feedback.vue';
import contextPlugin from './modules/plugins/contextPlugin';
import indicatorPlugin from './modules/plugins/indicatorPlugin';
import reviewPlugin from './modules/plugins/reviewPlugin';
import screenshotManager from './modules/plugins/screenshotManager';
import testonePlugin from './modules/plugins/testonePlugin';
import testPlugin from './modules/plugins/testPlugin';
import ShowDataSourcesList from './modules/dynamic_dashboard/components/ShowDataSourcesList.vue';

export default {
  components: {
    feedback,
    ShowDataSourcesList,
  },
  data() {
    return {
      pluginsImported: [], // Explicitly specify the type as an array of strings
      showDataSourceListComponent: false, // Replace with your actual state variable
    };
  },
  computed: {
    ...mapState({
      showDataSourceListStatus: (state) => state.showDataSourceList, // Replace with your actual state variable
    }),
  },

  // watch: {
  //   showDataSourceListStatus(newVal, oldVal) {
  //     console.log('myVariable changed:', oldVal, '->', newVal);
  //   },
  // },

  watch: {
    '$store.state.MSDAT_STORE.showDataSourceList': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        this.showDataSourceListComponent = newVal;
      },
      deep: true, // If you want to watch nested changes
    },
  },

  async mounted() {
    // eslint-disable-next-line
    const plugins_imported = [];

    this.pluginsImported.push('contextPlugin');
    if (!localStorage.getItem('contextPlugin')) {
      localStorage.setItem('contextPlugin', 'false');
    }

    if (localStorage.getItem('contextPlugin') === 'true') {
      Vue.use(contextPlugin);
    }

    this.pluginsImported.push('indicatorPlugin');
    if (!localStorage.getItem('indicatorPlugin')) {
      localStorage.setItem('indicatorPlugin', 'false');
    }

    if (localStorage.getItem('indicatorPlugin') === 'true') {
      Vue.use(indicatorPlugin);
    }

    this.pluginsImported.push('reviewPlugin');
    if (!localStorage.getItem('reviewPlugin')) {
      localStorage.setItem('reviewPlugin', 'false');
    }

    if (localStorage.getItem('reviewPlugin') === 'true') {
      Vue.use(reviewPlugin);
    }

    this.pluginsImported.push('screenshotManager');
    if (!localStorage.getItem('screenshotManager')) {
      localStorage.setItem('screenshotManager', 'false');
    }

    if (localStorage.getItem('screenshotManager') === 'true') {
      Vue.use(screenshotManager);
    }

    this.pluginsImported.push('testonePlugin');
    if (!localStorage.getItem('testonePlugin')) {
      localStorage.setItem('testonePlugin', 'false');
    }

    if (localStorage.getItem('testonePlugin') === 'true') {
      Vue.use(testonePlugin);
    }

    this.pluginsImported.push('testPlugin');
    if (!localStorage.getItem('testPlugin')) {
      localStorage.setItem('testPlugin', 'false');
    }

    if (localStorage.getItem('testPlugin') === 'true') {
      Vue.use(testPlugin);
    }

    console.log('pluginsImported', this.pluginsImported);
    await this.SET_PLUGINS_IMPORTED(this.pluginsImported);
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
    ...mapActions(['SET_PLUGINS_IMPORTED']),
  },
};
</script>

<style lang="scss">
.custom-swal-image {
  margin: 0px !important; /* Adjust the margin as needed */
  float: left; /* Align the image to the left of the text */
}

.datasource-list {
  position: fixed;
  right: 10px;
  z-index: 999999;
  top: 10rem;
  height: 48rem;
}
</style>
