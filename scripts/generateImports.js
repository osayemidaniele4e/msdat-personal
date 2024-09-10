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
  <div id="app">
    <router-view />
     <feedback/>

  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import feedback from './views/feedback.vue';
${pluginImports.join('\n')}

export default {
 components: {
    feedback,
  },
  data() {
    return {
      pluginsImported: [] // Explicitly specify the type as an array of strings
    };
  },
  async mounted() {
    let plugins_imported = [];
    ${pluginInstalls.join('\n')}
    console.log('pluginsImported', this.pluginsImported)
    await this.SET_PLUGINS_IMPORTED(this.pluginsImported)
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
    ...mapActions(['SET_PLUGINS_IMPORTED'])
  },
};
</script>

<style lang="scss">
.custom-swal-image {
  margin: 0px !important; /* Adjust the margin as needed */
  float: left; /* Align the image to the left of the text */
}
</style>
`;

// Write to the output file
fs.writeFileSync(outputFile, appVueCode, 'utf-8');

console.log('App.vue code generated successfully!');
