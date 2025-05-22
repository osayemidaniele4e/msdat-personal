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
                :allow-empty="true"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="true"
                @select="limitSelection"
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
              <button class="triangulate-btn-2" @click="triangulate">
                <div v-if="showLoader" class="spinner-border text-light mx-3" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                Triangulate
              </button>
            </div>
          </div>
        </div>
        <div class="px-4 row d-flex py-3 justify-content-between d_height position-relative">
          <div class="col-4">
            <div class="card-1 relative-position">
              <div class="w-100 header py-2 d-flex justify-content-center">
                <h3>Results</h3>
              </div>
              <div @click="toggleExpand()" class="py-2">
                <img class="expand-icon" src="@/assets/Expand.png" alt="" />
              </div>
              <div class="row h-100">
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      {{
                        `Data source consistency result: When compared with ${
                          headerSource[0]
                        } the degree of data source consistency of ${headerSource[1]} ${
                          headerSource[2] ? `+ ${headerSource[2]}` : ''
                        }  is ${getStatus(consistencyScore)} at (${consistencyScore}%)`
                      }}
                    </h5>
                  </div>

                  <div class="progress-container">
                    <div class="circular-progress">
                      <svg>
                        <circle cx="85" cy="85" r="75"></circle>
                        <!-- Increased cx, cy, and r -->
                        <circle
                          cx="85"
                          cy="85"
                          r="75"
                          :style="circleStyle(consistencyScore)"
                        ></circle>
                        <!-- Increased cx, cy, and r -->
                      </svg>
                      <div class="progress-value">{{ consistencyScore }}%</div>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-center mb-3">
                    <h4 class="text-center title">
                      Degree of Data Source Consistency
                      <b-icon-info-circle-fill
                        v-tooltip="
                          'This refers to the degree to which different data sources provide similar or aligned information over time and across datasets. Consistent data sources should show comparable trends and values for the same indicators, despite being collected using different methodologies.'
                        "
                        class="data-source-info mx-0"
                        font-scale="1"
                      />
                    </h4>
                    <h4 class="text-center desc2 px-5 mb-3">
                      How well different datasources agree or match wih each other.
                    </h4>
                  </div>
                </div>
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      {{
                        `Data source complementarity: The degree to which ${headerSource[1]} ${
                          headerSource[2] ? `and ${headerSource[2]} ` : ''
                        } complements  ${headerSource[0]}   as a data source is ${getStatus(
                          complementarityScore
                        )} at (${complementarityScore}%)`
                      }}
                    </h5>
                  </div>

                  <div class="progress-container">
                    <div class="circular-progress">
                      <svg>
                        <circle cx="85" cy="85" r="75"></circle>

                        <circle
                          cx="85"
                          cy="85"
                          r="75"
                          :style="circleStyle(complementarityScore)"
                        ></circle>
                      </svg>
                      <div class="progress-value">{{ complementarityScore }}%</div>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-center mb-3">
                    <h4 class="text-center title">
                      Degree of Data Source Complementarity
                      <b-icon-info-circle-fill
                        v-tooltip="
                          'This refers to the ability of different data sources to provide additional or supporting information that, when combined, offers a more comprehensive view of a subject. This enhances decision-making by integrating multiple perspectives from different data collection methods.'
                        "
                        class="data-source-info mx-0"
                        font-scale="1"
                      />
                    </h4>
                    <h4 class="text-center desc2 px-3">
                      How different datasources work together to provide a complete picture.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-2 d-flex">
              <div class="border-right-2">0 - 20 - Very Low</div>
              <div class="border-right-2">21 - 40 - Low</div>
              <div class="border-right-2">41 - 60 - moderate</div>
              <div class="border-right-2">61 - 80 - High</div>
              <div class="border-right-3">81 - 100 - Very High</div>
            </div>
          </div>
          <div class="col-8 d-flex px-0 results_height flex-column border">
            <div
              class="py-2 d-flex justify-content-center align-items-center header_bg w-100 border-bottom"
            >
              <h4>Breakdown Results</h4>
            </div>

            <div class="table-container">
              <table>
                <thead>
                  <th style="width: 25%">SCORING METRICS</th>
                  <th
                    v-for="(source, index) in sources"
                    :key="'header-' + index"
                    style="width: 13%"
                  >
                    {{ formatString(source) }}
                  </th>
                  <th>Score</th>
                </thead>
                <tr class="section-header">
                  <td style="width: 25%">Degree of Data Source Consistency</td>
                  <!-- <td class="score">{{ consistencyScore }}%</td> -->
                  <td v-for="(source, index) in sources" :key="'consistency-header-' + index"></td>
                  <td style="width: 10%">
                    <div class="" :style="`--percentage: ${consistencyScore};`">
                      <span>{{ consistencyScore }} %</span>
                    </div>
                  </td>
                </tr>
                <tr v-for="(grade, index) in gradedData.consistency" :key="'consistency-' + index">
                  <td>{{ normalizeText(grade.metric) }}</td>
                  <td
                    v-for="(source, index) in sources"
                    :key="'consistency-' + source + '-' + index"
                  >
                    {{ grade.values[source]?.score }} -
                    {{
                      typeof grade.values[source]?.description === 'object'
                        ? grade.values[source]?.description.short
                        : grade.values[source]?.scale || grade.values[source]?.description
                    }}
                  </td>
                  <td></td>
                </tr>
                <tr class="section-header">
                  <td>Degree of Data Source Complementarity</td>
                  <!-- <td class="score">{{ complementarityScore }}%</td> -->
                  <td
                    v-for="(source, index) in sources"
                    :key="'complementarity-header-' + index"
                  ></td>
                  <td>
                    <div class="circle-progress" :style="`--percentage: ${complementarityScore};`">
                      <span>{{ complementarityScore }} %</span>
                    </div>
                  </td>
                </tr>
                <tr
                  v-for="(grade, index) in gradedData.complementarity"
                  :key="'complementarity-' + index"
                >
                  <td>{{ normalizeText(grade.metric) }}</td>
                  <td
                    v-for="(source, index) in sources"
                    :key="'complementarity-' + source + '-' + index"
                  >
                    {{ grade.values[source]?.score }} -
                    {{
                      typeof grade.values[source]?.description === 'object'
                        ? grade.values[source]?.description.short
                        : grade.values[source]?.scale || grade.values[source]?.description
                    }}
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="py-2 d-flex justify-content-center mt-4">
              <div class="border-right-2">1 - Poor</div>
              <div class="border-right-2">2 - Fair</div>
              <div class="border-right-2">3 - moderate</div>
              <div class="border-right-2">4 - Good</div>
              <div class="border-right-3">5 - Excellent</div>
            </div>
          </div>
          <div v-if="showExpand" class="absolute-position-2">
            <div class="modal-wrapper relative-position">
              <div class="results-header">Results</div>
              <div class="absolute-position pt-5 py-2">
                <img @click="toggleExpand" class="expand-icon" src="@/assets/close.png" alt="" />
              </div>
              <div class="row h-100">
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-5">
                    <h5 class="text-center desc w-75">
                      {{
                        `Data source consistency result: When compared with ${
                          headerSource[0]
                        } the degree of data source consistency of ${headerSource[1]} ${
                          headerSource[2] ? `+ ${headerSource[2]}` : ''
                        }  is ${getStatus(consistencyScore)} at (${consistencyScore}%)`
                      }}
                    </h5>
                  </div>

                  <div class="progress-container">
                    <div class="circular-progress-2">
                      <svg>
                        <circle cx="90" cy="90" r="80"></circle>
                        <!-- Increased cx, cy, and r -->
                        <circle
                          cx="90"
                          cy="90"
                          r="80"
                          :style="circleStyle(consistencyScore)"
                        ></circle>
                        <!-- Increased cx, cy, and r -->
                      </svg>
                      <div class="progress-value-2">{{ consistencyScore }}%</div>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-center mt-5">
                    <h4 class="text-center title">
                      Degree of Data Source Consistency
                      <b-icon-info-circle-fill
                        v-tooltip="
                          'This refers to the degree to which different data sources provide similar or aligned information over time and across datasets. Consistent data sources should show comparable trends and values for the same indicators, despite being collected using different methodologies.'
                        "
                        class="data-source-info mx-0"
                        font-scale="1"
                      />
                    </h4>
                    <h4 class="text-center desc2 px-5 mb-3">
                      How well different datasources agree or match wih each other.
                    </h4>
                  </div>
                </div>
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      {{
                        `Data source complementarity: The degree to which ${headerSource[1]} ${
                          headerSource[2] ? `and ${headerSource[2]} ` : ''
                        } complements  ${headerSource[0]}   as a data source is ${getStatus(
                          complementarityScore
                        )} at (${complementarityScore}%)`
                      }}
                    </h5>
                  </div>

                  <div class="progress-container">
                    <div class="circular-progress-2">
                      <svg>
                        <circle cx="90" cy="90" r="80"></circle>

                        <circle
                          cx="90"
                          cy="90"
                          r="80"
                          :style="circleStyle(complementarityScore)"
                        ></circle>
                      </svg>
                      <div class="progress-value-2">{{ complementarityScore }}%</div>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-center mt-4">
                    <h4 class="text-center title">
                      Degree of Data Source Complementarity
                      <b-icon-info-circle-fill
                        v-tooltip="
                          'This refers to the ability of different data sources to provide additional or supporting information that, when combined, offers a more comprehensive view of a subject. This enhances decision-making by integrating multiple perspectives from different data collection methods.'
                        "
                        class="data-source-info mx-0"
                        font-scale="1"
                      />
                    </h4>
                    <h4 class="text-center desc2 px-3">
                      How different datasources work together to provide a complete picture.
                    </h4>
                  </div>
                </div>
              </div>
              <div class="py-2 d-flex w-100 justify-content-center">
                <div class="px-2 border-right-4">0 - 20 - None</div>
                <div class="px-2 border-right-4">21 - 40 - Low</div>
                <div class="px-2 border-right-4">41 - 60 - Moderate</div>
                <div class="px-2 border-right-4">61 - 80 - Significant</div>
                <div class="px-2 border-right-4x">81 - 100 - Very Significant</div>
              </div>
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
          Select a 'Primary Data Source' and additional 'Data Source(s) to be Compared'.
        </h2>
        <p class="info-action-desc w-50">
          Note: Selecting an 'Indicator' and a 'Location' is optional to filter down the results.
        </p>
        <!-- <pre>{{ allIndicators }}</pre> -->
        <div class="mt-5 w-75">
          <div
            v-if="allIndicators.length && allDatasources.length && locations.length"
            class="row d-flex"
          >
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
                :allow-empty="true"
                selectLabel=""
                data-visted="notVisited"
                deselectLabel=""
                autocomplete="off"
                :multiple="true"
                @select="limitSelection"
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
          <div v-else class="w-100 d-flex flex-column align-items-center  ">
            <div  class="spinner-border fs-4 text-success mx-3 mb-2" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <h4>Please wait while Datasources, Indicators and Locations data load</h4>
          </div>

        </div>
        <div class="col-1 d-flex justify-content-center align-items-end">
          <button class="triangulate-btn" @click="triangulate">
            <div v-if="showLoader" class="spinner-border text-light mx-3" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            Triangulate
          </button>
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
      sources: [], // Will be populated dynamically from API response
      consistencyScore: 0,
      complementarityScore: 0,
      gradedData: {
        consistency: [],
        complementarity: [],
      },
      rawData: [], // Holds API response
      headers: [],
      showLoader: false,
      position: {},
      headerSource: [],
      showExpand: false,
    };
  },

  methods: {
    async getAllDataSource() {
      const { data } = await apiServices.fetchAllDataSources();
      this.allDatasources = data.results;
    },

    toggleExpand() {
      this.showExpand = !this.showExpand;
    },
    async getAllIndicators() {
      const { data } = await apiServices.fetchAllIndicators();
      const tempList = data.results;
      const blankIndicator = {
        id: undefined,
        full_name: 'None',
        program_area: 'RMNCH',
      };
      tempList.unshift(blankIndicator);
      const formattedData = groupIndicator(tempList, 'program_area');
      this.allIndicators = formattedData;
      // this.allDatasources = data.results;
    },
    async getAllLocations() {
      const { data } = await apiServices.fetchAllLocation();
      this.locations = data.results;
      const blankLocation = {
        id: undefined,
        name: 'None',
      };
      this.locations.unshift(blankLocation);
    },
    removeUndefined(obj = {}) {
      return Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(obj).filter(([_, value]) => value !== undefined),
      );
    },

    getStatus(value) {
      if (value >= 81) return 'Very High';
      if (value >= 61) return 'High';
      if (value >= 41) return 'Moderate';
      if (value >= 21) return 'Low';
      return 'Very Low';
    },

    limitSelection() {
      if (this.dataSourcesCompare.length > 2) {
        // Set your limit here
        this.dataSourcesCompare.pop(); // Remove the last selected item
      }
      // this.dataSourcesCompare = selected;
    },

    cleanObject(obj) {
      return Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(obj).filter(([_, value]) => value != null),
      );
    },

    triangulate() {
      const {
        primaryDataSource, dataSourcesCompare, selectedIndicator, selectedLocation,
      } = this;

      // Construct object with possible undefined/null values
      const obj = {
        primary: primaryDataSource?.id,
        secondary: dataSourcesCompare?.[0]?.id,
        optional: dataSourcesCompare?.[1]?.id,
        selectedIndicator: selectedIndicator?.id,
        selectedLocation: selectedLocation?.id,
      };

      const cleanObj = this.removeUndefined(obj);
      // Remove null and undefined values
      if (cleanObj.primary === undefined || cleanObj.secondary === undefined) {
        this.$swal({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 5000,
          icon: 'error',
          title: 'Empty Parameters',
          text: 'Please select a primary and secondary data source',
        });
        return;
      }

      this.showLoader = true; // Show loading spinner

      apiServices
        .getTriangulation(cleanObj)
        .then(({ data }) => {
          const positionTemp = {
            primary: this.primaryDataSource.datasource,
            secondary: this.dataSourcesCompare.datasource,
            optional: this.dataSourcesCompare?.datasource,
          };

          this.position = this.cleanObject(positionTemp);
          this.showTriangulation = true;
          this.rawData = data.data; // Store API response
          this.processData(data.data);
          this.headers = data.data
            .flatMap((objItem) => {
              if (objItem.aggregate) {
                // Extract headers from all aggregate objects
                return objItem.aggregate.flatMap((agg) => Object.keys(agg));
              }
              return Object.keys(objItem);
            })
            .filter(
              (header, index, self) => header
                && header !== 'null'
                && header !== 'undefined'
                && self.indexOf(header) === index,
            ); // Remove duplicates and invalid headers
          this.showLoader = false; // Show loading spinner
        })
        .catch((error) => {
          const msg = error.response.data.message;
          this.$swal(`error : ${msg}`);
          this.showLoader = false; // Hide loading spinner
        });
    },

    normalizeText(text) {
      return text.replace(/_/g, ' ');
    },
    removeUnderscoreItems(arr) {
      return arr.filter((item) => !item.includes('_'));
    },

    processData(data = []) {
      if (!Array.isArray(data) || data.length === 0) {
        return {
          complementarityScore: 0,
          consistencyScore: 0,
          gradedData: {
            consistency: [],
            complementarity: [],
          },
        };
      }

      const position = {
        primary: 'world bank',
        secondary: 'MICS',
        optional: 'NPC',
      };

      this.sources = data.flatMap((entry) => {
        if (entry.aggregate) {
          return entry.aggregate.map((agg) => Object.keys(agg)[0]); // Get aggregate sources
        }
        return Object.keys(entry);
      });
      this.headerSource = this.removeUnderscoreItems(this.sources);

      const consistency = {};
      const complementarity = {};
      let consistencySum = 0;
      let complementaritySum = 0;
      let sourceCount = 0;
      const allMetrics = new Set();

      data.forEach((entry) => {
        if (entry.aggregate) {
          entry.aggregate.forEach((aggEntry) => {
            const aggSource = Object.keys(aggEntry)[0];
            const aggData = aggEntry[aggSource];

            // Process complementarity (excluding score)
            Object.entries(aggData.complementarity).forEach(([key, value]) => {
              allMetrics.add(key);
              if (!complementarity[key]) {
                complementarity[key] = { metric: key, values: {} };
              }
              complementarity[key].values[aggSource] = value;
            });

            // Process consistency (excluding score)
            Object.entries(aggData.consistency).forEach(([key, value]) => {
              allMetrics.add(key);
              if (!consistency[key]) {
                consistency[key] = { metric: key, values: {} };
              }
              consistency[key].values[aggSource] = value;
            });
          });
        } else {
          const source = Object.keys(entry)[0];
          const sourceData = entry[source];

          if (sourceData?.complementarity?.score && sourceData?.consistency?.score) {
            complementaritySum += Number(sourceData.complementarity.score) || 0;
            consistencySum += Number(sourceData.consistency.score) || 0;
            sourceCount++;

            Object.entries(sourceData.complementarity.grades).forEach(([key, value]) => {
              allMetrics.add(key);
              if (!complementarity[key]) {
                complementarity[key] = { metric: key, values: {} };
              }
              complementarity[key].values[source] = value;
            });

            Object.entries(sourceData.consistency.grades).forEach(([key, value]) => {
              allMetrics.add(key);
              if (!consistency[key]) {
                consistency[key] = { metric: key, values: {} };
              }
              consistency[key].values[source] = value;
            });
          }
        }
      });

      // Ensure values are ordered according to the position mapping
      function reorderValues(dataObject) {
        return Object.values(dataObject).map((entry) => {
          const orderedValues = {};
          const otherSources = [];

          // Arrange values based on position mapping
          // eslint-disable-next-line no-unused-vars
          Object.entries(position).forEach(([_, source]) => {
            orderedValues[source] = entry.values[source] || null;
          });

          // Add any remaining sources that are not in the predefined order
          Object.keys(entry.values).forEach((source) => {
            if (!Object.values(position).includes(source)) {
              otherSources.push(source);
            }
          });

          // Append other sources
          otherSources.forEach((source) => {
            orderedValues[source] = entry.values[source];
          });

          return { metric: entry.metric, values: orderedValues };
        });
      }

      const result = {
        complementarityScore: sourceCount ? (complementaritySum / sourceCount).toFixed(1) : '0',
        consistencyScore: sourceCount ? (consistencySum / sourceCount).toFixed(1) : '0',
        gradedData: {
          consistency: reorderValues(consistency),
          complementarity: reorderValues(complementarity),
        },
      };

      this.complementarityScore = result.complementarityScore;
      this.consistencyScore = result.consistencyScore;
      this.gradedData = result.gradedData;

      return result;
    },

    formatString(input) {
      return input.includes('_') ? `${input.replace(/_/g, ' ')} aggregate` : input;
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
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.section-height {
  height: 90vh;
}

.expand-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 9999;
  position: absolute;
  right: 10px;
}

.expand-icon-2 {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.relative-position {
  position: relative;
  cursor: pointer;
}

.absolute-position {
  position: absolute;
  right: 10px;
}

.absolute-position-2 {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  // right: 200px;
  top: 100px;
}
.modal-wrapper {
  background-color: white;
  z-index: 9999;
  height: 550px;
  width: 60%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.results-header {
  background-color: #dff3f3;
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: #171717;
  padding: 5px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  background: #348481;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.triangulate-btn-2 {
  padding: 10px 30px;
  gap: 0px;
  border-radius: 4px;
  background: #348481;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
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

.circular-progress-2 {
  position: relative;
  width: 200px; /* Increased size */
  height: 200px; /* Increased size */
}

.circular-progress-2 svg {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circular-progress-2 circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 25; /* Adjust thickness */
  stroke-linecap: round;
  transform: translate(10px, 10px); /* Adjust to center */
  stroke: #cff8f8;
}

.circular-progress-2 circle:nth-child(2) {
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
  font-size: 20px; /* Adjust font size for larger circle */
  font-weight: bold;
  color: #2b7a78;
  line-height: 1;
}
.progress-value-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px; /* Adjust font size for larger circle */
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
  font-size: 12px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.desc2 {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: #221f1f;
}

.header_bg {
  background-color: #dff3f3;
}
.metrics_width {
  width: 35%;
  border-left: 1px solid #c4b7b7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.output_width {
  width: 15%;
  border-left: 1px solid #c4b7b7;
  border-right: 1px solid #c4b7b7;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.analysis_width {
  width: 50%;
  border-right: 1px solid #c4b7b7;
  display: flex;
}

.border_left {
  border-left: 1px solid #c4b7b7;
}
.table-container {
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead {
  position: sticky;
  top: 0;
  background-color: white; /* Ensure header is visible */
  z-index: 10;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
}
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
  text-transform: capitalize;
}
th {
  background-color: #dfe9eb;
}
.section-header {
  background-color: #eef7f9;
  font-weight: bold;
}
.score {
  font-weight: bold;
  color: #007b8f;
}
.legend {
  margin-top: 10px;
  font-size: 14px;
}

.d_height {
  height: 77vh;
}

.results_height {
  height: 100%;
  overflow-y: scroll;
}

span.multiselect__single {
  font-size: 24px !important;
}

.border-right-2 {
  border-right: 2px solid #a8a2a2;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
}
.border-right-4 {
  border-right: 2px solid #a8a2a2;
  font-size: 12px;
  font-weight: 500;
}
.border-right-4x {
  font-size: 12px;
  font-weight: 500;
}
.border-right-3 {
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
}

.data-source-info {
  cursor: pointer;
  color: #348481 !important;
  font-size: 18px;
}
</style>
