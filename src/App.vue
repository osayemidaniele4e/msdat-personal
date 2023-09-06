<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContextPlugin from './modules/plugins/context-plugin';

// export default Vue.extend({});

export default {
  mounted() {
    if (!localStorage.getItem('contextPlugin')) {
      localStorage.setItem('contextPlugin', 'false');
    }

    if (localStorage.getItem('contextPlugin') === 'true') {
      Vue.use(ContextPlugin);
    }
  },

};
</script>

<style lang="scss"></style>
