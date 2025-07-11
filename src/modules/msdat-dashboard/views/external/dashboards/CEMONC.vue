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
        {{ section.title }}
      </div>
    </div>

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
    title: 'Modules 1-5',
    url: 'https://public.tableau.com/views/CEmONC_PHC/Overview?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&:origin=viz_share_link:showVizHome=no&:embed=true',
    width: '90%',
    heroTitle: 'CEmONC Dashboard - Modules 1-5',
    heroDescription: 'Welcome to the CEmONC Dashboard. This is work in progress, and is actively updated. All feedback are appreciated.',
  },
  {
    title: 'Modules 7-10',
    url: 'https://public.tableau.com/views/CEmONC_Competency/Overview?:language=en-US&:embed=y&:sid=&:redirect=auth&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link:showVizHome=no&:embed=true',
    width: '90%',
    heroTitle: 'CEmONC Dashboard - Modules 7-10',
    heroDescription: 'Welcome to the CEmONC Dashboard. This is work in progress, and is actively updated. All feedback are appreciated.',
  },
];

export default {
  name: 'CEMONC',
  props: {
    title: {
      type: String,
      default: 'CEmONC Dashboard',
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
      width: sections[0].width,
      height: '800px',
    };
  },
  computed: {
    currentHeroTitle() {
      const currentSection = this.sections.find((section) => section.title === this.currentTab);
      return currentSection ? currentSection.heroTitle : '';
    },
    currentHeroDescription() {
      const currentSection = this.sections.find((section) => section.title === this.currentTab);
      return currentSection ? currentSection.heroDescription : '';
    },
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
      const currentSection = this.sections.find((sec) => sec.title === tab);
      this.width = currentSection ? currentSection.width : '100%';
    },
  },
};
</script>

<style scoped>
.section-container {
  min-height: calc(100vh - 35px);
}

.hero-section {
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007d53;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.main {
  display: flex;
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
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #007d53;
  background-color: #ffffff;
  min-width: 200px;
  transition: all 0.3s ease;
}

.tab.active {
  background-color: #007d53;
  color: #fff;
}

.tab:hover {
  background-color: #005d3d;
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
  margin-top: 20px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .tab-container {
    flex-direction: column;
    align-items: center;
  }

  .tab + .tab {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
