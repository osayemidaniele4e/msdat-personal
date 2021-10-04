<template>
    <div class="btn-group" role="group">
      <button
        type="button"
        @click="
          (activeToggleButton = 'line'),
            $emit('button-clicked', activeToggleButton)
        "
        class="btn btn-sm btn-outline-primary"
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
</style>
