<template>
  <div>
    <!-- <h1>MSDAT DASHBOARD</h1> -->
    <BasePanel
      :tabs="[
        'Indicator Overview',
        'Zonal Analysis',
        'Indicator Comparison',
        'Dataset Comparison',
        'Multi-source Indicator Comparison',
      ]"
      :position="position"
    >
      <template v-slot:default="{ currentTab }">
        <indicatorOverviewPanel v-if="currentTab == 0" @data:options="log" />
        <zonalAnalysisPanel v-if="currentTab == 1" />
        <indicatorComparisonPanel v-if="currentTab == 2" />
        <datasetComparisonPanel v-if="currentTab == 3" />
        <multisourceIndicatorPanel v-if="currentTab == 4" />
      </template>
    </BasePanel>

    <!-- <ComparismSection/> -->
    <!-- <button @click="position = 1" class="btn btn-primary">Hello World</button> -->
  </div>
</template>

<script>
import {
  BasePanel,
  indicatorOverviewPanel,
  zonalAnalysisPanel,
  indicatorComparisonPanel,
  datasetComparisonPanel,
  multisourceIndicatorPanel,
} from '@/components/ControlPanel';

export default {
  data() {
    return {
      position: 0,
    };
  },
  components: {
    indicatorOverviewPanel,
    BasePanel,
    zonalAnalysisPanel,
    indicatorComparisonPanel,
    datasetComparisonPanel,
    multisourceIndicatorPanel,
  },
  methods: {
    log(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
