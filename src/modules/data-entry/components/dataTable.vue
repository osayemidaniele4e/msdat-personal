<template>
  <div>
    <b-modal id="modal-1" hide-footer centered title="Data Entry" scrollable size="lg">
      <div class="mb-3 contain">
        <div class="d-flex flex-column">
          <h5>Year</h5>
          <p class="text-primary">{{ tableData[0].period }}</p>
        </div>
        <div class="d-flex flex-column">
          <h5>Location</h5>
          <p class="text-primary">{{ tableData[0].location }}</p>
        </div>
        <div class="d-flex flex-column">
          <h5>DataSource</h5>
          <p class="text-primary">{{ tableData[0].datasource }}</p>
        </div>
        <div class="d-flex flex-column">
          <h5>Value Type</h5>
          <p class="text-primary">{{ tableData[0].value_type }}</p>
        </div>
      </div>
      <div class="contain-2">
        <b-table striped hover :items="indicatortable"></b-table>
      </div>
      <div class="d-flex w-100 justify-content-end">
        <button class="btn btn-danger mr-3 mt-3">Cancel</button>
        <button class="btn btn-primary mt-3" @click.prevent="proceed"> Proceed</button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="js">
export default {
  name: 'DataTable',
  computed: {
    indicatortable() {
      return this.tableData.map((el) => {
        // eslint-disable-next-line no-unused-vars
        const { indicatorName, value, ...otherDetails } = el;
        return { indicatorName, value };
      });
    },
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    proceed() {
      this.$emit('proceed');
    },

  },
};
</script>

<style lang="scss" scoped>
.contain {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.contain-2 {
  height: 50vh;
  overflow-y: auto;
}
</style>
