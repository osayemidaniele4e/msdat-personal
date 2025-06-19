<template>
  <div>
    <the-header ref="theHeader" />
    <div class="d-flex justify-content-center">
      <div class="tab-content">
        <div class="d-flex justify-content-center paddingLeft" v-if="currentTab === 'Dashboard'">
          <b-embed
            type="iframe"
            aspect="16by9"
            :src="url"
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
  name: 'NCDC',
  components: {
    theHeader,
    theFooter,
  },
  // https://public.tableau.com/views/NationalDiseaseDashboardNCDC2022/Dashboard1?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link
  data() {
    return {
      currentTab: 'Dashboard',
      url: 'https://public.tableau.com/views/NationalDiseaseDashboardNCDC2022/Dashboard1?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '600',
      showComing: true,
      currentTitle: ' Disease Surveillance Dashboard (NCDC)',
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
   padding: 1rem;
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
.base {
  height: auto;
  width: 95vw;
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
