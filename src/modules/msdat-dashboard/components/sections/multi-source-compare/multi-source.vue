<template>
  <base-overlay :show="loading">
    <base-sub-card
      showControls
      v-if="Object.keys(values).length"
      @dropdownTypeSelected="mapDownload($event)"
    >
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution of <b>{{ values.indicator.short_name }}</b>
          {{
            visualizationText === 'zonal map'
              ? 'across the geopolitical zone in the country'
              : visualizationText === 'state map'
              ? 'across the states in the country'
              : 'in the country'
          }}
          <b>{{ values.datasource.datasource }}</b> <b>{{ values.year }}</b>
        </p>
      </template>
      <BarChart
        v-if="visualization === 'line' || visualization === 'column'"
        :title="title"
        :chartOptions="chartObject"
        ref="BaseChart"
      />
      <BaseMap
        ref="BaseMap"
        v-else
        :mapObject="mapObject"
        :level="level"
        :lgaState="stateName"
        :title="title"
      />
    </base-sub-card>
    <NoAvailableData
      v-if="showNoAvailableData"
      class="position-absolute"
      style="top: 16%; width: 50%; left: 25%"
    />
  </base-overlay>
</template>

<script>
import Maps from '@/components/maps/ZonalBaseMap.vue';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import chartDownload from '../../../mixins/chart_download';
import NoAvailableData from '../../NoData2.vue';

export default {
  name: 'MultiSource',
  mixins: [chartDownload],
  components: { BaseMap: Maps, BarChart, NoAvailableData },
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      level: 1,
      mapDataLevel: 3,
      visualization: 'line',
      stateName: 'Delta',
      chartObject: {},
      mapObject: {
        series: [
          {
            name: 'Nigeria',
            data: [],
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
      showNoAvailableData: false,
      visualizationText: 'line',
    };
  },
  methods: {
    mapDownload(e) {
      if (this.visualization === 'line' || this.visualization === 'column') {
        this.downLoadType(e, {
          indicator: this.values.indicator.short_name,
          datasource: this.values.datasource.datasource,
          year: this.values.year,
        });
      } else {
        this.downLoadTypeMap(e, {
          indicator: this.values.indicator.short_name,
          datasource: this.values.datasource.datasource,
          year: this.values.year,
        });
      }
    },

    formatDataToSeriesMapFormat(data) {
      return data?.map((item) => [
        this.dlGetLocation(item.location).name,
        Number.parseFloat(item.value) || 0,
      ]);
    },
    formatDataToSeriesLineFormat(data) {
      // this function returns data for the highchart. It was remodified to sort the chart data by year
      const result = [];
      // eslint-disable-next-line array-callback-return
      if (!data || !Array.isArray(data)) {
        return;
      }
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        result.push([item.period, Number.parseFloat(item.value)]);
      });
      // eslint-disable-next-line consistent-return
      return result.sort((a, b) => a[0] - b[0]);
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
      const chartOptions = {
        chart: {
          type: chartType,
        },
        yAxis: {
          title: {
            text: 'Values',
            style: {
              fontSize: '13px',
              fontFamily: '"Work Sans", sans-serif',
            },
          },
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
      const displayFactor = this.dlGetFactor(this.values.indicator?.factor).display_factor;
      chartOptions.yAxis.title.text = displayFactor;
      return chartOptions;
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
            this.visualizationText = 'state map';
            break;
          case 'zonal_map':
            this.visualization = 'map';
            this.visualizationText = 'zonal map';
            this.level = 2;
            this.mapDataLevel = 2;
            break;
          case 'line':
            this.visualization = 'line';
            this.visualizationText = 'line';
            break;
          case 'column':
            this.visualization = 'column';
            this.visualizationText = 'column';
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
          // condition to check if data is available
          if (data?.length === 0) {
            this.showNoAvailableData = true;
          } else {
            this.showNoAvailableData = false;
          }
          const formattedData = this.formatDataToSeriesMapFormat(data);
          this.mapObject = this.formatToHighChartOptionForMap(formattedData, value);
        } else {
          const data = await this.dlQuery({
            indicator: value.indicator.id,
            datasource: value.datasource.id,
            location: value.location.id,
          });
          // condition to check if data is available
          if (data?.length === 0) {
            this.showNoAvailableData = true;
          } else {
            this.showNoAvailableData = false;
          }
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
      immediate: false,
    },
  },

  async mounted() {
    this.title = ` Distribution of ${this.values.indicator.short_name} across the geopolitical zones in
          the Country. Source: ${this.values.datasource.datasource} ${this.values.year}`;
    const data = await this.dlQuery({
      indicator: this.values.indicator.id,
      datasource: this.values.datasource.id,
      location: this.values.location.id,
    });
    console.log('this is the data', data);
    this.chartObject = {};
    const formattedData = this.formatDataToSeriesLineFormat(data);
    this.chartObject = this.formatToHighChartOptionForLine(
      formattedData,
      this.visualization,
      this.values,
    );

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped></style>
