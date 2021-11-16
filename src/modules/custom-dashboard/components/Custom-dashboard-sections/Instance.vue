<template>
  <div>
    <TroubleShootingModal
      style="z-index: 1500"
      v-if="showTroubleShootingModal"
    />
    <template v-if="!showTroubleShootingModal">
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
                  v-for="(control, index) in $store.state.MSDAT_STORE
                    .controlConfig"
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

        <template v-for="field in this.fieldsArray">
          <div :id="field.id" :ref="field.id" class="row observable" :key="field.id">
            <Sections
              :field="field"
              :cpIsLoading="cpIsLoading"
              :BaseIndicatorOverviewProp="BaseIndicatorOverviewProp"
              :zonalAnalysis="zonalAnalysis"
              :indicatorComparisonData="indicatorComparisonData"
              :datasetProps="datasetProps"
              :MultiSourceCompareValue="MultiSourceCompareValue"
            />
          </div>
        </template>
        <!-- lazy loading ends here -->

        <Footer class="visible"> </Footer>
        <Onboarding
          v-if="firstTime"
          v-on:closeOnboard="onCloseOnBoarding"
        ></Onboarding>
      </div>
    </template>
  </div>
</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';
import ZonalAnalysisSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import formatter from '../../../msdat-dashboard/mixins/formatter'; // '../../mixins/formatter';
import controlPanelSetup from '../../../msdat-dashboard/mixins/control-panel-setup'; // '../../mixins/control-panel-setup';
import BaseIndicatorOverview from '../../../msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue'; // '../../components/sections/indicator-overview/BaseIndicatorOverview.vue';
import BaseICS from '../../../msdat-dashboard/components/sections/indicator-comparism/BaseICS.vue'; // '../../components/sections/indicator-comparism/BaseICS.vue';
import DataSetComparism from '../../../msdat-dashboard/components/sections/dataset-comparison/datasetComparism.vue'; // '../../components/sections/dataset-comparison/datasetComparism.vue';
import tour from '../../../msdat-dashboard/views/onboarding/tour'; // '../onboarding/tour';
import Header from '../../../msdat-dashboard/views/about/layout/theHeader.vue'; // '../about/layout/theHeader.vue';
import Footer from '../../../msdat-dashboard/views/about/layout/theFooter.vue'; // '../about/layout/theFooter.vue';
import scroll from '../../../msdat-dashboard/modules/onScroll/onscroll'; // '../../modules/onScroll/onscroll';
import LazyLoading from '../../../msdat-dashboard/modules/onScroll/lazyLoading.vue'; // '../../modules/onScroll/lazyLoading.vue';
import Loading from '../../../msdat-dashboard/mixins/loading'; // '../../mixins/loading';
import BaseMultiSourceSection from '../../../msdat-dashboard/components/sections/multi-source-compare/BaseMultiSourceSection.vue'; // '../../components/sections/multi-source-compare/BaseMultiSourceSection.vue';
import Onboarding from '../../../msdat-dashboard/views/onboarding/onboarding'; // '../onboarding/onboarding';
import TroubleShooting from '../../../msdat-dashboard/modules/troubleshooting/mixins'; // '../../modules/troubleshooting/mixins';
import Sections from './Sections.vue';
// config.indicators = [2,3,4]

export default {
  mixins: [
    Loading,
    formatter,
    controlPanelSetup,
    Onboarding,
    tour,
    scroll,
    TroubleShooting,
  ],
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
      fieldsArray: [],
    };
  },
  components: {
    ControlBase,
    BasePanel,
    ControlPanel,
    DataSetComparism,
    BaseIndicatorOverview,
    BaseICS,
    BaseMultiSourceSection,
    Header,
    Footer,
    ZonalAnalysisSection,
    LazyLoading,
    Sections,
  },
  computed: {
    fieldVisiblity() {
      return this.$store.state.MSDAT_STORE.indicatorComparision;
    },
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
    },
    dataSources: {
      type: Array,
      required: false,
    },
    defaultIndicators: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: true,
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
    this.fieldsArray = this.fields;
    // initializing data for dashboard
    try {
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

      this.defaultYearDropdown = this.setYearDropdown();
      if (this.defaultYearDropdown.length > 0) {
        const firstItem = 0;
        this.defaultYear = this.defaultYearDropdown[firstItem];
      }
      // console.log('year', this.setYearDropdown())
      this.cpIsLoading = true;
      // this.$nextTick(() => {
      //   this.startScroll();
      // });
    } catch (error) {
      // This means it a dexies error
      if (!error.isAxiosError) {
        this.showTroubleShootingModal = true;
      }
    }
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
