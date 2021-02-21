<template>
  <div>
    <highcharts :options="chartOptions" ref="lineCharts"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';

stockInit(Highcharts);

export default {
  props: {
    chartOptions: {
      type: Object,
    },
  },
  components: {
    highcharts: Chart,
  },
};
</script>
