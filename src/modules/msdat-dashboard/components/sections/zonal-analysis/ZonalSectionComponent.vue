<template>
   <div class="row">
        <div class="col-md-8">
          <!-- <ZonalColumnChart :controlPanelProps="zonalAnalysis"
          @zonal-chart-state="setState"
          :mapSelectedState="selectedMapName"/>
        </div>
        <div class="col-md-4">
          <ZonalMap :chartProps="zonalAnalysis"
          @state-name="setState"
          :stateVal="selectedMapName" />
        </div> -->
      </div>
</template>

<script>
// import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
// import ZonalMap from '../../components/sections/zonal-analysis/map.vue';
// import ZonalColumnChart from '../../components/sections/zonal-analysis/zonalSection.vue';

export default {
  components: {
    // ZonalMap,
    // ZonalColumnChart,
  },
  // mixins: [ControlPanelSetup],
  mounted() {
    // this.SET_CONTROL_OPTIONS({
    //   panelIndex: 4,
    //   controlIndex: 0,
    //   values: this.defaultIndicatorDropdown,
    // });
    // this.SET_CONTROL_OPTIONS({
    //   panelIndex: 4,
    //   controlIndex: 1,
    //   values: this.defaultLocationDropdown,
    // });
    // this.SET_CONTROL_OPTIONS({
    //   panelIndex: 4,
    //   controlIndex: 2,
    //   values: this.defaultDataSourceDropdown,
    // });
    // this.SET_CONTROL_OPTIONS({
    //   panelIndex: 4,
    //   controlIndex: 3,
    //   values: this.defaultYearDropdown,
    // });
  },
};
</script>

<style>
</style>
