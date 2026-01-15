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
    
    <!-- Global Chatbot -->
    <div class="global-chatbot-wrapper">
      <ChatBot ref="globalChatBot" />
      <button 
        class="global-chat-trigger" 
        @click="$refs.globalChatBot.toggleChat()" 
        title="Metadata Chatbot"
        aria-label="Open AI Chatbot"
      >
        <svg width="24" height="24" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 0C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2C13 2.74 12.6 3.39 12 3.73V5H13C14.8565 5 16.637 5.7375 17.9497 7.05025C19.2625 8.36301 20 10.1435 20 12H21C21.2652 12 21.5196 12.1054 21.7071 12.2929C21.8946 12.4804 22 12.7348 22 13V16C22 16.2652 21.8946 16.5196 21.7071 16.7071C21.5196 16.8946 21.2652 17 21 17H20V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V17H1C0.734784 17 0.48043 16.8946 0.292893 16.7071C0.105357 16.5196 0 16.2652 0 16V13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H2C2 10.1435 2.7375 8.36301 4.05025 7.05025C5.36301 5.7375 7.14348 5 9 5H10V3.73C9.4 3.39 9 2.74 9 2C9 1.46957 9.21071 0.960859 9.58579 0.585786C9.96086 0.210714 10.4696 0 11 0ZM6.5 11C5.83696 11 5.20107 11.2634 4.73223 11.7322C4.26339 12.2011 4 12.837 4 13.5C4 14.163 4.26339 14.7989 4.73223 15.2678C5.20107 15.7366 5.83696 16 6.5 16C7.16304 16 7.79893 15.7366 8.26777 15.2678C8.73661 14.7989 9 14.163 9 13.5C9 12.837 8.73661 12.2011 8.26777 11.7322C7.79893 11.2634 7.16304 11 6.5 11ZM15.5 11C14.837 11 14.2011 11.2634 13.7322 11.7322C13.2634 12.2011 13 12.837 13 13.5C13 14.163 13.2634 14.7989 13.7322 15.2678C14.2011 15.7366 14.837 16 15.5 16C16.163 16 16.7989 15.7366 17.2678 15.2678C17.7366 14.7989 18 14.163 18 13.5C18 12.837 17.7366 12.2011 17.2678 11.7322C16.7989 11.2634 16.163 11 15.5 11Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import feedback from './views/feedback.vue';
import ShowDataSourcesList from './modules/dynamic_dashboard/components/ShowDataSourcesList.vue';
import WhatsNew from './modules/dynamic_dashboard/components/WhatsNew.vue';
import ShareSection from './modules/dynamic_dashboard/components/ShareSection.vue';import ChatBot from './modules/msdat-dashboard/components/ChatBot.vue';import ApiServices from './modules/data-layer/services/ApiServices';
${pluginImports.join('\n')}

export default {
 components: {
    feedback,
    ShowDataSourcesList,
    WhatsNew,
    ShareSection,
    ChatBot,
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
      setTimeout(() => {
        const alreadyExecuted = localStorage.getItem('firstTimeExecution');
        if (alreadyExecuted === null) {
          localStorage.setItem('firstTimeExecution', 'true');
          this.toggleShowWhatsNew();
        }
      }, 60 * 1000);

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

/* Global Chatbot Styles */
.global-chatbot-wrapper {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 99999;
}

.global-chat-trigger {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 125, 83, 0.75) 0%, rgba(0, 168, 107, 0.75) 100%);
  border: none;
  box-shadow: 0 4px 16px rgba(0, 125, 83, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.global-chat-trigger:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 125, 83, 0.45);
  background: linear-gradient(135deg, rgba(0, 125, 83, 0.9) 0%, rgba(0, 168, 107, 0.9) 100%);
}

.global-chat-trigger:active {
  transform: scale(0.98);
}

.global-chat-trigger svg {
  width: 28px;
  height: 28px;
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

/* Dark Mode Styles */
[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-muted: #888888;
  --border-color: #444444;
  --border-light: #555555;
  --hover-bg: #404040;
  --active-bg: #505050;
  --input-bg: #333333;
  --input-border: #666666;
  --button-primary: #007bff;
  --button-secondary: #6c757d;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
}

/* Global Dark Mode Overrides */
[data-theme='dark'] body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

[data-theme='dark'] .card {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .card-header {
  background-color: var(--bg-tertiary);
  border-bottom-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .card-body {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] .btn {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .btn:hover {
  background-color: var(--hover-bg);
  border-color: var(--border-light);
}

[data-theme='dark'] .btn-primary {
  background-color: var(--button-primary);
  border-color: var(--button-primary);
}

[data-theme='dark'] .btn-secondary {
  background-color: var(--button-secondary);
  border-color: var(--button-secondary);
}

[data-theme='dark'] .form-control {
  background-color: var(--input-bg);
  border-color: var(--input-border);
  color: var(--text-primary);
}

[data-theme='dark'] .form-control:focus {
  background-color: var(--input-bg);
  border-color: var(--button-primary);
  color: var(--text-primary);
}

[data-theme='dark'] .form-control::placeholder {
  color: var(--text-muted);
}

[data-theme='dark'] input[type="text"],
[data-theme='dark'] input[type="email"],
[data-theme='dark'] input[type="password"],
[data-theme='dark'] textarea,
[data-theme='dark'] select {
  background-color: var(--input-bg);
  border-color: var(--input-border);
  color: var(--text-primary);
}

[data-theme='dark'] .table {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] .table thead th {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .table tbody tr {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme='dark'] .table tbody tr:hover {
  background-color: var(--hover-bg);
}

[data-theme='dark'] .table tbody td {
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .modal-content {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] .modal-header {
  background-color: var(--bg-tertiary);
  border-bottom-color: var(--border-color);
}

[data-theme='dark'] .modal-body {
  background-color: var(--bg-secondary);
}

[data-theme='dark'] .modal-footer {
  background-color: var(--bg-tertiary);
  border-top-color: var(--border-color);
}

[data-theme='dark'] .dropdown-menu {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme='dark'] .dropdown-item {
  color: var(--text-primary);
}

[data-theme='dark'] .dropdown-item:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

[data-theme='dark'] .nav-tabs .nav-link {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-secondary);
}

[data-theme='dark'] .nav-tabs .nav-link.active {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .alert {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .badge {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Plugin Cards Dark Mode */
[data-theme='dark'] .plugin-item {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .plugin-item:hover {
  background-color: var(--hover-bg);
}

[data-theme='dark'] .plugin-item .card-title,
[data-theme='dark'] .plugin-item .card-text {
  color: var(--text-primary);
}

/* Notification Items Dark Mode */
[data-theme='dark'] .notification-item {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .notification-item:hover {
  background-color: var(--hover-bg);
}

/* Control Panel Dark Mode */
[data-theme='dark'] #control-panel {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel .label-text {
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel .check-label {
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel button {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel button:hover {
  background-color: var(--hover-bg);
}

[data-theme='dark'] #control-panel .dropdown-toggle {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel .dropdown-menu {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme='dark'] #control-panel .dropdown-item {
  color: var(--text-primary);
}

[data-theme='dark'] #control-panel .dropdown-item:hover {
  background-color: var(--hover-bg);
}

[data-theme='dark'] #control-panel .voice-control-button {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* Admin Dashboard Dark Mode */
[data-theme='dark'] .admin-info label {
  color: var(--text-primary);
}

[data-theme='dark'] .admin-info input:disabled {
  background-color: var(--input-bg);
  border-color: var(--input-border);
  color: var(--text-secondary);
}

[data-theme='dark'] .admin-info button {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .admin-info button:hover {
  background-color: var(--hover-bg);
}

[data-theme='dark'] .admin-info .text-muted {
  color: var(--text-muted);
}

/* Security Section Dark Mode */
[data-theme='dark'] .security-section .form-check-label {
  color: var(--text-primary);
}

[data-theme='dark'] .security-section .form-check-input {
  background-color: var(--input-bg);
  border-color: var(--input-border);
}

/* Header Dark Mode */
[data-theme='dark'] header {
  background-color: var(--bg-secondary) !important;
  border-bottom-color: var(--border-color) !important;
}

[data-theme='dark'] header .navbar-brand,
[data-theme='dark'] header .nav-link {
  color: var(--text-primary) !important;
}

[data-theme='dark'] header .navbar-toggler {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
}

/* Sidebar Dark Mode */
[data-theme='dark'] .sidebar {
  background-color: var(--bg-secondary);
  border-right-color: var(--border-color);
}

[data-theme='dark'] .sidebar .nav-link {
  color: var(--text-primary);
}

[data-theme='dark'] .sidebar .nav-link:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

[data-theme='dark'] .sidebar .nav-link.active {
  background-color: var(--active-bg);
  color: var(--text-primary);
}

/* Footer Dark Mode */
[data-theme='dark'] footer {
  background-color: var(--bg-secondary);
  border-top-color: var(--border-color);
  color: var(--text-primary);
}

/* BootstrapVue Component Overrides */
[data-theme='dark'] .b-sidebar {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] .b-sidebar .b-sidebar-header {
  background-color: var(--bg-tertiary);
  border-bottom-color: var(--border-color);
}

[data-theme='dark'] .b-sidebar .b-sidebar-body {
  background-color: var(--bg-secondary);
}

[data-theme='dark'] .b-toast {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme='dark'] .b-toast .toast-header {
  background-color: var(--bg-tertiary);
  border-bottom-color: var(--border-color);
}

[data-theme='dark'] .b-modal .modal-content {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

[data-theme='dark'] .b-dropdown .dropdown-menu {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme='dark'] .b-dropdown .dropdown-item {
  color: var(--text-primary);
}

[data-theme='dark'] .b-dropdown .dropdown-item:hover {
  background-color: var(--hover-bg);
}

/* Chart Containers Dark Mode */
[data-theme='dark'] .chart-container {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

[data-theme='dark'] .chart-container .highcharts-background {
  fill: var(--bg-secondary);
}

[data-theme='dark'] .chart-container .highcharts-title,
[data-theme='dark'] .chart-container .highcharts-subtitle {
  fill: var(--text-primary);
}

[data-theme='dark'] .chart-container .highcharts-axis-labels text {
  fill: var(--text-primary);
}

[data-theme='dark'] .chart-container .highcharts-tooltip {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Loading States Dark Mode */
[data-theme='dark'] .loading-overlay {
  background-color: rgba(26, 26, 26, 0.8);
}

[data-theme='dark'] .spinner-border {
  border-color: var(--button-primary);
  border-right-color: transparent;
}

/* Error States Dark Mode */
[data-theme='dark'] .error-message {
  background-color: var(--bg-tertiary);
  border-color: var(--danger-color);
  color: var(--text-primary);
}

/* Success States Dark Mode */
[data-theme='dark'] .success-message {
  background-color: var(--bg-tertiary);
  border-color: var(--success-color);
  color: var(--text-primary);
}

/* Warning States Dark Mode */
[data-theme='dark'] .warning-message {
  background-color: var(--bg-tertiary);
  border-color: var(--warning-color);
  color: var(--text-primary);
}

/* Info States Dark Mode */
[data-theme='dark'] .info-message {
  background-color: var(--bg-tertiary);
  border-color: var(--info-color);
  color: var(--text-primary);
}

/* Focus States Dark Mode */
[data-theme='dark'] *:focus {
  outline-color: var(--button-primary);
}

/* Selection States Dark Mode */
[data-theme='dark'] ::selection {
  background-color: var(--button-primary);
  color: var(--text-primary);
}

/* Scrollbar Dark Mode */
[data-theme='dark'] ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

[data-theme='dark'] ::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

[data-theme='dark'] ::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
  background: var(--border-light);
}

/* Print Styles - Ensure dark mode doesn't affect printing */
@media print {
  [data-theme='dark'] * {
    color: black !important;
    background: white !important;
  }
}

</style>
`;

// Write to the output file
fs.writeFileSync(outputFile, appVueCode, 'utf-8');

console.log('App.vue code generated successfully!');
