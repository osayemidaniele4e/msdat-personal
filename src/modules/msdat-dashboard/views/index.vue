<template>
  <div>
    <!-- <h1>MSDAT DASHBOARD</h1> -->

    <h1>MSDAT DASHBOARD</h1>
        <button @click="execute()" class="btn btn-primary rounded-0">GO</button>

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

import { MSDAT } from '@/config/dashboardGroups';
import formatter from '../mixins/formatter';

export default {
  mixins: [formatter],
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
    execute() {
      const data = [];
      const dataSources = this.dlGetDashboardDataSource();
      console.log(dataSources);
      debugger;
      const indicatorObject = this.dlGetIndicatorDataObject(7);
      dataSources.forEach((item) => {
        data.push(this.dlGetLatestSourceAndIndicatorData(
          { indicator: 7, datasource: item, location: 1 },
        ));
      });

      console.log(data);
      console.log(this.tableComponentDataFormatter(indicatorObject, data));
    },
  },
  async mounted() {
    await this.$DL.init(
      {
        dashboardIndicators: MSDAT.indicators,
        defaultIndicators: MSDAT.defaultIndicators,
      },
    );

    const data = this.dlQuery({ datasource: 8, indicator: 7 });
    console.log({ query: data });
  },

};
</script>

<style lang="scss" scoped>
</style>
