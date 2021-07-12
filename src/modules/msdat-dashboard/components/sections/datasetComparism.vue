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
                Comparison of <span class="font-weight-bold">
                  {{ datasetProps.datasource.full_name }} </span>across
                  <span class="font-weight-bold">different sources </span>by
                <span class="font-weight-bold">states</span>
              </p>
            </template>
            <BaseChart :chartOptions="chartConfig.options" />
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
  methods: {
    async plot() {
      const params = {
        datasource: this.datasetProps.datasource.id,
        indicator: this.datasetProps.indicator.id,
        period: '2015',
      };
      const values = await this.dlQuery(params);
      const locationArray = values.map((items) => items.location);
      const locations = await this.getLocations(locationArray);
      const locationsAndValues = this.mapLocationsToValues(locations, values);
      this.chartConfig = this.mapStatesToXaxisAndValues(locationsAndValues);
    },
  },

  data() {
    return {
      chartConfig: DataComparismChartConfig,
    };
  },

  props: {
    datasetProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.plot();
  },

  watch: {
    datasetProps: {
      handler(data) {
        this.plot();
        console.log(data);
      },
      deep: true,
    },
  },

};
</script>

<style>

</style>
