<template>
  <div>
    <!-- <b-overlay :show="cpIsLoading"> -->
      <BasePanel :position="position" v-if="cpIsLoading">
        <template v-slot:default>
          <ControlBase
            v-for="(control, index) in $store.state.MSDAT_STORE.controlConfig"
            :key="index"
            :title="control.label"
          >
            <ControlPanel
              @data:options="slog($event,index)"
              :setup="control.setup"
              :defaultIndicator="defaultIndicator"
              :defaultDataSource="defaultDataSource"
              :defaultLocation="defaultLocation"
              :defaultYear="defaultYear"
            />
          </ControlBase>
        </template>
      </BasePanel>
    <!-- </b-overlay> -->
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
                    <h1>
                    </h1>
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
  ControlPanel,
} from '@/components/ControlPanel';

import SubCard from '@/components/ui-components/SubCard.vue';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';

export default {
  mixins: [formatter, controlPanelSetup],
  data() {
    return {
      position: 3,
      BarChartOptions: {},
      controlPanel: {},
      lect: '',
    };
  },
  components: {
    ControlBase,
    BasePanel,
    SubCard,
    BarChart,
    ControlPanel,
  },
  methods: {
    async log(optionsObject) {
      const {
        datasource, indicator, location, year,
      } = optionsObject;
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
    slog(data, index) {
      console.log('data ooo', index);
      console.log(data);
    },
    execute() {
      const data = [];
      const dataSources = this.dlGetDashboardDataSource();
      console.log(dataSources);

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
    console.log(this.$store.state.MSDAT_STORE.controlConfig);
    const data = await this.dlQuery({ indicator: 7 });
    console.log({ query: data });
  },

};
</script>

<style lang="scss" scoped>
</style>
