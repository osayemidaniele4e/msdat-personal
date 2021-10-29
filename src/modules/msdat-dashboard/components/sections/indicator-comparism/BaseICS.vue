<template>
  <ICS :values="controlPanelProps" />
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapActions } from 'vuex';
import ICS from './ICS.vue';

export default {
  name: 'BaseMultiSource',
  mixins: [ControlPanelSetup],
  components: {
    ICS,
  },
  props: {
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
        panelIndex: 2,
        controlIndex: 4,
        values: newVal,
      });
    },

    'controlPanelProps.indicator': {
      async handler(newVal) {
        let indicator = newVal;
        if (Array.isArray(newVal)) {
          // eslint-disable-next-line prefer-destructuring
          indicator = newVal[0];
        }
        const available = await this.setYearDropdown(
          indicator.id,
          this.controlPanelProps.datasource.id,
          this.controlPanelProps.location.id,
        );
        this.SET_CONTROL_OPTIONS({
          panelIndex: 2,
          controlIndex: 2,
          values: available,
        });
      },
    },

    'controlPanelProps.datasource': {
      async handler(newVal) {
        // eslint-disable-next-line prefer-destructuring
        let indicator = this.controlPanelProps.indicator;
        if (Array.isArray(this.controlPanelProps.indicator)) {
          // eslint-disable-next-line prefer-destructuring
          indicator = this.controlPanelProps.indicator[0];
        }
        const available = await this.setYearDropdown(
          indicator.id,
          newVal.id,
          this.controlPanelProps.location.id,
        );
        this.SET_CONTROL_OPTIONS({
          panelIndex: 2,
          controlIndex: 2,
          values: available,
        });
      },
    },
    'controlPanelProps.location': {
      async handler(newVal) {
        // eslint-disable-next-line prefer-destructuring
        let indicator = this.controlPanelProps.indicator;
        if (Array.isArray(this.controlPanelProps.indicator)) {
          // eslint-disable-next-line prefer-destructuring
          indicator = this.controlPanelProps.indicator[0];
        }
        const available = await this.setYearDropdown(
          indicator.id,
          this.controlPanelProps.datasource.id,
          newVal.id,
        );
        this.SET_CONTROL_OPTIONS({
          panelIndex: 2,
          controlIndex: 2,
          values: available,
        });
      },
    },
  },
  async mounted() {
    const setYearDropdown = await this.setYearDropdown();
    // debugger;
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 4,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 3,
      values: this.defaultLocationDropdown,
    });

    // datasource dropdown
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 1,
      values: this.defaultDataSourceDropdown,
    });
    // period dropdown;
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 2,
      values: setYearDropdown,
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
