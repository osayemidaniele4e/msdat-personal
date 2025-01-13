<template>
  <div class="position-relative" id="app">
    <router-view />
    <feedback />
    <div v-if="showDataSourceListComponent" class="position-fixed datasource-list">
      <ShowDataSourcesList />
    </div>
    <div v-if="showWhatsNewComponent" class="position-fixed whats-new">
      <WhatsNew />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import feedback from './views/feedback.vue';
import contextPlugin from './modules/plugins/contextPlugin';
import indicatorPlugin from './modules/plugins/indicatorPlugin';
import reviewPlugin from './modules/plugins/reviewPlugin';
import screenshotManager from './modules/plugins/screenshotManager';
import testonePlugin from './modules/plugins/testonePlugin';
import testPlugin from './modules/plugins/testPlugin';
import ShowDataSourcesList from './modules/dynamic_dashboard/components/ShowDataSourcesList.vue';
import WhatsNew from './modules/dynamic_dashboard/components/WhatsNew.vue';

export default {
  components: {
    feedback,
    ShowDataSourcesList,
    WhatsNew,
  },
  data() {
    return {
      pluginsImported: [], // Explicitly specify the type as an array of strings
      showDataSourceListComponent: false, // Replace with your actual state variable
      showWhatsNewComponent: false,
      lastExecutionTime: null,
    };
  },
  // computed: {
  //   ...mapState({
  //     showDataSourceListStatus: (state) => state.showDataSourceList, // Replace with your actual state variable
  //   }),
  // },

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
    '$store.state.MSDAT_STORE.showWhatsNew': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        this.showWhatsNewComponent = newVal;
      },
      deep: true, // If you want to watch nested changes
    },
  },

  async mounted() {
    this.startSixHourInterval();
    this.firstTimeExecution();
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
    ...mapMutations('MSDAT_STORE', ['toggleShowWhatsNew']),

    executeTask() {
      const now = new Date();
      this.lastExecutionTime = now.toLocaleTimeString();
      // Add your task logic here
      this.toggleShowWhatsNew();
    },

    startSixHourInterval() {
      const checkAndExecute = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // Check if it's a 6-hour interval (00:00, 06:00, 12:00, 18:00)
        if (hours % 6 === 0 && minutes === 0) {
          this.executeTask();
        }
      };
      // Check every minute
      setInterval(checkAndExecute, 60 * 1000);
    },

    firstTimeExecution() {
      if (!localStorage.getItem('firstTimeExecution')) {
        setTimeout(() => {
          this.toggleShowWhatsNew();
        }, 2 * 60 * 1000); // 3 minutes delay in milliseconds
      }
    },
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

.whats-new {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 999999;
  top: 1px;
  height: 100vh;
}
</style>
