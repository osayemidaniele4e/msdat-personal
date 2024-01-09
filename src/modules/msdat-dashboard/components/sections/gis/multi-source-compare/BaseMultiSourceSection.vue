<template>
  <MultiSource :values="controlPanelProps" />
</template>

<script>
import { mapActions } from 'vuex';
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import MultiSource from './multi-source.vue';

export default {
  name: 'BaseMultiSource',
  mixins: [ControlPanelSetup],
  components: {
    MultiSource,
  },
  props: {
    currentIndex: {
      type: Number,
      // require,
    },
    controlPanelProps: {
      type: Object,
    },
  },
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),
  },
  watch: {
    // The is the updated the control panel dropdown as indicator are gotten from the API
    // in the background (async)
    indicatorDropdownUpdated(newVal) {
      this.SET_CONTROL_OPTIONS({
        multipleSetup: true,
        panelIndex: 4,
        controlIndex: this.currentIndex,
        controlIndex2: 0,
        values: newVal,
      });
    },

    'controlPanelProps.indicator': {
      async handler(newVal) {
        // debugger;
        const available = await this.setYearDropdown(
          newVal.id,
          this.controlPanelProps.datasource.id,
          this.controlPanelProps.location.id,
        );

        this.SET_CONTROL_OPTIONS({
          multipleSetup: true,
          panelIndex: 4,
          controlIndex: this.currentIndex,
          controlIndex2: 3,
          values: available,
        });
      },
    },

    'controlPanelProps.datasource': {
      async handler(newVal) {
        const available = await this.setYearDropdown(
          this.controlPanelProps.indicator.id,
          newVal.id,
          this.controlPanelProps.location.id,
        );
        this.SET_CONTROL_OPTIONS({
          multipleSetup: true,
          panelIndex: 4,
          controlIndex: this.currentIndex,
          controlIndex2: 3,
          values: available,
        });
      },
    },
    'controlPanelProps.location': {
      async handler(newVal) {
        const available = await this.setYearDropdown(
          this.controlPanelProps.indicator.id,
          this.controlPanelProps.datasource.id,
          newVal.id,
        );
        this.SET_CONTROL_OPTIONS({
          multipleSetup: true,
          panelIndex: 4,
          controlIndex: this.currentIndex,
          controlIndex2: 3,
          values: available,
        });
      },
    },
  },
  async mounted() {
    const setYearDropdown = await this.setYearDropdown();

    console.log(setYearDropdown, 'available');
    // debugger;
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 0,
      values: this.defaultIndicatorDropdown,
    });
    // this.SET_CONTROL_OPTIONS({
    //   multipleSetup: true,
    //   panelIndex: 4,
    //   controlIndex: this.currentIndex,
    //   controlIndex2: 3,
    //   values: this.defaultLocationDropdown,
    // });
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 2,
      values: this.defaultDataSourceDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      multipleSetup: true,
      panelIndex: 4,
      controlIndex: this.currentIndex,
      controlIndex2: 3,
      values: setYearDropdown,
    });
  },
};
</script>

<style lang="scss" scoped></style>
