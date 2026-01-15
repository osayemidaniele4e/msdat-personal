<template>
 <div class="section-container">
   <the-header ref="theHeader" />
     <div class="tab-container">
       <div
         v-for="section in sections"
         :key="section.title"
         class="tab"
         :class="{ active: currentTab === section.title }"
         @click="setTab(section.title)"
       >
         {{ section.title}}
       </div>
     </div>
     <!-- <br /> -->
     <div class="tab-content">
       <div :style="{ width: width }">
         <b-embed
           type="iframe"
           :src="sections.find((section) => section.title === currentTab).url"
           :width="width"
           :height="height"
         ></b-embed>
       </div>
     </div>
   <the-footer />
 </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

const sections = [
  {
    title: 'Presidential Bond Indicators',
    url: 'https://public.tableau.com/views/PRESIDENTIALBONDINDICATORSSCORECARD/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    width: '1200px',
  },
  {
    title: 'Compact Swap Indicators',
    url: 'https://public.tableau.com/views/COMPACTSWAPINDICATORSDASHBOARD/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
    width: '1050px',
  },

];

export default {
  name: 'presidentBondScorecard',
  props: {
    title: {
      type: String,
      default: 'President Bond Scorecard',
    },
  },
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      currentTab: sections[0].title,
      sections,
    };
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
      this.width = sections.find((section) => section.title === tab).width || '100%';
    },
  },
};
</script>

<style scoped>
/* .section-container {
 height: calc(100vh - 35px);
 overflow-y: clip;
} */
.main {
 display: flex;
 /* justify-content: center;
 align-items: center; */
 width: 100%;
 padding: 10px 40px;
 margin-top: 20px;
 margin-bottom: 40px;
}

.tab-container {
 display: flex;
 justify-content: flex-start;
 margin: 7px 0px;
 width: 100%;
 padding: 20px 20px 0px;
 border-bottom: 0.5px solid #007d53;
}
.tab {
 /* flex: 1; */
 padding: 10px 20px;
 text-align: center;
 cursor: pointer;
 border: 1px solid #007d53;
 background-color: #ffffff;
 min-width: 200px;
}

.tab.active {
 background-color: #007d53;
 color: #fff;
}

.tab + .tab {
 margin-left: 20px;
}

.tab-content {
 width: 100%;
 height: max-content;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 padding-left: 5px;
 padding-bottom: 40px;
}
</style>
