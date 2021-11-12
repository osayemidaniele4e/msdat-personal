<template>
  <div class="container-fluid lessVisible" :key="field.id" v-if="cpIsLoading">
    <div
      class="row observable"
      v-if="
        $store.state.MSDAT_STORE.indicatorComparision == true &&
        field.name == 'Indicator Overview'
      "
    >
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
    <div
      class="row observable"
      ref="1"
      v-if="
        $store.state.MSDAT_STORE.zonalAnalysis == true &&
        field.name == 'Zonal Analysis'
      "
    >
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
    <div
      class="row observable"
      v-if="
        $store.state.MSDAT_STORE.indicatorComparsionByPeriod == true &&
        field.name == 'Indicator Comparsion - By Period'
      "
    >
      <div class="col-md-12">
        <base-sub-card :backgroundColor="'#348481'">
          <template #title>
            <h5 class="font-weight-bold work-sans text-white">
              Indicator Comparison - By Period
            </h5>
          </template>
          <template>
            <LazyLoading>
              <BaseICS :controlPanelProps="indicatorComparisonData" />
            </LazyLoading>
          </template>
        </base-sub-card>
      </div>
    </div>
    <div
      class="row observable"
      v-if="
        $store.state.MSDAT_STORE.datasetComperision == true &&
        field.name == 'Dataset Comparison'
      "
    >
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
    <div
      v-if="
        $store.state.MSDAT_STORE.multisourceComparison == true &&
        field.name == 'Multi-source Indicator Comparison'
      "
    >
      <div class="col-md-12">
        <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
          <template #title>
            <h5 class="font-weight-bold work-sans text-white">
              Multi-source Indicator Comparison
            </h5>
          </template>
          <template>
            <div class="row">
              <template v-for="n in 3">
                <div :key="n" class="col-md-4">
                  <LazyLoading>
                    <BaseMultiSourceSection
                      v-if="MultiSourceCompareValue[n - 1]"
                      :controlPanelProps="MultiSourceCompareValue[n - 1]"
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
</template>

<script>
import BaseIndicatorOverview from '../../../msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue';
import LazyLoading from '../../../msdat-dashboard/modules/onScroll/lazyLoading.vue';
import ZonalAnalysisSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import BaseICS from '../../../msdat-dashboard/components/sections/indicator-comparism/BaseICS.vue';
import DataSetComparism from '../../../msdat-dashboard/components/sections/dataset-comparison/datasetComparism.vue';
import BaseMultiSourceSection from '../../../msdat-dashboard/components/sections/multi-source-compare/BaseMultiSourceSection.vue';
import Footer from '../../../msdat-dashboard/views/about/layout/theFooter.vue';
import Onboarding from '../../../msdat-dashboard/views/onboarding/onboarding';

export default {
  components: {
    BaseIndicatorOverview,
    LazyLoading,
    ZonalAnalysisSection,
    BaseICS,
    DataSetComparism,
    BaseMultiSourceSection,
    Footer,
    Onboarding,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    cpIsLoading: {
      type: Boolean,
      required: true,
    },
    BaseIndicatorOverviewProp: {
      type: Object,
      required: true,
    },
    zonalAnalysis: {
      type: Object,
      required: true,
    },
    indicatorComparisonData: {
      type: Object,
      required: true,
    },
    datasetProps: {
      type: Object,
      required: true,
    },
    MultiSourceCompareValue: {
      type: Array,
      required: true,
    },
  },
};
</script>
