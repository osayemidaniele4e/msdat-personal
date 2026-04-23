/**
 * Resolves a numeric indicator id for ConfidenceScore when payload.indicator
 * exists but `id` is briefly missing during store hydration, while the route
 * still has ?indicator= (see paramsMixin updateParams).
 */
export default {
  computed: {
    resolvedConfidenceIndicatorId() {
      let panel = null;
      if (this.values && this.values.indicator) {
        panel = this.values;
      } else if (this.controlPanelProps && this.controlPanelProps.indicator) {
        panel = this.controlPanelProps;
      }

      if (panel && typeof panel === 'object' && panel.indicator) {
        const raw = panel.indicator.id;
        if (raw !== undefined && raw !== null && raw !== '') {
          const n = Number(raw);
          if (Number.isFinite(n)) return n;
        }
      }
      return this.parseRouteIndicatorId();
    },
  },
  methods: {
    parseRouteIndicatorId() {
      const q = this.$route?.query?.indicator;
      if (q === undefined || q === null || q === '') return null;
      const n = Number(Array.isArray(q) ? q[0] : q);
      return Number.isFinite(n) ? n : null;
    },
  },
};
