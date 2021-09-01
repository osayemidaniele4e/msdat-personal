<template>
  <div>
    <Header v-on:tour="runIntro"></Header>
    <div class="sticky">
      <b-overlay :show="!cpIsLoading">
        <BasePanel
          :position="position"
          v-if="cpIsLoading"
          v-on:showSection="showSection($event)"
        >
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
    </div>
    <!-- control Panels ends here  -->

    <div class="container-fluid" id="observer-root">
      <div class="row observable" id="0" ref="0">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Indicator Overview
              </h5>
            </template>
            <template>
              <div class="row">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-12">
                      <TheTable :values="TableValues" />
                    </div>
                    <div class="col-md-12">
                      <IDCC :values="indicatorComparison" />
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <TheStateBarChart
                    v-if="cpIsLoading"
                    :values="stateBarValue"
                  />
                </div>
              </div>
            </template>
          </base-sub-card>
        </div>
      </div>
      <div id="1" class="row observable" ref="1">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Zonal Analysis Section
              </h5>
            </template>
            <template>
              <ZonalAnalysisSection :controlPanelProps="zonalAnalysis" />
            </template>
          </base-sub-card>
        </div>
      </div>
      <div class="row observable" id="2" ref="2">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Indicator Comparison - By Period
              </h5>
            </template>
            <template>
              <ICS :values="indicatorComparisonData" />
            </template>
          </base-sub-card>
        </div>
      </div>
      <div class="row observable" id="3" ref="3">
        <div class="col-md-12">
          <DataSetComparism :values="datasetProps" />
        </div>
      </div>

      <div class="row observable" id="4" ref="4">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Multi-Source Indicator Comparison
              </h5>
            </template>
            <template>
              <div class="row">
                <template v-for="n in 3">
                  <div :key="n" class="col-md-4">
                    <MultiSourceCompare
                      v-if="MultiSourceCompareValue[n - 1]"
                      :values="MultiSourceCompareValue[n - 1]"
                    />
                  </div>
                </template>
              </div>
            </template>
          </base-sub-card>
        </div>
      </div>
    </div>

    <Footer class="visible"> </Footer>
  </div>
</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';
import ZonalAnalysisSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';
import TheStateBarChart from '../../components/sections/TheStateBarChart.vue';
import TheTable from '../../components/sections/TheTable.vue';
import IDCC from '../../components/sections/TheIndicatorDatasoureComparisonChart.vue';
import ICS from '../../components/sections/indicator-comparism/ICS.vue';
import DataSetComparism from '../../components/sections/dataset-comparison/datasetComparism.vue';
import tour from '../../mixins/tour';
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import scroll from '../../mixins/onscroll';

import MultiSourceCompare from '../../components/sections/multi-source-compare/multi-source.vue';

export default {
  mixins: [formatter, controlPanelSetup, tour, scroll],
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
      availableYears: [],
      zonalAnalysis: {},
      mapValues: {},
      selectedMapName: null,
    };
  },
  components: {
    ControlBase,
    BasePanel,
    ControlPanel,
    DataSetComparism,
    TheStateBarChart,
    TheTable,
    IDCC,
    ICS,
    MultiSourceCompare,
    Header,
    Footer,
    ZonalAnalysisSection,
  },
  methods: {
    /**
     * @param optionsObject The return a control Options objects when ever any control
     * in a control panel changes
     * @param index The index of the control panel that changes
     * you can use this to check which control panel changed
     *
     */

    /**
     * *
     */
    setState(val) {
      this.selectedMapName = val;
    },
    async log(optionsObject, index, index2) {
      // console.log(optionsObject, index);
      switch (index) {
        case 0:
          this.stateBarValue = optionsObject;
          this.TableValues = optionsObject;
          this.indicatorComparison = optionsObject;
          this.zonalProps = optionsObject;
          break;
        case 1:
          this.zonalAnalysis = optionsObject;
          break;
        case 2:
          this.indicatorComparisonData = optionsObject;
          break;
        case 3:
          this.datasetProps = optionsObject;
          break;
        case 4:
          this.MultiSourceCompareValue[index2] = optionsObject;
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
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 999;
  background-color: white;
  box-shadow: 0px 3px 8px 0px #888888;
}
.visible {
  z-index: 9999;
}
</style>
