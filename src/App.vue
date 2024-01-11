<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ContextPlugin from './modules/plugins/ContextPlugin';
import IndicatorSearch from './modules/plugins/IndicatorSearch';

export default {
  mounted() {
    if (!localStorage.getItem('ContextPluginPlugin')) {
      localStorage.setItem('ContextPluginPlugin', 'false');
    }

    if (localStorage.getItem('ContextPluginPlugin') === 'true') {
      Vue.use(ContextPlugin);
    }

    if (!localStorage.getItem('IndicatorSearchPlugin')) {
      localStorage.setItem('IndicatorSearchPlugin', 'false');
    }

    if (localStorage.getItem('IndicatorSearchPlugin') === 'true') {
      Vue.use(IndicatorSearch);
    }
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
  },
};
</script>

<style lang="scss">
.custom-swal-image {
  margin: 0px !important; /* Adjust the margin as needed */
  float: left; /* Align the image to the left of the text */
}
</style>
