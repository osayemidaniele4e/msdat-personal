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
              <h5 class="font-weight-bold work-sans text-white">Indicator Comparison</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <IndicatorComparisonSection :controlPanelProps="payload" />
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
              <h5 class="font-weight-bold work-sans text-white">Dataset Comparison</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <DatasetComparisonSection :controlPanelProps="payload" />
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
import IndicatorComparisonSection from '../../components/sections/gis/indicator-comparison/GisIndicatorComparison.vue';
import IndicatorComparisonConfig from '../../components/sections/gis/indicator-comparison/indicator-compare-gis-config';
import DatasetComparisonSection from '../../components/sections/gis/dataset-comparison/GisDatasetComparison.vue';
import DatasetComparisonConfig from '../../components/sections/gis/dataset-comparison/dataset-compare-gis-config';
// import MultiSourceComponent from '../../components/sections/gis/multi-source-compare/BaseMultiSourceSection.vue';
// import MultiSourceConfig from '../../components/sections/gis/multi-source-compare/multi-source-gis-compare.js';
import BaseDashboard from './BaseDashboard.vue';
import ControlPanelConfiguration from '../../modules/control_setup/ControlPanelConfiguration.vue';
import LazyLoading from '../../modules/onScroll/lazyLoading.vue';

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
    LazyLoading,
    // MultiSourceComponent,
    IndicatorComparisonSection,
    DatasetComparisonSection,

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
    this.ADD_CONTROL_PANEL(IndicatorComparisonConfig);
    this.ADD_CONTROL_PANEL(DatasetComparisonConfig);
    // this.ADD_CONTROL_PANEL(MultiSourceConfig);

    //  Adding 'Dynamic section' to the control panel
    //  when not in the 'Health Outcomes dashboard'
    this.$route.meta.title = 'GIS Mapping';
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
