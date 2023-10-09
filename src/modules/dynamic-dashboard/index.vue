<template>
  <div>
    <MSDAT
      v-if="Object.entries(configObject).length > 0 && isAdvanced === false && loading === false"
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
import moment from 'moment';
import VueCookies from 'vue-cookies';
import { mapActions, mapMutations } from 'vuex';
import apiServices from '@/modules/data-layer/services/ApiServices';
import advanceInstance from '@/modules/msdat-dashboard/views/dashboard/instance-advanced.vue';
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';
import ClearDBModal from './ClearDBModal.vue';
import config from './config/dashboard_config';
import defaultData from './defaultIndicator.json';
import defaultDiseaseSurveillanceData from './defaultDS.json';
import defaultDSyear from './defaultDSYear.json';

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
    ...mapMutations('MSDAT_STORE', [
      'ADD_CONTROL_PANEL',
      'CLEAR_CONTROL_PANEL',
      'SET_CONFIGURATIONS',
      'SET_SELECTED_CONFIG',
    ]),
    ...mapActions('AUTH_STORE', ['LOGIN_USER', 'SAVE_USER_DASHBOARD']),
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
        console.warn('Data not available for clearing');
        try {
          await this.$store.dispatch('DL/CLEAR_DB'); // first clear is BY-FORCE, in order to set the date variable for subsequent comparisons
        } catch (error) {
          console.log('an error occured in dispatching clearDb:', error);
        }
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
      return Promise.resolve(false);
    },
    async saveDashboard(indicators, sources, dashboardTitle) {
      const sections = this.fieldsArray.filter((item) => item.isShow === true).map((item) => item.name);
      if (this.$store.getters.getVisibility === 'private') {
        const payload = {
          title: dashboardTitle,
          showTableRelatedIndicator: false,
          visibility: 'private',
          user: this.getUser.id,
          initial_indicator: indicators[0],
          initial_datasource: sources[0],
          indicators,
          dataSources: sources,
          initial_location: 1,
          default_indictors: [indicators[0]],
          sections,
        };
        await this.SAVE_USER_DASHBOARD(payload);
      }

      if (this.$store.getters.getVisibility === 'public') {
        const payload = {
          title: dashboardTitle,
          showTableRelatedIndicator: false,
          visibility: 'pending',
          user: this.getUser.id,
          initial_indicator: indicators[0],
          initial_datasource: sources[0],
          indicators,
          dataSources: sources,
          initial_location: 1,
          default_indictors: [indicators[0]],
          sections,
        };
        await this.SAVE_USER_DASHBOARD(payload);
      }
    },
    // saveIndicatorToStorage(item) {
    //   localStorage.setItem('indicatorId', 7);
    // },
    // saveDataSourceToStorage(item) {
    //   localStorage.setItem('datasourceId', 6);
    // },
    // getIndicator(id){

    // }
  },
  async mounted() {
    this.clearData();
    if (this.$route.params.name === 'Health_Outcomes_and_Service_Coverage') {
      // this sets skilled attendance at birth indicator on mounted
      this.SET_SELECTED_CONFIG(defaultData);
    } else if (this.$route.params.name === 'Disease_Surveillance') {
      // this sets covid 19 confirmed cases indicator on mounted
      this.SET_SELECTED_CONFIG(defaultDiseaseSurveillanceData);
      this.SET_SELECTED_CONFIG(defaultDSyear);
    }
  },
  async created() {
    // this.saveIndicatorToStorage();
    // this.saveDataSourceToStorage();
    // const formData = {
    //   username: 'ummi',
    //   password: 'ummi',
    // };

    // const response = await this.LOGIN_USER(formData);
    // console.log(response);

    const { name } = this.$route.params;

    if (this.$store.getters.customDashboard && name === 'Health_Outcomes_and_Service_Coverage') {
      this.$store.dispatch('customDashboard', false);
      await this.$store.dispatch('DL/CLEAR_DB');
    }
    /**
     * @description CUSTOM-DASHBOARD
     * @description reformat selected data into msdat config structure
     * @author chisom.chima
     */
    if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === true) {
      // this.isCustom = true; // this variable doesn't exist
      sessionStorage.setItem('composedData', JSON.stringify(this.$store.getters.getprogramArea));
      sessionStorage.setItem('surveyArray', JSON.stringify(this.$store.getters.getDataSource));
      sessionStorage.setItem('sectionsArray', JSON.stringify(this.$store.getters.arrangedSections));
      // * FOR Indicators
      const ids = [];
      const sourcesID = [];
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              ids.push(child.id);
            }
            // console.log(child, 'ind');
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
          // console.log(child, 'dat');
          return child;
        });
        return element;
      });
      // try {
      //   const response = await apiServices.getDashboard();
      //   const results = response.data;
      //   console.log({ results })
      //   // const dashboard = results.find((item) => item?.name === name);
      // } catch (e) {
      //   console.log({ e });
      // }

      // * create the config object
      const formattedConfig = {
        name: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        title: this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name
          .replace(/\s+/g, '_')
          .toLowerCase(),
        indicators: ids,
        // sections: dashboard.sections,
        defaultIndicators: ids.slice(0, 3),
        dataSources: sourcesID,
        initialIndicator: ids[0],
        initialDataSource: sourcesID[0],
        initialLocation: 1,
      };
      this.saveDashboard(
        ids,
        sourcesID,
        this.$store.state.CUSTOM_DASHBOARD_STORE.dashboardDetails.name,
      );
      VueCookies.set('customDashboardConfig', formattedConfig);
      const getFormattedConfig = VueCookies.get('customDashboardConfig');
      this.configObject = formattedConfig?.name === '' ? getFormattedConfig : formattedConfig;
      this.SET_CONFIGURATIONS(getFormattedConfig || this.configObject); // make use of the new state implementation to avoid prop drilling
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
      this.SET_CONFIGURATIONS(dashboard);
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
        const results = response.data;
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
          sections: dashboard.sections,
          initialDataSource: dashboard.initialDataSource,
          initialLocation: dashboard.initialLocation,
          showTableRelatedIndicator: dashboard.showTableRelatedIndicator,
        };
        this.SET_CONFIGURATIONS(this.configObject);
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
    if (this.$store.state.MSDAT_STORE.configObject.title) {
      this.$route.meta.title = this.$store.state.MSDAT_STORE.configObject.title;
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

<style lang="scss">
main.main_field {
  min-height: 45vh;
  width: 100%;
}

iframe {
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px !important;
  }
}

.iframe_container {
  max-height: 450px;
  overflow-y: auto;
}
</style>
