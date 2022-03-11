<template>
  <div>
    <CustomDashboard
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
      :fields="fieldsArray"
    >
      <template v-slot:top-section v-if="configObject.name === 'Demographics'">
        <div class="col-md-12">
          <base-sub-card
            :backgroundColor="'#348481'"
            class="my-2 shadow-sm iframe_container"
          >
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">
                Demographics
              </h5>
            </template>
            <template>
              <div style="text-align: center">
                <!-- <iframe :src="url" :width="width" :height="height"></iframe> -->
              </div>
              <b-embed
                type="iframe"
                aspect="21by9"
                :src="url"
                :width="width"
                :height="height"
              ></b-embed>
              <!-- <b-embed type="iframe" aspect="10by4" :src="url" allowfullscreen></b-embed> -->
            </template>
          </base-sub-card>
        </div>
      </template>
    </CustomDashboard>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import instance from '../components/Custom-dashboard-sections/Instance.vue';
import config from '../../dynamic_dashboard/config/dashboard_config';

export default {
  name: 'DynamicDashboard',
  components: {
    CustomDashboard: instance,
  },
  data() {
    return {
      dashboardConfig: config,
      configObject: {}, // This should be an Object initially
      // url: 'https://public.tableau.com/views/UpdatedDemographic1/Story?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url: 'https://public.tableau.com/views/UpdatedDemographic1/DemographicDashboard?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
    };
  },
  computed: {
    fieldsArray() {
      return this.$store.getters.arrangedSections;
    },
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'ADD_CONTROL_PANEL',
      'CLEAR_CONTROL_PANEL',
    ]),
  },
  created() {
    // this.CLEAR_CONTROL_PANEL();
    const { title } = this.$route.params;
    // console.log('DCONFIG',this.dashboardConfig);
    // this.$route.meta.title = 'Hello World From Route';
    console.log(this.dashboardConfig);
    if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === true) {
      // FOR Indicators
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

          // console.log('ids', ids);
        }
        return element;
      });

      // For DataSources
      this.$store.getters.getDataSource.map((element) => {
        element.children.map((child) => {
          if (child.selected === true) {
            sourcesID.push(child.id);
          }
          return child;
        });
        return element;
      });
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
    }
    // console.log(this.dashboardConfig);
    this.configObject = this.dashboardConfig.find((item) => item.name === title);
    if (this.configObject === undefined) {
      this.$router.push('/*');
    }
    if (this.configObject.title) {
      this.$route.meta.title = this.configObject.title;
    }
    // if (this.configObject.name === 'Demographics') {
    //   const configObj = {
    //     label: 'Demographics',
    //     setup: [],
    //     payload: null,
    //   };
    //   this.ADD_CONTROL_PANEL(configObj);
    // }
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
