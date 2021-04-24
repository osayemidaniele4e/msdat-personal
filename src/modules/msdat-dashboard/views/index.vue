<template>
  <div>
    <!-- <h1>MSDAT DASHBOARD</h1> -->
    <BasePanel :position="position">
      <template v-slot:default>
        <ControlBase :title="'Indicator Overview'">
          <IndicatorOverviewPanel />
        </ControlBase>
        <ControlBase :title="'Zonal Analysis'">
          <ZonalAnalysisPanel />
        </ControlBase>
        <ControlBase :title="'DataSet Comparison'">
          <DatasetComparisonPanel />
        </ControlBase>
        <ControlBase :title="'Multi-source Indicator'">
          <MultiSourceIndicatorPanel />
        </ControlBase>
        <ControlBase :title="'Indicator Comparison'">
          <IndicatorComparisonPanel />
        </ControlBase>
      </template>
    </BasePanel>

    <!-- <ComparismSection/> -->
    <!-- <button @click="position = 1" class="btn btn-primary">Hello World</button> -->
  </div>
</template>

<script>
import {
  BasePanel,
  ControlBase,
  IndicatorOverviewPanel,
  ZonalAnalysisPanel,
  IndicatorComparisonPanel,
  DatasetComparisonPanel,
  MultiSourceIndicatorPanel,
} from '@/components/ControlPanel';

export default {
  data() {
    return {
      position: 3,
    };
  },
  components: {
    ControlBase,
    IndicatorOverviewPanel,
    BasePanel,
    ZonalAnalysisPanel,
    IndicatorComparisonPanel,
    DatasetComparisonPanel,
    MultiSourceIndicatorPanel,
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
