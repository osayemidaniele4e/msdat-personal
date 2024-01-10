const fs = require('fs');
const path = require('path');

// Change these values to your actual component directory and desired output file
const basePath = path.join(__dirname, '../src/modules/plugins/');
const outputFile = path.join(__dirname, '../src/modules/plugins/index.js');

// Function to recursively find all '.vue' files in a directory
const findVueFiles = (dir) => {
  const files = fs.readdirSync(dir);
  let vueFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a directory, recursively search for '.vue' files
      vueFiles = vueFiles.concat(findVueFiles(filePath));
    } else if (file.endsWith('.vue')) {
      vueFiles.push(filePath);
    }
  });

  return vueFiles;
};

// Find all '.vue' files in subdirectories
const vueFiles = findVueFiles(basePath);

// Generate import statements
const imports = vueFiles.map((filePath) => {
  const componentName = path.basename(filePath, '.vue');
  return `import ${componentName} from './${path.relative(basePath, filePath)}';`;
});

const content = imports.join('\n');

// Write to the output file
fs.writeFileSync(outputFile, content, 'utf-8');

console.log('Import statements generated successfully!');
