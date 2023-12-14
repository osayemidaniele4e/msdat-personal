<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContextPlugin from './modules/plugins/context-plugin';
import IndicatorSearch from './modules/plugins/indicator-search';

// export default Vue.extend({});

export default {
  mounted() {
    if (!localStorage.getItem('contextPlugin')) {
      localStorage.setItem('contextPlugin', 'false');
    }

    if (localStorage.getItem('contextPlugin') === 'true') {
      Vue.use(ContextPlugin);
    }
    if (!localStorage.getItem('indicatorPlugin')) {
      localStorage.setItem('indicatorPlugin', 'false');
    }
    if (localStorage.getItem('indicatorPlugin') === 'true') {
      Vue.use(IndicatorSearch);
    }
  },
};
</script>

<style lang="scss">
.custom-swal-image {
  margin: 0px !important; /* Adjust the margin as needed */
  float: left; /* Align the image to the left of the text */
}
</style>
