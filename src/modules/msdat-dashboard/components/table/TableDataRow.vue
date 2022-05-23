<template>
  <tr>
    <template>
      <!-- DO NOT REMOVE class that begin we table- they
      help control the tour guid feature on the platform -->
      <!-- A test case could be added to ensure that this alway there -->
      <td class="align-middle table-info-icon">
        <div class="d-flex justify-content-center">
          <b-icon-info-circle-fill
            @click="$emit('indicator-info:clicked', rowData.indicator)"
          />
        </div>
      </td>
      <td class="align-middle p-2 table-indicators" scope="col">
        <!-- Use this slot to set the related indicator multiselect and it options -->
        <div class="d-flex flex-column">
          <slot :name="`indicator`" :indicator="rowData.indicator.id">
            {{ rowData.indicator.full_name }}
          </slot>
          <span style="font-size: 10px; margin: 0 5px">{{ factor }}</span>
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
  computed: {
    factor() {
      return this.dlGetFactor(this.rowData.indicator.factor).display_factor;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  // icon column
  & > td:first-child {
    border: none;
    background-color: #ffffff;

    svg {
      color: #2b5d5b;
      cursor: pointer;
    }
  }
}
</style>
