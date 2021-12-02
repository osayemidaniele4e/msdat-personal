<template>
  <!-- Label to show when there is no available data as requested
  for by chiamaka on the 2-12-2021 during msdat meeting -->
  <multiselect
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    placeholder="Pick a value"
    v-bind="multiSelectProps"
    selectLabel=""
    deselectLabel=""
    ><span class="text-capitalize" slot="noOptions">{{ label }}s</span></multiselect
  >
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
    label: {
      type: String,
      default: 'List is empty',
    },
  },
  watch: {
    options: {
      handler(newValue) {
        if (this.multiSelectProps['preselect-first']) {
          if (has(this.multiSelectProps, 'group-values')) {
            // eslint-disable-next-line prefer-destructuring
            this.selected = newValue[0][this.multiSelectProps['group-values']][0];
          } else if (newValue.length > 0) {
            // debugger;
            // eslint-disable-next-line prefer-destructuring
            this.selected = this.options[0];
          } else {
            const date = new Date();
            const year = date.getFullYear() - 1;
            this.selected = year.toString();
          }
        }
      },
    },
    immediate: false,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
