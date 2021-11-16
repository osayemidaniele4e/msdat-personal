<template>
  <div class="position-relative">
    <base-overlay :show="loading">
      <base-sub-card
        showControls
        v-if="Object.keys(values).length"
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
            <b>{{ values.indicator.short_name }}</b> Across The Country.
            Source:<b> {{ values.datasource.datatsource }} {{ values.year }}</b>
          </p>
        </template>
        <BarChart ref="BaseChart" :chartOptions="BarChartOptions" />
      </base-sub-card>
    </base-overlay>
    <NoSubNationalData
      v-if="showNoSubNationalData"
      class="position-absolute"
      style="top: 20%; width: 90%"
    />
  </div>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import chartDownload from '../../../mixins/chart_download';
import NoSubNationalData from '../../NoData.vue';

export default {
  mixins: [chartDownload, formatter],
  components: {
    BarChart,
    NoSubNationalData,
  },
  data() {
    return {
      BarChartOptions: {},
      loading: false,
      showNoSubNationalData: false,
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
        const displayFactor = this.dlGetFactor(
          newValues.indicator.factor,
        ).display_factor;

        const chartOptions = this.genHighChartOption(data, {
          target: {
            value: nationalTarget,
          },
        });
        chartOptions.yAxis.title.text = `${displayFactor}`;

        // add nation and state selected to fit according to mockup 😢 😟 😡

        const parentValue = await this.dlQuery({
          indicator: newValues.indicator.id,
          datasource: newValues.datasource.id,
          period: newValues.year,
          // value_type: 5,
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
    'BarChartOptions.series': {
      handler(newSeries) {
        for (let i = 0; i < newSeries.length; i += 1) {
          if (newSeries[0].data.length <= 0) {
            this.showNoSubNationalData = false;
            return;
          }
          if (i > 0) {
            this.showNoSubNationalData = true;
            if (newSeries[i].data.length > 0) {
              this.showNoSubNationalData = false;
              return;
            }
          }
        }
      },
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
      //
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        location: locationValue,
        // value_type: 5,
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
