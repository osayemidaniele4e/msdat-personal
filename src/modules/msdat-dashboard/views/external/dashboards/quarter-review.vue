<template>
  <div>
    <the-header ref="theHeader" />
    <div class="main d-flex flex-column">
      <div class="py-3" style="display: flex">
        <h4>Welcome To the Quarterly Performance Assessment Dashboard</h4>
      </div>
      <div class="tab-container">
        <div
          class="tab"
          :class="{ active: currentTab === 'Dashboard' }"
          @click="setTab('Dashboard')"
        >
          Dashboard
        </div>
        <div
          class="tab"
          :class="{ active: currentTab === 'Score Card' }"
          @click="setTab('Score Card')"
        >
          Score Card
        </div>
      </div>
      <br />
      <base-sub-card :backgroundColor="'header'" class="shadow-sm base">
        <template #title>
          <h5 class="font-weight-bold work-sans text-white">
            {{ currentTitle }}
          </h5>
        </template>

        <div class="tab-content">
          <div v-if="currentTab === 'Dashboard'">
            <b-embed
              type="iframe"
              aspect="21by9"
              :src="url1"
              :width="width"
              :height="height"
            ></b-embed>
          </div>
          <div v-if="currentTab === 'Score Card'">
            <b-embed
              type="iframe"
              aspect="21by9"
              :src="url2"
              :width="width"
              :height="height"
            ></b-embed>
          </div>
        </div>
      </base-sub-card>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'QuarterReview',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      currentTab: 'Dashboard',
      url1: 'https://public.tableau.com/views/FMOHImproved/Dashboard1?:language=en-US&:embed=y&:sid=&:redirect=auth&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',
      url2: 'https://public.tableau.com/views/MSDATindicatorsscorecard/Dashboard1?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
      showComing: true,
      currentTitle: 'Quarterly Performance Assessment',
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
