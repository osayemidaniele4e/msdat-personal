<template>
  <div class="">
      <base-overlay :show="loader">
      <base-sub-card showControls>
        <template #title>
          <h6 class="text-dark">
            Distribution of
            <span class="font-weight-bold">{{ controlPanelProps.indicator.full_name }}
              </span>Across the
            <span class="font-weight-bold"> zones in the Country.</span> Source:
            <span class="font-weight-bold">
              {{ controlPanelProps.datasource.datasource }}</span> {{ controlPanelProps.year }}
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
      default() {
        return {};
      },
    },
  },

  methods: {
    ...mapActions('MSDAT_STORE', [
      'SET_CONTROL_OPTIONS',
    ]),

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
        const {
          indicator, year, datasource,
        } = this.controlPanelProps;

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
        const stateData = {};
        const {
          location, indicator, year, datasource,
        } = val;
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
  },

  data() {
    return {
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
          plotLines: [{
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
      handler(val) {
        /**
           ** check if location is national or state level
           */
        if (val.location.level === 1) {
          this.plotNationalLevelChart();
        } else {
          this.plotStateLevelChart(val);
        }
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
