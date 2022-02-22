<template>
  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-12">
          <TableComponent
            :showTableRelatedIndicator="showTableRelatedIndicator"
            :values="controlPanelProps"
            @value="getValue"
            @key="getKey"
            @reset="getReset"
          />
        </div>
        <div class="col-md-12">
          <IDCC :values="controlPanelProps" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <StateBarChart :values="controlPanelProps" />
    </div>
  </div>
</template>

<script>
import IDCC from './TheIndicatorDatasoureComparisonChart.vue';
import StateBarChart from './TheStateBarChart.vue';
import TableComponent from './TheTable.vue';

export default {
  data() {
    return {};
  },
  props: {
    controlPanelProps: {
      type: Object,
      required: true,
    },
    showTableRelatedIndicator: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IDCC,
    StateBarChart,
    TableComponent,
  },
  methods: {
    // new emits

    getValue(value) {
      this.$emit('value', value);
      console.log(`this is value 2${JSON.stringify(value)}`);
    },

    getKey(key) {
      this.$emit('key', key);
    },

    getReset() {
      this.$emit('reset');
      console.log('emitting resetting');
    },
  },
};
</script>

<style></style>
