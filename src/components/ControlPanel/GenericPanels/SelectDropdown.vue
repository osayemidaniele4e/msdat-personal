<template>
<multiselect
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty=allowEmpty
    placeholder="Pick a value"
    v-bind="multiSelectProps"
    >
</multiselect>
</template>

<script>
export default {
  data() {
    return {
      allowEmpty: false,
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    options: {
      type: Array,
      default: () => ([]),
    },
    value: {
    },
    multiSelectProps: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
