<template>
  <div>
    <slot> </slot>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { eventBus } from '@/main';
import apiServices from '@/modules/DataLayer/services/ApiServices';
import VueCookies from 'vue-cookies';
import controlSetup from '../../mixins/control-panel-setup';

export default {
  name: 'ControlPanelConfiguration',
  mixins: [controlSetup],
  data() {
    return {
      interactions: [],
    };
  },
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
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser']),
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
    const interactions = VueCookies.get('user_interactions');
    console.log('interaction', interactions);
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['SETUP_CONTROL_OPTIONS1']),
    ...mapActions(['SET_INTERACTIONS', 'GET_INTERACTIONS']),
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
      return this.setIndicatorDropdown(this.payload?.datasource?.id);
    },
    async setInteractions() {
      const { data } = await apiServices.getDashboard();
      this.dashboard = data.results.find((item) => item.title === this.$route.meta.title);
      // this.interactions = [];
      const a = {
        year: this.payload.year,
        user: this.getUser.id,
        dashboard: 2,
        section: this.controlIndex + 1,
        indicator: this.payload.indicator.id,
        datasource: this.payload.datasource.id,
        location: this.payload.location.id,
      };
      this.interactions.push(a);
      console.log('interac', this.interactions);
      VueCookies.set('user_interactions', this.interactions);
      // if (this.isAuthenticated === true) {
      //   await this.SET_INTERACTIONS({
      //     year: this.payload.year,
      //     user: this.getUser.id,
      //     dashboard: this.dashboard.id,
      //     section: this.controlIndex + 1,
      //     indicator: this.payload.indicator.id,
      //     datasource: this.payload.datasource.id,
      //     location: this.payload.location.id,
      //   });
      // }
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
        this.setInteractions();
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
