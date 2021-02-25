<template>
  <div>
    <Highmaps :options="mapOptions" />
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import { genComponent } from 'vue-highcharts';

import NigerianMap from '@highcharts/map-collection/countries/ng/ng-all.geo.json';
import NigerianMapData from './js/data/states_data';

loadMap(Highcharts);

export default {
  name: 'MSDAT-map-components',
  components: {
    Highmaps: genComponent('Highmaps', Highcharts),
  },
  props: {
    mapLevel: { required: true, default: 1 },
    mapType: { required: true },
    mapData: { required: true },
  },
  data() {
    return {
      level: this.mapLevel,
      mapOptions: {
        chart: {
          map: this.mapType,
        },
        title: {
          text: 'Highmaps basic demo',
        },
        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
          },
        },
        colorAxis: {
          min: 0,
          max: 100,
        },
        series: [
          {
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            allAreas: false,
            data: this.mapData,
          },
        ],
        credits: {
          enabled: false,
        },
      },
    };
  },
  computed: {
    setDefaultLevel() {
      this.level = 1;
      return this.level;
    },
  },
  watch: {
    level(newVal) {
      switch (newVal) {
        case 1:
          this.mapOptions.chart.map = NigerianMap;
          this.mapOptions.series[0].data = NigerianMapData;
          console.log(newVal);
        // case 2:
          // this.mapOptions.chart.map = ZonalMap
          // this.mapOptions.series[0].data = ZonalMapData
        // case 3:
          // this.mapOptions.chart.map = LGAMap
          // this.mapOptions.series[0].data = LGAMapData
        default:
          this.setDefaultLevel;
      }
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.level = 7
    // }, 6000)
  },
};
</script>

<style lang="scss" scoped></style>
