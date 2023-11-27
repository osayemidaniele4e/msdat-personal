<template>
  <base-overlay :show="loader" class="main">
    <base-sub-card
      showControls
      v-if="Object.keys(controlPanelProps).length"
      @dropdownTypeSelected="
        downLoadType($event, {
          indicator: controlPanelProps.indicator.short_name,
          datasource: '',
          year: '',
        })
      "
    >
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution of
          <span class="font-weight-bold">{{ controlPanelProps.indicator.full_name }} </span>Across
          the <span class="font-weight-bold"> zones in the Country.</span> Source:
          <span class="font-weight-bold"> {{ controlPanelProps.datasource.datasource }}</span>
          {{ controlPanelProps.year }}
        </p>
      </template>
      <BarChart ref="BaseChart" :title="title" :chartOptions="chart" class="barchart" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import chartDownload from '../../../mixins/chart_download';
import { sortHighChartDataFormat } from '../../../mixins/util';

export default {
  name: 'ZonalSectionChart',
  mixins: [chartDownload, formatter],
  data() {
    return {
      // later someone can add the name property
      // so that we can know to the zones as against to searching for the ids
      title: '',
      stateName: null,
      chart: {},
      loader: false,
      states: null,
    };
  },
  components: {
    BarChart,
  },
  props: {
    mapSelectedState: {
      type: String,
    },
    controlPanelProps: {
      type: Object,
      required: true,
    },
    colors: {
      type: [Object, Array],
      required: true,
    },
  },

  methods: {
    /**
     * @method computeChartPlotLines is from the
     * @mixin formatter
     */
    formatToHighChart(dataSeries) {
      const displayFactor = this.dlGetFactor(
        this.controlPanelProps.indicator.factor,
      ).display_factor;

      this.chart = {
        chart: {
          type: 'column',
          zoomType: 'xy',
        },
        yAxis: {
          gridLineWidth: 0,
          plotLines: [...this.computeChartPlotLines(this.controlPanelProps)],
          title: {
            text: 'Values',
            style: {
              fontSize: '13px',
              fontFamily: '"Work Sans", sans-serif',
            },
          },
        },
        series: dataSeries,
      };
      this.chart.yAxis.title.text = displayFactor;
    },

    getZonalDataInHighChartFormat(data) {
      const zonesSeries = [];
      for (let index = 1; index < this.colors.length; index += 1) {
        const zonal = data.find((item) => item.location === this.colors[index].id);
        const series = this.dlGetLocation(this.colors[index].id);
        const { color } = this.colors.find((item) => item.id === this.colors[index].id);
        if (zonal) {
          zonesSeries.push({
            name: series.name,
            y: parseFloat(zonal.value),
            color,
          });
        }
      }
      // sort Zonal series data in ascending order
      return zonesSeries.sort((a, b) => b.y - a.y);
    },

    getStateDataAccordingToRegionInHighChartFormat(data) {
      // add this function to a mixin later
      const formatToHighChart = (dataValues) => dataValues.map((item) => [this.dlGetLocation(item.location).name, parseFloat(item.value)]);

      // already know the zonal levels/parent of all the value
      // index starts at one to skip region data for the series
      const chartSeries = [];
      for (let index = 1; index < this.colors.length; index += 1) {
        const group = data.filter(
          (item) => this.dlGetLocation(item.location).parent === this.colors[index].id,
        );
        const formattedData = formatToHighChart(group);
        const sortedData = formattedData.sort(sortHighChartDataFormat);
        const series = this.dlGetLocation(this.colors[index].id);
        chartSeries.push({
          color: this.colors[index].color,
          name: series.name,
          data: sortedData,
        });
      }
      // console.log(chartSeries, 'chartseries')
      return chartSeries;
    },
  },
  watch: {
    controlPanelProps: {
      async handler(val) {
        // debugger;
        this.chart = {};
        this.loader = true;
        const data = await this.dlQuery({
          indicator: val.indicator.id,
          datasource: val.datasource.id,
          period: val.year,
        });
        if (data.length > 0) {
          if (val.location.id !== 1) {
            const filteredLGADataForState = data.filter(
              (item) => this.dlGetLocation(item.location).parent === val.location.id,
            );

            console.log(filteredLGADataForState, 'ANOTHER');

            const formatToHighChart = (dataValues) => dataValues.map((item) => [
              this.dlGetLocation(item.location).name,
              parseFloat(item.value),
            ]);

            const chartSeries = [];
            const formattedData = formatToHighChart(filteredLGADataForState);
            const sortedData = formattedData.sort(sortHighChartDataFormat);
            const stateObject = this.dlGetLocation(val.location.id);
            const stateData = data.find((item) => item.location === val.location.id);

            sortedData.unshift({
              name: stateObject.name,
              y: parseFloat(stateData?.value),
              // color: this.colors[0].color,
              color: this.colors.find((item2) => item2.id === stateObject.parent).color,
            });
            chartSeries.push({
              color: this.colors[stateObject.parent].color,
              name: stateObject.name,
              data: sortedData,
            });
            this.formatToHighChart(chartSeries);
          } else {
            // already know the zonal levels/parent of all the value
            // index starts at one to skip region data for the series
            const chartSeries = this.getStateDataAccordingToRegionInHighChartFormat(data);
            const zonalSeries = this.getZonalDataInHighChartFormat(data);

            // console.log(zonalSeries);
            // add national to top of the zonal series series
            const national = data.find((item) => item.location === 1);
            zonalSeries.unshift({
              name: 'National',
              y: parseFloat(national.value),
              color: this.colors[0].color,
            });
            const zonalZee = {
              name: 'Nigeria',
              data: zonalSeries,
              color: this.colors[0].color,
            };
            // for the new chart, eact array of states has the zone included
            const newChart = [];

            chartSeries.forEach((item) => {
              const zonalP = zonalZee?.data.find((element) => element.color === item.color);
              if (zonalP !== undefined) {
                const newArr = [zonalP?.name, zonalP?.y];
                item.data.unshift(newArr);
                newChart.push(item);
              }
            });

            newChart.unshift();
            // add zonal series to top of main the series
            chartSeries.unshift(zonalZee);
            // chartSeries.unshift(zonalZee); //  removed this part
            this.formatToHighChart(chartSeries);
          }
        }
        // Plot for LGAs

        this.loader = false;
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    this.title = ` Distribution of ${this.controlPanelProps.indicator.full_name} Across the zones in the Country. Source: ${this.controlPanelProps.datasource.datasource} ${this.controlPanelProps.year}`;
  },
};
</script>

<style scoped>
.barchart {
  height: 49.5vh;
}
</style>
