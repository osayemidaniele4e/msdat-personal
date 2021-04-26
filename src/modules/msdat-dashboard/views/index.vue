<template>
  <div>
    <!-- <h1>MSDAT DASHBOARD</h1> -->
    <BasePanel :position="position">
      <template v-slot:default>
        <ControlBase :title="'Indicator Overview'">
          <IndicatorOverviewPanel
            @data:options="log($event)"
            :indicatorOptions="['heheh', 'hahah']"
            :locationOptions="['abj', 'Lag', 'sokoto']"
            :dataSourceOptions="['NHMIS', 'IHME', 'WHO']"
            :yearOptions="['2020', '2019', '2018']"
            :compareOptions="['2019']"
          />
        </ControlBase>
        <ControlBase :title="'Zonal Analysis'">
          <ZonalAnalysisPanel
            @data:options="log($event)"
            :indicatorOptions="['heheh', 'hahah']"
            :locationOptions="['abj', 'Lag', 'sokoto']"
            :dataSourceOptions="['NHMIS', 'IHME', 'WHO']"
            :yearOptions="['2020', '2019', '2018']"
            :compareOptions="['2019']"
           />
        </ControlBase>
        <ControlBase :title="'Indicator Comparison'">
          <IndicatorComparisonPanel
            @data:options="log($event)"
            :indicatorOptions="['heheh', 'hahah']"
            :locationOptions="['abj', 'Lag', 'sokoto']"
            :dataSourceOptions="['NHMIS', 'IHME', 'WHO']"
            :yearOptions="['2020', '2019', '2018']"
            :compareOptions="['2019']"
            />
        </ControlBase>
        <ControlBase :title="'Dataset Comparison'">
          <DatasetComparisonPanel
            @data:options="log($event)"
            :indicatorOptions="['heheh', 'hahah']"
            :locationOptions="['abj', 'Lag', 'sokoto']"
            :dataSourceOptions="['NHMIS', 'IHME', 'WHO']"
            :yearOptions="['2020', '2019', '2018']"
            :compareOptions="['2019']"
            />
        </ControlBase>
        <ControlBase class="row" :title="'Multi-source Indicator'">
          <template v-for="n in 3">
          <!-- <div> -->
            <MultiSourceIndicatorPanel
              :key="n"
              class="col-md-4 col-sm-12"
              :class="[(n===2) ? 'border-left border-right': '']"
              @data:options="log($event)"
              :indicatorOptions="['heheh', 'hahah']"
              :locationOptions="['abj', 'Lag', 'sokoto']"
              :dataSourceOptions="['NHMIS', 'IHME', 'WHO']"
              :yearOptions="['2020', '2019', '2018']"
              :compareOptions="['2019']"
            />
           <!-- </div> -->
          </template>
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
