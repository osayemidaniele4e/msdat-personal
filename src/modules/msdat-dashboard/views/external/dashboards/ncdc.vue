<template>
  <div>
    <the-header ref="theHeader" />
    <div class="main d-flex flex-column">
      <br />
      <!-- <span>
          <b-icon-info-circle-fill />
      Dashboard developed by NCDC to show the outbreak of diseases across states in Nigeria from 2006 - 2021.
    </span> -->
      <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm base pb-2">
        <template #title>
          <h5 class="font-weight-bold work-sans text-white">National Disease Outbreak Dashboard</h5>
        </template>
        <div class="container pl-5">
          <b-embed type="iframe" aspect="16by9" :src="url" :width="width" :height="height"></b-embed>
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
  name: 'NCDC',
  components: {
    theHeader,
    theFooter,
  },
  // https://public.tableau.com/views/NationalDiseaseDashboardNCDC2022/Dashboard1?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link
  data() {
    return {
      title: '',
      configObject: {}, // This should be an Object initially
      url: 'https://public.tableau.com/views/NationalDiseaseDashboardNCDC2022/Dashboard1?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '70%',
      height: '600',
      showComing: true,
    };
  },
};
</script>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.base {
  height: auto;
  width: 70vw;
}
.heading {
  margin: 10px;
}
</style>
