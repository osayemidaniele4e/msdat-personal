<template>
  <div class="">
    <base-sub-card :backgroundColor="'#348481'">
      <template #title>
        <h5 class="font-weight-bold work-sans text-white">
          Datasets Comparison - By States
        </h5>
      </template>
      <div class="py-0">
        <base-sub-card :backgroundColor="'#DFF3F3'">
          <template #title>
            <p class="text-dark">
              Comparison of
              <span class="font-weight-bold">
                {{ values.indicator.full_name}} </span
              >across <span class="font-weight-bold">different sources </span>by
              <span class="font-weight-bold">states</span>
            </p>
          </template>
          <BaseChart :chartOptions="chartConfig" />
        </base-sub-card>
      </div>
    </base-sub-card>
  </div>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapActions } from 'vuex';
import BaseChart from '../../../../../components/Barchart/BaseBarChart.vue';
import dataPipelineMixin from '../../../mixins/dataPipeline';

export default {
  mixins: [dataPipelineMixin, ControlPanelSetup],
  components: {
    BaseChart,
  },
  data() {
    return {
      chartConfig: {},
      // DataSetConfig: cloneDeep(DataSetConfig),
    };
  },
  methods: {
    ...mapActions('MSDAT_STORE', [
      'SET_CONTROL_OPTIONS', // -> this.foo()
      'add',
    ]),

    displayFactor(factor) {
      const dpfactor = factor;
      let sign;
      switch (dpfactor) {
        case 'in percentage':
          sign = '%';
          break;
        default:
          sign = '';
      }

      return sign;
    },
  },
  props: {
    values: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 0,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 1,
      values: this.defaultDataSourceDropdown,
    });
  },

  watch: {
    values: {
      async handler(data) {
        const queryObject = data.datasource.map((element) => ({
          indicator: data.indicator.id,
          datasource: element.id,
          period: '2015',
          location: {
            level: 3,
          },
        }));
        const promises = queryObject.map((item) => this.dlQuery(item));
        const result = await Promise.all(promises);
        const indicatorDisplayFactor = this.dlGetFactor(data.indicator.factor).display_factor;
        const indicatorTarget = data.indicator.national_target;
        // console.log(indicatorDisplayFactor);
        const displayFactorSign = this.displayFactor(indicatorDisplayFactor);
        const orderResult = queryObject.map((item, index) => {
          const response = result[index];
          const dataValues = response.map((element) => [
            this.dlGetLocation(element.location).name,
            parseFloat(element.value),
          ]);
          const dataSource = this.dlGetDataSource(item.datasource).datasource;
          return {
            name: dataSource,
            data: dataValues,
          };
        });
        this.chartConfig = {
          title: {
            text: data.indicator.full_name,
          },
          yAxis: {
            lineWidth: 0,
            gridLineWidth: 0,
            title: {
              text: indicatorDisplayFactor,
            },
            plotLines: [{
              value: indicatorTarget,
              color: 'black',
              width: 2,
              label: {
                style: {
                  fontSize: '20px',
                },
                text: `NT: ${indicatorTarget}`,
                align: 'right',
                rotation: 90,
              },
            },
            ],
          },
          plotOptions: {
            column: {
              dataLabels: {
                enabled: true,
                formatter() {
                  return `${this.point.y}${displayFactorSign}`;
                },
              },
            },
          },
          chart: {
            type: 'column',
            marginLeft: 50,
            marginRight: 50,
          },
        };
        this.chartConfig.series = orderResult;
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
