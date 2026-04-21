<template>
  <div class="confidence-score-container" v-if="isVisible">
    <div v-if="loading" class="confidence-loading">
      <b-spinner small variant="secondary" class="mr-1"></b-spinner>
      <span class="text-muted small">Loading reliability score...</span>
    </div>

    <div v-else-if="error" class="confidence-error text-danger small">
      <b-icon icon="exclamation-circle" class="mr-1"></b-icon>
      Confidence score unavailable
    </div>

    <div v-else-if="data" class="confidence-display d-flex align-items-center">
      <span class="confidence-label mr-2">Confidence:</span>
      <span
        class="confidence-value font-weight-bold mr-1"
        :class="levelClass"
      >
        {{ data.level }} ({{ data.score }}%)
      </span>
      <b-icon-info-circle-fill
        class="confidence-info-icon"
        v-tooltip.hover="data.explanation || 'No explanation available'"
        id="confidence-tooltip"
      />
    </div>

    <div v-else class="confidence-empty text-muted small italic">
      No confidence available
    </div>
  </div>
</template>

<script>
import ApiServices from '@/modules/data-layer/services/ApiServices';

/**
 * ConfidenceScore component displays the reliability score for a given indicator.
 * Usage: <ConfidenceScore :indicatorId="indicator.id" :filters="currentFilters" />
 */
export default {
  name: 'ConfidenceScore',
  props: {
    indicatorId: {
      type: [String, Number],
      required: true,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      data: null,
      loading: false,
      error: false,
      isVisible: true,
      currentRequestId: 0, // Track active requests to prevent race conditions
    };
  },
  computed: {
    levelClass() {
      if (!this.data) return '';
      switch (this.data.level) {
        case 'High': return 'text-success'; // Green
        case 'Medium': return 'text-warning'; // Yellow
        case 'Low': return 'text-danger'; // Red
        default: return 'text-secondary';
      }
    },
  },
  watch: {
    indicatorId: {
      handler: 'fetchConfidence',
      immediate: true,
    },
    filters: {
      handler: 'fetchConfidence',
      deep: true,
    },
  },
  methods: {
    async fetchConfidence() {
      if (!this.indicatorId) return;

      // Extract parameters safely
      const locationId = this.filters?.location?.id || this.filters?.location;
      const datasourceId = this.filters?.datasource?.id || this.filters?.datasource;
      const year = this.filters?.year;

      // Early exit if crucial parameters are not yet hydrated
      if (!datasourceId && !locationId) {
        return;
      }

      // Increment request ID to ensure we only process the latest response
      this.currentRequestId += 1;
      const requestId = this.currentRequestId;

      this.loading = true;
      this.error = false;

      try {
        const response = await ApiServices.getIndicatorConfidence(this.indicatorId, {
          location: locationId,
          datasource: datasourceId,
          year,
        });

        // Only commit changes if this is still the most recent request
        if (requestId === this.currentRequestId && response && response.data) {
          this.data = response.data;
          this.isVisible = true;
        }
      } catch (err) {
        if (requestId === this.currentRequestId) {
          console.error(`[ConfidenceScore] Failed to fetch for ${this.indicatorId}:`, err);
          if (this.indicatorId !== 'undefined') {
            this.error = true;
          }
        }
      } finally {
        if (requestId === this.currentRequestId) {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.confidence-score-container {
  margin-top: 2px;
  margin-bottom: 6px;
  font-family: 'Work Sans', sans-serif;
}

.confidence-label {
  color: #6c757d;
  font-size: 14.5px;
}

.confidence-value {
  transition: color 0.3s ease;
  font-size: 14.5px;
}

.confidence-info-icon {
  cursor: pointer;
  color: #348481 !important;
  font-size: 15.5px;
  transition: opacity 0.2s;
  margin-left: 2px;
}

.confidence-info-icon:hover {
  opacity: 0.8;
}

.text-success { color: #28a745 !important; }
.text-warning { color: #f2994a !important; } /* A bit more golden/yellow-orange */
.text-danger { color: #eb5757 !important; }

.italic { font-style: italic; }
</style>
