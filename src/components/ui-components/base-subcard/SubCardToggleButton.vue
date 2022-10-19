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
.icon-btn{
    color: #348481 !important;
}
.icon-btn:hover{
    background: #348481;
  color: white;
}
.line-icon{
  background: #348481;
  color: white;
}
.line-icon:hover{
  color: #348481;
  background: white;
}
</style>
