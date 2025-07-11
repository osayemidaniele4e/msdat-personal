module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Add or ensure moduleDirectories includes __mocks__ at the project root
  moduleDirectories: [
    'node_modules',
    '<rootDir>/tests/__mocks__', // To help Jest find the __mocks__ folder
    '<rootDir>/src', // If you have other source directories for modules
  ],
};
