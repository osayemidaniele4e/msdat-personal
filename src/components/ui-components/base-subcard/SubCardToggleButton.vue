<template>
  <div class="btn-group" role="group">
    <button
      type="button"
      @click="(activeToggleButton = 'line'), $emit('button-clicked', activeToggleButton)"
      class="btn btn-sm btn-outline-primary"
      :class="[activeToggleButton === 'line' ? 'active' : '']"
    >
      Line <b-icon icon="graph-up"></b-icon>
    </button>
    <button
      type="button"
      @click="(activeToggleButton = 'column'), $emit('button-clicked', activeToggleButton)"
      class="btn btn-sm btn-outline-primary"
      :class="[activeToggleButton === 'column' ? 'active' : '']"
    >
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
};
</script>

<style lang="scss" scoped>
.btn-outline-primary:not(:disabled):not(.disabled).active {
  background-color: #47427d !important;
  border-color: #47427d !important;
}
.btn-outline-primary:not(:disabled):not(.disabled).active:hover {
  color: #fff;
  background-color: #47427d !important;
}
.btn-outline-primary {
  color: #47427d;
  border-color: #47427d !important;
}
.btn-outline-primary:hover {
  color: #fff;
  background: #47427d !important;
}
</style>
