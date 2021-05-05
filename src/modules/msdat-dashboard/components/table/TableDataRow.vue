<template>
  <tr>
    <template>
      <td class="align-middle">
        <div class="d-flex justify-content-center">
          <b-icon-exclamation-circle-fill />
        </div>
      </td>
      <td
        class="align-middle p-2"
        scope="col"
      >
        <!-- Use this slot to set the related indicator multiselect and it options -->
        <div class="d-flex flex-column">
          <slot
            :name="`indicator`"
          >
            {{ rowData.indicators }}
          </slot>
          <span
            style="font-size: 10px; margin: 0 5px"
          >in percentage</span>
        </div>
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
  tr {
    // icon column
    &>td:first-child {
      border: none;
      background-color: #ffffff;

      svg {
        color: #2B5D5B;
        cursor: pointer;
      }
    }
  }
</style>
