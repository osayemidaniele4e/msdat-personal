<template>
  <span
    class="indicator-tooltip-wrapper d-inline-block align-middle ml-1"
    tabindex="0"
    role="button"
    aria-label="Open indicator explanation"
    @mousedown.stop
    @click.stop.prevent="showModal"
    @keydown.enter.stop.prevent="showModal"
    @keydown.space.stop.prevent="showModal"
  >
    <b-icon-info-circle-fill class="indicator-info-icon" aria-hidden="true" />
  </span>
</template>

<script>
export default {
  name: 'IndicatorExplanationTooltip',
  props: {
    indicatorId: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    showModal() {
      // Emit a global event to open the detached modal
      // preventing the dropdown from destroying our modal before it opens!
      try {
        this.$root.$emit('open-indicator-explanation', this.indicatorId);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[IndicatorExplanationTooltip] $root emit failed', e);
      }
      // Fallback: also dispatch a native window event so the modal can catch
      // it even if the Vue $root event bus is disconnected (e.g., during HMR).
      try {
        window.dispatchEvent(
          new CustomEvent('open-indicator-explanation', { detail: this.indicatorId }),
        );
      } catch (e) {
        // IE / older browsers fallback
        const ev = document.createEvent('CustomEvent');
        ev.initCustomEvent('open-indicator-explanation', false, false, this.indicatorId);
        window.dispatchEvent(ev);
      }
    },
  },
};
</script>

<style scoped>
.indicator-tooltip-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  isolation: isolate;
  min-width: 26px;
  min-height: 26px;
  box-sizing: content-box;
}

.indicator-info-icon {
  font-size: 15.5px;
  color: #348481 !important;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 5px;
}

.indicator-info-icon:hover,
.indicator-info-icon:focus {
  opacity: 0.8;
  outline: none;
}
</style>
