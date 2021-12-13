/* eslint-disable func-names */ /* eslint-disable func-names */
<template>
  <div class="d-flex numdenum">
    <div class="indicator">{{ selectedDataSource }} {{ selectedYear }}</div>
    <div class="d-flex numdenum-values justify-content-between">
      <div class="mr-5">
        <b>Numerator:</b>
        <span> Total number of doses - 858,814</span>
      </div>
      <div>
        <b>Denominator:</b>
        <span> Total number of children - 923,456</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    selectedYear() {
      return this.$store.state.MSDAT_STORE.controlConfig[0].payload.year;
    },
    selectedDataSource() {
      return this.$store.state.MSDAT_STORE.controlConfig[0].payload.datasource.datasource;
    },
  },
};
</script>

<style lang="scss" scoped>
.indicator {
  margin-right: 15px;
  font: var(--unnamed-font-style-normal) normal bold var(--unnamed-font-size-18) /
    var(--unnamed-line-spacing-21) var(--unnamed-font-family-work-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/21px Work Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.numdenum-values {
  height: 28.5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 5px;
  line-height: 28.5px;
  padding: 0px 15px 0px 15px;
}
</style>
