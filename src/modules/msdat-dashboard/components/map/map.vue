<template>
  <div id="msdat-map">
    <section class="border d-flex justify-content-between align-items-center">
      <div class="border d-flex flex-column flex-md-row justify-content-start align-items-center">
        <span>Skilled Attendance At Delivery Or Birth </span>
        <span>And Related Indicators With Years Of Latest Value Across The Country</span>
      </div>
      <div>
        <b-icon-arrows-fullscreen />
        <b-icon-three-dots-vertical />
      </div>
    </section>
    <section>
      <highcharts 
        :constructor-type="'mapChart'"
        :options="mapOptions"
      ></highcharts>
    </section>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        ['ng-ri', 0],
        ['ng-kt', 1],
        ['ng-so', 2],
        ['ng-za', 3],
        ['ng-yo', 4],
        ['ng-ke', 5],
        ['ng-ad', 6],
        ['ng-bo', 7],
        ['ng-ak', 8],
        ['ng-ab', 9],
        ['ng-im', 10],
        ['ng-by', 11],
        ['ng-be', 12],
        ['ng-cr', 13],
        ['ng-ta', 14],
        ['ng-kw', 15],
        ['ng-la', 16],
        ['ng-ni', 17],
        ['ng-fc', 18],
        ['ng-og', 19],
        ['ng-on', 20],
        ['ng-ek', 21],
        ['ng-os', 22],
        ['ng-oy', 23],
        ['ng-an', 24],
        ['ng-ba', 25],
        ['ng-go', 26],
        ['ng-de', 27],
        ['ng-ed', 28],
        ['ng-en', 29],
        ['ng-eb', 30],
        ['ng-kd', 31],
        ['ng-ko', 32],
        ['ng-pl', 33],
        ['ng-na', 34],
        ['ng-ji', 35],
        ['ng-kn', 36]
      ],
      mapOptions: {
        chart: {
          map: 'ng_Map'
        },
        title: {
          text: 'Highmaps basic demo'
        },
        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/ng/ng-all.js">Nigeria</a>'
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },
        colorAxis: {
          min: 0,
          max: 'blue'
        },
        series: [{
          // data: this.data,
          name: 'Random data',
          states: {
            hover: {
              color: '#BADA55'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }]     
      }
    }
  }
}
</script>
