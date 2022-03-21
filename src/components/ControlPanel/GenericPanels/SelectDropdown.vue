<template>
  <!-- Label to show when there is no available data as requested
  for by chiamaka on the 2-12-2021 during msdat meeting -->
    <!-- @open="initialCSS" -->
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
    >
    <span class="text-capitalize" slot="noOptions">{{ NoDataLabel }}s</span>
    <!---
      START
      THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
      THAT HAVE GROUPED OPTIONS
    -->
    <!-- <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
       <template v-if="props.option.$groupLabel">
      <span class="topicHead"
       :data-parent="props.option.$groupLabel">
       {{props.option.$groupLabel}} <span class="down-caret"></span> </span>
      </template>
      <template v-if="props.option.item">
        <div v-if="!props.option.$groupLabel"
        :data-child="props.option.datasource">
        {{props.option.item}}
        </div>
      </template>
      <template v-else-if="props.option.full_name">
        <div v-if="!props.option.$groupLabel"
        :data-child="props.option.program_area">
        {{props.option.full_name}}
        </div>
      </template>

    </template> -->
    <!---
    END
    THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
    THAT HAVE GROUPED OPTIONS
    -->
    </multiselect
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
    NoDataLabel: {
      type: String,
      default: () => 'List is empty',
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
