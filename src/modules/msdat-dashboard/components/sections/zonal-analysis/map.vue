<template>
  <div class="container">
    <base-overlay :show="loader">
      <base-sub-card showControls>
        <template #title>
          <h6 class="text-dark">
            Distribution of
            <span class="font-weight-bold">
              {{ chartProps.indicator.full_name }} </span
            >Across the
            <span class="font-weight-bold"> zones in the Country.</span> Source:
            <span class="font-weight-bold">
              {{ chartProps.datasource.datasource }} {{ chartProps.year }}</span
            >
          </h6>
        </template>
        <div>
          <BaseMap :mapObject="chart" :level="level" :lgaState="stateName" />
        </div>
      </base-sub-card>
    </base-overlay>
    {{ stateName }}
    <button @click="changeNation">National</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseMap from '@/components/maps/BaseMap.vue';
import defaultOptions from '@/components/maps/defaultOptions';
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import dataPipelineMixin from '../../../mixins/dataPipeline';
import { sortHighChartDataFormat } from '../../../mixins/util';

export default {
  mixins: [ControlPanelSetup, dataPipelineMixin],
  props: {
    chartProps: {
      type: Object,
    },

    /**
     * * listens for onClick event on column chart
     */
    stateVal: {
      type: String,
    },
  },
  components: {
    BaseMap,
  },
  data() {
    return {
      chart: {},
      loader: false,
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
        chart: {
          zoomType: 'x',
          // events: {
          //   render() {
          //     const chart = this;
          //     const x = chart.plotWidth / 2 + chart.plotLeft;
          //     const y = chart.plotHeight / 8;

          //     if (chart.customBtn) {
          //       chart.customBtn.destroy();
          //     }
          //     chart.customBtn = chart.renderer.button('Reset', x, y, (e) => {
          //       // this.plotNatioalMap();
          //       console.log(this);
          //     }).attr({
          //       zIndex: 3,
          //     }).add();
          //   },
          // },
        },
        title: {
          text: '',
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          map: {
            ...defaultOptions.plotOptions.map,
            events: {
              click: (e) => {
                this.plotStateMap(e.point.name);
              },
            },
          },
        },
        navigation: {
          buttonOptions: {
            enabled: false,
          },
        },
        subtitle: {
          text: '',
        },
      },
      level: 1,
      stateName: 'Nigeria',
    };
  },
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),
    changeNation() {
      this.level = 1;
    },

    /**
     * plotStateMap
     * * method to fetch state data
     * @params { state: string | object }
     */
    async plotStateMap(state) {
      this.loader = true;
      this.chart = {
        ...this.mapObject,
      };

      /**
       ** get state data when state is clicked on map
       */
      if (typeof state === 'string') {
        this.$emit('state-name', state);
        this.stateName = state;
        this.level = 3;
      } else {
        /**
         * * get state data when dropdown changes
         * ! Unable to get LGA data using dlQuery
         */
        const { location, datasource, indicator } = state;
        console.log(location);
        const data = await this.dlQuery({
          indicator: indicator.id,
          datasource: datasource.id,
          location: {
            parent: location.name,
          },
        });
        const stateData = data.map((items) => {
          const locationName = this.dlGetLocation(items.location);
          return {
            name: locationName.name,
            value: Number.parseFloat(items.value),
            parent: location.parent,
            level: location.level,
          };
        });
        console.log(stateData);
        this.stateName = location.name;
        // this.changeNation();
        this.level = 3;
      }
      this.loader = false;
    },

    /**
     * plotNationalMap
     * * get national
     */
    async plotNatioalMap() {
      this.loader = true;
      const { datasource, indicator } = this.chartProps;

      const data = await this.dlQuery({
        period: '2015',
        datasource: datasource.id,
        indicator: indicator.id,
      });

      const valueAndLocaton = data.map((items) => {
        const locations = this.dlGetLocation(items.location);
        if (locations.id === items.location) {
          return {
            name: locations.name,
            parent: locations.parent,
            level: locations.level,
            value: items.value,
          };
        }
        return null;
      });

      /**
       * generateGeoPoliticalZoneValues
       * * returns national data according to their zones
       */
      const valuesByZones = this.generateGeoPoliticalZoneValues(valueAndLocaton);
      this.chart = {
        ...this.mapObject,
      };

      /**
       * * set map options
       */
      console.log(valuesByZones);
      this.chart.series = valuesByZones;
      this.loader = false;
      // console.log(this.chart);
    },
  },

  watch: {
    chartProps: {
      async handler(val) {
        const data = await this.dlQuery({
          indicator: val.indicator.id,
          datasource: val.datasource.id,
          period: '2015',
        });

        const formatToHighChart = (dataValues) => dataValues.map((item) => [
          this.dlGetLocation(item.location).name,
          parseFloat(item.value),
        ]);

        const chartSeries = [];
        const zonalArray = [
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
        ];
        // let zonalArray =  [2,3,4,5,6,7]; // already know the zonal levels/parent of all the value
        for (let index = 0; index < zonalArray.length; index += 1) {
          const group = data.filter(
            (item) => this.dlGetLocation(item.location).parent === zonalArray[index].id,
          );
          const formattedData = formatToHighChart(group);
          const sortedData = formattedData.sort(sortHighChartDataFormat);
          const series = this.dlGetLocation(zonalArray[index].id);
          console.log(zonalArray[index], series);
          chartSeries.push({
            color: zonalArray[index].color,
            name: series.name,
            data: sortedData,
          });
        }

        console.log(chartSeries);

        this.chart = {
          series: chartSeries,
        };

        console.log(val);
      },
      deep: true,
      immediate: true,
    },
    stateVal: {
      handler(val) {
        this.plotStateMap(val);
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
