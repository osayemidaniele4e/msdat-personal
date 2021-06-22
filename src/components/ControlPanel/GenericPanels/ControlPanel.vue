<template>
  <div class="row">
    <div
      class=""
      :class="values.class"
      v-for="(values, index) in setup"
      :key="index"
    >
      <label class="h6 text-uppercase work-sans">{{ values.label }}</label>
      <selectWrapper
        v-if="values.type === 'dropdown'"
        v-model="payload[values.key]"
        :options="values.options"
        :multiSelectProps="values.dropdownProps"
      />
      <toggle
        v-if="values.type === 'toggle'"
        @change="payload[values.key] = $event"
        />

      <div class="d-flex" v-if="values.type === 'checkbox'">
        <!-- National Target here -->
        <div class="d-flex">
          <BaseCheckbox @input="payload.target.national = $event" />
          <p class="check-label ml-1">National</p>
        </div>
        <!-- SDG Target here -->
        <div class="d-flex ml-3">
          <BaseCheckbox @input="payload.target.sdg = $event" />
          <p class="check-label ml-1">SDG</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ControlMixins from '@/components/ControlPanel/ControlMixins';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import toggle from '@/components/ControlPanel/components/toggle-switch.vue';
import selectWrapper from './SelectDropdown.vue';

export default {
  mixins: [ControlMixins],
  components: {
    selectWrapper,
    BaseCheckbox,
    toggle,
  },
  props: {
    setup: {
      type: Array,
      required: true,
    },
    defaultIndicator: {
      type: Object,
      required: false,
    },
    defaultDataSource: {
      type: Object,
      required: false,
    },
    defaultLocation: {
      type: Object,
      required: false,
    },
    defaultYear: {
      type: [Object, String],
      required: false,
    },
  },

  mounted() {
    this.payload.indicator = this.defaultIndicator;
    this.payload.datasource = this.defaultDataSource;
    this.payload.location = this.defaultLocation;
    // this.payload.indicator = this.defaultIndicator;
  },
};
</script>

<style lang="scss" scoped>
</style>
