/* eslint-disable no-param-reassign */
// const WorkerPlugin = require('worker-plugin');

const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const plugins = [
  new PrerenderSPAPlugin(
    // (REQUIRED) Absolute path to static root
    path.join(__dirname, 'dist'),
    // (REQUIRED) List of routes to prerender
    [
      '/',
    ],
    // (OPTIONAL) Compatible options from v2.
    {
      captureAfterTime: 10000,
    },
  ),
  new PrerenderSPAPlugin(
    path.join(__dirname, 'dist'),
    [
      '/dashboard', '/dashboard/Health_Outcomes_and_Service_Coverage', '/dashboard/Advanced_Analytics',
    ],
    {
      captureAfterTime: 10000,
    },
  ),
  new PrerenderSPAPlugin(
    path.join(__dirname, 'dist'),
    [
      '/dashboard/Health_Facility', '/dashboard/Health_Financing', '/dashboard/Demographics',
    ],
    {
      captureAfterTime: 10000,
    },
  ),
  new PrerenderSPAPlugin(
    path.join(__dirname, 'dist'),
    [
      '/dashboard/Health_Workforce', '/dashboard/Health_Service_Access', '/dashboard/Disease_Surveillance',
    ],
    {
      captureAfterTime: 10000,
    },
  ),
];

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/abstracts/_variables.scss";
        `,
      },
    },
  },
  configureWebpack: (config) => {
    config.module.rules = [
      {
        test: /\.worker\.js$/i,
        use: [
          {
            loader: 'comlink-loader',
            options: {
              singleton: true,
            },
          },
        ],
      },
      ...config.module.rules,
    ];
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...plugins);
    }
  },

};
