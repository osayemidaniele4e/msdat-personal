/* eslint-disable radix */
<template>
  <div class="iddc_wrapper confidenceRange_Intro position-relative">
    <base-overlay :show="loading || notShow">
      <!-- BASE SUBCARD FOR INDICATORS WITH CONFIDENCE RANGE -->
      <base-sub-card
        ref="SubCard"
        buttonToggle
        showControls
        :showDropdown="true"
        :dataSourceOptions="dataSourcesOptions"
        @toggled-button="updateChart($event)"
        @selected-datasource="onSelectedSource($event)"
        @toggle-confidence-range="onConfidenceRangeClicked($event)"
        :dataSourceOptionsSelected="selectedDS"
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: '',
            year: '',
          })
        "
        v-if="Object.keys(values).length && dataSourcesOptions.length === 0"
      >
        <template #title>
          <p v-if="hasOneDatasource" class="work-sans mb-0 line-height">
            Trend analysis of <b>{{ values.indicator.short_name }}</b> across periods
          </p>
          <p v-else class="work-sans mb-0 line-height">
            Comparison of <b>{{ values.indicator.short_name }}</b> (Time-series comparison of
            {{ values.indicator.short_name }}) across different data sources.
          </p>
        </template>
        <template #selectors>
          <div class="row">
            <div class="col-3">
              <label>Primary Datasource</label>
              <multiselect
                v-model="selectedSource"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                data-visted="notVisited"
                :options="indicatorDatasources"
                :searchable="false"
                :allow-empty="false"
                aria-label="pick a value"
                deselectLabel=""
                selectLabel=""
              >
                <!-- <template v-slot:singleLabel="{ option }"
                  ><strong>{{ option.name }}</strong> is written in
                  <strong> {{ option.language }}</strong></template
                > -->
              </multiselect>
            </div>
            <div class="col-8">
              <label>Other Datasources</label>
              <multiselect
                id="multiselect"
                v-model="selectedDatasources"
                :options="indicatorDatasources.filter((item) => item.id !== selectedSource.id)"
                :multiple="true"
                :preserve-search="true"
                placeholder="select other sources"
                track-by="datasource"
                label="datasource"
                :preselect-first="false"
                deselectLabel=""
                selectLabel=""
                :searchable="false"
                :allow-empty="false"
              >
                <!-- <template #selection="{ values, search, isOpen }">
                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                      >{{ values.length }} options selected</span
                    >
                  </template> -->
              </multiselect>
            </div>
          </div>
        </template>
        <BarChart ref="BaseChart" :chartOptions="ChartOptions" :title="title" v-if="!notShow" />
      </base-sub-card>
      <!-- BASE SUBCARD FOR INDICATORS WITHOUT CONFIDENCE RANGE -->
      <base-sub-card
        ref="SubCard"
        buttonToggle
        showControls
        sideControl="true"
        :dataSourceOptions="dataSourcesOptions"
        @toggled-button="updateChart($event)"
        @selected-datasource="onSelectedSource($event)"
        @toggle-confidence-range="onConfidenceRangeClicked($event)"
        :dataSourceOptionsSelected="selectedDS"
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: '',
            year: '',
          })
        "
        v-if="Object.keys(values).length && dataSourcesOptions.length !== 0"
      >
        <template #title>
          <p v-if="ChartOptions.series.length === 1" class="work-sans mb-0 line-height">
            Trend analysis of <b>{{ values.indicator.short_name }}</b> across periods
          </p>
          <p v-else class="work-sans mb-0 line-height">
            Comparison of <b>{{ values.indicator.short_name }}</b> (Time-series comparison of
            {{ values.indicator.short_name }}) across different data sources.
          </p>
        </template>
        <template #selectors>
          <div class="row">
            <div class="col-3">
              <label>Main Datasource</label>
              <multiselect
                v-model="selectedSource"
                track-by="datasource"
                label="datasource"
                placeholder="Select one"
                data-visted="notVisited"
                :options="indicatorDatasources"
                :searchable="false"
                :allow-empty="false"
                aria-label="pick a value"
                deselectLabel=""
                selectLabel=""
              >
                <!-- <template v-slot:singleLabel="{ option }"
                  ><strong>{{ option.name }}</strong> is written in
                  <strong> {{ option.language }}</strong></template
                > -->
              </multiselect>
            </div>
            <div class="col-8">
              <label>Other Datasources</label>
              <multiselect
                id="multiselect"
                v-model="selectedDatasources"
                :options="indicatorDatasources.filter((item) => item.id !== selectedSource.id)"
                :multiple="true"
                :preserve-search="true"
                placeholder="select other sources"
                track-by="datasource"
                label="datasource"
                :preselect-first="false"
                deselectLabel=""
                selectLabel=""
                :searchable="false"
                :allow-empty="false"
              >
                <!-- <template #selection="{ values, search, isOpen }">
                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                      >{{ values.length }} options selected</span
                    >
                  </template> -->
              </multiselect>
            </div>
          </div>
        </template>

        <!-- refresh button to show all datasources in the chart -->
        <template #refresh>
          <div class="pop-wrapper">
            <img src="@/assets/refresh.png" @click="getReset()" alt="" />
          </div>
          <!-- <b-icon-arrow-clockwise
            id="reset"
            @click="getReset()"
            class="pointer_click mx-1 font-weight-bold"
            font-scale="0.5"
          ></b-icon-arrow-clockwise> -->
        </template>
        <!-- <div v-if="showPopUp" class="pop-up">
          <h3 @click="getReset()">Refresh Table</h3>
        </div> -->
        <BarChart ref="BaseChart" :chartOptions="ChartOptions" :title="title" v-if="!notShow" />
      </base-sub-card>
    </base-overlay>
  </div>
</template>

<script>
import { sortBy, uniq } from 'lodash';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import defaultOptions from '@/components/Barchart/defaultOption';
import mixin from '@/modules/data-layer/mixin';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import ApiServices from '@/modules/data-layer/services/ApiServices';
import chartDownload from '../../../mixins/chart_download';
import controlSetup from '../../../mixins/control-panel-setup';

export default {
  mixins: [chartDownload, mixin, formatter, controlSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      title: '',
      ChartOptions: {},
      loading: false,
      dataSourcesOptions: [],
      selectedDS: {},
      notShow: false,
      seriesArray: {},
      years: {},
      selectDataSource: null,
      showPopUp: false,
      hasOneDatasource: false,
      selectedSource: {
        id: 6, datasource: 'NHMIS-DHIS2', full_name: 'National Health Management Information System (DHIS2)', description: 'National Health Management Information System: Nigeria has adopted the DHIS2 as the National tool for the reporting of routine health-related data. This data is reported and aggregated monthly using this platform.', year_available: '2013 - 2022', period_available: '2023', methodology: "Facility level aggregate data that is reported by health facilities routinely on a monthly basis using DHIS2. Health facilities are expected to report by the month's data by the 15th of the next month. Due to incomplete reporting by the health facilities, poor reporting by private facilities, the data may be biased.", subnational_data: 'Yes', classification: 'Routine', groups: [], link: 'https://dhis2nigeria.org.ng', created_at: '2022-10-20T08:13:15.757413Z', updated_at: '2024-05-15T09:46:43.792173Z', indicators: [62, 412, 413, 414, 415, 416, 417, 418, 584, 585, 586, 587, 16, 5, 6, 397, 4, 212, 18, 31, 19, 29, 20, 30, 409, 21, 13, 10, 23, 7, 410, 32, 17, 2, 398, 22, 1685, 1687, 1686],
      },
      indicatorDatasources: [],
      selectedDatasources: [],
    };
  },
  props: {
    /**
     * input values
     */
    values: {
      type: [Object, String, Array],
      required: true,
    },
    resetIndex: {
      type: Number,
      required: true,
    },
    closeOverlay: {
      type: Boolean,
    },
  },
  async mounted() {
    this.title = `Comparison of ${this.values.indicator.short_name} and related indicators
        (Time-series comparison of ${this.values.indicator.short_name} ) across different data
            sources.`;
  },
  watch: {
    // Watch closeOverlay
    closeOverlay: {
      handler(newValue) {
        if (newValue) {
          this.closeOverlay = true;
          this.$refs.SubCard.close();
        }
      },
      deep: true,
    },
    /**
     * some trick i found out arranging the watchers in the order
     * you want them to be called
     * like whats happening here
     * */

    // when the refresh button is clicked
    resetIndex: {
      async handler() {
        this.notShow = true;
        this.loading = true;
        const dataSources = await this.getAvailableDataSources(this.values.indicator.id);

        const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
        this.setUpHighChartConfig(seriesArray, years);
        this.loading = false;
        this.notShow = false;
      },
      deep: false,
      immediate: false,
    },

    'values.datasource': {
      async handler(newVal, oldVal) {
        this.selectedSource = newVal;
        // debugger;
        // this.loading = true;
        // first condition checks if there is change in the old and new datasource then sets newVal as datasource selected
        // eslint-disable-next-line no-unused-vars
        let dataSourceSelected = [];
        if (oldVal !== newVal) {
          if (!Array.isArray(newVal)) {
            dataSourceSelected = [newVal];
          } else {
            dataSourceSelected = newVal;
          }
        } else {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          const filteredDataSources = dataSources.filter((dataSource) => dataSource.id !== 30);
          this.indicatorDatasources = dataSources;
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = filteredDataSources.filter((item) => aIds.includes(item.id));
          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
        }
      },
      deep: false,
      immediate: false,
    },
    'values.indicator': {
      async handler() {
        this.loading = true;
        // change get datasource function to API matching indicator to dataSource
        if (this.values.indicator.id !== undefined) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          this.indicatorDatasources = dataSources;
          if (dataSources.length === 1) {
            this.hasOneDatasource = true;
          } else {
            this.hasOneDatasource = false;
          }
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = dataSources.filter((item) => aIds.includes(item.id));
          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
          // added this so that the datasource list will update anytime an indicator is selected
          await this.getDataSourceFromDropdown();
        }

        this.loading = false;
        this.title = `Comparison of ${this.values.indicator.short_name} and related indicators
        (Time-series comparison of ${this.values.indicator.short_name} ) across different data
            sources.`;
      },
      deep: true,
      immediate: true,
    },
    'values.target': {
      async handler() {
        this.loading = true;
        if (this.values.indicator.id !== undefined) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = dataSources.filter((item) => aIds.includes(item.id));
          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
        }

        this.loading = false;
      },
      deep: true,
      immediate: false,
    },
    'values.location': {
      async handler() {
        this.loading = true;
        if (this.values.indicator.id !== undefined) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = dataSources.filter((item) => aIds.includes(item.id));
          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
        }

        this.loading = false;
      },
      deep: true,
      immediate: false,
    },
    selectedSource: {
      async handler() {
        this.loading = true;
        // change get datasource function to API matching indicator to dataSource
        if (this.values.indicator.id !== undefined) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          this.indicatorDatasources = dataSources;
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = dataSources.filter((item) => aIds.includes(item.id));

          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
          // added this so that the datasource list will update anytime an indicator is selected
          await this.getDataSourceFromDropdown();
        }

        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
    selectedDatasources: {
      async handler() {
        this.loading = true;
        // change get datasource function to API matching indicator to dataSource
        if (this.values.indicator.id !== undefined) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          this.indicatorDatasources = dataSources;
          const allSelectedDataSources = [this.selectedSource, ...this.selectedDatasources];
          const aIds = allSelectedDataSources.map((item) => item.id);
          const filteredAllDataSources = dataSources.filter((item) => aIds.includes(item.id));

          const { seriesArray, years } = await this.toHighChartSeriesSetup(filteredAllDataSources);
          this.setUpHighChartConfig(seriesArray, years);
          // added this so that the datasource list will update anytime an indicator is selected
          await this.getDataSourceFromDropdown();
        }

        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    /**
     * @typedef {Object} HighChartObject
     * @property {Array} seriesArray - the seriesArray for the HighChart Series Options
     * @property {Array} years - An array of all the years that exist in all the values
     */

    /**
     * @param {HighChartObject}  ChartSeriesObject
     * @param {Array} sortedYear - an arrays of years
     * @method computeChartPlotLines is from the
     * @mixin formatter
     */

    setUpHighChartConfig(ChartSeriesObject, sortedYear = []) {
      const currentYear = new Date().getFullYear();
      const { name } = this.$route.params;

      this.ChartOptions = {
        tooltip: {
          shared: true,
        },
        yAxis: {
          ...defaultOptions.yAxis,
          title: {
            ...defaultOptions.yAxis.title,
          },
          gridLineWidth: 0,
          labels: {
            ...defaultOptions.yAxis.labels,
          },
          plotLines: [...this.computeChartPlotLines(this.values)],
        },
        xAxis: {
          ...defaultOptions.xAxis,
          crosshair: {
            enabled: true,
          },
          categories: sortedYear,
          plotLines: [
            {
              value: currentYear,
              color: 'gray',
              width: 2,
              zIndex: 2,
            },
          ],
        },
        chart: {
          ...defaultOptions.chart,
          type: 'line',
          height: '300',
        },
        title: {
          ...defaultOptions.title,
        },
        series: ChartSeriesObject.map((series) => {
          // Check if this is a confidence range series
          const isConfidenceRange = series.type === 'arearange';

          if (isConfidenceRange) {
            // Return confidence range series as-is
            return series;
          }

          // Handle Demographics specific logic
          if (name === 'Demographics') {
            const dataBeforeCurrentYear = series.data.filter(([year]) => year < currentYear);
            const dataAfterCurrentYear = series.data.filter(([year]) => year >= currentYear);

            // If this series has confidence data, we need to split that too
            if (series.confidenceData) {
              const confidenceBeforeYear = series.confidenceData.filter(
                ([year]) => year < currentYear,
              );
              const confidenceAfterYear = series.confidenceData.filter(
                ([year]) => year >= currentYear,
              );

              return [
                {
                  name: series.name,
                  data: dataBeforeCurrentYear,
                  lineDashStyle: 'Solid',
                  confidenceData: confidenceBeforeYear,
                },
                {
                  name: `${series.name} (Projection)`,
                  data: dataAfterCurrentYear,
                  lineDashStyle: 'Dash',
                  confidenceData: confidenceAfterYear,
                },
              ];
            }

            // No confidence data, just split the main series
            return [
              {
                name: series.name,
                data: dataBeforeCurrentYear,
                lineDashStyle: 'Solid',
              },
              {
                name: `${series.name} (Projection)`,
                data: dataAfterCurrentYear,
                lineDashStyle: 'Dash',
              },
            ];
          }

          // Return regular series as-is
          return series;
        }).flat(),
        plotOptions: {
          series: {
            states: {
              hover: {
                enabled: true,
                lineWidth: 2,
              },
            },
          },
          arearange: {
            fillOpacity: 0.1,
            lineWidth: 0,
            tooltip: {
              shared: true,
            },
          },
          line: {
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y:.1f}</b><br/>',
              shared: true,
            },
          },
        },
      };

      const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
      this.ChartOptions.yAxis.title.text = displayFactor;
    },
    updateChart(e) {
      this.ChartOptions.chart.type = e;
    },
    togglePopUp() {
      this.showPopUp = !this.showPopUp;
    },

    /**
     * To get series Data for the HighChart js series API
     * comparing datasource
     * @param {array} dataSources - An array of datasource.
     * @param {array} valueTypeObject - An array ofValueType.
     * @param {Object} parameterObject
     * @return {HighChartObject}
     * */
    async toHighChartSeriesSetup(
      dataSources,
      valueTypeArray = [], // we need to refactor the values types implementation
      // as soon as the database is updated
      parameterObject = {
        indicator: this.values.indicator.id,
        location: this.values.location.id,
      },
    ) {
      // debugger;
      if (dataSources[0].id === 30) {
        const chartSeriesArray = [];
        const mappedDataSource = dataSources?.map((item) => this.dlGetDataSource(item.id));
        const mappedValueTypes = valueTypeArray?.map((item) => this.dlGetValueTypes(item));
        const queryArray = [];
        // debugger;
        /**
         * ideas here
         * is to try all map out all the the search parameters required for the
         * visualization
         *
         * the visualization requires all the datasource for the dashboard against a single
         * indicator so we make a loop for all visualization
         *
         * also take into consideration that sometimes the visualization may require a particular
         * Value type
         */
        if (mappedDataSource !== undefined) {
          mappedDataSource.forEach((datasource) => {
            const searchDataSource = parameterObject;
            searchDataSource.datasource = datasource?.id;
            if (mappedValueTypes.length > 0) {
              mappedValueTypes.forEach((valueType) => {
                // The Object.assign help copy if Object before pushing it into the array
                // else it tends to push the same values again and again
                searchDataSource.value_type = valueType.id;
                // eslint-disable-next-line prefer-object-spread
                const queryCopy = Object.assign({}, searchDataSource);
                queryArray.push(queryCopy);
              });
            } else {
              // The Object.assign help copy if Object before pushing it into the array
              // else it tends to push the same values again and again
              queryArray.push({ ...searchDataSource });
            }
          });
        }

        const nhmisData = [];
        // eslint-disable-next-line no-unused-vars
        const mappedRequest = queryArray.map(async (item) => {
          const obj = {
            indicator: item.indicator,
          };
          const { data } = await ApiServices.getAllNHMISData(obj);
          return data.results; // Collect results and return them
        });

        const results = await Promise.all(mappedRequest);
        results.forEach((result) => nhmisData.push(...result)); // Flatten results into nhmisData

        const filteredData = nhmisData.filter((item) => item.period.includes('2024'));

        // Array of standardized 3-letter month abbreviations
        const monthOrder = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        // Sort function using the first three letters of the period
        const newSortedData = filteredData.sort((a, b) => {
          const monthA = monthOrder.findIndex((month) => month === a.period.slice(0, 3));
          const monthB = monthOrder.findIndex((month) => month === b.period.slice(0, 3));
          return monthA - monthB;
        });

        const allYears = [];

        newSortedData.forEach((item) => {
          const years = item.period;
          allYears.push(years);
        });

        // debugger;
        // mapping out all the years
        // sort and get only unique ears for the categories
        // const sortedYear = sortBy(uniq(allYears));

        // cause we know the queryArray  array
        // follows the same index as the mappedResponse array
        const sortedData = [];
        let seriesObject = {};
        const datasource = this.dlGetDataSource(queryArray[0].datasource);

        newSortedData.forEach((item) => {
          const data = [item.period, Number.parseFloat(item.value)];
          sortedData.push(data);
        });

        seriesObject = { name: datasource?.datasource, data: sortedData };

        chartSeriesArray.push(seriesObject);
        return {
          seriesArray: chartSeriesArray,
          years: allYears,
        };
      }

      const chartSeriesArray = [];
      // const mappedDataSource = dataSources?.map((item) => this.dlGetDataSource(item.id));

      const mappedValueTypes = valueTypeArray?.map((item) => this.dlGetValueTypes(item));
      const queryArray = [];
      // debugger;
      /**
       * ideas here
       * is to try all map out all the the search parameters required for the
       * visualization
       *
       * the visualization requires all the datasource for the dashboard against a single
       * indicator so we make a loop for all visualization
       *
       * also take into consideration that sometimes the visualization may require a particular
       * Value type
       */
      if (dataSources !== undefined) {
        dataSources.forEach((datasource) => {
          const searchDataSource = parameterObject;
          searchDataSource.datasource = datasource?.id;
          if (mappedValueTypes.length > 0) {
            mappedValueTypes.forEach((valueType) => {
              // The Object.assign help copy if Object before pushing it into the array
              // else it tends to push the same values again and again
              searchDataSource.value_type = valueType.id;
              // eslint-disable-next-line prefer-object-spread
              const queryCopy = Object.assign({}, searchDataSource);
              queryArray.push(queryCopy);
            });
          } else {
            // The Object.assign help copy if Object before pushing it into the array
            // else it tends to push the same values again and again
            queryArray.push({ ...searchDataSource });
          }
        });
      }

      const mappedRequest = queryArray.map((item) => this.dlQuery(item));
      const mappedResponse = await Promise.all(mappedRequest);

      // debugger;
      // mapping out all the years
      const allYears = [];
      mappedResponse.forEach((item) => {
        const years = item?.map((itemObject) => itemObject.period);
        allYears.push(...years);
      });
      // sort and get only unique ears for the categories
      const sortedYear = sortBy(uniq(allYears)).sort((a, b) => {
        const extract = (str) => {
          const match = str.match(/(\d{4})(?:\s*week\s*(\d+))?/i);
          const year = match ? parseInt(match[1], 10) : 0;
          const week = match && match[2] ? parseInt(match[2], 10) : null;
          return { year, week };
        };

        const { year: yearA, week: weekA } = extract(a);
        const { year: yearB, week: weekB } = extract(b);

        if (yearA !== yearB) return yearA - yearB;

        if (weekA !== null && weekB !== null) return weekA - weekB;
        if (weekA === null) return -1;
        if (weekB === null) return 1;
        return 0;
      });

      // cause we know the queryArray  array
      // follows the same index as the mappedResponse array
      let sortedData = [];
      mappedResponse.forEach((item, index) => {
        const data = item?.map((Object) => [Object.period, Number.parseFloat(Object.value)]);

        sortedData = data.sort((a, b) => {
          const extract = (str) => {
            const match = str.match(/(\d{4})(?:\s*week\s*(\d+))?/i);
            const year = match ? parseInt(match[1], 10) : 0;
            const week = match && match[2] ? parseInt(match[2], 10) : null;
            return { year, week };
          };

          const { year: yearA, week: weekA } = extract(a[0]);
          const { year: yearB, week: weekB } = extract(b[0]);

          if (yearA !== yearB) return yearA - yearB;

          if (weekA !== null && weekB !== null) return weekA - weekB;
          if (weekA === null) return -1;
          if (weekB === null) return 1;
          return 0;
        });
        const datasource = this.dlGetDataSource(queryArray[index].datasource);
        let seriesObject = {};
        if (mappedValueTypes.length > 0) {
          const valueType = this.dlGetValueTypes(queryArray[index].value_type);
          seriesObject = this.createSeriesObject(valueType, datasource.datasource, sortedData);
        } else {
          seriesObject = { name: datasource?.datasource, data: sortedData };
        }
        chartSeriesArray.push(seriesObject);
      });
      return {
        seriesArray: chartSeriesArray,
        years: sortedYear,
      };
    },
    createSeriesObject(valueType, name, data) {
      if (valueType.id === 3 || valueType.id === 4) {
        return {
          name: `${name} ${valueType.value_type}`,
          data,
        };
      }
      return { name, data };
    },
    async onSelectedSource(datasourceArray) {
      this.loading = true;
      // const valueType = [2, 4, 3];

      // trying to get the value type
      const datasource = this.dlGetDataSource(datasourceArray.id);
      const valuetype = this.dlGetValueTypes({
        value_type: datasource.classification,
      });
      const valueType = [valuetype[0].id, 4, 3]; // when know that 4 and 3 are the upper and lower
      // confidence range

      /**
       * Bear in mind the the confidence Range options is a
       * radio button so it only returns/ selectees a single Object
       * at a time
       */

      const { seriesArray, years } = await this.toHighChartSeriesSetup(
        [datasourceArray],
        valueType,
      );
      const seriesArr = await this.Reformat(seriesArray);
      this.setUpHighChartConfig(seriesArr, years);
      this.loading = false;
    },
    async onConfidenceRangeClicked(e) {
      /**
       * initially set the first data source
       */
      this.loading = true;
      if (e === 'ON') {
        const [firstObject] = this.dataSourcesOptions;
        this.selectedDS = firstObject;

        // trying to get the value type
        const datasource = this.dlGetDataSource(firstObject.id);
        const valuetype = this.dlGetValueTypes({
          value_type: datasource.classification,
        });
        const valueType = [valuetype[0].id, 4, 3]; // when know that 4 and 3 are the upper and lower
        // confidence range
        const { seriesArray, years } = await this.toHighChartSeriesSetup(
          [this.selectedDS],
          valueType,
        );
        const seriesArr = await this.Reformat(seriesArray);

        this.setUpHighChartConfig(seriesArr, years);
      } else {
        this.selectedDS = {};

        // resetting back to initial state
        this.notShow = true;
        this.loading = true;
        if (!this.selectDataSource) {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
          this.setUpHighChartConfig(seriesArray, years);
        } else {
          const { seriesArray, years } = await this.toHighChartSeriesSetup(this.selectDataSource);
          this.setUpHighChartConfig(seriesArray, years);
        }
        this.loading = false;
        this.notShow = false;
        // this.setUpHighChartConfig(this.seriesArray, this.years);
      }
      this.loading = false;
    },
    // Function to get available data sources by indicator to accommodate...
    // ...new feature that only displays data sources related to the indicator
    async getAvailableDataSources() {
      const availableDataSource = await this.getDataSourcesFromIndicator(this.values.indicator.id);

      return availableDataSource;
    },
    // Function to get datasource from dropdown
    async getDataSourceFromDropdown() {
      // get datasource from the dropdown
      const dataSourceDropdown = await this.setDataSourcesDropdown(this.values.indicator.id);
      const dataSourceList = [];
      dataSourceDropdown.forEach((item) => {
        const arr = item.datasource;
        dataSourceList.push(arr);
      });
      // checks the dataSourceList and sets the dataSourcesOptions to be shown on the confidence range
      if (dataSourceList.includes('IHME')) {
        this.dataSourcesOptions = [
          {
            id: 8,
            datasource: 'IHME',
          },
        ];
      }
      // checks the dataSourceList and sets the dataSourcesOptions to be shown on the confidence range
      if (dataSourceList.includes('IHME') && dataSourceList.includes('NNHS')) {
        this.dataSourcesOptions = [
          {
            id: 8,
            datasource: 'IHME',
          },
          {
            id: 5,
            datasource: 'NNHS',
          },
        ];
      }
      // checks the dataSourceList and sets the dataSourcesOptions to be shown on the confidence range
      if (!dataSourceList.includes('IHME') && !dataSourceList.includes('NNHS')) {
        this.dataSourcesOptions = [];
      }
    },
    // ================================ REFORMATTING DATA =====================================
    // async Reformat(seriesArray) {
    //   const name1 = seriesArray[0].name;
    //   const datar = seriesArray[0].data.map((item) => item[1]);
    //   const data1 = seriesArray[0].data.map((item, i) => [item[0], datar[i]]);
    //   const data2 = seriesArray[1].data.map((item) => item[1]);
    //   const data3 = seriesArray[2].data.map((item) => item[1]);
    //   const data = seriesArray[1].data.map((item, index) => [
    //     `Confidence Range for ${name1}`,
    //     parseFloat(data3[index].toFixed(1)),
    //     parseFloat(data2[index].toFixed(1)),
    //   ]);
    //   const seriesArr = [
    //     {
    //       name: name1,
    //       data: data1,
    //       zIndex: 1,
    //       marker: {
    //         fillColor: '#4482c2',
    //         lineWidth: 2,
    //         // lineColor: Highcharts.getOptions().colors[0]
    //       },
    //     },
    //     {
    //       name: `Confidence Range for ${name1}`,
    //       data,
    //       type: 'arearange',
    //       lineWidth: 2,
    //       linkedTo: ':previous',
    //       color: '#faa630',
    //       fillOpacity: 0.1,
    //       zIndex: 0,
    //       marker: {
    //         enabled: true,
    //         radius: 2,
    //         lineWidth: 1,
    //         width: 1,
    //       },
    //       tooltip: {
    //         crosshairs: true,
    //         shared: true,
    //         formatter() {
    //           // eslint-disable-next-line no-unused-vars
    //           const pointData = data.find((row) => row.name === this.point.x);
    //         },
    //       },
    //     },
    //   ];
    //   return seriesArr;
    // },
    // new implemetation that makes confidence range work
    async Reformat(seriesArray) {
      const { name } = this.$route.params;
      const currentYear = new Date().getFullYear();

      // Extract base data and confidence bounds
      const name1 = seriesArray[0].name;
      const mainData = seriesArray[0].data;
      const lowerBound = seriesArray[1].data;
      const upperBound = seriesArray[2].data;

      // Create the confidence range data
      const confidenceData = lowerBound.map((item, index) => [
        item[0], // year
        parseFloat(lowerBound[index][1].toFixed(1)), // lower bound
        parseFloat(upperBound[index][1].toFixed(1)), // upper bound
      ]);

      if (name === 'Demographics') {
        // Split data at current year
        const beforeCurrentYear = {
          main: mainData.filter(([year]) => year < currentYear),
          confidence: confidenceData.filter(([year]) => year < currentYear),
        };

        const afterCurrentYear = {
          main: mainData.filter(([year]) => year >= currentYear),
          confidence: confidenceData.filter(([year]) => year >= currentYear),
        };

        return [
          // Historical data
          {
            name: name1,
            data: beforeCurrentYear.main,
            zIndex: 1,
            lineDashStyle: 'Solid',
            marker: {
              fillColor: '#4482c2',
              lineWidth: 2,
            },
          },
          {
            name: `Confidence Range for ${name1}`,
            type: 'arearange',
            data: beforeCurrentYear.confidence,
            linkedTo: ':previous',
            color: '#faa630',
            fillOpacity: 0.1,
            zIndex: 0,
          },
          // Projection data
          {
            name: `${name1} (Projection)`,
            data: afterCurrentYear.main,
            zIndex: 1,
            lineDashStyle: 'Dash',
            marker: {
              fillColor: '#4482c2',
              lineWidth: 2,
            },
          },
          {
            name: `Confidence Range for ${name1} (Projection)`,
            type: 'arearange',
            data: afterCurrentYear.confidence,
            linkedTo: ':previous',
            color: '#faa630',
            fillOpacity: 0.1,
            zIndex: 0,
          },
        ];
      }

      // Regular confidence range formatting for non-Demographics data
      return [
        {
          name: name1,
          data: mainData,
          zIndex: 1,
          marker: {
            fillColor: '#4482c2',
            lineWidth: 2,
          },
        },
        {
          name: `Confidence Range for ${name1}`,
          type: 'arearange',
          data: confidenceData,
          linkedTo: ':previous',
          color: '#faa630',
          fillOpacity: 0.1,
          zIndex: 0,
        },
      ];
    },

    getReset() {
      this.$emit('reset');
      this.showPopUp = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#reset {
  transform: rotate(360deg);
  transition: all 1s ease-in-out;
  /* background-color: black; */
}

#reset:hover {
  font-weight: 700;
  transform: rotate(180deg);
}

div.iddc_wrapper {
  position: relative;
  div.no_data {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
.pop-wrapper {
  margin: 0 5px;
  cursor: pointer;
}

.pop-up {
  height: fit-content;
  background-color: #fff;
  z-index: 99999;
  padding: 10px;
  position: absolute;
  width: 200px;
  right: -200px;
  top: 0px;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
}
.pop-up h3 {
  font-size: 12px;
  cursor: pointer;
}
.pop-up h3:hover {
  color: #00ac40;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: #000;
}
</style>
