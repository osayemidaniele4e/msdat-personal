<template>
    <div v-show="active">
        <slot></slot>
    </div>
</template>

<script>
// import Multiselect from 'vue-multiselect';

export default {
  components: {
    // Multiselect,
  },
  props: {
    title: {
      type: String,
      default: 'Panel Title',
    },
  },
  data() {
    return {
      active: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
