<template>
  <div>
    <template v-if="cellData">
      <div class="data-cell-values d-flex flex-column">
        <div>
          <h5 class="font-weight-bold cell-value" :style="`color: ${dataColors.split(' ')[0]}`">
            {{ cellData.value }}{{ cellData.factor }}
            <DataAnomalyFlag
              v-if="cellData.anomalyFlags && cellData.anomalyFlags.length > 0"
              :flags="cellData.anomalyFlags"
              :uniqueId="cellUniqueId"
              :inline="true"
            />
          </h5>
        </div>
        <div :style="`color: ${dataColors.split(' ')[1]}`">
          <span class="period-value">{{ cellData.year }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <span></span>
    </template>
  </div>
</template>

<script>
import DataAnomalyFlag from '@/components/ui-components/DataAnomalyFlag.vue';

export default {
  components: {
    DataAnomalyFlag,
  },
  props: {
    cellData: {
      type: Object,
      required: false,
      validator: (prop) => typeof prop === 'object' || prop === null,
    },
    dataColors: {
      type: String,
    },
  },
  computed: {
    cellUniqueId() {
      if (!this.cellData) return '';
      const ds = this.cellData.dataSources?.id || this.cellData.dataSources?.datasource || 'ds';
      const yr = this.cellData.year || 'yr';
      return `cell-${ds}-${yr}-${Math.random().toString(36).substr(2, 5)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  & .data-cell-values {
    & > div {
      // percentage value
      &:first-child h5 {
        font-size: 12px;
      }
      // year
      &:last-child {
        font-size: 12px;
      }
    }
  }
}
.cell-value {
  font-size: 14px;
}
.period-value {
  font-size: 13px;
}
</style>
