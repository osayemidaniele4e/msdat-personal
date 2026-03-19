<template>
  <span class="indicator-tooltip-wrapper d-inline-block align-middle ml-1">
    <b-icon-info-circle-fill
      class="indicator-info-icon"
      tabindex="0"
      @mousedown.stop.prevent="showModal"
      @click.stop.prevent="showModal"
    />
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
      this.$root.$emit('open-indicator-explanation', this.indicatorId);
    },
  },
};
</script>

<style scoped>
.indicator-tooltip-wrapper {
  display: inline-flex;
  align-items: center;
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
