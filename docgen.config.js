const path = require('path');

module.exports = {
  componentsRoot: 'src/components', // the folder where your components are located
  components: '**/*.vue', // the glob to search for components
  outDir: 'documentation/components', // the folder to save the documentation
  apiOptions: {
    jsx: true, // whether to parse JSX
  },
  getDestFile: (file) => file.replace(/\.vue$/, '.md'),
  templates: {
    // optional, custom templates for the generated documentation
    component: path.join(__dirname, 'documentation/templates/component.md'),
  },
  docsRepo: 'your-github-repo', // optional, for generating edit links
  docsBranch: 'main', // optional, defaults to 'master'
  docsFolder: 'documentation', // optional, defaults to 'docs'
};
