const fs = require('fs');
const path = require('path');

// Change these values to your actual component directory and desired output file
const basePath = path.join(__dirname, '../src/modules/plugins/');
const outputFile = path.join(__dirname, '../src/App.vue');

// Function to recursively find all '.js' files in a directory
const findJSFiles = (dir) => {
  const files = fs.readdirSync(dir);
  let jsFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a directory, recursively search for '.js' files
      jsFiles = jsFiles.concat(findJSFiles(filePath));
    } else if (file.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });

  return jsFiles;
};

// Find all '.js' files in subdirectories, but only keep index.js files
const jsFiles = findJSFiles(basePath).filter((fp) => path.basename(fp) === 'index.js');

// Derive unique plugin folder names from the index.js files
const pluginFolders = Array.from(
  new Set(jsFiles.map((filePath) => path.basename(path.dirname(filePath))))
);

// Generate plugin import statements and conditions
const pluginImports = pluginFolders.map(
  (folderName) => `import ${folderName} from './modules/plugins/${folderName}';`
);

const pluginInstalls = pluginFolders.map(
  (folderName) => `
  this.pluginsImported.push('${folderName}')
  if (!localStorage.getItem('${folderName}')) {
    localStorage.setItem('${folderName}', 'false');
  }

  if (localStorage.getItem('${folderName}') === 'true') {
    Vue.use(${folderName});
  }
`
);

// Build a registry mapping for live toggling
const registryObject = `const registry = {\n${pluginFolders.map((f) => `  ${f},`).join('\n')}\n};`;

// Additional code for App.vue
const appVueCode = `
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
${pluginImports.join('\n')}

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
    ${pluginInstalls.join('\n')}
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
    
    // Live plugin toggling without reload
    onPluginsChanged({ plugin, value }) {
      ${registryObject}

      const pkg = registry[plugin];
      if (!pkg) return;

      if (value) {
        try {
          Vue.use(pkg);
        } catch (e) {
          // already installed or plugin guarded; ignore
        }

        if (Vue.prototype.$pluginBus) {
          Vue.prototype.$pluginBus.$emit('plugin:toggle', { plugin, enabled: true });
          Vue.prototype.$pluginBus.$emit('plugin:enable', plugin);
          Vue.prototype.$pluginBus.$emit(\`plugin:enable:\${plugin}\`);
        }
        this.$root.$emit('plugin:enable', plugin);
      } else {
        if (Vue.prototype.$pluginBus) {
          Vue.prototype.$pluginBus.$emit('plugin:toggle', { plugin, enabled: false });
          Vue.prototype.$pluginBus.$emit('plugin:disable', plugin);
          Vue.prototype.$pluginBus.$emit(\`plugin:disable:\${plugin}\`);
        }
        this.$root.$emit('plugin:disable', plugin);
      }
    },
  },
   beforeDestroy() {
    // Remove the event listener to avoid memory leaks
    window.removeEventListener('unload', this.handleAppUnload);
  },
  created() {
    // global plugin bus for cross-cutting enable/disable notifications
    if (!Vue.prototype.$pluginBus) {
      Vue.prototype.$pluginBus = new Vue();
    }
    // listen to plugin change events emitted from settings or header
    this.$root.$on('plugins:changed', this.onPluginsChanged);
  },
  destroyed() {
    this.$root.$off('plugins:changed', this.onPluginsChanged);
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
`;

// Write to the output file
fs.writeFileSync(outputFile, appVueCode, 'utf-8');

console.log('App.vue code generated successfully!');
