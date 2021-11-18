<template>
  <div>
    <pre>{{ customizedConfig }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customizedConfig: {
        id: 'UUID',
        title: 'Malaria Dashboard',
        slug: 'Malaria-dashboard',
        section: {
          indicatorOverview: true,
          zonalAnalysis: true,
          indicatorComparison: true,
          multiSourceComparison: true,
        },
        data: {
          indicators: [],
          datasources: [],
          levels: [],
          periods: [],
        },
      },
    };
  },
  mounted() {
    const indicators = this.$store.state.CUSTOM_DASHBOARD_STORE.indicatorsSelected;
    const datasource = this.$store.state.CUSTOM_DASHBOARD_STORE.dataSourceSelected;
    const periods = this.$store.state.CUSTOM_DASHBOARD_STORE.periodSelected;
    const levels = this.$store.state.CUSTOM_DASHBOARD_STORE.levelSelected;
    // debugger;
    this.customizedConfig.data.indicators = indicators.map((item) => item.id);
    this.customizedConfig.data.datasources = datasource.map((item) => item.id);
    this.customizedConfig.data.periods = periods;
    this.customizedConfig.data.levels = levels;
  },
};
</script>

<style lang="scss" scoped>
</style>
