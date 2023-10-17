<template>
  <div>
    <div>
    <!-- Embed the correlation analysis and scatter plot chart here -->
      <b-embed type="iframe" aspect="21by9" :src="url" :width="width" :height="height"></b-embed>
    </div>
  </div>
</template>
<script>

export default {
  name: 'GISMultisource',
  data() {
    return {
      title: '',
      //   dashboardConfig: config,
      //   configObject: {}, // This should be an Object initially
      // url: 'https://public.tableau.com/views/UpdatedDemographic1/Story?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      url: 'http://208.87.128.190:8077/',
      width: '100%',
      height: '400',
    };
  },
};
</script>
<style scoped>

</style>
