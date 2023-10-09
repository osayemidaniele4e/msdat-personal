/* eslint-disable camelcase */
<template>
  <div>
    <Highmaps :options="defaultOptions" />
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import exportData from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';
import noData from 'highcharts/modules/no-data-to-display';
import loadDrilldown from 'highcharts/modules/drilldown';
import offlineExporting from 'highcharts/modules/offline-exporting';
import { genComponent } from 'vue-highcharts';

// default map
import NigerianMap from './ng-all.geo.json';

// default map options
import defaultOptions from './defaultOptions';

// map data
import regionsMap from './mapData/regions';

import {
  // eslint-disable-next-line camelcase
  AkwaIbom as Akwa_Ibom,
  Bayelsa,
  // eslint-disable-next-line camelcase
  CrossRiver as Cross_River,
  Rivers,
  Delta,
  Edo,
} from './mapData/south-south';

import { Abia, Ebonyi, Imo, Enugu, Anambra } from './mapData/south-east';

import { Ondo, Ogun, Osun, Lagos, Ekiti, Oyo } from './mapData/south-west';

import { Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe } from './mapData/north-east';

import { Jigawa, Kano, Katsina, Kebbi, Sokoto, Kaduna, Zamfara } from './mapData/north-west';

import { Nasarawa, Niger, Plateau, Kwara, Kogi, Benue, Fct as FCT } from './mapData/north-central';

// load map
loadMap(Highcharts);
exporting(Highcharts);
offlineExporting(Highcharts);
exportData(Highcharts);
noData(Highcharts);
loadDrilldown(Highcharts);

export default {
  name: 'StateBaseMap',
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
    title: {
      type: String,
      default: '',
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
        FCT,
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
        Akwa_Ibom,
        Bayelsa,
        Cross_River,
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
      // check space is in string and add underscore
      let lgaState = '';
      if (this.lgaState) {
        lgaState = this.lgaState.replace(/\s/g, '_');
      }

      switch (level) {
        case 1:
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        case 2:
          this.defaultOptions.plotOptions.map.mapData = regionsMap;
          break;
        case 3:
          // console.trace(lgaState);
          this.defaultOptions.plotOptions.map.mapData = this.lgaMapData[lgaState].data;
          // console.log(this.lgaMapData[this.lgaState].data);
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
    lgaState() {
      this.plotMapLevel(this.level);
    },
  },
  created() {
    this.plotMapLevel(this.level);
  },

  mounted() {
    // changing the title of the text when downloaded
    this.defaultOptions.exporting.chartOptions.title.text = this.title;
  },
};
</script>
