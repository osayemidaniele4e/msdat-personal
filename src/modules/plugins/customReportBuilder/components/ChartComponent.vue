<template>
  <div class="chart-component">
    <div v-if="data && data.image" class="snapshot-container" :style="{ width: data.width || '100%' }">
      <div v-if="indicatorLabel" class="chart-indicator-label">
        <b-icon icon="bar-chart-line-fill" class="label-icon" />
        <span>{{ indicatorLabel }}</span>
      </div>
      <img :src="data.image" alt="chart snapshot" class="chart-image" />
    </div>
    <div v-else class="chart-placeholder">
      <div class="placeholder-content">
        <b-icon icon="bar-chart-line" class="placeholder-icon" />
        <strong>No chart snapshot</strong>
        <p class="placeholder-hint">Click "Chart" in the toolbox to capture dashboard charts.</p>
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
  computed: {
    indicatorLabel() {
      if (!this.data) return '';
      // Try chart options title first
      if (this.data.options && this.data.options.title && this.data.options.title.text) {
        return this.data.options.title.text;
      }
      // Try indicator name from store via parent item title (set during capture)
      // The parent ReportBuilderMain sets the item title to the indicator name
      // But ChartComponent only receives data, so check for indicatorName on data
      if (this.data.indicatorName) return this.data.indicatorName;
      // Fallback: try to get from store
      try {
        const sel = this.$store && this.$store.getters ? (this.$store.getters['MSDAT_STORE/getSelectedConfig'] || this.$store.getters.getSelectedConfig) : null;
        if (sel && sel.indicator) {
          return sel.indicator.short_name || sel.indicator.full_name || '';
        }
      } catch (e) { /* ignore */ }
      return '';
    },
  },
};
</script>

<style scoped>
.chart-component {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}
.snapshot-container {
  padding: 8px;
}
.chart-indicator-label {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #1c6d90;
  background: linear-gradient(90deg, #e8f4f8 0%, #f0f7fa 100%);
  border-radius: 4px;
  border-left: 3px solid #1c6d90;
}
.label-icon {
  font-size: 14px;
  flex-shrink: 0;
}
.chart-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}
.chart-placeholder {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%);
  border: 2px dashed #ccd0d5;
  border-radius: 6px;
}
.placeholder-content {
  text-align: center;
  color: #8a8f96;
  padding: 20px;
}
.placeholder-icon {
  font-size: 36px;
  color: #4e79a7;
  opacity: 0.5;
  margin-bottom: 8px;
  display: block;
}
.placeholder-content strong {
  display: block;
  font-size: 14px;
  color: #495057;
  margin-bottom: 4px;
}
.placeholder-hint {
  font-size: 12px;
  color: #8a8f96;
  margin: 0;
}
</style>
