import Vue from 'vue'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

import mapChart from 'highcharts/modules/map'
import exportingInit from 'highcharts/modules/exporting'
import mapData from '@highcharts/map-collection/countries/ng/ng-all.geo.json'




mapChart(Highcharts)
exportingInit(Highcharts)

Highcharts.maps['ng_Map'] = mapData


Vue.use(HighchartsVue)
