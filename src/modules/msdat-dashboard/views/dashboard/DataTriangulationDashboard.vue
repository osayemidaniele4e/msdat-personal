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
        <div class="px-4 row d-flex py-3 justify-content-between d_height">
          <div class="col-4">
            <div class="card-1">
              <div class="w-100 header py-2 d-flex justify-content-center">
                <h3>Results</h3>
              </div>
              <div class="row h-100">
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      {{
                        `When compared with ${headers[0]}, the extent to which ${headers[1]} ${
                          headers[2] === undefined ? '' : `+ ${headers[2]} `
                        } provides matches is
                     ${consistencyScore}%`
                      }}
                    </h5>
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
                          :style="circleStyle(consistencyScore)"
                        ></circle>
                        <!-- Increased cx, cy, and r -->
                      </svg>
                      <div class="progress-value">{{ consistencyScore }}</div>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-items-center mb-3">
                    <h4 class="text-center title">Degree of Data Source Consistency</h4>
                    <p class="text-center my-2 sub-title w-75">
                      How well different data sources agree or match with each other.
                    </p>
                  </div>
                </div>
                <div
                  class="col-6 py-5 d-flex flex-column align-items-center justify-content-between"
                >
                  <div class="d-flex justify-content-center pb-4">
                    <h5 class="text-center desc w-75">
                      {{
                        `When compared with ${headers[0]}, the extent to which ${headers[1]} ${
                          headers[2] === undefined ? '' : `+ ${headers[2]} `
                        }  provides matches is
                      ${complementarityScore}%`
                      }}
                    </h5>
                  </div>

                  <div class="progress-container">
                    <div class="circular-progress">
                      <svg>
                        <circle cx="75" cy="75" r="65"></circle>

                        <circle
                          cx="75"
                          cy="75"
                          r="65"
                          :style="circleStyle(complementarityScore)"
                        ></circle>
                      </svg>
                      <div class="progress-value">{{ complementarityScore }}</div>
                    </div>
                  </div>

                  <div class="d-flex flex-column align-items-center mb-3">
                    <h4 class="text-center title">Degree of Data Source Complimentary</h4>
                    <p class="text-center sub-title my-2 w-75">
                      How well different data sources work together to provide a complete picture.
                    </p>
                  </div>
                </div>
              </div>
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
                <tr>
                  <th>SCORING METRICS</th>
                  <th v-for="(source, index) in sources" :key="'header-' + index">
                    {{ formatString(source) }}
                  </th>
                  <th>Score</th>
                </tr>
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
      tempData: [
        {
          'world bank': {
            complementarity: {
              score: 93.33,
              grades: {
                years_available: {
                  score: 5,
                  scale: 'Excellent',
                },
                methodology: {
                  score: 5,
                  scale: 'Excellent',
                },
                area: {
                  score: 3,
                  scale: 'Moderate',
                },
                study_population: {
                  score: 5,
                  scale: 'Excellent',
                },
                research_design: {
                  score: 5,
                  scale: 'Excellent',
                },
                related_indicators: {
                  score: 5,
                  scale: 'Excellent',
                },
              },
            },
            consistency: {
              score: 80,
              grades: {
                variability: {
                  score: 2,
                  scale: 'Fair',
                },
                metadata_documentation_quality: {
                  score: 5,
                  scale: 'Excellent',
                },
                source_credibility: {
                  score: 5,
                  scale: 'Excellent',
                },
                uniformity_of_data: {
                  score: 4,
                  scale: 'Good',
                },
                uniformity_in_findings: {
                  score: 4,
                  scale: 'Good',
                },
              },
            },
          },
        },
        {
          MICS: {
            complementarity: {
              score: 86.67,
              grades: {
                years_available: {
                  score: 4,
                  scale: 'Good',
                },
                methodology: {
                  score: 5,
                  scale: 'Excellent',
                },
                area: {
                  score: 4,
                  scale: 'Good',
                },
                study_population: {
                  score: 4,
                  scale: 'Good',
                },
                research_design: {
                  score: 4,
                  scale: 'Good',
                },
                related_indicators: {
                  score: 5,
                  scale: 'Excellent',
                },
              },
            },
            consistency: {
              score: 88,
              grades: {
                variability: {
                  score: 4,
                  scale: 'Good',
                },
                metadata_documentation_quality: {
                  score: 5,
                  scale: 'Excellent',
                },
                source_credibility: {
                  score: 5,
                  scale: 'Excellent',
                },
                uniformity_of_data: {
                  score: 4,
                  scale: 'Good',
                },
                uniformity_in_findings: {
                  score: 4,
                  scale: 'Good',
                },
              },
            },
          },
        },
        {
          NPC: {
            complementarity: {
              score: 63.33,
              grades: {
                years_available: {
                  score: 2,
                  scale: 'Fair',
                },
                methodology: {
                  score: 3,
                  scale: 'Moderate',
                },
                area: {
                  score: 4,
                  scale: 'Good',
                },
                study_population: {
                  score: 3,
                  scale: 'Moderate',
                },
                research_design: {
                  score: 4,
                  scale: 'Good',
                },
                related_indicators: {
                  score: 3,
                  scale: 'Moderate',
                },
              },
            },
            consistency: {
              score: 56,
              grades: {
                variability: {
                  score: 2,
                  scale: 'Fair',
                },
                metadata_documentation_quality: {
                  score: 3,
                  scale: 'Moderate',
                },
                source_credibility: {
                  score: 3,
                  scale: 'Moderate',
                },
                uniformity_of_data: {
                  score: 3,
                  scale: 'Moderate',
                },
                uniformity_in_findings: {
                  score: 3,
                  scale: 'Moderate',
                },
              },
            },
          },
        },
        {
          aggregate: [
            {
              'world bank_MICS': {
                complementarity: {
                  years_available: {
                    score: 4,
                    description: 'Covers most of the relevant period but may lack the latest year.',
                  },
                  methodology: {
                    score: 5,
                    description:
                      'Well-documented and standardized methods with high reproducibility.',
                  },
                  area: {
                    score: 3,
                    description: 'National and Regional.',
                  },
                  study_population: {
                    score: 4,
                    description:
                      'Mostly aligned; minor gaps in population coverage or demographic detail.',
                  },
                  research_design: {
                    score: 4,
                    description: 'Strong design with minor limitations or gaps in documentation.',
                  },
                  related_indicators: {
                    score: 5,
                    description:
                      'Provides a broad set of complementary indicators for all program area (80-100%).',
                  },
                },
                consistency: {
                  variability: {
                    score: 3,
                    description: {
                      short: 'Data sources exhibit moderate variability.',
                      long: 'Differences are noticeable and warrant some investigation. While the overall trend may still be apparent,                    caution should be exercised when drawing precise conclusions. Further investigation is needed to verify the discrepancies.',
                    },
                  },
                  metadata_documentation_quality: {
                    score: 5,
                    description:
                      'Metadata is complete, well-documented, and well structured, with all necessary details clearly outlined.',
                  },
                  source_credibility: {
                    score: 5,
                    description:
                      'Source is highly reputable, peer-reviewed, and widely recognized; adheres to international standards.',
                  },
                  uniformity_of_data: {
                    score: 4,
                    description: 'Minor inconsistencies; mostly standardized.',
                  },
                  uniformity_in_findings: {
                    score: 4,
                    description: 'Minor discrepancies; overall alignment is strong.',
                  },
                },
              },
            },
            {
              'world bank_NPC': {
                complementarity: {
                  years_available: {
                    score: 3,
                    description: 'Covers part of the relevant period with noticeable gaps.',
                  },
                  methodology: {
                    score: 4,
                    description: 'Mostly robust with minor inconsistency.',
                  },
                  area: {
                    score: 3,
                    description: 'National and Regional.',
                  },
                  study_population: {
                    score: 4,
                    description:
                      'Mostly aligned; minor gaps in population coverage or demographic detail.',
                  },
                  research_design: {
                    score: 4,
                    description: 'Strong design with minor limitations or gaps in documentation.',
                  },
                  related_indicators: {
                    score: 4,
                    description:
                      'Provides most relevant indicators but may lack a few key ones (60-79%).',
                  },
                },
                consistency: {
                  variability: {
                    score: 2,
                    description: {
                      short: 'Data sources display considerable variability.',
                      long: 'Significant discrepancies exist that raise concerns about data quality and comparability. Careful analysis and reconciliation are required before using the data.                    Potential errors or methodological differences between sources are likely.',
                    },
                  },
                  metadata_documentation_quality: {
                    score: 4,
                    description:
                      'Metadata is mostly complete but may lack minor details or some structural clarity.',
                  },
                  source_credibility: {
                    score: 4,
                    description:
                      'Source is reputable with strong recognition but lacks peer review or full international compliance.',
                  },
                  uniformity_of_data: {
                    score: 3,
                    description: 'Noticeable inconsistencies across datasets.',
                  },
                  uniformity_in_findings: {
                    score: 3,
                    description: 'Noticeable conflicts requiring reconciliation.',
                  },
                },
              },
            },
          ],
        },
      ],
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
    removeUndefined(obj = {}) {
      return Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(obj).filter(([_, value]) => value !== undefined),
      );
    },

    limitSelection() {
      console.log(this.dataSourcesCompare, 'limitSelection');
      if (this.dataSourcesCompare.length > 2) {
        // Set your limit here
        this.dataSourcesCompare.pop(); // Remove the last selected item
      }
      // this.dataSourcesCompare = selected;
    },

    triangulate() {
      this.processData(this.tempData);
      this.headers = this.tempData
        .flatMap((objItem) => {
          if (objItem.aggregate) {
            // Extract headers from all aggregate objects
            return objItem.aggregate.flatMap((agg) => Object.keys(agg));
          }
          return Object.keys(objItem);
        })
        .filter(
          (header, index, self) => header && header !== 'null' && header !== 'undefined' && self.indexOf(header) === index,
        ); // Remove duplicates and invalid headers
      console.log(this.headers, 'Triangulation');
      this.showTriangulation = true;

      // const {
      //   primaryDataSource, dataSourcesCompare, selectedIndicator, selectedLocation,
      // } = this;

      // // Construct object with possible undefined/null values
      // const obj = {
      //   primary: primaryDataSource?.id,
      //   secondary: dataSourcesCompare?.[0]?.id,
      //   optional: dataSourcesCompare?.[1]?.id,
      //   selectedIndicator: selectedIndicator?.id,
      //   selectedLocation: selectedLocation?.id,
      // };

      // console.log(obj);
      // const cleanObj = this.removeUndefined(obj);
      // // Remove null and undefined values
      // // const cleanObj = Object.fromEntries(
      // //   // eslint-disable-next-line no-unused-vars
      // //   Object.entries(obj).filter(([_, value]) => value != null), // Filters out null and undefined
      // // );
      // if (cleanObj.primary === undefined || cleanObj.secondary === undefined) {
      //   this.$swal({
      //     toast: true,
      //     position: 'bottom',
      //     showConfirmButton: false,
      //     timer: 5000,
      //     icon: 'error',
      //     title: 'Empty Parameters',
      //     text: 'Please select a primary and secondary data source',
      //   });
      //   return;
      // }

      // console.log(cleanObj);
      // this.showLoader = true; // Show loading spinner

      // apiServices
      //   .getTriangulation(cleanObj)
      //   .then(({ data }) => {
      //     console.log(data);
      //     this.showTriangulation = true;
      //     this.rawData = data.data; // Store API response
      //     this.processData(data.data);
      //     this.headers = data.data
      //       .filter((objItem) => !Object.keys(objItem).includes('aggregate')) // Exclude 'aggregate'
      //       .flatMap((objItem) => Object.keys(objItem));
      //     console.log(this.headers, 'keys@fa-inverse');
      //     this.showLoader = false; // Show loading spinner
      //   })
      //   .catch((error) => {
      //     this.$swal(`error : ${error}`);
      //     this.showLoader = false; // Hide loading spinner
      //   });
    },

    normalizeText(text) {
      return text.replace(/_/g, ' ');
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

      // Generate headers (metric names + source names in correct order)
      // this.headers = ['Metric', ...Object.values(position), ...this.sources.filter((s) => !Object.values(position).includes(s))];

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

      // console.log('Headers:', this.headers);
      console.log('Processed Data:', this.gradedData);

      return result;
    },

    formatString(input) {
      return input.includes('_') ? `${input.replace(/_/g, ' ')} aggregate` : input;
    },

    // processData(data = []) {
    //   if (!Array.isArray(data) || data.length === 0) {
    //     return {
    //       complementarityScore: 0,
    //       consistencyScore: 0,
    //       gradedData: {
    //         consistency: [],
    //         complementarity: [],
    //       },
    //     };
    //   }

    //   const position = {
    //     primary: 'world bank',
    //     secondary: 'MICS',
    //     optional: 'NPC',
    //   };

    //   // Extract all sources including aggregate sources
    //   this.sources = data.flatMap((entry) => {
    //     if (entry.aggregate) {
    //       return entry.aggregate.map((agg) => Object.keys(agg)[0]); // Get aggregate sources
    //     }
    //     return Object.keys(entry);
    //   });

    //   const consistency = {};
    //   const complementarity = {};
    //   let consistencySum = 0;
    //   let complementaritySum = 0;
    //   let sourceCount = 0;

    //   data.forEach((entry) => {
    //     if (entry.aggregate) {
    //       // Process each object in the aggregate array
    //       entry.aggregate.forEach((aggEntry) => {
    //         const aggSource = Object.keys(aggEntry)[0];
    //         const aggData = aggEntry[aggSource];

    //         // Process complementarity
    //         Object.entries(aggData.complementarity).forEach(([key, value]) => {
    //           if (!complementarity[key]) {
    //             complementarity[key] = { metric: key, values: {} };
    //           }
    //           complementarity[key].values[aggSource] = value;
    //         });

    //         // Process consistency
    //         Object.entries(aggData.consistency).forEach(([key, value]) => {
    //           if (!consistency[key]) {
    //             consistency[key] = { metric: key, values: {} };
    //           }
    //           consistency[key].values[aggSource] = value;
    //         });
    //       });
    //     } else {
    //       // Process non-aggregate sources
    //       const source = Object.keys(entry)[0];
    //       const sourceData = entry[source];

    //       if (sourceData?.complementarity?.score && sourceData?.consistency?.score) {
    //         complementaritySum += Number(sourceData.complementarity.score) || 0;
    //         consistencySum += Number(sourceData.consistency.score) || 0;
    //         sourceCount++;

    //         Object.entries(sourceData.complementarity.grades).forEach(([key, value]) => {
    //           if (!complementarity[key]) {
    //             complementarity[key] = { metric: key, values: {} };
    //           }
    //           complementarity[key].values[source] = value;
    //         });

    //         Object.entries(sourceData.consistency.grades).forEach(([key, value]) => {
    //           if (!consistency[key]) {
    //             consistency[key] = { metric: key, values: {} };
    //           }
    //           consistency[key].values[source] = value;
    //         });
    //       }
    //     }
    //   });

    //   // Ensure values are ordered according to the position mapping
    //   function reorderValues(dataObject) {
    //     return Object.values(dataObject).map((entry) => {
    //       const orderedValues = [
    //         entry.values[position.primary] || null,
    //         entry.values[position.secondary] || null,
    //         entry.values[position.optional] || null,
    //       ];
    //       return { metric: entry.metric, values: orderedValues };
    //     });
    //   }

    //   const result = {
    //     complementarityScore: sourceCount ? (complementaritySum / sourceCount).toFixed(1) : '0',
    //     consistencyScore: sourceCount ? (consistencySum / sourceCount).toFixed(1) : '0',
    //     gradedData: {
    //       consistency: reorderValues(consistency),
    //       complementarity: reorderValues(complementarity),
    //     },
    //   };

    //   this.complementarityScore = result.complementarityScore;
    //   this.consistencyScore = result.consistencyScore;
    //   this.gradedData = result.gradedData;

    //   console.log(this.gradedData, 'this.gradedData');
    //   return result;
    // },

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

.progress-value {
  position: absolute;
  top: 55%;
  left: 45%;
  transform: translate(-50%, -50%);
  font-size: 26px; /* Adjust font size for larger circle */
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
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
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
</style>
