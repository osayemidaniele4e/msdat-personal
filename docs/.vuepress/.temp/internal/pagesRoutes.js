import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/index.md"]],
  ["v-145c1846","/bolo/",{"title":"Introduction"},["/bolo/index.html","/bolo/README.md"]],
  ["v-00565c02","/bolo/using-vue.html",{"title":"Using Vue in Markdown"},["/bolo/using-vue","/bolo/using-vue.md"]],
  ["v-ba934fd8","/config/",{"title":"Config"},["/config/index.html","/config/README.md"]],
  ["v-fffb8e28","/guide/",{"title":"Start here"},["/guide/index.html","/guide/README.md"]],
  ["v-3c5293eb","/guide/api.html",{"title":"API schema"},["/guide/api","/guide/api.md"]],
  ["v-44408ed0","/guide/dev.html",{"title":"Modular Structure"},["/guide/dev","/guide/dev.md"]],
  ["v-261504d8","/guide/overview.html",{"title":"Overview of Dashboard"},["/guide/overview","/guide/overview.md"]],
  ["v-79e93bb0","/guide/using-vue.html",{"title":"Overview of Dashboard"},["/guide/using-vue","/guide/using-vue.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
