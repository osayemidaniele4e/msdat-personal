# Data Layer Service

The Data Service layer is a plugin that interface with indexedDB and the Vuex store
The Data layer provides a plugin  


## Installation
The data layer is installed a as a vue plugin The data-layer plugin request you to install 

```js
import Vue from 'vue';
import DataLayer from '@/modules/data-layer';
import store from './store';

Vue.use(data-layer, {
  store,
});

```

## Usage
- installing the plugin makes available **this.$DL** across the project 
- its best used at the root of each dashboard preferable in the vue created mounted hooks

```js
created() {
    this.$DL.setup({
      dashboardIndicators: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18],
      defaultIndicators: [7, 5, 8],
    });
    this.$DL.init().then((e) => {
      ...whatever ever you want
    });
  },
```

Note:use **ctrl+shift+v** to view MD file in vscode