export const data = {
  "key": "v-3c5293eb",
  "path": "/guide/api.html",
  "title": "API schema",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "API endpoints",
      "slug": "api-endpoints",
      "children": []
    },
    {
      "level": 2,
      "title": "/account",
      "slug": "account",
      "children": []
    },
    {
      "level": 2,
      "title": "/caches",
      "slug": "caches",
      "children": []
    },
    {
      "level": 2,
      "title": "/crud",
      "slug": "crud",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "guide/api.md"
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
