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

// Find all '.js' files in subdirectories
const jsFiles = findJSFiles(basePath);

// Generate plugin import statements and conditions
const pluginImports = jsFiles.map((filePath) => {
  const folderName = path.basename(path.dirname(filePath));
  return `import ${folderName} from './modules/plugins/${folderName}';`;
});

const pluginInstalls = jsFiles.map((filePath) => {
  const folderName = path.basename(path.dirname(filePath));
  return `
  this.pluginsImported.push('${folderName}')
  if (!localStorage.getItem('${folderName}')) {
    localStorage.setItem('${folderName}', 'false');
  }

  if (localStorage.getItem('${folderName}') === 'true') {
    Vue.use(${folderName});
  }
`;
});

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
  </div>

</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import feedback from './views/feedback.vue';
import ShowDataSourcesList from './modules/dynamic_dashboard/components/ShowDataSourcesList.vue';
import WhatsNew from './modules/dynamic_dashboard/components/WhatsNew.vue';
import ApiServices from './modules/data-layer/services/ApiServices';
${pluginImports.join('\n')}

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
      whatsNewContent: [],
    };
  },
   computed: {
    ...mapGetters('appearance', ['viewMode', 'fontSize', 'theme']),
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
  },
  watch: {
    '$store.state.MSDAT_STORE.showDataSourceList': {
      handler(newVal, oldVal) {
        console.log('Investigations App Watch');
        console.log('myVariable changed:', oldVal, '->', newVal);
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
   window.addEventListener('unload', this.handleAppUnload);
   this.startSixHourInterval();
   this.firstTimeExecution();
  // eslint-disable-next-line
    let plugins_imported = [];
    ${pluginInstalls.join('\n')}
    console.log('pluginsImported', this.pluginsImported)
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
      // Add your task logic here
      this.toggleShowWhatsNew();
    },

     async getWhatsNew() {
      const { data } = await ApiServices.getWhatsNew();
      this.whatsNewContent = data.results;
    },

     handleAppUnload() {
      // Perform your cleanup or function call here
      console.log('Application is being unloaded.');
      // Example: Save data to local storage or call an API
      localStorage.removeItem('firstTimeExecution');
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
        localStorage.setItem('firstTimeExecution', 'true');
        setTimeout(() => {
          this.toggleShowWhatsNew();
        }, 30 * 1000); // 30 seconds delay in milliseconds
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
`;

// Write to the output file
fs.writeFileSync(outputFile, appVueCode, 'utf-8');

console.log('App.vue code generated successfully!');
