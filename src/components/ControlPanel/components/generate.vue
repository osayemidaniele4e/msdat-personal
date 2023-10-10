<template>
  <button @click="generate()">
    <slot></slot>
  </button>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Generate',
  props: {},
  computed: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject', 'getSelectedConfig', 'getLoadingStatus']),
  },
  methods: {
    generate() {
      // use selected config to generate policy
      console.log(this.getSelectedConfig);
    },
  },
};
</script>
<style scoped></style>
