<template>
  <div class="btn-group" role="group">
    <button type="button" @click="
      handleButtonClick('line')" class="btn btn-sm btn-outline-primary"
      :class="[activeToggleButton === 'line' ? 'active' : '']">
      Line <b-icon icon="graph-up"></b-icon>
    </button>
    <button type="button" @click="
      handleButtonClick('column')" class="btn btn-sm btn-outline-primary"
      :class="[activeToggleButton === 'column' ? 'active' : '']">
      Column <b-icon icon="bar-chart-fill"></b-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SubCardToggleButtons',
  data() {
    return {
      activeToggleButton: 'line',
    };
  },

  // watch: {
  //   // Watch for changes in the data and update the activeToggleButton accordingly
  //   data(newValue) {
  //     if (newValue === 'line') {
  //       this.activeToggleButton = 'line';
  //     } else if (newValue === 'column') {
  //       this.activeToggleButton = 'column';
  //     }
  //   },
  // },

  methods: {
    handleButtonClick(button) {
      this.activeToggleButton = button;
      this.$emit('button-clicked', button);
    },
  },
  watch: {
    // Watch for changes in the ChartOptions prop and update the activeToggleButton accordingly
    '$parent.$parent.$parent.$parent.ChartOptions': function (newValue) {
      const chartType = newValue.chart.type;
      if (chartType === 'line' && this.activeToggleButton !== 'line') {
        this.activeToggleButton = 'line';
      }
    },
    // Watch for changes in the activeToggleButton and update the chart configuration accordingly
    activeToggleButton(newValue) {
      this.$parent.$parent.$parent.$parent.ChartOptions.chart.type = newValue;
    },
  },

};
</script>

<style lang="scss" scoped>
.btn-outline-primary:not(:disabled):not(.disabled).active {
  background-color: #348481 !important;
  border-color: #348481 !important;
}

.btn-outline-primary:not(:disabled):not(.disabled).active:hover {
  background-color: #348481 !important;
}

.btn-outline-primary {
  color: #348481;
  border-color: #348481 !important;
}

.btn-outline-primary:hover {
  background: #348481 !important;
}
</style>
