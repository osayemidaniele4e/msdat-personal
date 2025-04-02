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
              <div class="icon-container">
                <h5 class="font-weight-bold work-sans text-white">Predictive Analysis</h5>
                <!-- <p class="work-sans mb-0 title-text">
              Prediction Of <b>{{ values.indicator.short_name }}</b> and related indicators
              (Time-series comparison of {{ values.indicator.short_name }}) across different data
              sources.
            </p> -->
                <div class="desc-icon">
                  <svg
                    data-v-21137bd3=""
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    focusable="false"
                    role="img"
                    aria-label="info circle fill"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    class="bi-info-circle-fill data-source-info b-icon bi text-primary"
                  >
                    <g data-v-21137bd3="">
                      <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="desc-text p-2">
                  <p>
                    The Predictive Analysis section of MSDAT involves transforming raw data
                    into a structured data frame for better analysis. An optimal ARIMA model
                    is then applied to forecast future trends based on historical data.
                    Once predictions are generated, the results are sent to the front end
                    for real-time display, providing users with clear and actionable insights.
                  </p>
                </div>
              </div>
            </template>
            <template>
              <LazyLoading>
                <AdvancedControlPanelConfiguration :controlIndex="controlIndex">
                  <PredictiveAnalysisSection :values="payload" :controlIndex="controlIndex" />
                </AdvancedControlPanelConfiguration>
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
    ...mapMutations('MSDAT_STORE', [
      'ADD_CONTROL_PANEL',
      'CLEAR_CONTROL_PANEL',
      'SET_ADVANCED_MULTISOURCE_DEFAULT_DATASOURCES',
    ]),

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

    const defaultData = {
      id: 6,
      datasource: 'NHMIS-DHIS2',
      full_name: 'National Health Management Information System (DHIS2)',
      description:
        'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.',
      year_available: '2013 - 2021',
      period_available: '2022',
      methodology:
        "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.",
      subnational_data: 'Yes',
      classification: 'Routine',
      link: 'https://dhis2nigeria.org.ng',
      created_at: '2022-10-20T08:13:15.757413Z',
      updated_at: '2022-10-20T08:13:15.757421Z',
      group: [],
    };

    this.SET_ADVANCED_MULTISOURCE_DEFAULT_DATASOURCES(defaultData);
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

.icon-container {
  display: flex;
}

.icon-container h5 {
  margin-right: 5px;
}

.desc-icon {
  font-size: 13px;
  margin-top: -3px;
}

.desc-text {
  display: none;
  position: absolute;
  left: 8%;
  transform: translateX(30px);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-top: 25px;
  z-index: 1;
  width: 50%;
}

.desc-text p {
  font-size: 13px !important;
  margin-bottom: 0px;
}

.icon-container .desc-icon:hover + .desc-text {
  display: block;
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
