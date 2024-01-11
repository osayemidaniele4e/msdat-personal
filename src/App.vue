
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
    
if (!localStorage.getItem('ContextPluginPlugin')) {
  localStorage.setItem('ContextPluginPlugin', 'false');
  plugins_imported.push('ContextPlugin')
}

if (localStorage.getItem('ContextPluginPlugin') === 'true') {
  Vue.use(ContextPlugin);
}


if (!localStorage.getItem('IndicatorPluginPlugin')) {
  localStorage.setItem('IndicatorPluginPlugin', 'false');
  plugins_imported.push('IndicatorPlugin')
}

if (localStorage.getItem('IndicatorPluginPlugin') === 'true') {
  Vue.use(IndicatorPlugin);
}


if (!localStorage.getItem('TestPluginPlugin')) {
  localStorage.setItem('TestPluginPlugin', 'false');
  plugins_imported.push('TestPlugin')
}

if (localStorage.getItem('TestPluginPlugin') === 'true') {
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
