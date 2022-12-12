<template>
  <div>
    <slot> </slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { eventBus } from '@/main';
import controlSetup from '../../mixins/control-panel-setup';

export default {
  name: 'ControlPanelConfiguration',
  mixins: [controlSetup],
  props: {
    controlIndex: {
      type: Number,
      required: true,
    },
    groupIndex: {
      type: Number,
      default: () => null,
    },
  },
  computed: {
    payload() {
      if (this.groupIndex != null) {
        return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload[
          this.groupIndex
        ];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload;
    },
  },
  mounted() {
    eventBus.$on('handleClick', (data) => {
      this.payload.location = data;
    });
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SETUP_CONTROL_OPTIONS1']),
    async getAvailableYears() {
      const available = await this.setYearDropdown(
        this.payload?.indicator?.id,
        this.payload?.datasource?.id,
        this.payload?.location?.id,
      );
      return available;
    },
    async getAvailableDataSources() {
      return this.setDataSourcesDropdown(this.payload?.indicator?.id);
    },
    async getAvailableDataIndicators() {
      return this.setIndicatorDropdown(this.payload?.indicator?.id);
    },
  },
  watch: {
    // get latest available years when indicator , datasource or location are changed
    'payload.indicator': {
      async handler() {
        if (this.controlIndex !== 2) {
          const availableYears = await this.getAvailableYears();
          this.SETUP_CONTROL_OPTIONS1({
            groupIndex: this.groupIndex,
            panelIndex: this.controlIndex,
            key: 'year',
            values: availableYears,
          });
          const availableDS = await this.getDataSourcesFromDexie(this.payload?.indicator?.id);
          await this.SETUP_CONTROL_OPTIONS1({
            groupIndex: this.groupIndex,
            panelIndex: this.controlIndex,
            key: 'datasource',
            values: availableDS,
          });
        }
      },
    },
    'payload.datasource': {
      async handler() {
        let availableYears;
        if (this.controlIndex === 2) {
          availableYears = await this.setYearDropdownByDatasource(this.payload?.datasource?.id);
        } else {
          availableYears = await this.getAvailableYears();
        }
        await this.SETUP_CONTROL_OPTIONS1({
          groupIndex: this.groupIndex,
          panelIndex: this.controlIndex,
          key: 'year',
          values: availableYears,
        });
        // ============
        if (this.controlIndex === 2) {
          const availableIndicator = await this.getAvailableDataIndicators();
          await this.SETUP_CONTROL_OPTIONS1({
            groupIndex: this.groupIndex,
            panelIndex: this.controlIndex,
            key: 'indicator',
            values: availableIndicator,
          });
        }
      },
    },
    'payload.location': {
      async handler() {
        const availableYears = await this.getAvailableYears();
        await this.SETUP_CONTROL_OPTIONS1({
          groupIndex: this.groupIndex,
          panelIndex: this.controlIndex,
          key: 'year',
          values: availableYears,
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
