<template>
  <section class="charts w-100">
    <BarChart
      ref="BaseChart"
      :title="details[0]"
      :chartOptions="options"
      class="barchart"
    />
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
    details: {
      type: Array,
      default: () => ['dataSource', 'indicator', '2016'],
      required: true,
    },
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
      // tooltip: {
      //   pointFormat: 'Value: <b>{point.y:.1f} %</b>',
      // },
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
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      yAxis: {
        title: {
          text: `${this.details[0]} - ${this.details[2]}`, // datasource - year
          style: {
            fontSize: '13px',
            fontFamily: '"Work Sans", sans-serif',
          },
        },
      },
      series: [{
        color: '#98fb98',
        name: this.details[1],
        data: this.optionsArray,
        dataLabels: {
          enabled: true,
        },
      }],
    };
  },
};
</script>
