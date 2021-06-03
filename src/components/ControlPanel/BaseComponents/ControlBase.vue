<template>
    <div v-if="active">
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
      payload: 'value',
      indicatorOptions: ['heh', 'heheh'],
      active: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
