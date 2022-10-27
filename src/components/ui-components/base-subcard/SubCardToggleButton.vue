<template>
    <div class="btn-group" role="group">
      <button
        type="button"
        @click="
          (activeToggleButton = 'line'),
            $emit('button-clicked', activeToggleButton)
        "
        class="line-icon btn btn-sm"
        :class="[activeToggleButton === 'line' ? 'active' : '']"
      >
        Line <b-icon icon="graph-up"></b-icon>
      </button>
      <button
        type="button"
        @click="
          (activeToggleButton = 'column'),
            $emit('button-clicked', activeToggleButton)
        "
        class="icon-btn btn btn-sm"
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
  background-color: #348481 !important;
  border-color: #348481 !important;
}
.btn-outline-primary:not(:disabled):not(.disabled).active:hover{
  background-color: #348481 !important;
}
.btn-outline-primary{
  color: #348481;
  border-color: #348481 !important;
}
.btn-outline-primary:hover{
  background: #348481 !important;
}
</style>
