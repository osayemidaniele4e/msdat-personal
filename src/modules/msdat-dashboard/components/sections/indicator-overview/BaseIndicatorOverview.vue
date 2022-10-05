<template>
  <div class="row" @click="closeSubCard = !closeSubCard">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-12 mb-lg-5 mb-3">
          <TableComponent
            :showTableRelatedIndicator="showTableRelatedIndicator"
            :values="controlPanelProps"
            @value="getValue"
            @key="getKey"
            @reset="getReset"
          />
        </div>
        <div class="col-md-12">
          <IDCC :values="controlPanelProps" :closeOverlay="closeSubCard"
           :resetIndex="resetIndex" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <StateBarChart :values="controlPanelProps" :closeOverlay="closeSubCard" />
    </div>
  </div>
</template>

<script>
import IDCC from './TheIndicatorDatasoureComparisonChart.vue';
import StateBarChart from './TheStateBarChart.vue';
import TableComponent from './TheTable.vue';

export default {
  data() {
    return {
      resetIndex: 1,
      closeSubCard: true,
    };
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
    },

    getKey(key) {
      this.$emit('key', key);
    },

    getReset() {
      this.$emit('reset');
      // updating the resetIndex that is passed into IDCC
      this.resetIndex++;
    },
  },
};
</script>

<style></style>
