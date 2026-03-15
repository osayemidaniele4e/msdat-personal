<template>
  <base-modal
    :showModal="show"
    @close="closeModal"
    size="lg"
    class="modally"
  >
    <template #title>
      <div class="modal-title">Msdat buddy</div>
    </template>

    <div class="analysis-content">
      <!-- Indicator Details Section -->
      <div class="indicator-details mb-4" v-if="indicatorData">
        <h5>Indicator Details</h5>
        <div class="detail-item">
          <strong>Name:</strong> {{ indicatorData.short_name }}
        </div>
        <div class="detail-item" v-if="indicatorData.description">
          <strong>Description:</strong> {{ indicatorData.description }}
        </div>
      </div>

      <!-- Chart Image Section -->
      <div class="chart-image mb-4" v-if="chartImage">
        <h5>Chart Visualization</h5>
        <img :src="chartImage" alt="Chart" class="img-fluid"/>
      </div>

      <!-- Analysis Section -->
      <div class="analysis-section">
        <h5>AI Analysis</h5>
        <div v-if="!loading && !error" class="analysis-text markdown-content" v-html="formattedAnalysis"></div>
        <div v-if="!loading && error" class="error-message">
          {{ error }}
          <button @click="retryAnalysis" class="btn btn-sm btn-primary mt-2">
            Retry Analysis
          </button>
        </div>
        <div v-if="loading" class="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script>
import analysisService from '@/services/analysisService';

export default {
  name: 'ChartAnalysisModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    chartImage: {
      type: String,
      default: null,
    },
    indicatorData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
      analysis: null,
      error: null,
    };
  },
  computed: {
    formattedAnalysis() {
      if (!this.analysis) return '';

      // Convert markdown to HTML
      const formatted = this.analysis
        // Convert bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Convert bullet points
        .replace(/^- (.*)/gm, '<li>$1</li>')
        // Convert numbered lists
        .replace(/^\d+\. (.*)/gm, '<li>$1</li>')
        // Wrap lists in ul tags
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        // Convert line breaks
        .replace(/\n/g, '<br>');

      return formatted;
    },
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          console.log('Triggering getAnalysis');
          this.getAnalysis();
        }
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.error = null;
      this.analysis = null;
    },

    retryAnalysis() {
      this.error = null;
      this.getAnalysis();
    },

    async getAnalysis() {
      console.log('getAnalysis called with:', {
        hasChartImage: !!this.chartImage,
        hasIndicatorData: !!this.indicatorData,
        indicatorData: this.indicatorData,
      });

      if (!this.chartImage || !this.indicatorData) {
        this.error = 'Missing required data for analysis';
        console.error('Missing data:', {
          chartImage: !!this.chartImage,
          indicatorData: !!this.indicatorData,
        });
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        console.log('Calling analysisService.generateChartAnalysis');
        this.analysis = await analysisService.generateChartAnalysis(this.indicatorData, this.chartImage);
        console.log('Analysis received:', this.analysis ? 'yes' : 'no');
      } catch (error) {
        console.error('Error getting analysis:', error);
        this.error = 'Unable to generate analysis. Please try again.';
        this.analysis = null;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.analysis-content {
  padding: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
}

.indicator-details {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.chart-image {
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
}
.modally{
 z-index: 100000;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.error-message {
  color: #dc3545;
  padding: 1rem;
  background-color: #f8d7da;
  border-radius: 4px;
  text-align: center;
}

.analysis-text {
  line-height: 1.6;
}

/* Markdown styling */
.markdown-content {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.markdown-content strong {
  color: #2c3e50;
  font-weight: 600;
}

.markdown-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content br {
  margin-bottom: 0.5rem;
}
</style>
