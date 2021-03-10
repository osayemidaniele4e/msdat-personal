<template>
  <div>
    <h1 class="h1">map Base</h1>
    <!-- <h3>{{ mapObject }}</h3> -->
    <!-- <h3>{{ defaultOptions.plotOptions.map }}</h3> -->
    <Highmaps :options="defaultOptions" />
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import { genComponent } from 'vue-highcharts';
import NigerianMap from '@highcharts/map-collection/countries/ng/ng-all.geo.json';
import {
  Abia, Ebonyi, Imo, Enugu, Anambra,
} from './mapData/south-east';
import {
  Ondo, Ogun, Osun, Lagos, Ekiti, Oyo,
} from './mapData/south-west';
import {
  Adamawa,
  Bauchi,
  Borno,
  Gombe,
  Taraba,
  Yobe,
} from './mapData/north-east';
import regionsMap from './mapData/regions';
import {
  Jigawa,
  Kano,
  Katsina,
  Kebbi,
  Sokoto,
  Kaduna,
  Zamfara,
} from './mapData/north-west';
import {
  Nasarawa,
  Niger,
  Plateau,
  Kwara,
  Kogi,
  Benue,
  Fct,
} from './mapData/north-central';
import {
  AkwaIbom,
  Bayelsa,
  CrossRiver,
  Rivers,
  Delta,
  Edo,
} from './mapData/south-south';

import defaultOptions from './defaultOptions';

loadMap(Highcharts);
export default {
  name: 'BaseMap',
  data() {
    return {
      defaultOptions,
      lgaMapData: {
        Jigawa,
        Kano,
        Katsina,
        Kebbi,
        Sokoto,
        Kaduna,
        Zamfara,
        Nasarawa,
        Niger,
        Plateau,
        Kwara,
        Kogi,
        Benue,
        Fct,
        Abia,
        Ebonyi,
        Imo,
        Enugu,
        Anambra,
        Ondo,
        Ogun,
        Osun,
        Lagos,
        Ekiti,
        Oyo,
        AkwaIbom,
        Bayelsa,
        CrossRiver,
        Rivers,
        Delta,
        Edo,
        Adamawa,
        Bauchi,
        Borno,
        Gombe,
        Taraba,
        Yobe,
      },
    };
  },
  props: {
    mapObject: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 1,
    },
    lgaState: {
      type: String,
    },
  },
  watch: {
    mapObject: {
      handler(newVal) {
        this.defaultOptions = Object.assign(this.defaultOptions, newVal);
      },
      immediate: true,
      deep: true,
    },
    level(newVal) {
      switch (newVal) {
        case 1:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        case 2:
          this.defaultOptions.plotOptions.map.mapData = regionsMap;
          break;
        case 3:
          this.defaultOptions.plotOptions.map.mapData = this.lgaMapData[this.lgaState].data;
          break;
        default:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
      }
      console.log(this.defaultOptions);
    },
  },
  components: {
    Highmaps: genComponent('Highmaps', Highcharts),
  },
  created() {
    this.defaultOptions.plotOptions.map.mapData = NigerianMap;
    console.log(this.lgaMapData[this.lgaState]);
  },
};
</script>
