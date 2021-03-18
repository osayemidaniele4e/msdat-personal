<template>
  <div class="ml-2">
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
        <!--Zone Map Indicator here -->
        <p
          @click="activeIndicator = 1"
          class="filter-tab d-flex px-1"
          :class="{ active: activeIndicator == 1 }"
        >
          Zones Map
          <span class="ml-1"
            ><i
              ><svg
                class="indicator-svg"
                :class="{ activeSvg: activeIndicator == 1 }"
                xmlns="http://www.w3.org/2000/svg"
                width="11.466"
                height="16.381"
                viewBox="0 0 11.466 16.381"
              >
                <path
                  id="ic_place_24px"
                  d="M10.733,2A5.729,5.729,0,0,0,5,7.733c0,4.3,5.733,10.647,
                  5.733,10.647s5.733-6.347,5.733-10.647A5.729,5.729,0,0,0,
                  10.733,2Zm0,7.781a2.048,2.048,0,1,1,2.048-2.048A2.048,
                  2.048,0,0,1,10.733,9.781Z"
                  transform="translate(-5 -2)"
                  fill=""
                /></svg></i
          ></span>
        </p>

        <!--States Map Indicator here -->
        <p
          @click="activeIndicator = 2"
          class="filter-tab middle d-flex px-1"
          :class="{ active: activeIndicator == 2 }"
        >
          States Map
          <span class="ml-1"
            ><i
              ><svg
                class="indicator-svg"
                :class="{ activeSvg: activeIndicator == 2 }"
                xmlns="http://www.w3.org/2000/svg"
                width="11.466"
                height="16.381"
                viewBox="0 0 11.466 16.381"
              >
                <path
                  id="ic_place_24px"
                  d="M10.733,2A5.729,5.729,0,0,0,5,7.733c0,4.3,5.733,10.647,
                  5.733,10.647s5.733-6.347,5.733-10.647A5.729,5.729,0,0,0,10.733,
                  2Zm0,7.781a2.048,2.048,0,1,1,2.048-2.048A2.048,2.048,0,0,1,10.733,9.781Z"
                  transform="translate(-5 -2)"
                  fill=""
                /></svg></i
          ></span>
        </p>

        <!--Line Indicator here -->
        <p
          @click="activeIndicator = 3"
          class="filter-tab middle d-flex px-3"
          :class="{ active: activeIndicator == 3 }"
        >
          Line
          <span class="ml-1"
            ><i
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="indicator-svg"
                :class="{ activeSvg: activeIndicator == 3 }"
                width="24.025"
                height="13.104"
                viewBox="0 0 24.025 13.104"
              >
                <path
                  id="ic_timeline_24px"
                  d="M25.025,8.184a2.19,2.19,0,0,1-2.184,2.184,1.856,1.856,0,0,
                  1-.557-.076L18.4,14.168a1.929,1.929,0,0,1,.076.568,2.184,
                  2.184,0,0,1-4.368,0,1.929,1.929,0,0,1,.076-.568L11.4,
                  11.384a2.147,2.147,0,0,1-1.136,0l-4.969,4.98a1.856,1.856,0,0,
                  1,.076.557,2.184,2.184,0,1,1-2.184-2.184,1.856,1.856,0,0,1,
                  .557.076l4.98-4.969a1.929,1.929,0,0,1-.076-.568,2.184,2.184,
                  0,0,1,4.368,0,1.929,1.929,0,0,1-.076.568l2.785,2.785a2.147,2.147,
                  0,0,1,1.136,0l3.877-3.888a1.856,1.856,0,0,1-.076-.557,
                  2.184,2.184,0,1,1,4.368,0Z"
                  transform="translate(-1 -6)"
                  fill=""
                /></svg></i
          ></span>
        </p>

        <!--Column Indicator here -->
        <p
          @click="activeIndicator = 4"
          class="filter-tab end d-flex px-3"
          :class="{ active: activeIndicator == 4 }"
        >
          Column
          <span class="ml-1"
            ><i
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="indicator-svg"
                :class="{ activeSvg: activeIndicator == 3 }"
                id="Group_1628"
                data-name="Group 1628"
                width="17.161"
                height="16.381"
                viewBox="0 0 17.161 16.381"
              >
                <g
                  id="Rectangle_2190"
                  data-name="Rectangle 2190"
                  transform="translate(0 7.02)"
                  fill=""
                  stroke=""
                  class="indicator-svg"
                  :class="{ activeSvg: activeIndicator == 4 }"
                  stroke-width="1"
                >
                  <rect width="4.68" height="9.36" rx="1" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="3.68"
                    height="8.36"
                    rx="0.5"
                    fill="none"
                  />
                </g>
                <g
                  id="Rectangle_2191"
                  data-name="Rectangle 2191"
                  transform="translate(6.24)"
                  fill=""
                  stroke=""
                  class="indicator-svg"
                  :class="{ activeSvg: activeIndicator == 4 }"
                  stroke-width="1"
                >
                  <rect width="4.68" height="16.381" rx="1" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="3.68"
                    height="15.381"
                    rx="0.5"
                    fill="none"
                  />
                </g>
                <g
                  id="Rectangle_2192"
                  data-name="Rectangle 2192"
                  transform="translate(12.48 4.68)"
                  fill=""
                  stroke=""
                  class="indicator-svg"
                  :class="{ activeSvg: activeIndicator == 4 }"
                  stroke-width="1"
                >
                  <rect width="4.68" height="11.7" rx="1" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="3.68"
                    height="10.7"
                    rx="0.5"
                    fill="none"
                  />
                </g></svg></i
          ></span>
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
.indicator-svg {
  fill: #348481;
  height: 0.725rem;
}
.activeSvg {
  fill: white;
}
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
