
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import contextPlugin from './modules/plugins/contextPlugin';
import indicatorPlugin from './modules/plugins/indicatorPlugin';
import testPlugin from './modules/plugins/testPlugin';

export default {
  async mounted() {
    let plugins_imported = [];
    
if (!localStorage.getItem('contextPlugin')) {
  localStorage.setItem('contextPlugin', 'false');
  plugins_imported.push('contextPlugin')
}

if (localStorage.getItem('contextPlugin') === 'true') {
  Vue.use(contextPlugin);
}


if (!localStorage.getItem('indicatorPlugin')) {
  localStorage.setItem('indicatorPlugin', 'false');
  plugins_imported.push('indicatorPlugin')
}

if (localStorage.getItem('indicatorPlugin') === 'true') {
  Vue.use(indicatorPlugin);
}


if (!localStorage.getItem('testPlugin')) {
  localStorage.setItem('testPlugin', 'false');
  plugins_imported.push('testPlugin')
}

if (localStorage.getItem('testPlugin') === 'true') {
  Vue.use(testPlugin);
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
