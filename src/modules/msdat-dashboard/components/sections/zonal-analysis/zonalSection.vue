<template>
  <div class="">
    <base-overlay :show="loader">
      <base-sub-card showControls>
        <template #title>
          <h6 class="text-dark">
            Distribution of
            <span class="font-weight-bold"
              >{{ controlPanelProps.indicator.full_name }} </span
            >Across the
            <span class="font-weight-bold"> zones in the Country.</span> Source:
            <span class="font-weight-bold">
              {{ controlPanelProps.datasource.datasource }}</span
            >
            {{ controlPanelProps.year }}
          </h6>
        </template>
        <BarChart ref="chartRef" :chartOptions="chart" />
      </base-sub-card>
    </base-overlay>
  </div>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { mapActions } from 'vuex';
import dataPipelineMixin from '../../../mixins/dataPipeline';
import { sortHighChartDataFormat } from '../../../mixins/util';

export default {
  name: 'ZonalSectionChart',
  mixins: [dataPipelineMixin, ControlPanelSetup],
  data() {
    return {
      // later someone can add the name property
      // so that we can know to the zones as against to searching for the ids
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
      types: Object,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),

    formatToHighChart(dataSeries) {
      this.chart = {
        chart: {
          type: 'column',
          zoomType: 'xy',
        },
        series: dataSeries,
      };
    },

    getZonalDataInHighChartFormat(data) {
      const zonesSeries = [];
      for (let index = 1; index < this.colors.length; index += 1) {
        const zonal = data.find(
          (item) => item.location === this.colors[index].id,
        );
        const series = this.dlGetLocation(this.colors[index].id);
        const { color } = this.colors.find(
          (item) => item.id === this.colors[index].id,
        );
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
      const formatToHighChart = (dataValues) => dataValues.map((item) => [
        this.dlGetLocation(item.location).name,
        parseFloat(item.value),
      ]);

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
        console.log(data);
        if (data.length > 0) {
          if (val.location.id !== 1) {
            const filteredLGADataForState = data.filter(
              (item) => this.dlGetLocation(item.location).parent === val.location.id,
            );

            const formatToHighChart = (dataValues) => dataValues.map((item) => [
              this.dlGetLocation(item.location).name,
              parseFloat(item.value),
            ]);

            const chartSeries = [];
            const formattedData = formatToHighChart(filteredLGADataForState);
            const sortedData = formattedData.sort(sortHighChartDataFormat);
            const stateObject = this.dlGetLocation(val.location.id);
            const stateData = data.find(
              (item) => item.location === val.location.id,
            );

            sortedData.unshift({
              name: stateObject.name,
              y: parseFloat(stateData.value),
              color: this.colors[0].color,
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
            // add zonal series to top of main the series
            chartSeries.unshift(zonalZee);
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
};
</script>
