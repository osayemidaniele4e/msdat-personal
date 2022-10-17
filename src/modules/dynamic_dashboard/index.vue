<template>
  <div>
    <MSDAT
      v-show="!isAdvanced"
      v-if="Object.entries(configObject).length"
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
      v-show="isAdvanced"
      v-if="Object.entries(configObject).length"
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
import apiServices from '@/modules/DataLayer/services/ApiServices';
import moment from 'moment';
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
      },
      showClearDataModal: false,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
    /**
     * @function clearData
     * @author davebenard
     * @description clear cache data after 10days
     * @return Boolean
     */
    async clearData() {
      const lastDate = localStorage.getItem('dataTimestamp');
      if (lastDate) {
        const lastDateMoment = moment(lastDate);
        const now = moment();
        const diff = now.diff(lastDateMoment, 'days');
        if (diff === 10) {
          this.showClearDataModal = true;
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
    /**
     * @description CUSTOM-DASHBOARD
     * @description reformat selected data into msdat config structure
     * @author chisom.chima
     */
    if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === true) {
      this.isCustom = true;
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
      this.dashboardConfig.push({
        name: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        title: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        indicators: ids,
        defaultIndicators: [7, 6, 5],
        dataSources: sourcesID,
        initialIndicator: ids[0],
        initialDataSource: sourcesID[0],
        initialLocation: 1,
      });

      this.configObject = this.dashboardConfig.find((item) => item.name === name);
    }

    /**
     * @description Msdat Api-Config for Dashboard
     * @description get dashboard config based on route name from the msdat api
     * @author sami56
     */
    try {
      const response = await apiServices.getDashboard();
      const { results } = response.data;
      const dashboard = results.find((item) => item.name === name);
      if (dashboard === undefined) {
        this.$router.push('/*');
        return;
      }
      this.configObject = dashboard;
    } catch (err) {
      console.log(err,
        '%c 👋🏽, Welcome to MSDAT!, An error occurred on the Dashboard Instance, \n\n \r\r',
        'color: #ccc; font-family:sans-serif; font-size: 1rem; padding-left: 1rem');
    }
    // set the title from the config as the route title
    if (this.configObject.title) {
      this.$route.meta.title = this.configObject.title;
    }
    // update the advanced analytics props by config object
    if (this.configObject.name === 'Advanced_Analytics') {
      this.isAdvanced = true;
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
