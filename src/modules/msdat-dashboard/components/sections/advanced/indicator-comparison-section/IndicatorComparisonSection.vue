<template>
  <div>
    <div v-if="showComing" class="show-coming">
      <div class="coming-soon-text">This section is coming soon....</div>
      <img src="../../../../../../assets/svg/chart2.svg" alt="" class="svg1">
    </div>
     <!-- creating seaperate tabs for tableeu embeds
     for each sub dashboard asides 'Health Outcomes' -->
    <div v-if="title === 'Demographics'">
      <div class="heading">
        <!-- <div class="main-text">Demographics in Nigeria</div> -->
        <!-- <div class="sub-text"> Source: NHA 2017 </div> -->
      </div>
      <b-embed type="iframe" aspect="21by9" :src="url" :width="width" :height="height"></b-embed>
    </div>
    <div v-if="title === 'Health_Workforce'">
      <div class="heading">
        <!-- <div class="main-text">Health Workforce in Nigeria</div> -->
        <!-- <div class="sub-text"> Source: NHA 2017 </div> -->
      </div>
      <b-embed type="iframe" aspect="21by9" :src="url2" :width="width" :height="height"></b-embed>
    </div>
    <div v-if="title === 'Health_Financing'">
      <div class="heading">
        <!-- <div class="main-text">Health Finance in Nigeria</div>
        <div class="sub-text">Source: NHA 2017</div> -->
      </div>
      <b-embed type="iframe" aspect="21by9" :src="url3" :width="width" :height="height"></b-embed>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
// import config from './config/dashboard_config';
export default {
  name: 'IndicatorComparison',
  data() {
    return {
      title: '',
      //   dashboardConfig: config,
      //   configObject: {}, // This should be an Object initially
      // url: 'https://public.tableau.com/views/UpdatedDemographic1/Story?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url: 'https://public.tableau.com/views/UpdatedDemographicDashboardVersion2_16472527584120/Dashboard3?:language=en-GB&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url2: 'https://public.tableau.com/views/HealthWorkforceworkingdocument_16472664254450/Dashboard1?:language=en-GB&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url3: 'https://public.tableau.com/views/Financedashboard_16472462810160/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
      showComing: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
  },
  created() {
    this.title = this.$route.params.name;
    if (this.title === 'Demographics' || this.title === 'Health_Workforce' || this.title === 'Health_Financing') {
      this.showComing = false;
    }
  },
};
</script>
<style scoped>
.heading {
  margin: 10px;
}
.main-text {
  font-size: 25px;
  text-align: center;
  color: black;
}
.sub-text {
  color: black;
  font-size: 15px;
  text-align: left;
  font-weight: 100;
}
.show-coming{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg1{
  width: 400px;
}
.coming-soon-text{
  font-size: 15px;
  font-weight: 500;
  margin: 30px;
}
</style>
