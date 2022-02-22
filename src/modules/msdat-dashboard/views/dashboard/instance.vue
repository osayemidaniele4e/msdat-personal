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

    >
      <template v-slot:section-before-0>
        <slot name="top-section"></slot>
      </template>
      <template v-slot:section-0="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Indicator Overview</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <ControlPanelConfiguration :controlIndex="controlIndex">
                <BaseIndicatorOverview
                  :showTableRelatedIndicator="showTableRelatedIndicator"
                  :controlPanelProps="payload"
                   @value="getValue"
                   @key="getKey"
                   @reset="getReset"
                />
              </ControlPanelConfiguration>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-1="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Zonal Analysis</h5>
            </template>
            <!-- lazy loading for each section starts here -->
            <!-- the first section doesn't need the component
                 since it will be mounted first -->
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <BaseZonalAnalysisSection :controlPanelProps="payload" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-2="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Indicator Comparison - By Period/State
              </h5>
            </template>
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <ICS :values="payload" :controlIndex="controlIndex" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-3="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Dataset Comparison</h5>
            </template>
            <template>
              <LazyLoading>
                <ControlPanelConfiguration :controlIndex="controlIndex">
                  <DataSetComparison :values="payload" :controlIndex="controlIndex" />
                </ControlPanelConfiguration>
              </LazyLoading>
            </template>
          </base-sub-card>
        </div>
      </template>

      <template v-slot:section-4="{ payload, controlIndex }">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Multi-Source Indicator Comparison
              </h5>
            </template>
            <template>
              <!-- <div class="row"> -->
              <div class="row">
                <template v-for="n in 3">
                  <div :key="n" class="col-md-4">
                    <LazyLoading>
                      <ControlPanelConfiguration :groupIndex="n - 1" :controlIndex="controlIndex">
                        <MultiSourceComponent :key="n" :values="payload[n - 1]" />
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
    </BaseDashboard>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BaseZonalAnalysisSection from '../../components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import BaseIndicatorOverview from '../../components/sections/indicator-overview/BaseIndicatorOverview.vue';
import IndicatorOverviewConfig from '../../components/sections/indicator-overview/control-panel-config';
import ZonalAnalysisConfig from '../../components/sections/zonal-analysis/control-config';
import ICSConfig from '../../components/sections/indicator-comparism/indicator-comparism-config';
import ICS from '../../components/sections/indicator-comparism/ICS.vue';
import DataSetComparisonConfig from '../../components/sections/dataset-comparison/control-panel-config';
import DataSetComparison from '../../components/sections/dataset-comparison/datasetComparism.vue';
import LazyLoading from '../../modules/onScroll/lazyLoading.vue';
import BaseMultiSourceConfig from '../../components/sections/multi-source-compare/control-config';
import MultiSourceComponent from '../../components/sections/multi-source-compare/multi-source.vue';
import BaseDashboard from './BaseDashboard.vue';
import ControlPanelConfiguration from '../../modules/control_setup/ControlPanelConfiguration.vue';

export default {
  data() {
    return {
      updateValue: {},
      updateKey: '',
      resetData: 1,
    };
  },
  components: {
    BaseDashboard,
    BaseIndicatorOverview,
    ControlPanelConfiguration,
    BaseZonalAnalysisSection,
    LazyLoading,
    ICS,
    DataSetComparison,
    MultiSourceComponent,
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

    getValue(value) {
      this.updateValue = value;
    },

    getKey(key) {
      this.updateKey = key;
    },

    getReset() {
      this.resetData++;
      console.log(this.resetData);
      console.log('resetting2 dude');
    },
  },
  created() {
    this.CLEAR_CONTROL_PANEL();
    /**
     * passing indicator Overview first means it going to at  index 0
     * in the control Panel config Array
     * and so on and fort for the other sections
     */

    this.ADD_CONTROL_PANEL(IndicatorOverviewConfig);
    this.ADD_CONTROL_PANEL(ZonalAnalysisConfig);
    this.ADD_CONTROL_PANEL(ICSConfig);
    this.ADD_CONTROL_PANEL(DataSetComparisonConfig);
    this.ADD_CONTROL_PANEL(BaseMultiSourceConfig);
  },
};
</script>

<style lang="scss" scoped></style>
