<template>
  <div>
    <div v-if="showComing" class="show-coming">
      <div class="coming-soon-text">Scorecard section is coming soon....</div>
      <img src="../../../../../assets/svg/chart2.svg" alt="" class="svg1" />
    </div>

    <div class="d-flex justify-content-center paddingLeft" v-if="title === 'Demographics'">
      <div class="heading">

      </div>
      <b-embed type="iframe" aspect="21by9" :src="url" :width="width" :height="height"></b-embed>
    </div>
    <div class="d-flex justify-content-center paddingLeft" v-if="title === 'Health_Outcomes_and_Service_Coverage'">
      <div class="heading">

      </div>
      <b-embed type="iframe" aspect="21by9" :src="url2" :width="width" :height="height"></b-embed>
    </div>
    <div class="d-flex justify-content-center paddingLeft" v-if="title === 'Health_Facility'">
      <div class="heading">

      </div>
      <b-embed type="iframe" aspect="21by9" :src="url3" :width="width" :height="height"></b-embed>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ScorecardSection',
  data() {
    return {
      title: '',
      url: 'https://public.tableau.com/views/MSDATDemographicDashboardScorecard/Dashboard?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',
      url2: 'https://public.tableau.com/views/UPDATEDHEALTHOUTCOMESSCORECARD/SCORECARD?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',
      url3: 'https://public.tableau.com/views/HF_scorecard/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',

      height: '400',
      width: '100%',
      showComing: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),
  },
  created() {
    this.title = this.$route.params.name;
    if (
      this.title === 'Demographics'
    || this.title === 'Health_Outcomes_and_Service_Coverage'
    || this.title === 'Health_Facility'
    ) {
      this.showComing = false;
    }
  },
};
</script>

<style scoped>
.paddingLeft {
   padding: 1rem;
}
.heading {
  margin: 10px;
}
.show-coming {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg1 {
  width: 400px;
}
.coming-soon-text {
  font-size: 15px;
  font-weight: 500;
  margin: 30px;
}
</style>
