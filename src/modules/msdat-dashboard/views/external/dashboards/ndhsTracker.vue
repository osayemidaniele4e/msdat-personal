<template>
  <div>
    <the-header ref="theHeader" />
    <div class="d-flex justify-content-center pl-5">
      <iframe
        width="100%"
        height="850vh"
        :src="url1"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        style="border: none; max-width: 100%; max-height: 100vh"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        msallowfullscreen
      >
      </iframe>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'NDHSTracker',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      // currentTab: 'Dashboard',
      url1: 'https://public.tableau.com/views/NDHSdashboardmain/NDHS?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link&publish=yes&:display_count=n&:showVizHome=no&:embed=true',
      // url2: 'https://public.tableau.com/views/MSDATindicatorsscorecard/Dashboard1?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true', https://public.tableau.com/views/HSUquarterlydashboard/MAIN?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link
      height: '400',
      showComing: true,
      currentTitle: 'NDHS Tracker Dashboard',
    };
  },
  methods: {
    // setTab(tab) {
    //   this.currentTab = tab;
    //   this.currentTitle = tab;
    // },
  },
};
</script>

<style scoped></style>
