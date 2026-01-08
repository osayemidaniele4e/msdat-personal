<template>
  <div>
    <template v-if="cellData">
      <div class="data-cell-values d-flex flex-column">
        <div>
          <h5 class="font-weight-bold cell-value" :style="`color: ${dataColors.split(' ')[0]}`">
            {{ cellData.value }}{{ cellData.factor }}
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
export default {
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
