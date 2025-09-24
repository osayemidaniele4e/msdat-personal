<template>
  <div class="chart-component">
    <div v-if="data && data.image" class="snapshot-container" :style="{ width: data.width || '100%' }">
      <!-- show snapshot image when available -->
      <img :src="data.image" alt="chart snapshot" style="width:auto; height:auto; max-width:100%; display:block" />
    </div>
    <div v-else class="crb-chart-missing" style="width:100%;height:300px;display:flex;align-items:center;justify-content:center;">
      <div>
        <strong>No chart snapshot</strong>
        <div class="crb-chart-missing-note">Re-capture to generate an image.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartComponent',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  mounted() {
  
  },
  watch: {
    data: {
      deep: true,
      handler() {
        
      },
    },
  },
  methods: {
    annotationStyle(a) {
      return {
        position: 'absolute',
        left: `${a.x}px`,
        top: `${a.y}px`,
        background: 'rgba(255,255,0,0.9)',
        padding: '2px 6px',
        borderRadius: '4px',
      };
    },
  },
};
</script>

<style scoped>
.chart-component { background: #e0e0e0; padding: 10px; }
</style>
