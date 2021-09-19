<template>
  <base-overlay :show="loading">
    <base-sub-card
      showControls
      v-if="values"
      @dropdownTypeSelected="
        downLoadType($event, {
          indicator: values.indicator.short_name,
          datasource: values.datasource.datatsource,
          year: values.year,
        })
      "
    >
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution Of
          <b>{{ values.indicator.short_name }}</b> Across The Country. Source:<b>
            {{ values.datasource.datatsource }} {{ values.year }}</b
          >
        </p>
      </template>
      <BarChart ref="BaseChart" :chartOptions="BarChartOptions" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import chartDownload from '../../../mixins/chart_download';

export default {
  mixins: [chartDownload, formatter],
  components: {
    BarChart,
  },
  data() {
    return {
      BarChartOptions: {},
      loading: false,
    };
  },
  props: {
    /**
     * input values
     */
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },
  watch: {
    values: {
      async handler(newValues) {
        this.loading = true;
        const data = await this.getData(newValues);
        const nationalTarget = this.dlGetIndicator(
          newValues.indicator.id,
        ).national_target;
        const chartOptions = this.genHighChartOption(data, {
          target: {
            value: nationalTarget,
          },
        });
        // add nation and state selected to fit according to mockup 😢 😟 😡

        const parentValue = await this.dlQuery({
          indicator: newValues.indicator.id,
          datasource: newValues.datasource.id,
          period: newValues.year,
          value_type: 5,
          location: newValues.location.id,
        });
        // because i know i am expecting only on value in the array of results
        if (parentValue.length > 0) {
          const parent = parentValue[0];
          const seriesObject = {
            showInLegend: false,
            color:
              parseFloat(parent.value) > nationalTarget ? '#00a65a' : '#E85D58',
            name:
              parseFloat(parent.value) > nationalTarget
                ? 'On Target'
                : 'Below Target',
            data: [[newValues.location.name, parseFloat(parent.value)]],
          };
          chartOptions.series.unshift(seriesObject);
        }

        this.BarChartOptions = chartOptions;
        this.loading = false;
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    async getData(optionsObject) {
      const {
        datasource, indicator, location, year,
      } = optionsObject;

      let locationValue = location;

      if (location.id === 1) {
        locationValue = { level: 3 };
      } else {
        locationValue = { parent: location.id };
      }
      // debugger;
      console.time('getData');
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        location: locationValue,
        value_type: 5,
      });
      console.trace(data);
      console.timeEnd('getData');
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
