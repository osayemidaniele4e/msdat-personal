<template>
  <div class="row">
    <div
      v-for="(values, index) in setup"
      :class="values.class"
      :key="index"
      v-show="values.visibility === undefined ? true : values.visibility"
    >
      <!-- <div v-if="values.visibility === undefined ? true : values.visibility"> -->
      <label
        class="text-uppercase work-sans label-text "
        v-if="!hasNHMIS && values.label == 'Num/Denom'"
      >
        {{ '' }}
      </label>
      <label
        class="text-uppercase work-sans label-text disabled_alt"
        v-if="values.label == 'Target'"
      >
      {{ values.label }}
      </label>
      <label class="text-uppercase work-sans label-text" v-else> {{ values.label }} </label>

      <!-- ADVANCED ANALYTICS -->
      <selectWrapper
        v-if="values.type === 'dropdown' && values.key === 'indicator'"
        :id="label"
        :value="payload[values.key]"
        @input="updatePayload($event, values.key)"
        :options="getIndicatorList(values.options)"
        :multiSelectProps="values.dropdownProps"
        :NoDataLabel="values.label"
      />
      {{ checkNHMISDHIS2() }}
      <!-- MSDAT SUB-DASHBOARDS -->
      <!-- <selectWrapper
        v-if="values.type === 'dropdown' && values.key !== 'indicator'"
        :id="label"
        :value="payload[values.key]"
        @input="updatePayload($event, values.key)"
        :options="locationCheck(values.options)"
        :multiSelectProps="values.dropdownProps"
        :NoDataLabel="values.label"
      /> -->
      <selectWrapper
        v-if="values.type === 'dropdown' && values.key !== 'indicator'"
        :id="label"
        :value="payload[values.key]"
        @input="updatePayload($event, values.key)"
        :options="locationCheck(values.options)"
        :multiSelectProps="values.dropdownProps"
        :NoDataLabel="values.label"
      />
      <!-- {{ showItem(values.options) }} -->
      <!-- </div> -->
      <!-- <div class="disabled_alt"> -->
      <div>
        <toggle
          v-if="values.type === 'toggle'"
          @change="updatePayload($event, values.key)"
        />
      </div>

      <div class="d-flex" v-if="values.type === 'checkbox'">
        <!-- National Target here -->
        <div class="d-flex disabled_alt">
          <BaseCheckbox
            :currentValue="payload.target.national"
            @input="updatePayload({ sdg: payload.target.sdg, national: $event }, 'target')"
          />
          <p class="check-label ml-1">National</p>
        </div>
        <!-- SDG Target here -->
        <div class="d-flex ml-3 disabled_alt">
          <BaseCheckbox
            :currentValue="payload.target.sdg"
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
          <img
            :src="
              require(`../svg/${
                activeToggleButton === 'zonal_map' ? 'state_map_white' : 'zonal_map'
              }.svg`)
            "
            alt=""
            srcset=""
          />
        </button>
        <button
          type="button"
          @click="updatePayload('state_map', values.key), (activeToggleButton = 'state_map')"
          class="btn btn-sm btn-outline-primary"
          :class="[activeToggleButton === 'state_map' ? 'active' : '']"
        >
          State Map
          <img
            class="text-danger"
            :src="
              require(`../svg/${
                activeToggleButton === 'state_map' ? 'state_map_white' : 'state_map'
              }.svg`)
            "
            alt=""
            srcset=""
          />

          <!-- - {{ activeToggleButton === 'zonal_map' ? 'state_map_white' : 'zonal_map' }} -->
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
  </div>
</template>

<script>
// import ControlMixins from '@/components/ControlPanel/ControlMixins';
import { mapMutations, mapGetters } from 'vuex';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import toggle from '@/components/ControlPanel/components/toggle-switch.vue';
import selectWrapper from './SelectDropdown.vue';

export default {
  // mixins: [ControlMixins],
  name: 'ControlPanel',
  data() {
    return {
      activeToggleButton: '',
      dashboardName: '',
      // using component data with 'Sub' addition to prevent prop mutations
      // (controlIndex & groupIndex)
      controlIndexSub: this.controlIndex,
      groupIndexSub: this.groupIndex,
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
      hasNHMIS: false,

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
    indicatorList: {
      type: String,
      required: false,
      default: () => null,
    },
    groupIndex: {
      type: Number,
      default: () => null,
    },
    label: {
      type: String,
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
    updateValue: {
      type: Object,
      required: false,
    },
    updateKey: {
      type: String,
      required: false,
    },

    resetData: {
      type: Number,
      required: false,
    },
  },
  watch: {
    defaultDataSource(newValue) {
      this.payload.datasource = newValue;
    },
    payload: {
      handler(newValue) {
        this.$emit('data:options', newValue);
        this.saveNewActivity(newValue);
      },
      immediate: true,
      deep: true,
    },

    updateValue(newValue) {
      this.controlIndexSub = 0;
      this.groupIndexSub = null;
      this.updatePayload(newValue, 'datasource');
    },

    resetData: {
      handler() {
        this.controlIndexSub = 0;
        this.groupIndexSub = null;
        this.updatePayload(this.defaultDataSource, 'datasource');
      },
      immediate: true,
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return

    ...mapMutations('MSDAT_STORE', ['SET_SELECTED_CONFIG']),
    /**
     * @description check if datasource dropdown has NHMIS-DHIS2
     * checks if the key is datasource then create a new array of datasource id
     * checks if the array has NHMIS-DHIS2 with id of 6
     */
    saveNewActivity(newValue) {
      const {
        indicator, datasource, location, year,
      } = newValue;
      // eslint-disable-next-line camelcase
      const ind = Array.isArray(indicator) ? indicator[indicator.length - 1]?.short_name : indicator?.short_name;
      // eslint-disable-next-line no-nested-ternary
      const dat = Array.isArray(datasource) ? datasource[datasource.length - 1]?.item : datasource.datasource
        ? datasource.datasource : datasource?.item;
      const loc = location?.name === 'Nigeria' ? 'National' : location?.name;
      if (ind && dat && this.getUser.id) {
        const activityObject = {
          id: `${this.getUser.id}${Date.now()}`,
          datetime: Date.now(),
          page: this.$route.params.name.split('_').slice(0, 2).join(' '),
          section: this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].label,
          parameters: `${ind}, ${dat}${year ? ` ${year}` : ''}${loc ? `, ${loc}` : ''}`,
        };
        const lastActivity = JSON.parse(localStorage.getItem('lastActivity') || '{}');
        const hold = (Date.now() - lastActivity.datetime || 0) >= 5000;
        const diff = (lastActivity.page !== activityObject.page)
          || (lastActivity.section !== activityObject.section)
          || (lastActivity.parameters !== activityObject.parameters);
        if (hold && diff) {
          // send activity post request to backend
          console.log('activity', activityObject);
        }
        localStorage.setItem('lastActivity', (JSON.stringify(activityObject)));
      }
    },
    showItem(item) {
      if (item !== null && item.length === 2) {
        // console.log(JSON.stringify(item), 'item');
      }
      // if (item !== null && item.length === 38) {
      //   console.log(item, 'UUU');
      //   const main = item.filter((s) => s.name === 'Nigeria');
      //   console.log(this.$route.params.name, 'Nigeria');
      //   console.log(main, 'Nigeria');
      // }
    },

    locationCheck(options) {
      // console.log(options, 'options');
      if (
        this.$route.params.name === 'Disease_Surveillance'
        && options !== null
        && options.length === 38
      ) {
        // const main = options.filter((s) => s.name === 'Nigeria');
        // console.log(main, 'Nigeria');
        return options.filter((s) => s.name === 'Nigeria');
      }
      return options;
    },
    checkNHMISDHIS2() {
      this.setup.forEach((item) => {
        if (item.key === 'datasource') {
          const datasourceArr = item?.options?.map((el) => el.id);
          if (datasourceArr?.includes(6)) {
            this.hasNHMIS = true;
          } else {
            this.hasNHMIS = false;
          }
        }
      });
    },
    getIndicatorList(data) {
      // const { name } = this.$route.params;
      // if (name === 'Advanced_Analytics') {
      //   return data?.filter((item) => item.program_area === this.indicatorList);
      // }

      return data;

      // if (this.indicatorList !== '' || this.indicatorList !== null) {
      //   return data?.filter((item) => item.program_area === this.indicatorList);
      // }
    },
    updatePayload(value, key) {
      if (this.groupIndexSub != null) {
        // this is to take into consideration control panel that
        // are grouped example is Multi-source comparison section
        // debugger;
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: this.controlIndexSub,
          groupIndex: this.groupIndexSub,
          key,
          value,
        });
      } else {
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: this.controlIndexSub,
          key,
          value,
        });
      }
      this.controlIndexSub = this.controlIndex;
      this.groupIndexSub = this.groupIndex;
      this.$emit('data:options', this.payload);
    },
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['getUser']),
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
    const { name } = this.$route.params;
    this.dashboardName = name;
    const date = new Date();
    const getYear = date.getFullYear + 1;
    // pick one of the available years as the default years as opposed to the static 2016 year
    // console.log('setup', this.setup);
    const defaultYears = this.setup[3].options;
    // console.log(defaultYears);
    // console.log(defaultYears, 'defaultyears');
    const newArr = [];
    defaultYears.map((el) => {
      if (el < getYear) {
        newArr.push(el);
        this.defaultYearDropdown = newArr;
        // console.log(this.defaultYearDropdown, 'this.defaultYearDropdown');
      }
      return el;
    });
    this.updatePayload(this.defaultIndicator, 'indicator');
    this.updatePayload(this.defaultDataSource, 'datasource');
    this.updatePayload(this.defaultLocation, 'location');
    this.updatePayload(this.defaultYear, 'year');
    this.activeToggleButton = this.payload.visualization;
  },
};
</script>

<style lang="scss" scoped>
.label-text {
  font-weight: bold;
  font-size: 13px;
}
</style>
