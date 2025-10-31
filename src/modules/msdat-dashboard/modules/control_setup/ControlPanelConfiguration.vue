<template>
  <div>
    <slot> </slot>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import VueCookies from 'vue-cookies';
import moment from 'moment';
import { eventBus } from '@/main';
import apiServices from '@/modules/data-layer/services/ApiServices';
// import { time } from 'highcharts';
import controlSetup from '../../mixins/control-panel-setup';
import updateQueryParams from './paramsMixin';
// import nhmisMonthlyPeriod from './nhmis-monthly-period.json';

export default {
  name: 'ControlPanelConfiguration',
  mixins: [updateQueryParams, controlSetup],
  data() {
    return {
      interactions: [],
      previous_time: null,
      after_time: null,
      previous_indicator: null,
      previous_time_datasource: null,
      after_time_datasource: null,
      previous_datasource: null,
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
    ...mapGetters(['getInternetStatus']),
    payload() {
      if (this.groupIndex != null) {
        return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload[
          this.groupIndex
        ];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload;
    },
  },
  created() {
    const interactions = JSON.parse(VueCookies.get('user_interactions'));
    // if (interactions.length <= 10) {
    this.interactions = interactions || [];
    // }
  },
  mounted() {
    this.MODIFY_IDC_DATASOURCE({
      id: 0,
      datasource: 'ALL',
      full_name: 'ALL',
      indicators: [],
    });
    const now = new Date();
    const totalTimeInMinutes = now.getHours() * 60 + now.getMinutes();

    // Set the total time in minutes for the component data.
    this.previous_time = totalTimeInMinutes;
    this.previous_indicator = this.payload.indicator;
    eventBus.$on('handleClick', (data) => {
      this.payload.location = data;
    });
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'SETUP_CONTROL_OPTIONS1',
      'SET_INDICATOR_COMPARISON_PAYLOAD',
      'SET_INDICATOR_DATASOURCES',
      'MODIFY_IDC_DATASOURCE',
    ]),
    ...mapActions([
      'SET_INTERACTIONS',
      'GET_INTERACTIONS',
      'SET_INDICATOR_TIME_SPENT',
      'SET_DATASOURCE_TIME_SPENT',
    ]),
    async getAvailableYears() {
      // debugger;

      // if (this.payload?.datasource?.id === 30) {
      //   return nhmisMonthlyPeriod;
      // }
      const available = await this.setYearDropdown(
        this.payload?.indicator?.id,
        this.payload?.datasource?.id,
        this.payload?.location?.id
      );
      return available;
    },
    async getAvailableDataSources() {
      return this.setDataSourcesDropdown(this.payload?.indicator?.id);
    },
    async getAvailableDataIndicators() {
      return this.setIndicatorDropdown(this.payload?.datasource?.id);
    },
    removeDuplicates(arr) {
      const seen = {};
      return arr.filter((item) => {
        const key = JSON.stringify(item);
        // eslint-disable-next-line no-return-assign, no-prototype-builtins
        return seen.hasOwnProperty(key) ? false : (seen[key] = true);
      });
    },
    async setInteractions() {
      const getFormattedConfig = VueCookies.get('customDashboardConfig');
      if (this.getInternetStatus === true) {
        const data = await apiServices.getDashboard();

        this.dashboard = data.data.results.find((item) => item.title === this.$route.meta.title);
      }
      const dashboardName = this.dashboard?.id || getFormattedConfig?.name;

      const interaction = {
        year: this.payload.year,
        user: this.getUser.id,
        dashboard: dashboardName,
        section: this.controlIndex + 1,
        indicator: this.payload.indicator.id,
        datasource: this.payload.datasource.id,
        location: this.payload.location.id,
        viewed_at: moment().format(),
      };

      this.interactions.push(interaction);
      if (this.isAuthenticated === true) {
        const uniqueArr = this.removeDuplicates(this.interactions);
        localStorage.setItem('user_interactions', JSON.stringify(uniqueArr));
        const interactions = localStorage.getItem('user_interactions');
        const parsedInteraction = JSON.parse(interactions);
        //  if (parsedInteraction.length > 9 && this.getInternetStatus === true)
        if (this.getInternetStatus === true) {
          parsedInteraction.forEach(async (el) => {
            await this.SET_INTERACTIONS(el);
          });
          this.interactions = [];
        }
      }
    },
    setStatesDropdown() {
      this.setLocationDropdown(
        Array.isArray(this.payload?.datasource)
          ? this.payload?.datasource.map((d) => d.id)
          : this.payload?.datasource?.id,
        Array.isArray(this.payload?.indicator)
          ? this.payload?.indicator.map((i) => i.id)
          : this.payload?.indicator?.id,
        this.controlIndex
      );
    },
  },
  watch: {
    controlIndex: {
      handler() {
        this.setStatesDropdown();
      },
      // deep: true,
      immediate: true,
    },
    // get latest available years when indicator , datasource or location are changed
    'payload.indicator': {
      async handler() {
        // new ones
        if (this.payload.indicator) {
          const now = new Date();
          const totalTimeInMinutes = now.getHours() * 60 + now.getMinutes();

          // Set the total time in minutes for the component data.
          this.after_time = totalTimeInMinutes;

          const diff = this.after_time - this.previous_time;

          // sending to the api

          const timespent = {
            indicator: this.previous_indicator,
            timeSpent: diff,
            user: this.getUser.id,
          };

          this.SET_INDICATOR_TIME_SPENT(timespent);

          this.previous_time = this.after_time;

          this.previous_indicator = this.payload.indicator;

          if (this.controlIndex !== 2) {
            const availableYears = await this.getAvailableYears();
            this.SETUP_CONTROL_OPTIONS1({
              groupIndex: this.groupIndex,
              panelIndex: this.controlIndex,
              key: 'year',
              values: availableYears.sort((a, b) => {
                const extract = (str) => {
                  const match = str.match(/(\d{4})(?:\s*week\s*(\d+))?/i);
                  const year = match ? parseInt(match[1], 10) : 0;
                  const week = match && match[2] ? parseInt(match[2], 10) : null;
                  return { year, week };
                };

                const { year: yearA, week: weekA } = extract(a);
                const { year: yearB, week: weekB } = extract(b);

                if (yearA !== yearB) return yearB - yearA;

                if (weekA !== null && weekB !== null) return weekB - weekA;
                if (weekA === null) return 1;
                if (weekB === null) return -1;
                return 0;
              }),
            });
            const availableDS = await this.getDataSourcesFromIndicator(this.payload?.indicator?.id);
            console.log(availableDS, 'availableDS');

            this.SET_INDICATOR_DATASOURCES(availableDS);
            await this.SETUP_CONTROL_OPTIONS1({
              groupIndex: this.groupIndex,
              panelIndex: this.controlIndex,
              key: 'datasource',
              values: availableDS,
            });
          } 
          this.setStatesDropdown();
        }
      },
    },
    'payload.datasource': {
      async handler() {
        // new ones
        const now = new Date();
        const totalTimeInMinutes = now.getHours() * 60 + now.getMinutes();

        // Set the total time in minutes for the component data.
        this.after_time_datasource = totalTimeInMinutes;

        const diff = this.after_time_datasource - this.previous_time_datasource;

        // sending to the api

        const timespent = {
          datasource: this.previous_datasource,
          timeSpent: diff,
          user: this.getUser.id,
        };

        this.SET_DATASOURCE_TIME_SPENT(timespent);

        this.previous_time_datasource = this.after_time_datasource;

        this.previous_datasource = this.payload.datasource;
        let availableYears;
        if (this.payload.indicator) {
          if (this.controlIndex === 2) {
            availableYears = await this.setYearDropdownByDatasource(this.payload?.datasource?.id);
          } else {
            availableYears = await this.getAvailableYears();
          }
          await this.SETUP_CONTROL_OPTIONS1({
            groupIndex: this.groupIndex,
            panelIndex: this.controlIndex,
            key: 'year',
            values: availableYears.sort((a, b) => {
              const extract = (str) => {
                const match = str.match(/(\d{4})(?:\s*week\s*(\d+))?/i);
                const year = match ? parseInt(match[1], 10) : 0;
                const week = match && match[2] ? parseInt(match[2], 10) : null;
                return { year, week };
              };

              const { year: yearA, week: weekA } = extract(a);
              const { year: yearB, week: weekB } = extract(b);

              if (yearA !== yearB) return yearB - yearA;

              if (weekA !== null && weekB !== null) return weekB - weekA;
              if (weekA === null) return 1;
              if (weekB === null) return -1;
              return 0;
            }),
          });
          // ============
          if (this.controlIndex === 2) {
            const availableIndicator = await this.getAvailableDataIndicators();

            await this.SET_INDICATOR_COMPARISON_PAYLOAD({
              groupIndex: this.groupIndex,
              panelIndex: this.controlIndex,
              key: 'indicator',
              value: availableIndicator[0].indicators[0],
            });

            await this.SETUP_CONTROL_OPTIONS1({
              groupIndex: this.groupIndex,
              panelIndex: this.controlIndex,
              key: 'indicator',
              values: availableIndicator,
            });
          }
          this.setInteractions();
          this.setStatesDropdown();
        }
      },
    },
    'payload.location': {
      async handler() {
        this.setInteractions();
        if (this.payload.indicator) {
          const availableYears = await this.getAvailableYears();
          await this.SETUP_CONTROL_OPTIONS1({
            groupIndex: this.groupIndex,
            panelIndex: this.controlIndex,
            key: 'year',
            values: availableYears.sort((a, b) => {
              const extract = (str) => {
                const match = str.match(/(\d{4})(?:\s*week\s*(\d+))?/i);
                const year = match ? parseInt(match[1], 10) : 0;
                const week = match && match[2] ? parseInt(match[2], 10) : null;
                return { year, week };
              };

              const { year: yearA, week: weekA } = extract(a);
              const { year: yearB, week: weekB } = extract(b);

              if (yearA !== yearB) return yearB - yearA;

              if (weekA !== null && weekB !== null) return weekB - weekA;
              if (weekA === null) return 1;
              if (weekB === null) return -1;
              return 0;
            }),
          });
        }
      },
    },
    // 'payload.year': {
    //   async handler() {
    //     this.setInteractions();
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped></style>
