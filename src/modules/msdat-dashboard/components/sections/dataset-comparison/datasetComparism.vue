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
                {{ values.datasource.full_name }} </span
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
      panelIndex: 1,
      controlIndex: 0,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 1,
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
        console.log(queryObject);
        const promises = queryObject.map((item) => this.dlQuery(item));
        const result = await Promise.all(promises);

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
        console.log(orderResult);
        this.chartConfig = {
          plotOptions: {
            column: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          chart: {
            type: 'column',
          },
        };
        console.log(this.chartConfig);
        this.chartConfig.series = orderResult;
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
