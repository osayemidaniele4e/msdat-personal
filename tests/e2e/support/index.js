// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Handle TLS/SSL issues globally
Cypress.on('uncaught:exception', (err, runnable) => {
  // Handle TLS and SSL related errors
  if (
    err.message.includes('isServer') ||
    err.message.includes('TLS') ||
    err.message.includes('SSL') ||
    err.message.includes('CERT') ||
    err.message.includes('certificate')
  ) {
    console.log('Ignored TLS/SSL error:', err.message);
    return false; // Don't fail the test
  }
  return true;
});

// Set up global request options
beforeEach(() => {
  // Set TLS options for API requests
  cy.server({
    ignore: (xhr) => {
      // Ignore SSL/TLS errors in requests
      return false;
    },
  });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
