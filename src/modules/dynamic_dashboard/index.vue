<template>
  <div>
    <MSDAT
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
  <template v-slot:top-section>
<!--
        <div v-if="configObject.name === 'Demographics'">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm iframe_container">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white">Demographics</h5>
            </template>
            <template>
              <div style="text-align: center">
                <iframe :src="url" :width="width" :height="height"></iframe> -->
              <!-- </div>
              <b-embed
                type="iframe"
                aspect="21by9"
                :src="url"
                :width="width"
                :height="height"
              ></b-embed>
               <b-embed type="iframe" aspect="10by4" :src="url" allowfullscreen></b-embed> -->
            <!-- </template>
          </base-sub-card>
        </div>
      </div> --> -

            <!-- <div  v-if="configObject.name === 'Health_Workforce'">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#348481'" class="my-2 shadow-sm iframe_container">
            <template #title>
              <h5 class="font-weight-bold work-sans text-white test">Health Workforce</h5>
            </template>
            <template>
              <div style="text-align: center">
                 <iframe :src="url" :width="width" :height="height"></iframe> -->
              <!-- </div>
              <b-embed
                type="iframe"
                aspect="21by9"
                :src="url2"
                :width="width"
                :height="height"
              ></b-embed> -->
              <!-- <b-embed type="iframe" aspect="10by4" :src="url" allowfullscreen></b-embed> -->
            <!-- </template>
          </base-sub-card>
        </div>
      </div> -->
<!--
         <div  v-if="configObject.name === 'Health_Financing'">
        <div class="col-md-12">
          <base-sub-card :backgroundColor="'#17606b'" class="my-2 shadow-sm iframe_container test">
            <template class="test" #title>
              <div class="font-weight-bold work-sans text-white text-finance">
                Health Finance in Nigeria</div>
              <div class="sub-text-finance"> Source: NHA 2017 </div>
            </template>
            <template>
              <div style="text-align: center">
                 <iframe :src="url" :width="width" :height="height"></iframe> -->
              <!-- </div>
              <b-embed
                type="iframe"
                aspect="21by9"
                :src="url3"
                :width="width"
                :height="height"
              ></b-embed> -->
              <!-- <b-embed type="iframe" aspect="10by4" :src="url" allowfullscreen></b-embed> -->
            <!-- </template>
          </base-sub-card>
        </div>
      </div> -->
  </template>
    </MSDAT>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import instance from '@/modules/msdat-dashboard/views/dashboard/instance.vue';
import config from './config/dashboard_config';

export default {
  name: 'DynamicDashboard',
  components: {
    MSDAT: instance,
  },
  data() {
    return {
      dashboardConfig: config,
      configObject: {}, // This should be an Object initially
      // url: 'https://public.tableau.com/views/UpdatedDemographic1/Story?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url: 'https://public.tableau.com/views/UpdatedDemographic1/DemographicDashboard?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url2: 'https://public.tableau.com/views/HealthWorkforceworkingdocument_16472664254450/Dashboard1?:language=en-GB&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url3: 'https://public.tableau.com/views/Financedashboard_16472462810160/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
  },
  created() {
    // this.CLEAR_CONTROL_PANEL();
    const { name } = this.$route.params;
    // this.$route.meta.title = 'Hello World From Route';
    this.configObject = this.dashboardConfig.find((item) => item.name === name);
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

.text-finance{
  font-size: 25px;
  text-align: center;
}

.sub-text-finance{
  color: white;
  font-size: 15px;
  text-align: left;
  font-weight: 100;
}

</style>
