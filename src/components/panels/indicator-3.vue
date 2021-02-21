<template>
  <div class="mx-4">
    <!-- Indicator1 here -->
    <div class="d-flex flex-column w-30">
      <label class="panel-label">INDICATOR 1</label>

      <div>
        <multiselect
          v-model="payload.indicator"
          :options="indicatorOptions"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- filter-tab here -->
    <div class="mt-2">
      <label class="panel-label">Select Visualization</label>
      <div class="d-flex">
        <p
          @click="activeIndicator = 1"
          class="filter-tab d-flex px-1"
          :class="{ active: activeIndicator == 1 }"
        >
          Zones Map <span class="ml-1">i</span>
        </p>
        <p
          @click="activeIndicator = 2"
          class="filter-tab middle d-flex px-1"
          :class="{ active: activeIndicator == 2 }"
        >
          States Map <span class="ml-1">i</span>
        </p>
        <p
          @click="activeIndicator = 3"
          class="filter-tab middle d-flex px-3"
          :class="{ active: activeIndicator == 3 }"
        >
          Line <span class="ml-1">i</span>
        </p>
        <p
          @click="activeIndicator = 4"
          class="filter-tab end d-flex px-3"
          :class="{ active: activeIndicator == 4 }"
        >
          Column <span class="ml-1">i</span>
        </p>
      </div>
    </div>

    <div class="d-flex">
      <!-- data sources here -->
      <div class="d-flex flex-column w-20">
        <label class="panel-label">data sources</label>

        <div>
          <multiselect
            v-model="payload.dataSource"
            :options="dataSources"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :preselect-first="true"
          ></multiselect>
        </div>
      </div>

      <!-- year here -->
      <div class="d-flex flex-column w-20 ml-3">
        <label class="panel-label"> year</label>

        <div>
          <multiselect
            v-model="payload.year"
            :options="yearOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :preselect-first="true"
          ></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  data() {
    return {
      activeIndicator: 1,
      payload: {
        indicator: '',
        dataSource: '',
        year: '',
      },
      indicatorOptions: [
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ],
      dataSources: [
        'NHMIS',
        'MICS',
        'NNHS',
        'NDHS',
        'NARHS',
        'World Bank',
        'WHO-GHO',
        'WUENIC',
      ],

      yearOptions: ['2017', '2016', '2014', '2013', '2012', '2011'],
    };
  },
  components: {
    Multiselect,
  },
};
</script>

<style scoped>
.filter-tab {
  border: 1px solid #348481;
  border-radius: 5px 0px 0px 5px;
  color: #171717;
  cursor: pointer;
  font-size: 0.725rem;
  font-weight: 500;
  align-items: center;
  height: 30px;
}
.middle {
  border-radius: 0px;
}
.end {
  border-radius: 0px 5px 5px 0px;
}
.active {
  background: #348481 0% 0% no-repeat padding-box;
  color: white;
}
.w-30 {
  width: 338px;
}
.w-20 {
  width: 150px;
}
</style>
