<template>
  <b-modal
    id="indicator-explanation-modal-global"
    size="lg"
    hide-header
    hide-footer
    centered
    body-class="p-0"
    @hide="resetState"
  >
    <div v-if="loading" class="text-center py-5">
      <b-spinner style="color: #348481;" label="Loading..."></b-spinner>
    </div>
    <div v-else-if="metadata" class="meta-modal bg-white">
      <div class="d-flex justify-content-between align-items-center" style="background-color: #f1f1f1; padding: 15px 24px; border-bottom: 1px solid #ddd;">
        <h5 class="mb-0 text-uppercase" style="font-size: 15px; letter-spacing: 0.2px; font-weight: 700;">{{ metadata.name }}</h5>
        <b-icon-x
          class="cursor-pointer"
          style="width: 25px; height: 25px; color: #333;"
          @click="closeModal"
        ></b-icon-x>
      </div>

      <div class="p-4 pt-2">
        <div class="text1">Description</div>
      <div class="text2">{{ metadata.definition }}</div>

      <div class="text1">Calculation Formula</div>
      <div class="text2">{{ metadata.formula }}</div>

      <div class="text1">Data Source</div>
      <div class="text2">{{ metadata.source }}</div>

      <div class="mt-4">
        <b-button style="background-color: #d81b60; border-color: #d81b60; color: white;" size="m" @click="closeModal">CLOSE</b-button>
      </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import mixin from '@/modules/data-layer/mixin';

export default {
  name: 'IndicatorExplanationModal',
  mixins: [mixin],
  data() {
    return {
      loading: false,
      metadata: null,
    };
  },
  mounted() {
    // Bind once and store the references on the instance (not in data, because
    // Vue 2 doesn't proxy underscore-prefixed data keys)
    this.$_boundLoad = (id) => this.loadMetadata(id);
    this.$_windowHandler = (ev) => {
      const id = ev && ev.detail != null ? ev.detail : null;
      if (id != null) this.loadMetadata(id);
    };
    this.$root.$on('open-indicator-explanation', this.$_boundLoad);
    // Also listen on window as a belt-and-suspenders fallback in case $root
    // differs (e.g., multi-root apps, HMR reloads, or detached trees)
    window.addEventListener('open-indicator-explanation', this.$_windowHandler);
  },
  beforeDestroy() {
    if (this.$_boundLoad) {
      this.$root.$off('open-indicator-explanation', this.$_boundLoad);
    }
    if (this.$_windowHandler) {
      window.removeEventListener('open-indicator-explanation', this.$_windowHandler);
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('indicator-explanation-modal-global');
    },
    resetState() {
      this.metadata = null;
    },
    async loadMetadata(indicatorId) {
      if (indicatorId == null || indicatorId === '') return;
      this.loading = true;
      this.metadata = null;

      // Crucial: Fire the modal immediately from bootstrap registry
      try {
        this.$bvModal.show('indicator-explanation-modal-global');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[IndicatorExplanationModal] $bvModal.show failed', e);
      }

      try {
        // Fetch indicator natively from Vuex
        const indicatorObj = this.dlGetIndicator(indicatorId);

        // Fetch available data sources for this indicator
        const dsList = await this.getDataSourcesFromIndicator(indicatorId);

        let definition = 'No definition available for this indicator.';
        let formula = 'Formula not explicitly defined.';
        let sourceNames = 'Unavailable';

        if (dsList && dsList.length > 0) {
          // List all mapped standard sources to format beautifully
          sourceNames = dsList.map((ds) => ds.datasource).join(', ');

          // Use the primary/first data source to derive the standard definition
          // (Since MS-DAT groups indicators generically, definitions across sources are essentially identical)
          const specificItems = this.dlGetDataSourceSpecificIndicator({
            indicator: indicatorId,
            datasource: dsList[0].id,
          });

          if (specificItems && specificItems.length > 0) {
            const specific = specificItems[0];
            definition = specific.indicator_definition || definition;

            const num = specific.measurement_numerator;
            const den = specific.measurement_denominator;

            const isValid = (val) => {
              if (val == null) return false;
              const s = String(val).trim().toLowerCase();
              return s !== '' && s !== 'n/a' && s !== 'not applicable' && s !== '0' && s !== 'none';
            };

            let formedFormula = '';
            if (isValid(num)) formedFormula += `Numerator: ${num.trim()}\n`;
            if (isValid(den)) formedFormula += `Denominator: ${den.trim()}`;

            formula = formedFormula.trim() || 'Formula not explicitly defined.';
          }
        }

        this.metadata = {
          name: indicatorObj ? indicatorObj.full_name : 'Indicator Definition',
          definition,
          formula,
          source: sourceNames,
        };
      } catch (err) {
        console.error('Failed to inject indicator metadata', err);
        // Fallback safeguards
        this.metadata = {
          name: 'Indicator Explanation Details',
          definition: 'Data is currently resolving...',
          formula: 'N/A',
          source: 'N/A',
        };
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.text1 {
  font-weight: 700;
  border-bottom: 1.5px solid #2b5d5b;
  color: black;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 14px;
  padding-bottom: 4px;
}

.text2 {
  font-size: 13.5px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
}
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s;
}
.cursor-pointer:hover {
  color: #d81b60;
  transform: scale(1.1);
}
</style>
