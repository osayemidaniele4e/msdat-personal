
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import contextPlugin from './modules/plugins/contextPlugin';
import indicatorPlugin from './modules/plugins/indicatorPlugin';
import reviewPlugin from './modules/plugins/reviewPlugin';
import testonePlugin from './modules/plugins/testonePlugin';
import testPlugin from './modules/plugins/testPlugin';

export default {
  data() {
    return {
      pluginsImported: [] // Explicitly specify the type as an array of strings
    };
  },
  async mounted() {
    let plugins_imported = [];
    
  this.pluginsImported.push('contextPlugin')
if (!localStorage.getItem('contextPlugin')) {
  localStorage.setItem('contextPlugin', 'false');
}

if (localStorage.getItem('contextPlugin') === 'true') {
  Vue.use(contextPlugin);
}


  this.pluginsImported.push('indicatorPlugin')
if (!localStorage.getItem('indicatorPlugin')) {
  localStorage.setItem('indicatorPlugin', 'false');
}

if (localStorage.getItem('indicatorPlugin') === 'true') {
  Vue.use(indicatorPlugin);
}


  this.pluginsImported.push('reviewPlugin')
if (!localStorage.getItem('reviewPlugin')) {
  localStorage.setItem('reviewPlugin', 'false');
}

if (localStorage.getItem('reviewPlugin') === 'true') {
  Vue.use(reviewPlugin);
}


  this.pluginsImported.push('testonePlugin')
if (!localStorage.getItem('testonePlugin')) {
  localStorage.setItem('testonePlugin', 'false');
}

if (localStorage.getItem('testonePlugin') === 'true') {
  Vue.use(testonePlugin);
}


  this.pluginsImported.push('testPlugin')
if (!localStorage.getItem('testPlugin')) {
  localStorage.setItem('testPlugin', 'false');
}

if (localStorage.getItem('testPlugin') === 'true') {
  Vue.use(testPlugin);
}

    console.log('pluginsImported', this.pluginsImported)
    await this.SET_PLUGINS_IMPORTED(this.pluginsImported)
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
