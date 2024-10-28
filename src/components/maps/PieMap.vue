<template>
    <div class="pt-0" id="container"></div>
  </template>

<script>
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
// import mapData from './pieMapData.json';

// Initialize the modules
HighchartsMap(Highcharts);
HighchartsAccessibility(Highcharts);

export default {
  name: 'ElectionMap',
  data() {
    return {
      mapData: null,
      data: [
        // state, demVotes, repVotes, libVotes, grnVotes, sumVotes,
        // winner, offset config for pies
        ['Niger', 30, 0, 0, 0],
        // ['Bauchi', 72, 0, 0, 0, 3],
        // ['Abia', 45, 0, 0, 0, 4],
        // ['Adamawa', 86, 0, 0, 0, 2],
        // ['Akwa Ibom', 12, 0, 0, 0, 1],
        // ['Anambra', 54, 0, 0, 0, 3],
        // ['Bayelsa', 23, 0, 0, 0, -1],
        // ['Benue', 78, 0, 0, 0, 2],
        // ['Borno', 10, 0, 0, 0, 4],
        // ['Cross River', 92, 0, 0, 0, 1],
        // ['Delta', 11, 0, 0, 0, 3],
        // ['Ebonyi', 29, 0, 0, 0, -1],
        // ['Edo', 64, 0, 0, 0, 2],
        // ['Ekiti', 35, 0, 0, 0, 3],
        // ['Enugu', 91, 0, 0, 0, 1],
        // ['Gombe', 17, 0, 0, 0, -1],
        // ['Imo', 84, 0, 0, 0, 4],
        // ['Jigawa', 58, 0, 0, 0, 2],
        // ['Kaduna', 77, 0, 0, 0, 3],
        // ['Kano', 42, 0, 0, 0, -1],
        // ['Kogi', 36, 0, 0, 0, 4],
        // ['Kwara', 66, 0, 0, 0, 1],
        // ['Lagos', 48, 0, 0, 0, 2],
        // ['Nasarawa', 73, 0, 0, 0, 3],
        // ['Ogun', 15, 0, 0, 0, -1],
        // ['Ondo', 26, 0, 0, 0, 2],
        // ['Osun', 99, 0, 0, 0, 4],
        // ['Oyo', 80, 0, 0, 0, 1],
        // ['Plateau', 59, 0, 0, 0, 2],
        // ['Rivers', 44, 0, 0, 0, 3],
        // ['Sokoto', 14, 0, 0, 0, -1],
        // ['Taraba', 37, 0, 0, 0, 2],
        // ['Yobe', 25, 0, 0, 0, 4],
        // ['Zamfara', 19, 0, 0, 0, 1],
        // ['FCT', 22, 0, 0, 0, 3],

      ],
      demColor: 'rgba(74,131,240,0.80)',
      repColor: 'rgba(220,71,71,0.80)',
      libColor: 'rgba(240,190,50,0.80)',
      grnColor: 'rgba(90,200,90,0.80)',
      ogeColor: 'rgba(255,140,0)',
    };
  },
  mounted() {
    this.loadMapData();
  },
  methods: {
    async loadMapData() {
      try {
        const response = await fetch('https://code.highcharts.com/mapdata/countries/ng/ng-all.geo.json');
        this.mapData = await response.json(); // GeoJSON is ready for use
        this.initializeChart();
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    },
    initializeChart() {
      const maxVotes = this.data.reduce((max, row) => Math.max(max, row[5]), 0);

      const chart = Highcharts.mapChart('container', {
        chart: {
          animation: false,
          style: {
            // fontSize: '10px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          },
        },
        accessibility: {
          description: 'Map showing voting results for US states with pie charts.',
        },
        colorAxis: {
          dataClasses: [
            {
              from: -1,
              to: 0,
              color: 'rgba(244,91,91,0.5)',
              name: 'Republican',
            },
            {
              from: 0,
              to: 1,
              color: 'rgba(124,181,236,0.5)',
              name: 'Democrat',
            },
            {
              from: 2,
              to: 3,
              name: 'Libertarian',
              color: this.libColor,
            },
            {
              from: 3,
              to: 4,
              name: 'Green',
              color: this.grnColor,
            },
            {
              from: 4,
              to: 5,
              name: 'Orange',
              color: this.ogeColor,
            },
          ],
        },
        legend: {
          enabled: true,
          verticalAlign: 'bottom',
          // layout: 'vertical',
          valueDecimals: 10,
          // backgroundColor: 'rgba(255,255,255,0.9)',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },
        title: {
          text: 'USA 2016 Presidential Election Results',
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          },
        },
        plotOptions: {
          pie: {
            borderColor: 'rgba(255,255,255,0.4)',
            borderWidth: 1,
            clip: true,
            dataLabels: {
              enabled: false,
            },
            states: {
              hover: {
                halo: {
                  size: 5,
                },
              },
            },
            tooltip: {
              headerFormat: '',
            },
          },
        },
        series: [
          {
            mapData: this.mapData,
            data: this.data,
            name: 'States',
            borderColor: '#FFF',
            joinBy: ['name', 'id'],
            keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes', 'sumVotes', 'value', 'pieOffset'],
            tooltip: {
              headerFormat: '',
              pointFormatter() {
                return `
                    <b>${this.id} votes</b><br/>
                    Democrats: ${Highcharts.numberFormat(this.demVotes, 0)}<br/>
                    Republicans: ${Highcharts.numberFormat(this.repVotes, 0)}<br/>
                    Libertarians: ${Highcharts.numberFormat(this.libVotes, 0)}<br/>
                    Green: ${Highcharts.numberFormat(this.grnVotes, 0)}<br/>
                    Total: ${Highcharts.numberFormat(this.sumVotes, 0)}
                  `;
              },
            },
          },
          {
            name: 'Connectors',
            type: 'mapline',
            color: 'rgba(130, 130, 130, 0.5)',
            zIndex: 5,
            showInLegend: false,
            enableMouseTracking: false,
          },
        ],
      });

      // Add pies for each state
      chart.series[0].points.forEach((state) => {
        const sizeFactor = (state.sumVotes / maxVotes) * 100;

        chart.addSeries({
          type: 'pie',
          name: state.id,
          zIndex: 6,
          size: `${Math.max(15, sizeFactor)}%`, // Calculate size based on total votes
          center: [state.plotX, state.plotY], // Position pie at state's location
          data: [
            { name: 'Democrats', y: state.demVotes, color: this.demColor },
            { name: 'Republicans', y: state.repVotes, color: this.repColor },
            { name: 'Libertarians', y: state.libVotes, color: this.libColor },
            { name: 'Green', y: state.grnVotes, color: this.grnColor },
          ],
          tooltip: {
            pointFormatter() {
              return state.series.tooltipOptions.pointFormatter.call({
                id: state.id,
                hoverVotes: this.name,
                demVotes: state.demVotes,
                repVotes: state.repVotes,
                libVotes: state.libVotes,
                grnVotes: state.grnVotes,
                sumVotes: state.sumVotes,
              });
            },
          },
        }, false);
      });

      chart.redraw();
    },
  },
};
</script>

  <style scoped>
  #container {
    height: 600px;
    width: 100%;
  }
  </style>
