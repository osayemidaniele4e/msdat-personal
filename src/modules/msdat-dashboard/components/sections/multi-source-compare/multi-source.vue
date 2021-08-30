<template>
  <base-overlay :show="loading">
    <base-sub-card showControls v-if="values">
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution of <b>{{ values.indicator.short_name }}</b> Across the
          Geopolitical zones in the Country. Source:
          <b>{{ values.datasource.datasource }}</b> <b>{{ values.year }}</b>
        </p>
      </template>
      <BarChart
        v-if="visualization === 'line' || visualization === 'column'"
        :chartOptions="chartObject"
      />
      <BaseMap
        v-else
        :mapObject="mapObject"
        :level="level"
        :lgaState="stateName"
      />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import Maps from '@/components/maps/BaseMap.vue';
import { mapActions } from 'vuex';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { sortHighChartDataFormat } from '../../../mixins/util';

export default {
  name: 'MultiSource',
  mixins: [ControlPanelSetup],
  components: { BaseMap: Maps, BarChart },
  props: {
    values: {
      type: Object,
      required: true,
    },
    currentIndex: {
      type: Number,
      // require,
    },
  },
  data() {
    return {
      level: 1,
      mapDataLevel: 3,
      visualization: 'line',
      stateName: 'Delta',
      chartObject: {},
      mapObject: {
        series: [
          {
            name: 'Nigeria',
            data: [
              ['Kano', 10],
              ['Delta', 200],
              ['Ondo', 123],
              ['Osun', 45],
              ['Enugu', 780],
              ['Nassarawa', 780],
              ['Federal Capital Territory', 780],
              ['South East', 200],
            ],
          },
        ],
        title: {
          text: 'Indicator Name',
        },
        subtitle: {
          text: 'NHMIS = 2018',
        },
      },
      loading: true,
    };
  },
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),

    formatDataToSeriesMapFormat(data) {
      return data.map((item) => [
        this.dlGetLocation(item.location).name,
        Number.parseFloat(item.value),
      ]);
    },
    formatDataToSeriesLineFormat(data) {
      const dataValues = data.map((item) => [
        item.period,
        Number.parseFloat(item.value),
      ]);
      return dataValues.sort(sortHighChartDataFormat);
    },
    formatToHighChartOptionForMap(data, controlPanelObject) {
      return {
        title: {
          text: controlPanelObject.indicator.short_name,
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          },
        },
        subtitle: {
          text: `${controlPanelObject.datasource.datasource} - ${controlPanelObject.year}`,
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          },
        },
        colors: ['#114663'],
        colorAxis: {
          min: 0,
          minColor: '#E6E6E6',
          maxColor: '#114663',
        },
        series: [
          {
            //  borderColor: 'white',
            borderWidth: 0,
            name: 'Nigeria',
            data,
          },
        ],
      };
    },
    formatToHighChartOptionForLine(data, chartType, controlPanelObject) {
      return {
        chart: {
          type: chartType,
        },
        title: {
          text: controlPanelObject.indicator.short_name,
        },
        subtitle: {
          text: `${controlPanelObject.datasource.datasource}`,
        },
        series: [
          {
            name: 'Nigeria',
            data,
            // color: 'red',
          },
        ],
      };
    },
  },
  watch: {
    values: {
      async handler(value) {
        this.loading = true;
        switch (value.visualization) {
          case 'state_map':
            this.mapDataLevel = 3;
            this.level = 1;
            this.visualization = 'map';
            break;
          case 'zonal_map':
            this.visualization = 'map';
            this.level = 2;
            this.mapDataLevel = 2;
            break;
          case 'line':
            this.visualization = 'line';
            break;
          case 'column':
            this.visualization = 'column';
            break;
          default:
            break;
        }
        if (this.visualization === 'map') {
          const data = await this.dlQuery({
            indicator: value.indicator.id,
            datasource: value.datasource.id,
            period: value.year,
            // value_type: 5,
            location: {
              level: this.mapDataLevel,
            },
          });
          console.log(data);
          const formattedData = this.formatDataToSeriesMapFormat(data);
          this.mapObject = this.formatToHighChartOptionForMap(
            formattedData,
            value,
          );
        } else {
          const data = await this.dlQuery({
            indicator: value.indicator.id,
            datasource: value.datasource.id,
            location: value.location.id,
          });
          this.chartObject = {};
          const formattedData = this.formatDataToSeriesLineFormat(data);
          this.chartObject = this.formatToHighChartOptionForLine(
            formattedData,
            this.visualization,
            value,
          );
        }
        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    const setYearDropdown = await this.setYearDropdown();
    // debugger;
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 0,
      values: this.defaultIndicatorDropdown,
    });
    // this.SET_CONTROL_OPTIONS({
    //   multipleSetup: true,
    //   panelIndex: 4,
    //   controlIndex: this.currentIndex,
    //   controlIndex2: 3,
    //   values: this.defaultLocationDropdown,
    // });
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 2,
      values: this.defaultDataSourceDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 4,
      values: setYearDropdown,
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
