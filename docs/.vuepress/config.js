const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'MSDAT Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'MSDAT',
        link: 'https://msdat.fmohconnect.gov.ng/central_analytics'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Get Started',
          collapsable: false,
          children: [
            ''
          ]
        },
        {
          title: 'Dashboard Overview',
          collapsable: false,
          children: [
            'overview'
          ]
        },
        {
          title: 'Developer Guide',
          collapsable: false,
          children: [
            'dev',
            'api',
            'index-db',
            'datalayer',
            'config',
            'state-profile'
          ]
        },
        {
          title: '2022 Edits',
          collapsable: false,
          children: [
            'mobile',
            'disagg',
            'nhmis-month'
          ]
        }

        

      ],

      '/config/': [
        {
          title: 'Bolo',
          collapsable: false,
        
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
