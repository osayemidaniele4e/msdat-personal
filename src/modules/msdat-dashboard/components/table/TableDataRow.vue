<template>
  <tr>
    <template>
      <td class="border-0 ">
        <div class="d-flex">
          <b-icon-exclamation-circle-fill variant="success" />
        </div>
      </td>
      <td
        class="text-center text-black text-uppercase align-middle p-2"
        scope="col"
      >
        <!-- Use this slot to set the related indicator multiselect and it options -->
        <slot :name="`indicator`">
          {{ rowData.indicators }}
        </slot>
      </td>
      <!-- the default slot for the system -->
      <slot></slot>
    </template>
  </tr>
</template>

<script>

export default {
  props: {
    rowData: {
      type: [Object, String],
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
