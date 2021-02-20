<template>
  <div>
    <div class="holder pb-3">
      <!--tabs here -->
      <div class="d-flex border-b mt-3">
        <p
          @click="activetab = 1"
          :class="[activetab === 1 ? 'active' : '']"
          class="cursor-pointer tab-link"
        >
          Indicator Overview
        </p>

        <p
          @click="activetab = 2"
          :class="[activetab === 2 ? 'active' : '']"
          class="cursor-pointer tab-link"
        >
          Zonal Analysis
        </p>

        <p
          @click="activetab = 3"
          :class="[activetab === 3 ? 'active' : '']"
          class="text-dark cursor-pointer tab-link"
        >
          Indicator Comparison
        </p>

        <p
          @click="activetab = 4"
          :class="[activetab === 4 ? 'active' : '']"
          class="text-dark cursor-pointer tab-link"
        >
          Dataset Comparison
        </p>

        <p
          @click="activetab = 5"
          :class="[activetab === 5 ? 'active' : '']"
          class="text-dark cursor-pointer tab-link"
        >
          Multi-source indicator Comparison
        </p>
      </div>

      <!--Contents here -->
      <div class="mt-1">

          <indicatorOverview v-if="activetab == 1" />
          <zonalAnalysis v-if="activetab ==2"/>
          <indicatorComparison v-if="activetab ==3"/>
          <datasetComparison v-if="activetab ==4"/>
      </div>
    </div>
  </div>
</template>

<script>
import indicatorOverview from '../panels/indicator-overview.vue';
import zonalAnalysis from '../panels/zonal-analysis.vue';
import indicatorComparison from '../panels/indicator-comparison.vue';
import datasetComparison from '../panels/dataset-comparison.vue';

export default {
  data() {
    return {
      activetab: 1,
    };
  },

  components: {
    indicatorOverview,
    zonalAnalysis,
    indicatorComparison,
    datasetComparison,
  },
};
</script>

<style scoped>
.holder {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #0000000d;
  border: 3px solid #326f9226;
  border-radius: 5px;
  padding: 0px 80px;
  font-family: "Work Sans", sans-serif;
}

.tab-link.active {
  border-bottom: 4px solid #2b5d5b;
  border-radius: 2px 2px 0px 0px;
  color: #2b5d5b;
  font-weight: 700;
}

.tab-link {
  padding: 10px 40px;
  font-size: 0.875rem;
  color: #515151;
  font-weight: 500;
  border-bottom: 2px solid #ebebeb;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
