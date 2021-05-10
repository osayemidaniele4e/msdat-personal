<template>
  <div>
    <Highmaps :options="defaultOptions" />
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import { genComponent } from 'vue-highcharts';

// default map
import NigerianMap from '@highcharts/map-collection/countries/ng/ng-all.geo.json';

// default map options
import defaultOptions from './defaultOptions';

// map data
import regionsMap from './mapData/regions';

import {
  AkwaIbom,
  Bayelsa,
  CrossRiver,
  Rivers,
  Delta,
  Edo,
} from './mapData/south-south';

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

// load map
loadMap(Highcharts);

export default {
  name: 'BaseMap',
  components: {
    Highmaps: genComponent('Highmaps', Highcharts),
  },
  props: {
    mapObject: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
    lgaState: {
      type: String,
    },
  },
  data() {
    return {
      defaultOptions: { ...defaultOptions },
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
  methods: {
    plotMapLevel(level) {
      switch (level) {
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
      this.defaultOptions = { ...this.defaultOptions };
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
      this.plotMapLevel(newVal);
    },
  },
  created() {
    this.plotMapLevel(this.level);
  },
};
</script>
