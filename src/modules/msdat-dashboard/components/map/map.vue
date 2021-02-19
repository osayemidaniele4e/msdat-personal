<template>
  <div id="msdat-map">
    <highcharts
      :constructor-type="'mapChart'"
      :options="options"
    />
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import mapChart from 'highcharts/modules/map';
mapChart(Highcharts);

export default {
  props: [
    // 'map_type',
    // 'map_data',
  ],
  data() {
    return {
      options: {
        chart: {
          map: require('./js/svg/ng_states'),
          height: 450
        },
        colors: [],
        // credits: {},
        title: {
          text: 'Map of Nigeria',
          style: {
            fontSize: '16px',
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: '600'
          }
        },
        subtitle: {
          text: 'states',
          style: {
          fontSize: '11px',
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 'normal'
          }
        },
        exporting: {
          csv: {
            dateFormat: '%Y-%m-%d'
          }
        },
        mapNavigation: {
          // enabled: true,
          // buttonOptions: {
          //   verticalAlign: 'middle',
          //   align: 'right'
          // }
        },
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'right'
        },
        colorAxis: {
          min: 0,
          max: 100
        },
        plotOptions: {
          map: {
            allAreas: false,
            states: {
              hover: {
                color: '#DFF3F3'
              }
            },
            joinBy: "hc-key",
            dataLabels: {
              allowOverlap:true,
              align:'center',
              crop:true,
              style:{
                fontFamily: "'Open Sans', sans-serif",
                fontSize:10
              },
              enabled: true,
              //format: '{point.name}',
              color: '#FFFFFF',
              formatter: function () {
                if (this.point.value) {
                  return this.point.name;
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.name}: <b>{point.value:.2f}</b>'
            }
          }
        },
        series: [{
          type: "map",
          data: require('./js/data/states_data'),
          name: 'Random Name',
        }],
        exporting: {
          // buttons: {
          //   contextButton: {
          //     menuItems: [
          //       "printChart",
          //       "separator",
          //       "downloadPNG",
          //       "downloadJPEG",
          //       "downloadPDF",
          //       "downloadSVG",
          //       "separator",
          //       "downloadCSV",
          //       "downloadXLS",
          //       "viewData",
          //       "openInCloud"
          //     ],
          //     symbol: 'download',
          //     symbolStrokeWidth: 2,
          //     symbolFill: '#330033',
          //     symbolStroke: '#b3d4fc'
          //   }
          // }
        }
      }
    }
  },
  methods: {}
}
</script>
