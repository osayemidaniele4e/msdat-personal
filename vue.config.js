module.exports = {
  lintOnSave: false,

  pages: {
    msdat: {
      // entry for the page
      entry: 'src/modules/msdat-dashboard/index.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Msdat - Dashboard',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    custom: {
      // entry for the page
      entry: 'src/modules/custom-dashboard/index.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'custom-dashboard.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Custom - Dashboard',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
};
