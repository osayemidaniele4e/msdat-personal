<template>
    <button @click="action()">
      <slot></slot>
    </button>
  </template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'History',
  props: {},
  computed: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject', 'getSelectedConfig', 'getLoadingStatus']),
  },
  methods: {
    action() {
      // use selected config to generate policy
      console.log('history clicked');
    },
  },
};
</script>
  <style scoped></style>
