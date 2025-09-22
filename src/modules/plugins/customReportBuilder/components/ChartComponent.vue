<template>
  <div class="chart-component">
    <div v-if="data && data.image">
      <!-- show snapshot image when available -->
      <img :src="data.image" alt="chart snapshot" style="width:100%;height:auto;max-height:400px;object-fit:contain" />
    </div>
    <div v-else-if="hasHighcharts" ref="chartContainer" style="width:100%;height:300px"></div>
    <div v-else>
      <p>Chart: {{ data.title || 'Untitled' }}</p>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'vue-highcharts';

export default {
  name: 'ChartComponent',
  props: ['data'],
  data() {
    return {
      hasHighcharts: typeof Highcharts !== 'undefined',
      chart: null,
    };
  },
  mounted() {
    // if there's already an image provided, skip rendering Highcharts
    if (this.data && this.data.image) return;
    if (this.hasHighcharts) {
      const opts = this.data.options || {
        title: { text: this.data.title || 'Chart' },
        series: this.data.series || [],
      };
      try {
        this.chart = Highcharts.chart(this.$refs.chartContainer, opts);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Highcharts render failed', e);
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        // if image arrived, destroy chart and let image render
        if (newVal && newVal.image) {
          if (this.chart && typeof this.chart.destroy === 'function') {
            try { this.chart.destroy(); } catch (e) { /* ignore */ }
            this.chart = null;
          }
          return;
        }
        if (this.chart) {
          try {
            this.chart.update({
              title: { text: newVal.title || this.data.title || 'Chart' },
              series: newVal.series || [],
            }, true, true);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('Highcharts update failed', e);
          }
        } else if (this.hasHighcharts && this.$refs.chartContainer && !(newVal && newVal.image)) {
          // try to create chart if previously skipped
          try {
            this.chart = Highcharts.chart(this.$refs.chartContainer, newVal.options || { series: newVal.series || [] });
          } catch (e) { /* ignore */ }
        }
      },
    },
  },
};
</script>

<style scoped>
.chart-component { background: #e0e0e0; padding: 10px; }
</style>
