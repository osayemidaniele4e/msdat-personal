<template>
  <multiselect
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    placeholder="Pick a value"
    v-bind="multiSelectProps"
  >
  </multiselect>
</template>

<script>
import { has } from 'lodash';

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
      default: () => [],
    },
    value: {},
    multiSelectProps: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    options(newValue) {
      if (this.multiSelectProps['preselect-first']) {
        debugger;
        if (has(this.multiSelectProps, 'group-values')) {
          // eslint-disable-next-line prefer-destructuring
          this.selected = newValue[0][this.multiSelectProps['group-values']][0];
        } else {
          // eslint-disable-next-line prefer-destructuring
          this.selected = newValue[0];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
