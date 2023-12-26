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
      '/', '/dashboard', '/dashboard/Demographics',
      '/dashboard/Health_Facility', '/dashboard/Health_Financing',
      // '/dashboard/Health_Workforce', '/dashboard/Health_Service_Access', '/dashboard/Disease_Surveillance',
      // '/dashboard/Health_Outcomes_and_Service_Coverage', '/dashboard/Advanced_Analytics',
    ],
    // (OPTIONAL) Compatible options from v2.
    {
      // captureAfterDocumentEvent: 'custom-post-render-event',
      // This is how you would trigger this example event:
      // document.dispatchEvent(new Event('custom-post-render-event'))
      // captureAfterElementExists: '#content',
      captureAfterTime: 10000,
      //
      // The function's context argument contains two properties:
      //
      // - html :: the resulting HTML after prerendering)
      // - route :: the route currently being processed
      //            e.g. "/", "/about", or "/contact")
      //
      // postProcessHtml(context) {
      //   const titles = {
      //     '/': 'Home',
      //     '/about': 'Our Story',
      //     '/contact': 'Contact Us',
      //   };
      //   return context.html.replace(
      //     /<title>[^<]*<\/title>/i,
      //     `<title>${titles[context.route]}</title>`,
      //   );
      // },
    },
  ),
  new PrerenderSPAPlugin(
    // (REQUIRED) Absolute path to static root
    path.join(__dirname, 'dist'),
    // (REQUIRED) List of routes to prerender
    [
      // '/', '/dashboard', '/dashboard/Demographics',
      // '/dashboard/Health_Facility', '/dashboard/Health_Financing',
      // '/dashboard/Health_Workforce', '/dashboard/Health_Service_Access', '/dashboard/Disease_Surveillance',
      '/dashboard/Health_Outcomes_and_Service_Coverage', '/dashboard/Advanced_Analytics',
    ],
    {
      captureAfterTime: 10000,
    },
  ),
  new PrerenderSPAPlugin(
    // (REQUIRED) Absolute path to static root
    path.join(__dirname, 'dist'),
    // (REQUIRED) List of routes to prerender
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
