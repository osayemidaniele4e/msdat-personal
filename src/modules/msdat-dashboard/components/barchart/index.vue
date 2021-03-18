<template>
  <div>
    <BaseBar :barObject="barObject" />
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
      barObject: {},
    };
  },
};
</script>
