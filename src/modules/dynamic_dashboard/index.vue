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
    >
    </MSDAT>
        <advanceMSDAT
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
    >
        </advanceMSDAT>
            <ClearDBModal style="z-index: 1500" v-if="showClearDataModal" />
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
// import apiServices from '@/modules/DataLayer/services/ApiServices';
import moment from 'moment';
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';
import advanceInstance from '@/modules/msdat-dashboard/views/dashboard/instance-advanced.vue';
import config from './config/dashboard_config';
import ClearDBModal from './ClearDBModal.vue';

export default {
  name: 'DynamicDashboard',
  components: {
    MSDAT: instance,
    advanceMSDAT: advanceInstance,
    ClearDBModal,
  },
  data() {
    return {
      isAdvanced: false,
      dashboardConfig: config,
      configObject: {}, // This should be an Object initially
      // url: 'https://public.tableau.com/views/UpdatedDemographic1/Story?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url: 'https://public.tableau.com/views/UpdatedDemographic1/DemographicDashboard?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url2: 'https://public.tableau.com/views/HealthWorkforceworkingdocument_16472664254450/Dashboard1?:language=en-GB&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url3: 'https://public.tableau.com/views/Financedashboard_16472462810160/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
      showClearDataModal: false,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
    async clearData() {
      const lastDate = localStorage.getItem('dataTimestamp');
      if (lastDate) {
        const lastDateMoment = moment(lastDate);
        const now = moment();
        const diff = now.diff(lastDateMoment, 'days');
        // eslint-disable-next-line no-restricted-globals
        if (diff === 10) {
          this.showClearDataModal = true;
          // await this.$store.dispatch('DL/CLEAR_DB');
        }
      }
      Promise.resolve(false);
    },
  },
  async mounted() {
    this.clearData();
  },
  async created() {
    // this.CLEAR_CONTROL_PANEL();
    const { name } = this.$route.params;
    // this.$route.meta.title = 'Hello World From Route';
    try {
      // const response = await apiServices.getDashboard();
      // const { results } = response.data;
      // this.configObject = results.find((item) => item.name === name);
      // if (this.configObject === undefined) {
      this.configObject = this.dashboardConfig.find((item) => item.name === name);
      // }
    } catch {
      this.configObject = this.dashboardConfig.find((item) => item.name === name);
    }
    // this.configObject = this.dashboardConfig.find((item) => item.name === name);
    // if (this.configObject === undefined) {
    //   this.$router.push('/*');
    // }
    if (this.configObject.title) {
      this.$route.meta.title = this.configObject.title;
    }
    if (this.configObject.name === 'Advanced_Analytics') {
      this.isAdvanced = true;
    //   this.ADD_CONTROL_PANEL(configObj);
    // }
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
.text-finance {
  font-size: 25px;
  text-align: center;
}
.sub-text-finance {
  color: white;
  font-size: 15px;
  text-align: left;
  font-weight: 100;
}
</style>
