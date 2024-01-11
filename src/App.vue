
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ContextPlugin from './modules/plugins/ContextPlugin';
import IndicatorPlugin from './modules/plugins/IndicatorPlugin';
import TestPlugin from './modules/plugins/TestPlugin';

export default {
  async mounted() {
    let plugins_imported = [];
    
if (!localStorage.getItem('ContextPlugin')) {
  localStorage.setItem('ContextPlugin', 'false');
  plugins_imported.push('ContextPlugin')
}

if (localStorage.getItem('ContextPlugin') === 'true') {
  Vue.use(ContextPlugin);
}


if (!localStorage.getItem('IndicatorPlugin')) {
  localStorage.setItem('IndicatorPlugin', 'false');
  plugins_imported.push('IndicatorPlugin')
}

if (localStorage.getItem('IndicatorPlugin') === 'true') {
  Vue.use(IndicatorPlugin);
}


if (!localStorage.getItem('TestPlugin')) {
  localStorage.setItem('TestPlugin', 'false');
  plugins_imported.push('TestPlugin')
}

if (localStorage.getItem('TestPlugin') === 'true') {
  Vue.use(TestPlugin);
}

    await this.SET_PLUGINS_IMPORTED(plugins_imported)
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
    ...mapActions(['SET_PLUGINS_IMPORTED'])
  },
};
</script>

<style lang="scss">
.custom-swal-image {
  margin: 0px !important; /* Adjust the margin as needed */
  float: left; /* Align the image to the left of the text */
}
</style>
