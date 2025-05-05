# Vue DocGen CLI Documentation Guide

## Overview
This document provides a comprehensive guide for using the Vue DocGen CLI plugin in our project. The plugin automatically generates documentation for Vue components based on their source code and JSDoc comments.

## Installation
The plugin is already installed in the project as a dev dependency:
```json
"vue-docgen-cli": "^4.79.0"
```

## Configuration
The plugin is configured in `docgen.config.js` with the following settings:

```javascript
{
  componentsRoot: 'src/components',    // Source directory for components
  components: '**/*.vue',             // Pattern to match Vue components
  outDir: 'documentation/components', // Output directory for generated docs
  apiOptions: {
    jsx: true,                       // Enable JSX parsing
  },
  getDestFile: (file) => file.replace(/\.vue$/, '.md'),
  templates: {
    component: path.join(__dirname, 'documentation/templates/component.md'),
  },
  docsBranch: 'main',
  docsFolder: 'documentation'
}
```

## Usage

### Generating Documentation
To generate documentation for all components, run:
```bash
yarn docgen
```

### Documenting Components
To document your Vue components, use JSDoc-style comments. Here's an example:

```vue
<template>
  <div class="my-component">
    <!-- component template -->
  </div>
</template>

<script>
/**
 * A brief description of the component
 * @description This component handles user profile display and editing
 */
export default {
  name: 'MyComponent',
  props: {
    /**
     * The user's full name
     * @type {String}
     * @required
     */
    userName: {
      type: String,
      required: true
    },
    /**
     * The user's age
     * @type {Number}
     * @default 18
     */
    age: {
      type: Number,
      default: 18
    }
  },
  methods: {
    /**
     * Updates the user's profile
     * @param {Object} profileData - The new profile data
     * @emits {profile-updated} - Emitted when profile is updated
     */
    updateProfile(profileData) {
      // Method implementation
    }
  }
}
</script>
```

### Generated Documentation Structure
The documentation is generated in Markdown format and includes:
- Component name and description
- Props table with type, required status, and default values
- Events table with descriptions and parameters
- Slots table with descriptions and bindings

## Template Customization
The documentation template is located at `documentation/templates/component.md`. You can modify this template to change the format of the generated documentation.

## Integration with VuePress
The generated documentation can be integrated with VuePress by:
1. Moving the generated markdown files to your VuePress docs directory
2. Adding them to your VuePress navigation configuration

## Best Practices
1. Always provide descriptions for components, props, and methods
2. Use proper JSDoc syntax for type definitions
3. Document all public props, events, and slots
4. Keep descriptions concise but informative
5. Update documentation when making changes to components

## Troubleshooting
Common issues and solutions:
1. **Missing documentation**: Ensure components have proper JSDoc comments
2. **Incorrect types**: Verify prop type definitions match the actual types
3. **Template errors**: Check the component.md template for syntax errors
4. **Path issues**: Verify the paths in docgen.config.js are correct

## Additional Resources
- [Vue DocGen CLI Documentation](https://vue-styleguidist.github.io/docs/Documenting.html)
- [JSDoc Documentation](https://jsdoc.app/)
- [VuePress Documentation](https://vuepress.vuejs.org/) 