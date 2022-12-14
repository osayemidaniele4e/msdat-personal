<template>
  <section class="charts w-100">
  <pre>{{ optionsArray[0] }}</pre>
    <BarChart
      ref="BaseChart"
      :title="'Hi Chisom'"
      :chartOptions="options"
      class="barchart"
    />
    <!-- <highcharts :options="options" class='shadow' ref="barChart"></highcharts> -->
  </section>
</template>

<script lang="js">
import BarChart from '@/components/Barchart/BaseBarChart.vue';

export default {
  components: {
    BarChart,
  },
  props: {
    optionsArray: Array,
  },
  data() {
    return {
      // options: {
      //   chart: {
      //     type: 'column',
      //   },
      //   title: {
      //     text: '',
      //   },
      //   subtitle: {
      //     text: '',
      //   },
      //   xAxis: {
      //     type: 'category',
      //     title: {
      //       text: 'States',
      //     },
      //     labels: {
      //       rotation: -45,
      //       style: {
      //         fontSize: '20px',
      //         fontFamily: 'Verdana, sans-serif',
      //       },
      //     },
      //   },
      //   yAxis: {
      //     min: 0,
      //     title: {
      //       text: 'Values',
      //     },
      //   },
      //   legend: {
      //     enabled: false,
      //   },
      //   tooltip: {
      //     pointFormat: 'Value: <b>{point.y:.1f} %</b>',
      //   },
      //   series: [{
      //     name: 'Values',
      //     color: '#98fb98',
      //     data: this.optionsArray,
      //     dataLabels: {
      //       enabled: true,
      //       //   rotation: -90,
      //       color: '#FFFFFF',
      //       //   align: 'right',
      //       //   format: '{point.y:.1f}', // one decimal
      //       y: -5, // 10 pixels down from the top
      //       style: {
      //         fontSize: '9px',
      //         fontFamily: 'Verdana, sans-serif',
      //       },
      //     },
      //   }],
      // },
      options: {},
    };
  },
  mounted() {
    this.options = {
      chart: {
        type: 'column',
        zoomType: 'xy',
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: 'Values',
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
          },
        },
      },
      series: this.optionsArray,
    };
  },
};
</script>
