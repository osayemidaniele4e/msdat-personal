<template>
  <div class="">
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
        <BarChart ref="chartRef" :chartOptions="chartConfigs" />
      </base-sub-card>
      <button @click="plot">Test</button>

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

    async plot() {
      const { datasource, indicator } = this.controlPanelProps;
      const queryObj = {
        datasource: datasource.id,
        indicator: indicator.id,
        year: '2015',
      };

      const data = await this.dlQuery(queryObj);
      console.log(data);
    },
  },

  data() {
    return {
      chartConfigs: {
        chart: {
          type: 'column',
          zoomType: 'xy',
          marginRight: 50,
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
        series: [],
        drilldown: {},
      },
    };
  },

  watch: {
    controlPanelProps: {
      handler() {
        this.plot();
      },

      deep: true,
      immediate: true,
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
