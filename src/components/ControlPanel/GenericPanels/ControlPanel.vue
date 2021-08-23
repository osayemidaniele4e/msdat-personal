<template>
  <div class="row">
    <template v-for="(values, index) in setup">
      <div
        class=""
        :class="values.class"
        :key="index"
        v-show="values.visibility === undefined ? true : values.visibility"
      >
        <!-- <div v-if="values.visibility === undefined ? true : values.visibility"> -->
        <label class="h6 text-uppercase work-sans">{{ values.label }}</label>
        <selectWrapper
          v-if="values.type === 'dropdown'"
          v-model="payload[values.key]"
          :options="values.options"
          :multiSelectProps="values.dropdownProps"
        />
        <!-- </div> -->
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
        <div
          v-if="values.type === 'visualization'"
          class="btn-group d-flex"
          role="group"
        >
          <button
            type="button"
            @click="
              (payload[values.key] = 'zonal_map'),
                (activeToggleButton = 'zonal_map')
            "
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'zonal_map' ? 'active' : '']"
          >
            Zones Map
            <img :src="require('../svg/zonal_map.svg')" alt="" srcset="" />
          </button>
          <button
            type="button"
            @click="
              (payload[values.key] = 'state_map'),
                (activeToggleButton = 'state_map')
            "
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'state_map' ? 'active' : '']"
          >
            State Map
            <img
              class="text-danger"
              :src="require('../svg/state_map.svg')"
              alt=""
              srcset=""
            />
          </button>
          <button
            type="button"
            @click="
              (payload[values.key] = 'line'), (activeToggleButton = 'line')
            "
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'line' ? 'active' : '']"
          >
            Line <b-icon icon="graph-up"></b-icon>
          </button>
          <button
            type="button"
            @click="
              (payload[values.key] = 'column'), (activeToggleButton = 'column')
            "
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'column' ? 'active' : '']"
          >
            Column <b-icon icon="bar-chart-fill"></b-icon>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ControlMixins from '@/components/ControlPanel/ControlMixins';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import toggle from '@/components/ControlPanel/components/toggle-switch.vue';
import selectWrapper from './SelectDropdown.vue';

export default {
  mixins: [ControlMixins],
  data() {
    return {
      activeToggleButton: 'line',
    };
  },
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
