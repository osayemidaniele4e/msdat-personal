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
          :value="payload[values.key]"
          @input="updatePayload($event, values.key)"
          :options="values.options"
          :multiSelectProps="values.dropdownProps"
        />
        <!-- </div> -->
        <toggle v-if="values.type === 'toggle'" @change="updatePayload($event, values.key)" />

        <div class="d-flex" v-if="values.type === 'checkbox'">
          <!-- National Target here -->
          <div class="d-flex">
            <BaseCheckbox
              @input="updatePayload({ sdg: payload.target.sdg, national: $event }, 'target')"
            />
            <p class="check-label ml-1">National</p>
          </div>
          <!-- SDG Target here -->
          <div class="d-flex ml-3">
            <BaseCheckbox
              @input="updatePayload({ sdg: $event, national: payload.target.national }, 'target')"
            />
            <p class="check-label ml-1">SDG</p>
          </div>
        </div>
        <div v-if="values.type === 'visualization'" class="btn-group d-flex work-sans" role="group">
          <button
            type="button"
            @click="updatePayload('zonal_map', values.key), (activeToggleButton = 'zonal_map')"
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'zonal_map' ? 'active' : '']"
          >
            Zones Map
            <img :src="require('../svg/zonal_map.svg')" alt="" srcset="" />
          </button>
          <button
            type="button"
            @click="updatePayload('state_map', values.key), (activeToggleButton = 'state_map')"
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'state_map' ? 'active' : '']"
          >
            State Map
            <img class="text-danger" :src="require('../svg/state_map.svg')" alt="" srcset="" />
          </button>
          <button
            type="button"
            @click="updatePayload('line', values.key), (activeToggleButton = 'line')"
            class="btn btn-sm btn-outline-primary"
            :class="[activeToggleButton === 'line' ? 'active' : '']"
          >
            Line <b-icon icon="graph-up"></b-icon>
          </button>
          <button
            type="button"
            @click="updatePayload('column', values.key), (activeToggleButton = 'column')"
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
// import ControlMixins from '@/components/ControlPanel/ControlMixins';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import toggle from '@/components/ControlPanel/components/toggle-switch.vue';
import selectWrapper from './SelectDropdown.vue';

export default {
  // mixins: [ControlMixins],
  data() {
    return {
      activeToggleButton: 'state_map',
      // payload: {
      //   indicator: 'indicator 2',
      //   location: '',
      //   datasource: 'NHMIS 1',
      //   year: '',
      //   compareBy: '',
      //   visualization: 'state_map',
      //   target: {
      //     national: false,
      //     sdg: false,
      //   },
      //   numdenum: false,
      // },
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
    groupIndex: {
      type: Number,
      default: () => null,
    },
    controlIndex: {
      type: Number,
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
  watch: {
    defaultDataSource(newValue) {
      console.log(newValue);
      this.payload.datasource = newValue;
    },
    payload: {
      handler(newValue) {
        this.$emit('data:options', newValue);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    updatePayload(value, key) {
      if (this.groupIndex != null) {
        // this is o take into consideration control panel that
        // are grouped example is Multi-source comparison section
        // debugger;
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: this.controlIndex,
          groupIndex: this.groupIndex,
          key,
          value,
        });
      } else {
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: this.controlIndex,
          key,
          value,
        });
      }

      this.$emit('data:options', this.payload);
    },
  },
  computed: {
    payload() {
      if (this.groupIndex != null) {
        // this is to take into consideration control panel that
        // are grouped example is Multi-source comparison section
        return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload[
          this.groupIndex
        ];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload;
    },
  },

  mounted() {
    this.updatePayload(this.defaultIndicator, 'indicator');
    this.updatePayload(this.defaultDataSource, 'datasource');
    this.updatePayload(this.defaultLocation, 'location');
    this.updatePayload(this.defaultYear, 'year');
  },
};
</script>

<style lang="scss" scoped></style>
