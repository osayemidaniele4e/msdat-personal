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
  const componentName = path.basename(filePath, '.js');
  return `import ${componentName} from './${path.relative(basePath, filePath)}';`;
});

const pluginInstalls = jsFiles.map((filePath) => {
  const componentName = path.basename(filePath, '.js');
  const subdirectoryName = path.basename(path.dirname(filePath));

  return `
if (!localStorage.getItem('${subdirectoryName}Plugin')) {
  localStorage.setItem('${subdirectoryName}Plugin', 'false');
}

if (localStorage.getItem('${subdirectoryName}Plugin') === 'true') {
  Vue.use(${componentName});
}
`;
});

// Additional code for App.vue
const appVueCode = `
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
${pluginImports.join('\n')}

export default {
  mounted() {
    ${pluginInstalls.join('\n')}
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
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
