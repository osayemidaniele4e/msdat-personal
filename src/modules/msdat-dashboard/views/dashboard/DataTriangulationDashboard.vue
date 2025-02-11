<template>
  <section class="bg-secondary">
    <Header />
    <div class="w-100 bg-secondary d-flex justify-content-center align-items-center">
      <div v-if="showTriangulation" class="w-100">
        <div class="bg-white w-100">
          <div class="row pl-4 py-4">
            <div class="col-2">
              <label>Primary Datasource</label>
              <multiselect
                v-model="primaryDataSource"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                :options="allDatasources"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
              >
              </multiselect>
            </div>
            <div class="col-3">
              <label>Datasource(s) to be Compared</label>
              <multiselect
                v-model="dataSourcesCompare"
                track-by="datasource"
                label="datasource"
                placeholder="Select one or Two"
                :options="allDatasources"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="true"
              >
              </multiselect>
            </div>
            <div class="col-3">
              <label>Indicator (Optional)</label>
              <multiselect
                v-model="selectedIndicator"
                track-by="full_name"
                label="full_name"
                placeholder="Select one"
                :options="allIndicators"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
                group-values="indicators"
                group-label="program_area"
              >
              </multiselect>
            </div>
            <div class="col-2">
              <label>Location (Optional)</label>
              <multiselect
                v-model="selectedLocation"
                placeholder="Select one"
                :options="locations"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
                track-by="name"
                label="name"
              >
              </multiselect>
            </div>
            <div class="col-1 d-flex justify-content-center align-items-end">
              <button class="triangulate-btn-2" @click="triangulate">Triangulate</button>
            </div>
          </div>
        </div>
        <div class="px-4 row d-flex py-3 justify-content-between">
          <div class="col-4">
            <div class="card-1">
              <div class="w-100 header py-2 d-flex justify-content-center">
                <h3>Results</h3>
              </div>
              <div class="row h-100">
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex flex-column align-items-center">
                    <h4 class="text-center title">Degree of Data Source Consistency</h4>
                    <p class="text-center my-2 sub-title w-75">
                      How well different data sources agree or match with each other.
                    </p>
                  </div>
                  <div class="progress-container">
                    <div class="circular-progress">
                      <svg>
                        <circle cx="75" cy="75" r="65"></circle>
                        <!-- Increased cx, cy, and r -->
                        <circle cx="75" cy="75" r="65" :style="circleStyle(progress)"></circle>
                        <!-- Increased cx, cy, and r -->
                      </svg>
                      <div class="progress-value">{{ progress }}%</div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      When compared with WHO, the extent to which NDHS + MICS provides matches is
                      80%
                    </h5>
                  </div>
                </div>
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex flex-column align-items-center">
                    <h4 class="text-center title">Degree of Data Source Complimentary</h4>
                    <p class="text-center sub-title my-2 w-75">
                      How well different data sources agree or match with each other.
                    </p>
                  </div>
                  <div class="progress-container">
                    <div class="circular-progress">
                      <svg>
                        <circle cx="75" cy="75" r="65"></circle>
                        <!-- Increased cx, cy, and r -->
                        <circle
                          cx="75"
                          cy="75"
                          r="65"
                          :style="circleStyle(complimentaryProgress)"
                        ></circle>
                        <!-- Increased cx, cy, and r -->
                      </svg>
                      <div class="progress-value">{{ complimentaryProgress }}%</div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      When compared with WHO, the extent to which NDHS + MICS provides matches is
                      80%
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8 d-flex border justify-content-center w-100 align-items-center">
            <div class="d-flex flex-column align-items-center">
              <h1>Coming Soon</h1>
              <h3>Awaiting PYweb Team</h3>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="w-100 d-flex flex-column align-items-center justify-content-center section-height-2"
      >
        <h1 class="into-title">Data Source Triangulation Dashboard</h1>
        <p class="info-desc w-75">
          Data triangulation is a way of looking at information from different sources to get a more
          accurate and complete picture.
        </p>
        <h2 class="info-action mt-5">
          Select a ‘Primary Data Source’ and additional ‘Data Source(s) to be Compared’.
        </h2>
        <p class="info-action-desc w-50">
          Note: Selecting an ‘Indicator’ and a ‘Location’ is optional to filter down the results.
        </p>
        <div class="mt-5 w-75">
          <div class="row d-flex">
            <div class="col-2">
              <label>Primary Datasource</label>
              <multiselect
                v-model="primaryDataSource"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                :options="allDatasources"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
              >
              </multiselect>
            </div>
            <div class="col-4">
              <label>Datasource(s) to be Compared</label>
              <multiselect
                v-model="dataSourcesCompare"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                :options="allDatasources"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="true"
              >
              </multiselect>
            </div>
            <div class="col-4">
              <label>Indicator (Optional)</label>
              <multiselect
                v-model="selectedIndicator"
                track-by="full_name"
                label="full_name"
                placeholder="Select one"
                :options="allIndicators"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
                group-values="indicators"
                group-label="program_area"
              >
              </multiselect>
            </div>
            <div class="col-2">
              <label>Location (Optional)</label>
              <multiselect
                v-model="selectedLocation"
                placeholder="Select one"
                :options="locations"
                :searchable="false"
                :allow-empty="false"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="false"
                track-by="name"
                label="name"
              >
              </multiselect>
            </div>
          </div>
        </div>
        <div class="col-1 d-flex justify-content-center align-items-end">
          <button class="triangulate-btn" @click="triangulate">Triangulate</button>
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';
import { groupIndicator } from '@/util/helper';
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import controlSetup from '../../mixins/control-panel-setup';

export default {
  mixins: [controlSetup],
  components: {
    Header,
    Footer,
  },

  data() {
    return {
      allDatasources: [],
      primaryDataSource: null,
      dataSourcesCompare: [],
      selectedIndicator: null,
      selectedLocation: null,
      allIndicators: [],
      locations: [],
      showTriangulation: false,
      progress: 100,
      complimentaryProgress: 77,
    };
  },
  methods: {
    async getAllDataSource() {
      const { data } = await apiServices.fetchAllDataSources();
      console.log(data.results, 'HENRY');
      this.allDatasources = data.results;
    },
    async getAllIndicators() {
      const { data } = await apiServices.fetchAllIndicators();
      // console.log(data.results, 'HENRY');
      //   this.allIndicators = this.setAllIndicatorDropdown(data.results);
      const formattedData = groupIndicator(data.results, 'program_area');
      this.allIndicators = formattedData;
      // console.log(this.allIndicators, 'HENRY 2');
      // this.allDatasources = data.results;
    },
    async getAllLocations() {
      const { data } = await apiServices.fetchAllLocation();
      this.locations = data.results;
    },

    triangulate() {
      this.showTriangulation = true;
    },
    circleStyle(progress) {
      const radius = 65;
      const circumference = 2 * Math.PI * radius; // Adjusted for new radius
      const offset = circumference - (progress / 100) * circumference;
      return {
        strokeDasharray: `${circumference}px`,
        strokeDashoffset: `${offset}px`,
      };
    },
  },
  created() {
    this.getAllDataSource();
    this.getAllIndicators();
    this.getAllLocations();
  },
  // computed: {
  //   circleStyle() {
  //     const circumference = 2 * Math.PI * 65; // Adjusted circumference for the new radius
  //     const offset = circumference - (this.progress / 100) * circumference;
  //     return {
  //       strokeDasharray: `${circumference}px`,
  //       strokeDashoffset: `${offset}px`,
  //     };
  //   },
  // },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.section-height {
  height: 90vh;
}
.section-height-2 {
  height: 90vh;
}
.into-title {
  font-family: DM Sans;
  font-size: 48px;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
  color: #348481;
}
.info-desc {
  font-family: DM Sans;
  font-size: 28px;
  font-weight: 400;
  line-height: 44px;
  text-align: center;
  color: #212529;
}
.info-action {
  font-family: DM Sans;
  font-size: 28px;
  font-weight: 500;
  line-height: 48px;
  text-align: center;
  color: #348481;
}

.info-action-desc {
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 400;
  line-height: 48px;
  text-align: center;
  color: #212529cc;
}

.triangulate-btn {
  padding: 10px 40px;
  gap: 0px;
  border-radius: 4px;
  opacity: 0px;
  background: #348481;
  color: white;
  border: none;
}

.triangulate-btn-2 {
  padding: 10px 30px;
  gap: 0px;
  border-radius: 4px;
  opacity: 0px;
  background: #348481;
  color: white;
  border: none;
}
.card-radius {
  border-radius: 1ch;
  overflow: hidden;
}

.result-bg {
  background-color: #dff3f3;
  overflow: hidden;
}
.result-1 h2 {
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.result-1 h3 {
  font-family: Inter;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  text-align: center;
}
.control-panel {
  height: fit-content;
}
.card-1 {
  height: 700px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #c4b7b7;
  overflow: hidden;
}
.card-1 .header {
  background-color: #dff3f3;
}

.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-top: -30px;
}

.circular-progress {
  position: relative;
  width: 200px; /* Increased size */
  height: 200px; /* Increased size */
}

.circular-progress svg {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circular-progress circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 20; /* Adjust thickness */
  stroke-linecap: round;
  transform: translate(10px, 10px); /* Adjust to center */
  stroke: #cff8f8;
}

.circular-progress circle:nth-child(2) {
  stroke-dasharray: 409px; /* Adjusted for larger size */
  stroke-dashoffset: 0px;
  stroke: #2b7a78;
  transition: stroke-dashoffset 0.5s ease;
}

.progress-value {
  position: absolute;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
  font-size: 32px; /* Adjust font size for larger circle */
  font-weight: bold;
  color: #2b7a78;
  line-height: 1;
}
.title {
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: #171717;
}
.sub-title {
  font-family: Inter;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.desc {
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #000000;
}
</style>
