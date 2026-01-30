<template>
  <div>
    <the-header ref="theHeader" />
    <div class="d-flex justify-content-center">
      <div class="tab-content">
        <div class="d-flex justify-content-center paddingLeft" v-if="currentTab === 'Dashboard'">
          <b-embed
            type="iframe"
            aspect="21by9"
            :src="url1"
            :width="width"
            :height="height"
          ></b-embed>
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'HealthFacilityDashboard',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      currentTab: 'Dashboard',
      url1: 'https://public.tableau.com/views/HEALTHFACILITIESDASHBOARD/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
      showComing: true,
      currentTitle: 'State Health Facility (GIS)',
    };
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
      this.currentTitle = tab;
    },
  },
};
</script>

<style scoped>
.paddingLeft {
    padding-left: 7rem;
}
.main {
  display: flex;
  /* justify-content: center;
    align-items: center; */
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  margin-bottom: 40px;
}
.base h5 {
  font-size: 14px;
}
/* .dashboard-link-container {
    margin: 30px 0px 20px 20px;
  } */
.base {
  height: 100%;
  width: 100%;
}
.heading {
  margin: 10px;
}

.tab-container {
  display: flex;
  justify-content: flex-start;
  margin: 7px 0px;
  width: 100%;
  padding-top: 5px;
  border-bottom: 0.5px solid #007d53;
}

.tab {
  /* flex: 1; */
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #007d53;
  background-color: #ffffff;
  width: 200px;
}

.tab.active {
  background-color: #007d53;
  color: #fff;
}

.tab + .tab {
  margin-left: 10px;
}

.tab-content {
  width: 100%;
  padding: 7px;
}
</style>
