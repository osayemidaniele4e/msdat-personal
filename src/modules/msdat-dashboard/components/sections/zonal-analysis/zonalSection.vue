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
  mixins: [dataPipelineMixin, ControlPanelSetup],
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
  },

  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),

    async plotStateLevelChart(val) {
      this.chart = {
        ...this.chartConfigs,
      };
      /**
       * * plot single state data on column state
       * ! Unable to get LGA data using dlQuery
       */
      if (typeof val === 'string') {
        this.$emit('zonal-chart-state', val);
        const stateData = {};
        const { indicator, datasource } = this.controlPanelProps;

        const state = this.dlGetByName(val);
        const stateLevelData = await this.dlQuery({
          indicator: indicator.id,
          datasource: datasource.id,
          location: state.id,
        });
        const chartMapOptions = stateLevelData.map((item) => ({
          name: state.name,
          y: Number(item.value),
          color: 'black',
        }));

        stateData.name = 'Single state';
        stateData.color = 'black';
        stateData.data = chartMapOptions;
        this.chart.series = [stateData];
      } else {
        /**
         * * plot state data from dropdown
         */
        // const stateData = {};
        const { indicator, datasource } = val;
        const data = await this.dlQuery({
          indicator: indicator.id,
          datasource: datasource.id,
          location: {
            level: 1,
          },
        });
        console.log(data);
        // const chartMapOptions = data.map((item) => {
        //   const stateName = this.dlGetLocation(item.location);
        //   return {
        //     name: stateName.name,
        //     y: Number(item.value),
        //     color: 'black',
        //   };
        // });

        // stateData.name = 'Single state';
        // stateData.color = 'black';
        // stateData.data = chartMapOptions;

        // this.chart.series.push(stateData);
        // console.log(this.chart);
      }
    },

    /**
     * * plot national column
     */
    async plotNationalLevelChart() {
      this.loader = true;
      const { datasource, indicator } = this.controlPanelProps;
      const queryObj = {
        datasource: datasource.id,
        indicator: indicator.id,
        period: '2015',
      };

      const data = await this.dlQuery(queryObj);
      const highChart = data.map((items) => {
        const locations = this.dlGetLocation(items.location);
        return {
          name: locations.name,
          parent: locations.parent,
          level: locations.level,
          value: items.value,
          id: locations.id,
        };
      });
      this.states = highChart;
      const chartData = this.anotherFunction(highChart);
      // console.log(chartData);
      this.chart = {
        ...this.chartConfigs,
      };
      this.chart.series = chartData;
      this.loader = false;
    },

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
      for (let index = 1; index < this.zonalArray.length; index += 1) {
        const zonal = data.find(
          (item) => item.location === this.zonalArray[index].id,
        );
        const series = this.dlGetLocation(this.zonalArray[index].id);
        const { color } = this.zonalArray.find(
          (item) => item.id === this.zonalArray[index].id,
        );
        debugger;
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
      for (let index = 1; index < this.zonalArray.length; index += 1) {
        const group = data.filter(
          (item) => this.dlGetLocation(item.location).parent
            === this.zonalArray[index].id,
        );
        const formattedData = formatToHighChart(group);
        const sortedData = formattedData.sort(sortHighChartDataFormat);
        const series = this.dlGetLocation(this.zonalArray[index].id);
        chartSeries.push({
          color: this.zonalArray[index].color,
          name: series.name,
          data: sortedData,
        });
      }
      return chartSeries;
    },
  },

  data() {
    return {
      // later someone can add the name property
      // so that we can know to the zones as against to searching for the ids
      zonalArray: [
        {
          id: 1,
          color: 'black',
        },
        {
          id: 2,
          color: '#737A33',
        },
        {
          id: 3,
          color: '#8B9A9B',
        },
        {
          id: 7,
          color: '#7D8ADE',
        },
        {
          id: 4,
          color: '#9E7796',
        },
        {
          id: 5,
          color: '#54858D',
        },
        {
          id: 6,
          color: '#CCCC17',
        },
      ],
      stateName: null,
      chart: {},
      loader: false,
      states: null,
      chartConfigs: {
        series: [],
        chart: {
          type: 'column',
          zoomType: 'xy',
          marginRight: 50,
        },
        plotOptions: {
          column: {
            events: {
              click: (e) => {
                this.plotStateLevelChart(e.point.name);
              },
            },
          },
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -90,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
          gridLineWidth: 0,
        },
        yAxis: {
          title: {
            enabled: false,
          },
          lineWidth: 0,
          gridLineWidth: 0,
          plotLines: [
            {
              value: 100,
              color: 'black',
              width: 2,
              label: {
                style: {
                  fontSize: '20px',
                },
                text: 'NT:',
                align: 'right',
                textAlign: 'center',
                rotation: -90,
              },
            },
          ],
          minorTicks: true,
        },
      },
    };
  },

  watch: {
    controlPanelProps: {
      async handler(val) {
        this.chart = {};
        const data = await this.dlQuery({
          indicator: val.indicator.id,
          datasource: val.datasource.id,
          period: '2015',
        });

        console.trace(data);

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
            color: this.zonalArray[0].color,
          });
          chartSeries.push({
            color: this.zonalArray[stateObject.parent].color,
            name: stateObject.name,
            data: sortedData,
          });
          this.formatToHighChart(chartSeries);

          // console.log(filteredZonal);
          return;
        }
        // already know the zonal levels/parent of all the value
        // index starts at one to skip region data for the series
        const chartSeries = this.getStateDataAccordingToRegionInHighChartFormat(data);
        const zonalSeries = this.getZonalDataInHighChartFormat(data);

        // add national to top of the zonal series series
        const national = data.find((item) => item.location === 1);
        zonalSeries.unshift({
          name: 'National',
          y: parseFloat(national.value),
          color: this.zonalArray[0].color,
        });

        const zonalZee = {
          name: 'Nigeria',
          data: zonalSeries,
          color: this.zonalArray[0].color,
        };
        // add zonal series to top of main the series
        chartSeries.unshift(zonalZee);
        this.formatToHighChart(chartSeries);
      },
      deep: true,
      immediate: true,
    },
    mapSelectedState: {
      handler(val) {
        this.plotStateLevelChart(val);
      },
    },
  },

  mounted() {
    this.SET_CONTROL_OPTIONS({
      panelIndex: 4,
      controlIndex: 0,
      values: this.defaultIndicatorDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 4,
      controlIndex: 1,
      values: this.defaultLocationDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 4,
      controlIndex: 2,
      values: this.defaultDataSourceDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 4,
      controlIndex: 3,
      values: this.defaultYearDropdown,
    });
  },
};
</script>
