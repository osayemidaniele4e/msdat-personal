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
import DataComparismChartConfig from '../../../../config/datasetColumnChartConfig';
import BaseChart from '../../../../components/Barchart/BaseBarChart.vue';
import dataPipelineMixin from '../../mixins/dataPipeline';

export default {
  mixins: [dataPipelineMixin],
  components: {
    BaseChart,
  },
  data() {
    return {
      chartConfig: DataComparismChartConfig,
    };
  },
  props: {
    values: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // async plot() {
    //   const params = {
    //     datasource: this.v.datasource.id,
    //     indicator: this.datasetProps.indicator.id,
    //     period: '2015',
    //   };
    //   const values = await this.dlQuery(params);
    //   const locationArray = values.map((items) => items.location);
    //   const locations = await this.getLocations(locationArray);
    //   const locationsAndValues = this.mapLocationsToValues(locations, values);
    //   this.chartConfig = this.mapStatesToXaxisAndValues(locationsAndValues);
    // },
  },
  mounted() {
    // this.plot();
  },

  watch: {
    values: {
      async handler(data) {
        const queryObject = data.datasource.map((element) => ({
          indicator: data.indicator.id,
          datasource: element.id,
          period: data.year,
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
          debugger;
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
