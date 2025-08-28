/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  // Handle TLS/SSL issues
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--ignore-certificate-errors');
      launchOptions.args.push('--ignore-ssl-errors');
      launchOptions.args.push('--allow-running-insecure-content');
      launchOptions.args.push('--disable-web-security');
    }
    return launchOptions;
  });

  // Set Node.js TLS options
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}', // Replace integrationFolder
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
  };
};
