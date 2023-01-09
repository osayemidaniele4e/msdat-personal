<template>
  <div>
    <MSDAT
      v-if="Object.entries(configObject).length > 0 && isAdvanced === false && loading === false"
      :indicators="configObject.indicators"
      :dataSources="configObject.dataSources"
      :defaultIndicators="configObject.defaultIndicators"
      :initialIndicator="configObject.initialIndicator"
      :initialDataSource="configObject.initialDataSource"
      :initialLocation="configObject.initialLocation"
      :showTableRelatedIndicator="
        configObject.showTableRelatedIndicator != undefined
          ? configObject.showTableRelatedIndicator
          : true
      "
    />
    <AdvanceMSDAT
      v-if="Object.entries(configObject).length > 0 && isAdvanced === true && loading === false"
      :indicators="configObject.indicators"
      :dataSources="configObject.dataSources"
      :defaultIndicators="configObject.defaultIndicators"
      :initialIndicator="configObject.initialIndicator"
      :initialDataSource="configObject.initialDataSource"
      :initialLocation="configObject.initialLocation"
      :showTableRelatedIndicator="
        configObject.showTableRelatedIndicator != undefined
          ? configObject.showTableRelatedIndicator
          : true
      "
    />
    <ClearDBModal style="z-index: 1500" v-if="showClearDataModal" />
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import VueCookies from 'vue-cookies';
import moment from 'moment';
import apiServices from '@/modules/DataLayer/services/ApiServices';
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';
import advanceInstance from '@/modules/msdat-dashboard/views/dashboard/instance-advanced.vue';
import config from './config/dashboard_config';
import ClearDBModal from './ClearDBModal.vue';

export default {
  name: 'DynamicDashboard',
  components: {
    MSDAT: instance,
    AdvanceMSDAT: advanceInstance,
    ClearDBModal,
  },
  data() {
    return {
      isAdvanced: false,
      dashboardConfig: config,
      configObject: {
        name: '',
        title: '',
        indicators: [],
        defaultIndicators: [],
        dataSources: [],
        initialIndicator: 0,
        initialDataSource: 0,
        initialLocation: 1,
        showTableRelatedIndicator: true,
      },
      showClearDataModal: false,
      loading: false,
    };
  },
  methods: {
    omo() {
      console.log('Loading ');
      alert('Loading ');
    },
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
    /**
     * @function clearData
     * @author davebenard
     * @description clear cache data after 10days
     * @return Boolean
     */
    async clearData() {
      const { data } = await apiServices.getLatestDate();
      localStorage.removeItem('lastUpdateDate'); // previous clear cache variable
      const clearedDate = localStorage.getItem('lastUpdatedDate');
      if (clearedDate === null) {
        await this.$store.dispatch('DL/CLEAR_DB'); // first clear is BY-FORCE, in order to set the date variable for subsequent comparisons
        return;
      }
      if (data.results[0].updated_at) {
        const lastDateMoment = moment(data.results[0].updated_at);
        const formattedClearedDate = moment(clearedDate);
        const diff = lastDateMoment.diff(formattedClearedDate, 'days');
        // check if api date is greater than localstorage date by 9 days
        if (diff > 9) {
          this.showClearDataModal = true; // subsequent clear is by users choice, update localstorage lastUpdatedDate variable
        }
      }
      Promise.resolve(false);
    },
  },
  async mounted() {
    this.clearData();
  },
  async created() {
    const { name } = this.$route.params;

    window.addEventListener('beforeunload', this.omo);
    /**
     * @description CUSTOM-DASHBOARD
     * @description reformat selected data into msdat config structure
     * @author chisom.chima
     */
    if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === true) {
      this.isCustom = true;
      sessionStorage.setItem('composedData', JSON.stringify(this.$store.getters.getprogramArea));
      sessionStorage.setItem('surveyArray', JSON.stringify(this.$store.getters.getDataSource));
      // * FOR Indicators
      const ids = [];
      const sourcesID = [];
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              ids.push(child.id);
            }
            return child;
          });
        }
        return element;
      });

      // * For DataSources
      this.$store.getters.getDataSource.map((element) => {
        element.children.map((child) => {
          if (child.selected === true) {
            sourcesID.push(child.id);
          }
          return child;
        });
        return element;
      });
      // * create the config object
      const formattedConfig = {
        name: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        title: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        indicators: ids,
        defaultIndicators: ids.slice(0, 3),
        dataSources: sourcesID,
        initialIndicator: ids[0],
        initialDataSource: sourcesID[0],
        initialLocation: 1,
      };
      VueCookies.set('customDashboardConfig', formattedConfig);
      const getFormattedConfig = VueCookies.get('customDashboardConfig');
      this.configObject = formattedConfig?.name === '' ? getFormattedConfig : formattedConfig;
      localStorage.setItem('lsDataSourceCount', this.configObject.dataSources.length);
      localStorage.setItem('lsIndicatorCount', this.configObject.indicators.length);
      return;
    }
    // if it is not custom dashboard for safety reasons set it to false
    localStorage.setItem('customDashboardStatus', JSON.stringify(false));
    // =======================
    /**
     * @author davebenard
     * @description check the route params if it is advanced analytics then fetch from the config file
     */
    if (name === 'Advanced_Analytics') {
      this.$store.dispatch('customDashboard', false);
      this.$store.dispatch('resetState');
      localStorage.removeItem('vuex');
      const dashboard = config.find((el) => el.name === 'Advanced_Analytics');
      if (dashboard === undefined) {
        this.$router.push('/*');
        return;
      }
      this.isAdvanced = true;
      this.configObject = '';
      this.configObject = dashboard;
      return;
    }
    // =======================
    /**
     * @description Msdat Api-Config for Dashboard
     * @description get dashboard config based on route name from the msdat api
     * @author sami56
     */
    if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === false) {
      try {
        this.loading = true;
        this.$store.dispatch('customDashboard', false);
        this.$store.dispatch('resetState');
        localStorage.removeItem('vuex');
        // ============
        const response = await apiServices.getDashboard();
        const { results } = response.data;
        const dashboard = results.find((item) => item?.name === name);
        if (dashboard === undefined) {
          this.$router.push('/*');
          return;
        }
        this.configObject = '';
        this.configObject = {
          name: dashboard.name,
          title: dashboard.title,
          indicators: dashboard.indicators,
          defaultIndicators: dashboard.defaultIndicators,
          dataSources: dashboard.dataSources,
          initialIndicator: dashboard.initialIndicator,
          initialDataSource: dashboard.initialDataSource,
          initialLocation: dashboard.initialLocation,
          showTableRelatedIndicator: dashboard.showTableRelatedIndicator,
        };
        this.isAdvanced = false;
      } catch (err) {
        console.log(
          err,
          '%c 👋🏽, Welcome to MSDAT!, An error occurred on the Dashboard Instance, \n\n \r\r',
          'color: #ccc; font-family:sans-serif; font-size: 1rem; padding-left: 1rem',
        );
      } finally {
        this.loading = false;
      }
    }
    // =======================
    // set the title from the config as the route title
    if (this.configObject.title) {
      this.$route.meta.title = this.configObject.title;
    }
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      if (to !== from) {
        window.location.reload();
      }
    },
  },
};
</script>
<style lang="scss"></style>
