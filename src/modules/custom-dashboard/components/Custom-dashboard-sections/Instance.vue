/* eslint-disable vue/no-unused-components */
<!-- Auther: Ghufran Ahmed  -->
<template>
  <div>
    <Sections
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
        <div
          class="col-md-12"
          v-if="
            $store.state.MSDAT_STORE.indicatorComparision == true &&
            fields.map((element) => {
              element.name == 'Indicator Overview';
            })
          "
        >
          <base-sub-card class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Indicator Overview</h5>
            </template>
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
        <div
          class="col-md-12"
          v-if="
            $store.state.MSDAT_STORE.zonalAnalysis == true &&
            fields.map((element) => {
              element.name == 'Zonal Analysis';
            })
          "
        >
          <base-sub-card class="my-2 shadow-sm">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Zonal Analysis</h5>
            </template>
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
        <div
          class="col-md-12"
          v-if="
            $store.state.MSDAT_STORE.indicatorComparsionByPeriod == true &&
            fields.map((element) => {
              element.name == 'Indicator Comparison';
            })
          "
        >
          <base-sub-card>
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
        <div
          class="col-md-12"
          v-if="
            $store.state.MSDAT_STORE.datasetComperision == true &&
            fields.map((element) => {
              element.name == 'Dataset Comparison';
            })
          "
        >
          <base-sub-card class="my-2 shadow-sm">
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
        <div
          class="col-md-12"
          v-if="
            $store.state.MSDAT_STORE.multisourceComparison == true &&
            fields.map((element) => {
              element.name == 'Multi-source Comparison';
            })
          "
        >
          <base-sub-card class="my-2 shadow-sm">
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
    </Sections>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BaseZonalAnalysisSection from '../../../msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import BaseIndicatorOverview from '../../../msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue';
import IndicatorOverviewConfig from '../../../msdat-dashboard/components/sections/indicator-overview/control-panel-config';
import ZonalAnalysisConfig from '../../../msdat-dashboard/components/sections/zonal-analysis/control-config';
import ICSConfig from '../../../msdat-dashboard/components/sections/indicator-comparism/indicator-comparism-config';
import ICS from '../../../msdat-dashboard/components/sections/indicator-comparism/ICS.vue';
import DataSetComparisonConfig from '../../../msdat-dashboard/components/sections/dataset-comparison/control-panel-config';
import DataSetComparison from '../../../msdat-dashboard/components/sections/dataset-comparison/datasetComparism.vue';
import LazyLoading from '../../../msdat-dashboard/modules/onScroll/lazyLoading.vue';
import BaseMultiSourceConfig from '../../../msdat-dashboard/components/sections/multi-source-compare/control-config';
import MultiSourceComponent from '../../../msdat-dashboard/components/sections/multi-source-compare/multi-source.vue';
import Sections from './Sections.vue';
import ControlPanelConfiguration from '../../../msdat-dashboard/modules/control_setup/ControlPanelConfiguration.vue';

export default {
  data() {
    return {
      updateValue: {},
      updateKey: '',
      resetData: 1,
    };
  },
  components: {
    Sections,
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
    fields: {
      type: Array,
      required: false,
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
