<template>
 <div>
   <the-header ref="theHeader" />

   <div class="main d-flex flex-column">
     <br />

     <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm base">
       <template #title>
         <h5 class="font-weight-bold work-sans text-white">
          Quarterly Performance Assessment
         </h5>
       </template>

       <div class="dashboard-link-container">
         <b-embed type="iframe" aspect="21by9" :src="url" :width="width" :height="height"></b-embed>
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
      title: '',
      configObject: {}, // This should be an Object initially
      url: 'https://public.tableau.com/views/MSDATindicatorsforFMOH/Dashboard1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
      width: '100%',
      height: '400',
      showComing: true,
    };
  },
  methods: {
    openInNewTab(url) {
      // Open the URL in a new tab
      window.open(url, '_blank');
    },
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
 padding:0px 20px;
 margin-bottom: 40px;
}
.base h5 {
  font-size: 14px;
}
.dashboard-link-container{
  margin: 30px 0px 20px 20px;
}
.base {
 height: 100%;
 width: 100%;
}
.heading {
 margin: 10px;
}

</style>
