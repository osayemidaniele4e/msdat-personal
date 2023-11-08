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
            class="info-circle"
          />
        </div>
      </td>
      <td class="align-middle p-2 table-indicators-1" id="table-indicators-1">
        <!-- Use this slot to set the related indicator multiselect and it options -->
        <div
          class="d-flex flex-column indicator-container"
          v-if="dashboardName === 'Health_Facility'"
        >
          <slot :name="`indicator`" :indicator="rowData.indicator.id">
            <div class="indicator-name">{{ rowData.indicator.full_name }}</div>
          </slot>
          <span style="font-size: 10px; margin: 0 5px"> ({{ factor }})</span>
        </div>

        <div class="d-flex flex-column" v-else>
          <slot :name="`indicator`" :indicator="rowData.indicator.id">
            <div class="">{{ rowData.indicator.full_name }}</div>
          </slot>
          <span style="font-size: 10px; margin: 0 5px"> ({{ factor }})</span>
        </div>
      </td>
      <!-- the default slot for the system -->
      <slot></slot>
    </template>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      dashboardName: '',
    };
  },
  props: {
    rowData: {
      type: [Object, String],
      required: false,
    },
    factors: {
      type: [Array],
      required: true,
    },
  },
  computed: {
    factor() {
      const factorItem = this.factors.find((item) => item.id === this.rowData.indicator.factor);
      console.log(factorItem, 'factorItem');
      console.log(this.factors, 'factorItem 1');
      return factorItem.display_factor;
    },
  },

  mounted() {
    console.log(this.rowData.indicator, 'rowData');
    console.log(this.factors, 'factorItem');
    // eslint-disable-next-line camelcase
    const { dashboard_name } = this.$route.query;
    // eslint-disable-next-line camelcase
    this.dashboardName = dashboard_name;
    console.log('zonal map', this.dashboardName);
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/abstracts/_variables.scss';

tr {
  // icon column
  & > td:first-child {
    border: none;
    background-color: #ffffff;

    svg {
      // color: #2b5d5b;
      color: #348481;
      cursor: pointer;
    }
  }
}

.info-circle {
  font-size: 16px;
}

.indicator-container {
  max-width: 100ch; /* Limit to 20 characters */
  word-wrap: break-word; /* Force text to wrap within the cell */
  white-space: initial; /* Reset white-space property */
}

.indicator-name {
  word-wrap: break-word; /* Allow text to wrap */
}
</style>
