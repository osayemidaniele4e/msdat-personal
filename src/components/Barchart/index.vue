<template>
  <div>
    <button @click="barObject.title.text = 'HEHE' "> A Button</button>
    <BaseBar :chartOptions="barObject" />
    <button @click="log() "> A Button</button>
  </div>

</template>

<script>
import BaseBar from './BaseBarChart.vue';

export default {
  components: {
    BaseBar,
  },

  data() {
    return {
      data: [
        {
          name: 'Valtdmot',
          color: '#10AC40',
          data: [
            ['Gantt chart', 1000],
            ['Autocalculation and plotting of trend lines', 575],
            ['Allow navigator to have multiple data series', 523],
            ['Implement dynamic font size', 427],
            ['Multiple axis alignment control', 399],
            ['Stacked area (spline etc) in irregular datetime series', 309],
          ],
        },
      ],
      barObject: {
        title: {
          text: 'HELLO',
        },
      },
    };
  },
  methods: {
    log() {
      // this.barObject = {};
      this.barObject.series = this.data;
      this.barObject = { ...this.barObject };
      console.log(this.barObject);
    },
  },
};
</script>
