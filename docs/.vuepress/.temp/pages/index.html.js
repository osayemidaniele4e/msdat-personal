export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "en-US",
  "frontmatter": {
    "home": true,
    "heroImage": "https://upload.wikimedia.org/wikipedia/commons/4/48/Nigeria_Federal_Ministry_of_Health_Logo.png",
    "tagline": "Introduction to MSDAT",
    "actionText": "Quick Start →",
    "actionLink": "/guide/",
    "features": [
      {
        "title": "Visual Interface",
        "details": "To provide a visual interface that eliminates delays in making key decisions by top stakeholders and medical practitioners."
      },
      {
        "title": "Easy Access",
        "details": "To provide quick and easy access to health data for analysis and interpretation"
      },
      {
        "title": "Accessibility",
        "details": "To make accessible comparison of key health indicators across data sources."
      },
      {
        "title": "Grophical",
        "details": "To present key health trends via graphs and charts as a premise to gain insights and make quick decisions."
      }
    ],
    "footer": "Made by e4e with ❤️"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "contributors": [
      {
        "name": "davebenard",
        "email": "benard.zibiri@e4email.net",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "index.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
