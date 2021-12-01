<template>
  <div>
    <slot> </slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import controlSetup from '../../mixins/control-panel-setup';

export default {
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
  methods: {
    ...mapMutations('MSDAT_STORE', ['SETUP_CONTROL_OPTIONS1']),
    async getAvailableYears() {
      const available = await this.setYearDropdown(
        this.payload.indicator.id,
        this.payload.datasource.id,
        this.payload.location.id,
      );
      return available;
    },
    // async getAvailableDataSources() {
    //   const availableDataSource = await this.setDataSourcesDropdown(
    //     this.payload.indicator.id,
    //   );
    //   return availableDataSource;
    // },
  },
  watch: {
    // get latest available years when indicator , datasource or location are changed
    'payload.indicator': {
      async handler() {
        const availableYears = await this.getAvailableYears();
        // const availableDS = await this.getAvailableDataSources();
        // console.log('hello =>', availableDS);
        this.SETUP_CONTROL_OPTIONS1({
          groupIndex: this.groupIndex,
          panelIndex: this.controlIndex,
          key: 'year',
          values: availableYears,
        });
      },
    },
    'payload.datasource': {
      async handler() {
        const availableYears = await this.getAvailableYears();
        this.SETUP_CONTROL_OPTIONS1({
          groupIndex: this.groupIndex,
          panelIndex: this.controlIndex,
          key: 'year',
          values: availableYears,
        });
      },
    },
    'payload.location': {
      async handler() {
        const availableYears = await this.getAvailableYears();
        this.SETUP_CONTROL_OPTIONS1({
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
