<template>
  <th
    class="text-center align-middle"
    scope="col"
    :class="[selectedSource === source ? 'table-active text-white' : '']"
  >
    <div class="d-flex align-items-center justify-content-center">
      <span
        class="data-source h6 mr-3 mb-0 font-weight-bold"
        @click="$emit('source:click', source)"
      >{{ source }}
      </span>
      <b-icon-exclamation-circle-fill
        :variant="(selectedSource === source) ? '' : 'primary'"
        @click="$emit('source-info:click', source)"
        class="data-source-info"
       />
    </div>
  </th>
</template>

<script>
export default {
  props: {
    source: {
      type: [Object, Array, String],
      required: true,
    },
    selectedSource: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .data-source, .data-source-info {
    cursor: pointer;
  }
</style>
