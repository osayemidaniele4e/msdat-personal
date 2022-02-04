export const data = {
  "key": "v-fffb8e28",
  "path": "/guide/",
  "title": "Start here",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Introduction",
      "slug": "introduction",
      "children": []
    },
    {
      "level": 2,
      "title": "Problem Statement",
      "slug": "problem-statement",
      "children": []
    },
    {
      "level": 2,
      "title": "Objectives",
      "slug": "objectives",
      "children": []
    },
    {
      "level": 2,
      "title": "Goals",
      "slug": "goals",
      "children": []
    }
  ],
  "git": {
    "updatedTime": null,
    "contributors": []
  },
  "filePathRelative": "guide/README.md"
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
