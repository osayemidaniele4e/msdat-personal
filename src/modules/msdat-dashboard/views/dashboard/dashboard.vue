<template>
  <div>
    <!-- <h1>MSDAT DASHBOARD</h1> -->

    <!-- <h1>MSDAT DASHBOARD</h1>
        <button @click="execute()" class="btn btn-primary rounded-0">GO</button> -->
    <button @click="tryIt()" class="btn btn-primary rounded-0">TEST</button>
    <BasePanel :position="position">
      <template v-slot:default>
        <ControlBase :title="'Indicator Overview'">
          <IndicatorOverviewPanel
            @data:options="log($event)"
            :indicatorOptions="cpIndicators"
            :locationOptions="cpLocation"
            :dataSourceOptions="cpDataSources"
            :yearOptions="cpAvailableYears"
            :compareOptions="['2019']"
          />
        </ControlBase>
        <ControlBase :title="'Zonal Analysis'">
          <ZonalAnalysisPanel
            @data:options="log($event)"
            :indicatorOptions="cpIndicators"
            :locationOptions="cpLocation"
            :dataSourceOptions="cpDataSources"
            :yearOptions="cpAvailableYears"
            :compareOptions="['2019']"
          />
        </ControlBase>
        <ControlBase :title="'Indicator Comparison'">
          <IndicatorComparisonPanel
            @data:options="log($event)"
            :indicatorOptions="cpIndicators"
            :locationOptions="['abj', 'Lag', 'sokoto']"
            :dataSourceOptions="cpDataSources"
            :yearOptions="cpAvailableYears"
            :compareOptions="['2019']"
          />
        </ControlBase>
        <ControlBase :title="'Dataset Comparison'">
          <DatasetComparisonPanel
            @data:options="log($event)"
            :indicatorOptions="cpIndicators"
            :dataSourceOptions="cpDataSources"
          />
        </ControlBase>
        <ControlBase class="row" :title="'Multi-source Indicator'">
          <template v-for="n in 3">
            <!-- <div> -->
            <MultiSourceIndicatorPanel
              :key="n"
              class="col-md-4 col-sm-12"
              :class="[n === 2 ? 'border-left border-right' : '']"
              @data:options="log($event)"
              :indicatorOptions="cpIndicators"
              :locationOptions="cpLocation"
              :dataSourceOptions="cpDataSources"
              :yearOptions="cpAvailableYears"
              :compareOptions="['2019']"
            />
            <!-- </div> -->
          </template>
        </ControlBase>
      </template>
    </BasePanel>
    <!-- control Panels ends here  -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <SubCard :backgroundColor="'#348481'">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Indicator Overview
              </h5>
            </template>
            <template>
              <div class="row">
                <div class="col-md-8">
                  <SubCard showControls>
                    <h1></h1>
                  </SubCard>
                </div>
                <div class="col-md-4">
                  <SubCard showControls>
                    <template #title>
                      <h6 class="work-sans">
                        Distribution Of
                        <b>Skilled Attendance At Delivery Or Birth</b> Across
                        The Country. Source:<b> NHMIS 2017</b>
                      </h6>
                    </template>
                    <BarChart :chartOptions="BarChartOptions" />
                  </SubCard>
                </div>
              </div>
            </template>
          </SubCard>
        </div>
      </div>
    </div>
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

import SubCard from '@/components/ui-components/SubCard.vue';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '../../mixins/formatter';
import controlPanel from '../../mixins/control-panel';

export default {
  mixins: [formatter, controlPanel],
  data() {
    return {
      position: 3,
      BarChartOptions: {},
      controlPanel: {},
      bbb: 1,
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
    SubCard,
    BarChart,
  },
  methods: {
    log(data) {
      console.log(data);
      this.controlPanel = Object.assign(this.controlPanel, data);
      console.log(this.controlPanel);
    },
    execute() {
      const data = [];
      const dataSources = this.dlGetDashboardDataSource();
      console.log(dataSources);
      debugger;
      const indicatorObject = this.dlGetIndicatorDataObject(7);
      dataSources.forEach((item) => {
        data.push(
          this.dlGetLatestSourceAndIndicatorData({
            indicator: 7,
            datasource: item,
            location: 1,
          }),
        );
      });

      console.log(data);
      console.log(this.tableComponentDataFormatter(indicatorObject, data));
    },
    async tryIt() {
      debugger;
      this.bbb = 2020;
      const {
        datasource, indicator, location, year,
      } = this.controlPanel;
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        value_type: 2,
        location: {
          level: location.id === 1 ? 3 : location.parent,
        },
      });
      console.log(data);
      this.BarChartOptions = this.genHighChartOption(data, {
        target: {
          value: this.dlGetIndicator(indicator.id).national_target,
        },
      });
    },
  },
  async mounted() {
    const data = await this.dlQuery({ indicator: 7 });
    console.log({ query: data });
    // console.log('in query mount');
    // await this.newQuery({ indicator: 5, datasource: 4, period: '2015' });
  },
};
</script>

<style lang="scss" scoped>
</style>
