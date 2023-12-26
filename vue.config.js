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
      '/dashboard/Health_Outcomes_and_Service_Coverage', '/dashboard/Advanced_Analytics',
    ],
    // (OPTIONAL) Compatible options from v2.
    {
      // NOTE: Unless you are relying on asynchronously rendered content,
      // such as after an Ajax request, none of these options should be
      // necessary. All synchronous scripts are already executed before
      // capturing the page content.

      // Wait until a specific event is fired on the document.
      // captureAfterDocumentEvent: 'custom-post-render-event',
      // This is how you would trigger this example event:
      // document.dispatchEvent(new Event('custom-post-render-event'))

      // Wait until a specific element is detected with
      // document.querySelector.
      // captureAfterElementExists: '#content',

      // Wait until a number of milliseconds has passed after scripts
      // have been executed. It's important to note that this may
      // produce unreliable results when relying on network
      // communication or other operations with highly variable timing.
      captureAfterTime: 10000,

      // path of index file. By default it's index.html in static root.
      // indexPath: path.resolve('/dist/path/to/index.html'),

      // Manually transform the HTML for each page after prerendering,
      // for example to set the page title and metadata in edge cases
      // where you cannot handle this via your routing solution.
      //
      // The function's context argument contains two properties:
      //
      // - html :: the resulting HTML after prerendering)
      // - route :: the route currently being processed
      //            e.g. "/", "/about", or "/contact")
      //
      // Whatever is returned will be printed to the prerendered file.
      // NOTE: this has been deprecated in favor of the `postProcess` option.
      // See the documentation below.
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
