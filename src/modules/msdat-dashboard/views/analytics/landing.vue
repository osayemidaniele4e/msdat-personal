<template>
  <section>
    <Header v-on:tour="runIntro"></Header>
    <b-row style="position: relative">
      <img class="bg" src="@/assets/img/analytics/bkg.png" alt="path background">
      <div class="top-section">
        <div class="d-flex flex-column align-items-center">
          <h1>The Advanced Analytics Dashboard</h1>
          <span>MultiSource Data Analytics & Triangulation Platform</span>
        </div>
        <small>
          The essence of health data is to ensure that decision-makers have the means to make informed decisions
          and policies for healthcare. Take advantage of the advance analytic tools to gain valuable insights and
          shape the future of healthcare. Explore key health indicators, analyze trends, and harness the power of
          predictive modeling to anticipate future health trends.
        </small>
      </div>
    </b-row>
    <b-container class="d-flex flex-column align-items-center mb-3">
      <span class="mb-3">Select a dashboard to start</span>
      <b-row cols="2" cols-md="4" cols-lg="4" class="w-100">
        <b-col v-for="(section, index) in sections" :key="index" class="d-flex flex-column align-items-center">
          <router-link :to="`/dashboard/Advanced_Analytics?index=${index}`"><img class="section" :src="imgsrc(section)" :alt="section"></router-link>
          <small style="font-size: 0.6rem; font-weight: 600" class="py-2">{{ section }}</small>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

import Header from '../about/layout/theHeader.vue';
import tour from '../onboarding/tour';

import DescriptiveAnalysisConfig from '../../components/sections/advanced/descriptive-section/descriptive-section-config';
import CorrelationAnalysisConfig from '../../components/sections/advanced/correlation-section/correlation-section-config';
import PredictiveAnalysisConfig from '../../components/sections/advanced/predictive-section/predictive-section-config';
import AdvancedMultiSourceConfig from '../../components/sections/advanced/multisource-section/Multisource-section-config';

export default {
  name: 'Landing',
  mixins: [tour],
  components: {
    Header,
  },
  data() {
    return {
      sections: [
        'Correlation Analysis',
        'Descriptive Analysis',
        // 'Indicator Comparison',
        'Predictive Analysis',
        'Multi-source Indicator Comparison',
        // 'Scatter Plot Analysis',
      ],
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),

    imgsrc(sec) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/img/analytics/${sec}.png`);
    },
    async created() {
      await this.CLEAR_CONTROL_PANEL();

      this.ADD_CONTROL_PANEL(CorrelationAnalysisConfig);
      this.ADD_CONTROL_PANEL(DescriptiveAnalysisConfig);
      this.ADD_CONTROL_PANEL(PredictiveAnalysisConfig);
      this.ADD_CONTROL_PANEL(AdvancedMultiSourceConfig);
    },
  },
};
</script>

<style scoped>
  .top-section {
    position: absolute;
    left: 0; top: 0;
    padding: 6%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%; width: 100vw;
  }
  .top-section h1 {
    color: #348481;
    font-weight: bold;
    text-align: center;
  }
  .top-section span {
    font-weight: 700;
    font-size: 1.1rem;
    text-align: center;
  }
  .top-section small {
    text-align: center;
    padding: 0 8.5%;
    user-select: none;
  }
  .bg {
    height: 59vh;
    width: 61vw
  }
  .section {
    width: 10rem;
    box-shadow: 0.1px 0.1px 1px #888888;
  }
  .section:hover {
    transition: transform 0.2s ease;
    transform: scale(1.05);
  }
  @media (max-width: 575.98px) {
    h1 {
      font-size: 2rem
    }
    .bg {
      height: 70vh;
      width: 63vw
    }
  }
</style>
