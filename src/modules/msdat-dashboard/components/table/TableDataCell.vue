<template>
  <div>
    <template v-if="cellData">
      <div class="d-flex flex-column">
          <div>
        <h5 class="font-weight-bold">
          {{cellData.value}}{{ cellData.factor }}
        </h5>
          </div>
          <div>
               <span>{{ cellData.year }}</span>
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
  },
};
</script>

<style lang="scss" scoped>
</style>
