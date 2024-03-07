<template>
  <section>
    <Header v-on:tour="runIntro"></Header>
    <b-row style="position: relative">
      <img class="bg" src="@/assets/img/analytics/bkg.png" alt="path background">
      <div class="top-section">
        <div class="d-flex flex-column align-items-center">
          <h1>The Advanced Analytics Dashboard</h1>
        </div>
        <small>
          Explore Key Health Indicators, Analyse Trends and Harness the Power of Predictive Modeling to Anticipate Future Health Trends
        </small>
      </div>
    </b-row>
    <div class="btm-section d-flex flex-column align-items-center mb-3 px-5">
      <span class="mb-3">Select a Section to Start</span>
      <b-row cols="1" cols-md="2" cols-xl="3">
        <b-col v-for="(section, index) in sections" :key="index" class="d-flex flex-column align-items-center mb-4">
          <router-link :to="`/dashboard/Advanced_Analytics?index=${index}`" :id="section.id">
            <img class="section" :src="imgsrc(section.title)" :alt="section.title">
          </router-link>
          <router-link :to="`/dashboard/Advanced_Analytics?index=${index}`">
            <small style="font-size: 1.1rem; font-weight: 500" class="py-2">{{ section.title }}</small>
          </router-link>
        </b-col>
      </b-row>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

import Header from '../about/layout/theHeader.vue';
import tour from '../onboarding/tour';

import DescriptiveAnalysisConfig from '../../components/sections/advanced/descriptive-section/descriptive-section-config';
import CorrelationAnalysisConfig from '../../components/sections/advanced/correlation-section/correlation-section-config';
import IndicatorComparisonConfig from '../../components/sections/advanced/indicator-comparison-section/indicator-comparison-section-config';
import PredictiveAnalysisConfig from '../../components/sections/advanced/predictive-section/predictive-section-config';
import AdvancedMultiSourceConfig from '../../components/sections/advanced/multisource-section/Multisource-section-config';
import ScatterplotConfig from '../../components/sections/advanced/scatterplot-section/scatterplot-section-config';

export default {
  name: 'Landing',
  mixins: [tour],
  components: {
    Header,
  },
  data() {
    return {
      sections: [
        {
          title: 'Correlation Analysis',
          id: 'CorrelationAnalysis',
        },
        {
          title: 'Descriptive Analysis',
          id: 'DescriptiveAnalysis',
        },
        {
          title: 'Indicator Comparison',
          id: 'IndicatorComparison',
        },
        {
          title: 'Predictive Analysis',
          id: 'PredictiveAnalysis',
        },
        {
          title: 'Multi-source Indicator Comparison',
          id: 'Multi-source Indicator Comparison',
        },
        {
          title: 'Scatter Plot Analysis',
          id: 'ScatterPlotAnalysis',
        },
      ],
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['ADD_CONTROL_PANEL', 'CLEAR_CONTROL_PANEL']),

    imgsrc(sec) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/img/analytics/${sec}.png`);
    },
  },
  async created() {
    await this.CLEAR_CONTROL_PANEL();

    this.ADD_CONTROL_PANEL(CorrelationAnalysisConfig);
    this.ADD_CONTROL_PANEL(DescriptiveAnalysisConfig);
    this.ADD_CONTROL_PANEL(IndicatorComparisonConfig);
    this.ADD_CONTROL_PANEL(PredictiveAnalysisConfig);
    this.ADD_CONTROL_PANEL(AdvancedMultiSourceConfig);
    this.ADD_CONTROL_PANEL(ScatterplotConfig);
  },
};
</script>

<style scoped>
  section {
    height: 100%;
    width: 100vw;
    overflow: hidden;

  }
  .top-section {
    position: absolute;
    left: 0; top: 0;
    padding:4% 18%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  .top-section h1 {
    color: #348481;
    font-weight: bold;
    text-align: center;
    font-size: 37px;
  }
.btm-section {
    position: absolute;
    top: 50%;
    /* bottom: 0;
    left: 0; */
    padding: 0 10%;
    width: 100%;
  }
  .btm-section span{
    font-weight: 500;
    font-size: 1.2rem;
  }
.btm-section small{
  color: black;
}

  .top-section small {
    text-align: center;
    padding-top: 10px;
    user-select: none;
    font-size: 22px;
    font-weight: 400;
  }
  .bg {
    height: 59vh;
    width: 56vw
  }
  .section {
    width: 20rem;
    height: 9rem;
    box-shadow: 0.1px 0.1px 1px #888888;
    border-radius: 8px;
  }
  .section:hover {
    transition: transform 0.5s ease;
    transform: scale(1.05);
  }
  @media (max-width: 991.98px) {
    .top-section {
      padding: 3% 10%;
    }

    .bg {
      height: 70vh;
      width: 63vw;
    }

    .section {
      width: 100%;
    }
  }

  @media (max-width: 575.98px) {
    .top-section h1 {
      font-size: 2rem;
    }

    .bg {
      height: 80vh;
      width: 80vw;
    }
  }
</style>
