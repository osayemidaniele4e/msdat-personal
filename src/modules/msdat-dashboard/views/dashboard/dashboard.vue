<template>
  <div>
    <!-- <b-overlay :show="!cpIsLoading"> -->
    <BasePanel :position="position" v-if="cpIsLoading">
      <template v-slot:default>
        <ControlBase
          v-for="(control, index) in $store.state.MSDAT_STORE.controlConfig"
          :key="index"
          :title="control.label"
        >
          <ControlPanel
            @data:options="log($event, index)"
            :setup="control.setup"
            :defaultIndicator="
              control.defaults.indicator != null
                ? control.defaults.indicator
                : defaultIndicator
            "
            :defaultDataSource="
              control.defaults.dataSource != null
                ? control.defaults.dataSource
                : defaultDataSource
            "
            :defaultLocation="
              control.defaults.location != null
                ? control.defaults.location
                : defaultLocation
            "
            :defaultYear="
              control.defaults.year != null
                ? control.defaults.year
                : defaultYear
            "
          />
        </ControlBase>
      </template>
    </BasePanel>
    <!-- </b-overlay> -->
    <!-- control Panels ends here  -->
    <div class="container-fluid">
      <ZonalAnalysis :controlPanelProps="zonalProps" />
    </div>
  </div>
</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';

import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';
import ZonalAnalysis from '../../components/sections/zonal-analysis/zonalSection.vue';

export default {
  mixins: [formatter, controlPanelSetup],
  data() {
    return {
      position: 3,
      BarChartOptions: {},
      controlPanel: {},
      lect: '',
      stateBarValue: '',
      TableValues: '',
      indicatorComparison: '',
      datasetProps: {},
      zonalProps: {},
    };
  },
  components: {
    ControlBase,
    BasePanel,
    ControlPanel,
    ZonalAnalysis,
  },
  methods: {
    /**
     * @param optionsObject The return a control Options objects when ever any control
     * in a control panel changes
     * @param index The index of the control panel that changes
     * you can use this to check which control panel changed
     *
     */
    async log(optionsObject, index) {
      // console.log(optionsObject, index);
      switch (index) {
        case 0:
          this.stateBarValue = optionsObject;
          this.TableValues = optionsObject;
          this.indicatorComparison = optionsObject;
          this.zonalProps = optionsObject;
          break;
        case 1:
          // this.datasetProps = optionsObject;
          break;
        default:
          break;
      }
    },
  },
  async mounted() {
    // console.log(this.$store.state.MSDAT_STORE.controlConfig);
    const data = await this.dlQuery({ indicator: 7 });
    console.log({ query: data });
  },
};
</script>

<style lang="scss" scoped>
</style>
