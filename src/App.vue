<template>
 <div class="position-relative" id="app">
    <router-view />
    <feedback />
    <div v-if="showDataSourceListComponent" class="position-fixed datasource-list">
      <ShowDataSourcesList />
    </div>
      <div v-if="showWhatsNewComponent && whatsNewContent.length" class="position-fixed whats-new">
      <WhatsNew />
    </div>
    <div v-if="showShareSectionComponent" class="position-fixed whats-new">
      <ShareSection />
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import feedback from './views/feedback.vue';
import ShowDataSourcesList from './modules/dynamic_dashboard/components/ShowDataSourcesList.vue';
import WhatsNew from './modules/dynamic_dashboard/components/WhatsNew.vue';
import ShareSection from './modules/dynamic_dashboard/components/ShareSection.vue';
import ApiServices from './modules/data-layer/services/ApiServices';
import contextPlugin from './modules/plugins/contextPlugin';
import indicatorPlugin from './modules/plugins/indicatorPlugin';
import reviewPlugin from './modules/plugins/reviewPlugin';
import screenshotManager from './modules/plugins/screenshotManager';
import testonePlugin from './modules/plugins/testonePlugin';
import testPlugin from './modules/plugins/testPlugin';

export default {
  components: {
    feedback,
    ShowDataSourcesList,
    WhatsNew,
    ShareSection,
  },
  data() {
    return {
      pluginsImported: [], // Explicitly specify the type as an array of strings
      showDataSourceListComponent: false, // Replace with your actual state variable
      showWhatsNewComponent: false,
      lastExecutionTime: null,
      whatsNewContent: [],
      showShareSectionComponent: false,
    };
  },
  computed: {
    ...mapGetters('appearance', ['viewMode', 'fontSize', 'theme']),
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
  },
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
    '$store.state.MSDAT_STORE.showShareSection': {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        this.showShareSectionComponent = newVal;
      },
      deep: true, // If you want to watch nested changes
    },
    viewMode(newMode) {
      document.body.className = newMode;
    },
    fontSize(newSize) {
      document.documentElement.style.fontSize = newSize;
    },
    theme(newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme);
    },
  },
  async mounted() {
    await this.getWhatsNew();
    window.addEventListener('unload', this.handleAppUnload);

    this.startSixHourInterval();
    this.firstTimeExecution();

    // eslint-disable-next-line
    let plugins_imported = [];

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

    await this.SET_PLUGINS_IMPORTED(this.pluginsImported);
    document.body.className = this.viewMode;
    document.documentElement.style.fontSize = this.fontSize;
    document.documentElement.setAttribute('data-theme', this.theme);
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
    ...mapActions(['SET_PLUGINS_IMPORTED']),
    ...mapMutations('MSDAT_STORE', ['toggleShowWhatsNew']),

    executeTask() {
      const now = new Date();
      this.lastExecutionTime = now.toLocaleTimeString();
      this.toggleShowWhatsNew();
    },

    async getWhatsNew() {
      const { data } = await ApiServices.getWhatsNew();
      this.whatsNewContent = data.results;
    },

    handleAppUnload() {
      console.log('Application is being unloaded.');
      localStorage.removeItem('firstTimeExecution');
    },

    startSixHourInterval() {
      const checkAndExecute = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        if (hours % 6 === 0 && minutes === 0) {
          this.executeTask();
        }
      };
      setInterval(checkAndExecute, 60 * 1000);
    },

    firstTimeExecution() {
      const alreadyExecuted = localStorage.getItem('firstTimeExecution');
      if (!alreadyExecuted) {
        localStorage.setItem('firstTimeExecution', 'true');
        setTimeout(() => {
          this.toggleShowWhatsNew();
        }, 30 * 1000); // Delay of 30 seconds
      }
    },

  },
  beforeDestroy() {
    // Remove the event listener to avoid memory leaks
    window.removeEventListener('unload', this.handleAppUnload);
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
  .light {
  background-color: #ffffff;
  color: #000000;
}

.dark {
  background-color: #000000;
  color: #ffffff;
}

/* Define styles for different font sizes */
html {
  font-size: 16px; /* default */
}

html.small {
  font-size: 14px;
}

html.medium {
  font-size: 20px;
}

html.large {
  font-size: 24px;
}

/* Define styles for different themes */
[data-theme='default'] {
  --primary-color: #28a745;
  --secondary-color: #20c997;
  --background-color: #e9ecef;
}

[data-theme='calm'] {
  --primary-color: #007bff;
  --secondary-color: #17a2b8;
  --background-color: #e3f2fd;
}

[data-theme='neutral'] {
  --primary-color: #EA4700;
  --secondary-color: #EE6C33;
  --background-color: #FBDACC;
}

</style>
