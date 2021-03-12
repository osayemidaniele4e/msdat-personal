<template>
  <div>
    <h1>MSDAT DASHBOARD</h1>
    <BasePanel
      :tabs="[
        'Indicator Overview',
        'Zonal Analysis',
        'Indicator Comparison',
        'Dataset Comparison',
        'Multi-source Indicator Comparison',
      ]"
      :position="position"
    >
      <template v-slot:default="{ currentTab }">
        <indicatorOverviewPanel v-if="currentTab == 0" @data:options="log" />
        <!-- <ComparismSection v-if="currentTab == 1" /> -->
      </template>
    </BasePanel>

    <!-- <ComparismSection/> -->
     <button @click="position = 1" class="btn btn-primary">Hello World</button>
  </div>
</template>

<script>
import { BasePanel, indicatorOverviewPanel } from '@/components/ControlPanel';

export default {
  data() {
    return {
      position: '',
    };
  },
  components: {
    indicatorOverviewPanel,
    BasePanel,
  },
  methods: {
    log(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
