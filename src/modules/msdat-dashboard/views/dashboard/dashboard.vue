<template>
  <div>
    <b-overlay :show="!cpIsLoading">
      <BasePanel :position="position" v-if="cpIsLoading">
        <template v-slot:default>
          <ControlBase
            v-for="(control, index) in $store.state.MSDAT_STORE.controlConfig"
            :key="index"
            :title="control.label"
          >
            <template v-if="!Array.isArray(control.setup[0])">
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
            </template>
            <template v-else>
              <div class="row">
                <div
                  class="col-md-4"
                  v-for="(item, index2) in control.setup"
                  :key="index2"
                >
                  <ControlPanel
                    @data:options="log($event, index, index2)"
                    :setup="item"
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
                </div>
              </div>
            </template>
          </ControlBase>
        </template>
      </BasePanel>
    </b-overlay>
    <!-- control Panels ends here  -->
    <div class="container-fluid mt-5">
      <ZonalChart :controlPanelProps="zonalAnalysis" />
    </div>
  </div>
</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';
import ZonalChart from '../../components/sections/zonal-analysis/zonalSection.vue';
import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';

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
      indicatorComparisonData: '',
      MultiSourceCompareValue: [],
      zonalAnalysis: {},
    };
  },
  components: {
    ControlBase,
    BasePanel,
    ControlPanel,
    ZonalChart,
  },
  methods: {
    /**
     * @param optionsObject The return a control Options objects when ever any control
     * in a control panel changes
     * @param index The index of the control panel that changes
     * you can use this to check which control panel changed
     *
     */
    async log(optionsObject, index, index2) {
      // console.log(optionsObject, index);
      switch (index) {
        case 0:
          // this.stateBarValue = optionsObject;
          // this.TableValues = optionsObject;
          // this.indicatorComparison = optionsObject;
          // this.zonalProps = optionsObject;
          break;
        case 1:
          // this.datasetProps = optionsObject;
          break;
        case 2:
          this.indicatorComparisonData = optionsObject;
          break;
        case 3:
          this.MultiSourceCompareValue[index2] = optionsObject;
          break;
        case 4:
          this.zonalAnalysis = optionsObject;
          break;
        default:
          break;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
