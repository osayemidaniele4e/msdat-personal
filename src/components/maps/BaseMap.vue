<!-- eslint-disable camelcase -->
<!-- eslint-disable camelcase -->
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

// test config
import TestConfig from './tenp.json';

// default map options
import defaultOptions from './defaultOptions';

// map data
// import regionsMap from './mapData/regions';

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

import {
  Abia, Ebonyi, Imo, Enugu, Anambra,
} from './mapData/south-east';

import {
  Ondo, Ogun, Osun, Lagos, Ekiti, Oyo,
} from './mapData/south-west';

import {
  Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe,
} from './mapData/north-east';

import {
  Jigawa, Kano, Katsina, Kebbi, Sokoto, Kaduna, Zamfara,
} from './mapData/north-west';

import {
  Nasarawa, Niger, Plateau, Kwara, Kogi, Benue, Fct as FCT,
} from './mapData/north-central';

// load map
loadMap(Highcharts);
exporting(Highcharts);
offlineExporting(Highcharts);
exportData(Highcharts);
noData(Highcharts);
loadDrilldown(Highcharts);

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
    findMissingZones(zones, zones2) {
      // Use filter to find zones that are in zones but not in zones2
      const missingZones = zones.filter((zone) => !zones2.includes(zone));
      return missingZones;
    },
    plotMapLevel(level) {
      // check space is in string and add underscore
      let lgaState = '';
      if (this.lgaState) {
        lgaState = this.lgaState.replace(/\s/g, '_');
      }

      switch (level) {
        case 1:
          this.defaultOptions = { ...defaultOptions };
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        case 2:
          this.defaultOptions = { ...TestConfig };
          break;
        case 3:
          this.defaultOptions.plotOptions.map.mapData = this.lgaMapData[lgaState].data;
          break;
        case 4:
          this.defaultOptions = { ...defaultOptions };
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
        default:
          this.defaultOptions = { ...defaultOptions };
          this.defaultOptions.plotOptions.map.mapData = NigerianMap;
          break;
      }
    },
  },
  watch: {
    mapObject: {
      handler(newVal) {
        const filteredSeries = newVal.series && newVal.series.filter((item) => item.data.length > 0);

        if (filteredSeries.length === 1) {
          const filteredData = filteredSeries[0].data;
          const zones = [
            'South-West',
            'South-East',
            'North-Central',
            'North-East',
            'North-West',
            'South-South',
          ];
          const zonesAndColor = [
            { zone: 'South-West', color: '#7D8ADE' },
            { zone: 'North-Central', color: '#89d880' },
            { zone: 'North-East', color: '#83CFDB' },
            { zone: 'North-West', color: '#5c3819' },
            { zone: 'South-South', color: '#FFFF17' },
            { zone: 'South-East', color: '#f872a0' },
          ];
          const availableZone = filteredData.map((item) => item[0]);
          // console.log(state, value, 'VALUE XXX');

          const missingZones = this.findMissingZones(zones, availableZone);

          filteredData.forEach(([state, value]) => {
            const foundItem = TestConfig.series.find((item) => item.name === state);
            const foundZone = zonesAndColor.find((item) => item.zone === state);
            if (foundItem) {
              foundItem.data[0][1] = value;
              foundItem.color = foundZone.color;
            }
          });
          filteredData.forEach(([state, value]) => {
            const foundItem = TestConfig.series.find((item) => item.name === state);
            if (foundItem) {
              foundItem.data[0][1] = value;
            }
            missingZones.forEach((zone) => {
              const foundZone = TestConfig.series.find((item) => item.name === zone);
              if (foundZone) {
                foundZone.color = '#f1f1f1';
                foundZone.data[0][1] = 'N/A';
              }
            });
          });

          Object.assign(this.defaultOptions, TestConfig);
          this.level = 2;
        } else {
          Object.assign(this.defaultOptions, newVal);
          this.level = 1;
        }

        // this.defaultOptions = Object.assign(this.defaultOptions, newVal);
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
