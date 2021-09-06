<template>
  <Loading
    v-if="!loading"
    :noBackdrop="false"
    :showBackground="false"
    class="over"
  >
    <div class="text-center">
      <img :src="loadingImg" alt="first_img" width="250px" />
      <div class="mr-4">
        <h3>Initializing{{ loadingTitle }}</h3>
        <p>{{ loadingContent }}</p>
      </div>
    </div>
  </Loading>

  <div v-else>
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

    <div class="container-fluid lessVisible" v-if="cpIsLoading">
      <div class="row observable" id="0" ref="0">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Indicator Overview
              </h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <BaseIndicatorOverview
                v-if="BaseIndicatorOverviewProp"
                :controlPanelProps="BaseIndicatorOverviewProp"
              />
            </template>
          </base-sub-card>
        </div>
      </div>
      <div class="row observable" id="1" ref="1">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Zonal Analysis Section
              </h5>
            </template>
            <template>
              <LazyLoading>
                <ZonalAnalysisSection
                  v-if="zonalAnalysis"
                  :controlPanelProps="zonalAnalysis"
                />
              </LazyLoading>
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
              <LazyLoading>
                <ICS :values="indicatorComparisonData" />
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </div>
      <div class="row observable" id="3" ref="3">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Dataset Comparison
              </h5>
            </template>
            <template>
              <LazyLoading>
                <DataSetComparism v-if="datasetProps" :values="datasetProps" />
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </div>
      <div class="row observable" id="4" ref="4">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Multi-Source Indicator Comparison
              </h5>
            </template>
            <template>
              <div class="row">
                <template v-for="n in 3">
                  <div :key="n" class="col-md-4">
                    <LazyLoading>
                      <MultiSourceCompare
                        v-if="MultiSourceCompareValue[n - 1]"
                        :values="MultiSourceCompareValue[n - 1]"
                        :currentIndex="n - 1"
                      />
                    </LazyLoading>
                  </div>
                </template>
              </div>
            </template>
          </base-sub-card>
        </div>
      </div>
    </div>
    <!-- lazy loading ends here -->

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
import BaseIndicatorOverview from '../../components/sections/indicator-overview/BaseIndicatorOverview.vue';
import ICS from '../../components/sections/indicator-comparism/ICS.vue';
import DataSetComparism from '../../components/sections/dataset-comparison/datasetComparism.vue';
import tour from '../onboarding/tour';
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import scroll from '../../modules/onScroll/onscroll';
import LazyLoading from '../../modules/onScroll/lazyLoading.vue';
import Loading from '../../mixins/loading';
import MultiSourceCompare from '../../components/sections/multi-source-compare/multi-source.vue';

export default {
  mixins: [Loading, formatter, controlPanelSetup, tour, scroll],
  data() {
    return {
      position: 3,
      BarChartOptions: {},
      controlPanel: {},
      lect: '',
      BaseIndicatorOverviewProp: {},
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
    BaseIndicatorOverview,
    ICS,
    MultiSourceCompare,
    Header,
    Footer,
    ZonalAnalysisSection,
    LazyLoading,
  },
  props: {
    initialIndicator: {
      type: Number,
      required: true,
    },
    initialDataSource: {
      type: Number,
      required: true,
    },
    initialLocation: {
      type: Number,
      required: true,
    },
    indicators: {
      type: Array,
      required: false,
      default: () => [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 5, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ],
    },
    dataSources: {
      type: Array,
      required: false,
      default: () => [1, 2, 3, 5, 6, 7, 8, 9],
    },
    defaultIndicators: {
      type: Array,
      required: false,
      default: () => [7, 5, 8],
    },
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
          // this.stateBarValue = optionsObject;
          // this.TableValues = optionsObject;
          // this.indicatorComparison = optionsObject;
          // this.zonalProps = optionsObject;
          this.BaseIndicatorOverviewProp = optionsObject;
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
  async mounted() {
    this.loading = false;
    // initializing data for dashboard
    await this.$DL.init({
      dashboardIndicators: this.indicators,
      defaultIndicators: this.defaultIndicators,
      dashboardDataSources: this.dataSources,
    });

    this.loading = true;

    this.$store.commit('MSDAT_STORE/SET_INITIAL', {
      indicator: this.initialIndicator,
      datasource: this.initialDataSource,
      location: this.initialLocation,
    });

    // The initializing the control panel
    this.setDefaults();
    this.setUpControlPanelDropDown();
    await this.setYearDropdown();
    this.cpIsLoading = true;
    this.$nextTick(() => {
      this.startScroll();
    });
  },
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 3px 8px 0px #888888;
}
.visible {
  z-index: 10;
}
.lessVisible {
  z-index: -1;
}
</style>
