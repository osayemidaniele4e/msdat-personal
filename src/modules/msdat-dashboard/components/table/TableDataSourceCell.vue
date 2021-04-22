<template>
  <th
    class="text-center align-middle"
    scope="col"
    :class="[selectedSource === source ? 'table-active text-white' : '']"
    @click="$emit('source:click', source)"
  >
    <div class="d-flex align-items-center justify-content-around">
      <span class="h6 mb-0 font-weight-bold">{{ source }}</span>
      <b-icon-exclamation-circle-fill
        :variant="[(selectedSource === source) ? 'white' : 'primary']"
        @click="$emit('source-info:click', source)"
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
</style>
