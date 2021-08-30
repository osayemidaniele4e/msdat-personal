<template>
  <div class="row">
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-12">
          <TableComponent :values="controlPanelProps" />
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
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapActions } from 'vuex';
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
  },
  components: {
    IDCC,
    StateBarChart,
    TableComponent,
  },
  mixins: [ControlPanelSetup],
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),
  },
  async mounted() {
    const setYearDropdown = await this.setYearDropdown();
    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 0,
      values: this.defaultIndicatorDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 1,
      values: this.defaultDataSourceDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 2,
      values: this.defaultLocationDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 0,
      controlIndex: 3,
      values: setYearDropdown,
    });
  },
};
</script>

<style>
</style>
