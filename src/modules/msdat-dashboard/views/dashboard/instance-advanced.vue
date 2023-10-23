<template>
  <div>
    <BaseDashboard
      :indicators="indicators"
      :dataSources="dataSources"
      :defaultIndicators="defaultIndicators"
      :initialIndicator="initialIndicator"
      :initialDataSource="initialDataSource"
      :initialLocation="initialLocation"
      :updateValue="updateValue"
      :updateKey="updateKey"
      :resetData="resetData"
        @swipe="changeSwipe"

    >
      <template v-slot:section-before-0>
        <slot name="top-section"></slot>
      </template>

      <template v-slot:section-0="{ payload, controlIndex }">
        <div class="col-md-12" style="margin-bottom: 4rem">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Correlation Analysis</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <CorrelationAnalysisSection :controlPanelProps="payload" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-1="{ payload, controlIndex }">
        <div class="col-md-12" style="margin-bottom: 4rem">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Descriptive Analysis</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <DescriptiveAnalysisSection :controlPanelProps="payload" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-2="{ payload, controlIndex }">
        <div class="col-md-12" style="margin-bottom: 4rem">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Indicator Comparison</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <!-- <ControlPanelConfiguration :controlIndex="controlIndex"> -->
                  <AdvancedControlPanelConfiguration :controlIndex="controlIndex">
                    <IndicatorComparisonSection :controlIndex="controlIndex" :values="payload" />
                  </AdvancedControlPanelConfiguration>
                <!-- </ControlPanelConfiguration> -->
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-3="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Predictive Analysis
              </h5>
            </template>
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <PredictiveAnalysisSection :values="payload" :controlIndex="controlIndex" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-4="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Multi-Source Indicator Comparison
              </h5>
            </template>
            <template>
              <!-- <div class="row"> -->
              <div class="dummy-row2 row">
                <template v-for="n in 3" class="flex-item">
                  <div :key="n" class="col-lg-4 col-12">
                    <div class="comparison-header">Comparison ({{ n }})</div>
                    <LazyLoading>
                      <ControlPanelConfiguration :groupIndex="n - 1" :controlIndex="controlIndex">
                        <AdvancedMultiSource :key="n" :values="payload[n - 1]" />
                      </ControlPanelConfiguration>
                    </LazyLoading>
                  </div>
                </template>
              </div>
              <!-- </div> -->
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-5="{ payload, controlIndex }">
        <div class="col-md-12" style="margin-bottom: 4rem">
          <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Scatterplot Analysis</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <ScatterplotSection :controlPanelProps="payload" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

    </BaseDashboard>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
// import BaseZonalAnalysisSection from '../../components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import DescriptiveAnalysisSection from '../../components/sections/advanced/descriptive-section/DescriptiveSection.vue';
import DescriptiveAnalysisConfig from '../../components/sections/advanced/descriptive-section/descriptive-section-config';
import CorrelationAnalysisSection from '../../components/sections/advanced/correlation-section/CorrelationSection.vue';
import CorrelationAnalysisConfig from '../../components/sections/advanced/correlation-section/correlation-section-config';
// import IndicatorComparisonSection from '../../components/sections/advanced/indicator-comparison-section/IndicatorComparisonSection.vue';
import IndicatorComparisonSection from '../../components/sections/advanced/indicator-comparison-section/ICSAdvanced.vue';
import IndicatorComparisonConfig from '../../components/sections/advanced/indicator-comparison-section/indicator-comparison-section-config';
import PredictiveAnalysisConfig from '../../components/sections/advanced/predictive-section/predictive-section-config';
import PredictiveAnalysisSection from '../../components/sections/advanced/predictive-section/PredictiveSection.vue';
import LazyLoading from '../../modules/onScroll/lazyLoading.vue';
import AdvancedMultiSourceConfig from '../../components/sections/advanced/multisource-section/Multisource-section-config';
import AdvancedMultiSource from '../../components/sections/advanced/multisource-section/multi-source.vue';
import ScatterplotConfig from '../../components/sections/advanced/scatterplot-section/scatterplot-section-config';
import ScatterplotSection from '../../components/sections/advanced/scatterplot-section/ScatterplotSection.vue';
import BaseDashboard from './BaseDashboard.vue';
import ControlPanelConfiguration from '../../modules/control_setup/ControlPanelConfiguration.vue';
import AdvancedControlPanelConfiguration from '../../modules/control_setup/AdvancedControlPanelConfiguration.vue';

// import BaseIndicatorOverview from '../../components/sections/indicator-overview/BaseIndicatorOverview.vue';
// import IndicatorOverviewConfig from '../../components/sections/indicator-overview/control-panel-config';
// import ZonalAnalysisConfig from '../../components/sections/zonal-analysis/control-config';
// import ICSConfig from '../../components/sections/indicator-comparism/indicator-comparism-config';
// import DataSetComparisonConfig from '../../components/sections/dataset-comparison/control-panel-config';
// import BaseMultiSourceConfig from '../../components/sections/multi-source-compare/control-config';
// import DynamicSectionConfig from '../../components/sections/dynamic-section/dynamic-section-config';
// import ICS from '../../components/sections/indicator-comparism/ICS.vue';
// import MultiSourceComponent from '../../components/sections/multi-source-compare/multi-source.vue';
// import DynamicSection from '../../components/sections/dynamic-section/DynamicSection.vue';
// import DataSetComparison from '../../components/sections/dataset-comparison/datasetComparism.vue';

export default {
  data() {
    return {
      isMobile: true,
      updateValue: {},
      updateKey: '',
      resetData: 1,
    };
  },
  components: {
    BaseDashboard,
    ControlPanelConfiguration,
    AdvancedControlPanelConfiguration,
    LazyLoading,
    PredictiveAnalysisSection,
    CorrelationAnalysisSection,
    AdvancedMultiSource,
    DescriptiveAnalysisSection,
    IndicatorComparisonSection,
    ScatterplotSection,
    // BaseZonalAnalysisSection,
    // ICS,
    // BaseIndicatorOverview,
    // DataSetComparison,
    // MultiSourceComponent,
    // DynamicSection,
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
    showTableRelatedIndicator: {
      type: Boolean,
      default: true,
    },

  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),

    scroll(timestamp) {
      // Calculate the timeelapsed
      const timeElapsed = timestamp - this.scrollStartTime;
      // Calculate progress
      const progress = Math.min(timeElapsed / this.scrollDuration, 1);
      // Set the scrolleft
      this.scrollElement.scrollLeft = this.scrollPos + this.scrollPixels * progress;
      // Check if elapsed time is less then duration then
      // call the requestAnimation, otherwise exit
      if (timeElapsed < this.scrollDuration) {
        // Request for animation
        window.requestAnimationFrame(this.scroll);
      }
    },

    changeSwipe(cord) {
      const content = document.querySelector('.dummy-row2');
      this.scrollTo(content, cord.x, cord.y);
    },

    // changeScroll(n) {
    //   if (n >= 0 && n < 194) {
    //     document.querySelector('.dummy-row2').scrollLeft = 0;
    //   }

    //   if (n >= 194 && n < 420) {
    //     document.querySelector('.dummy-row2').scrollLeft = 383;
    //   }

    //   if (n >= 420) {
    //     document.querySelector('.dummy-row2').scrollLeft = 757;
    //   }
    // },

    scrollTo(element, scrollPixels, duration) {
      this.scrollPixels = scrollPixels;
      this.scrollElement = element;
      this.scrollDuration = duration;
      const scrollPos = element.scrollLeft;
      this.scrollPos = scrollPos;
      // Condition to check if scrolling is required
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0)
          && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0)
        )
      ) {
        // Get the start timestamp
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        this.scrollStartTime = startTime;
        // Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(this.scroll);
      }
    },
    // onResize() {
    //   if (window.innerWidth < 769) {
    //     this.isMobile = true;
    //     BaseMultiSourceConfig.setup = BaseMultiSourceConfig.setup3;
    //   } else {
    //     this.isMobile = false;
    //     BaseMultiSourceConfig.setup = BaseMultiSourceConfig.setup2;
    //   }
    // },
    getValue(value) {
      this.updateValue = value;
    },

    getKey(key) {
      this.updateKey = key;
    },

    getReset() {
      this.resetData++;
    },
  },
  async created() {
    // window.addEventListener('resize', this.onResize);

    // checking if in Mobile view
    // if (window.innerWidth < 769) {
    //   this.isMobile = true;
    // } else {
    //   this.isMobile = false;
    // }

    await this.CLEAR_CONTROL_PANEL();
    /**
     * passing indicator Overview first means it going to at  index 0
     * in the control Panel config Array
     * and so on and fort for the other sections
     */
    // if (this.$route.params.name !== 'Health_Outcomes') {
    //   this.ADD_CONTROL_PANEL(DynamicSectionConfig);
    // }
    this.ADD_CONTROL_PANEL(CorrelationAnalysisConfig);
    this.ADD_CONTROL_PANEL(DescriptiveAnalysisConfig);
    this.ADD_CONTROL_PANEL(IndicatorComparisonConfig);
    this.ADD_CONTROL_PANEL(PredictiveAnalysisConfig);
    this.ADD_CONTROL_PANEL(AdvancedMultiSourceConfig);
    this.ADD_CONTROL_PANEL(ScatterplotConfig);

    //  Adding 'Dynamic section' to the control panel
    //  when not in the 'Health Outcomes dashboard'
    this.$route.meta.title = 'Advanced Analytics';
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style scoped>
/* test css */
.dummy-row2 {
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  overflow-x: hidden;
  flex-shrink: 0;
  flex-basis: 0;
  flex-wrap: nowrap;
}

.comparison-header {
 display: none;
}

@media (max-width: 800px) {
.comparison-header {
  display: inherit;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  margin: 5px;
}
}
</style>
