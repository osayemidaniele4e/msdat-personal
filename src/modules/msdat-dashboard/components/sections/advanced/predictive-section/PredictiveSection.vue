/* eslint-disable radix */
<template>
  <div class="iddc_wrapper">
    <!-- <div class="desc d-flex">
      <div class="desc-icon p-2">
        <svg
          data-v-21137bd3=""
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          focusable="false"
          role="img"
          aria-label="info circle fill"
          xmlns="http://www.w3.org/2000/svg"
          fill="#348481"
          class="bi-info-circle-fill data-source-info b-icon bi text-primary"
        >
          <g data-v-21137bd3="">
            <path
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="desc-text p-2">
        Predictive analysis is a form of advanced analytics that uses current and historical data to
        forecast activity, behavior and trends. It involves applying statistical analysis
        techniques, data queries and machine learning algorithms to data sets to create predictive
        models that place a numerical value or score on the likelihood of a particular action or
        event happening.
      </div>
    </div> -->
    <base-overlay :show="loading || notShow">
      <base-sub-card
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: '',
            year: '',
          })
        "
        v-if="Object.keys(values).length"
      >
        <template #title>
          <p class="work-sans mb-0 line-height title-text">
            Prediction Of <b>{{ values.indicator.short_name }}</b> and related indicators
            (Time-series comparison of {{ values.indicator.short_name }}) across different data
            sources.
          </p>
        </template>
        <BarChart ref="BaseChart" :chartOptions="ChartOptions" :title="title" v-if="!notShow" />
        <div class="no_prediction" v-if="showNoAvailablePrediction">
          <span
            >No prediction is available for <b>{{ values.indicator.short_name }}</b></span
          >
        </div>
      </base-sub-card>
    </base-overlay>
  </div>
</template>

<script>
import { sortBy, uniq } from 'lodash';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import defaultOptions from '@/components/Barchart/defaultOption';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import chartDownload from '../../../../mixins/chart_download';
import controlSetup from '../../../../mixins/control-panel-setup';

export default {
  mixins: [chartDownload, formatter, controlSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      title: '',
      ChartOptions: {},
      loading: false,
      selectedDS: {},
      notShow: false,
      seriesArray: {},
      years: {},
      selectDataSource: null,
      showNoAvailablePrediction: false,
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
    closeOverlay: {
      type: Boolean,
    },
  },
  mounted() {
    if (!this.values?.datasource) {
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: 3,
        key: 'datasource',
        value: this.dlDatasource.find((dat) => dat.id === 8),
      });
    }
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
    selectedDS: {
      async handler() {
        console.log('cali');
      },
      deep: false,
      immediate: false,
    },

    'values.datasource': {
      async handler(selectedDataSource) {
        // console.log(selectedDataSource, '@@GPPG@@');
        this.setDataSource(selectedDataSource.datasource);
        // debugger;
        this.loading = true;
        let dataSourceSelected = [];
        if (!Array.isArray(selectedDataSource)) {
          dataSourceSelected = [selectedDataSource];
        } else {
          dataSourceSelected = selectedDataSource;
        }

        this.selectDataSource = dataSourceSelected;
        const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSourceSelected);
        await this.setUpHighChartConfig(seriesArray, years);
        this.loading = false;
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
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
          await this.setUpHighChartConfig(seriesArray, years);
        }

        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(['getPredictedData', 'getSelectedDataSourceID']),
  },
  methods: {
    ...mapActions(['PREDICTIVE_ANALYSIS']),
    ...mapMutations(['setDataSource']),
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

    async setUpHighChartConfig(ChartSeriesObject, sortedYear = []) {
      // Getting chart series
      // Calling enpoint to process data
      // Getting response of predictive data
      // Putting the respnse in the ChartSeriesObject
      const { data } = ChartSeriesObject.find((item) => item.name === this.getSelectedDataSourceID);
      if (data.length >= 7) {
        try {
          await this.PREDICTIVE_ANALYSIS({ data });
          const yearArray = [];
          if (this.getPredictedData.prediction !== undefined) {
            this.getPredictedData.prediction.forEach((item) => {
              const arr = item[0];
              yearArray.push(arr);
            });
          }
          const year = [...sortedYear, ...yearArray];
          // eslint-disable-next-line camelcase
          const sorted_year = year.sort();
          if (this.getPredictedData.prediction !== undefined) {
            const switchPrediction = this.getPredictedData.prediction.map((val) => [
              val[0],
              val[1],
            ]);
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
                categories: sorted_year,
              },
              chart: {
                ...defaultOptions.chart,
                type: 'line',
                height: '300',
              },
              title: {
                ...defaultOptions.title,
              },
              series: [
                {
                  name: 'Actual Data',
                  data: ChartSeriesObject[0].data,
                  color: 'red',
                },
                {
                  name: 'Prediction',
                  data: switchPrediction,
                  color: 'blue',
                },
              ],
              plotOptions: {
                series: {
                  grouping: true,
                  pointWidth: 10,
                  connectNulls: false,
                  pointPlacement: 'between',
                },
                line: {
                  tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:.1f}</b><br/>',
                    shared: true,
                  },
                },
              },
            };
          }
          const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
          this.ChartOptions.yAxis.title.text = displayFactor;
          this.showNoAvailablePrediction = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.showNoAvailablePrediction = true;
      }
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
        // eslint-disable-next-line comma-dangle
      }
    ) {
      // debugger;
      const chartSeriesArray = [];
      const mappedDataSource = dataSources.map((item) => this.dlGetDataSource(item.id));
      const mappedValueTypes = valueTypeArray.map((item) => this.dlGetValueTypes(item));
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

      const mappedRequest = queryArray.map((item) => this.dlQuery(item));
      const mappedResponse = await Promise.all(mappedRequest);

      // debugger;
      // mapping out all the years
      const allYears = [];
      mappedResponse.forEach((item) => {
        const years = item.map((itemObject) => itemObject.period);
        allYears.push(...years);
      });
      // sort and get only unique ears for the categories
      const sortedYear = sortBy(uniq(allYears));

      // console.log(sortedYear, 'mappedResponsex');

      // cause we know the queryArray  array
      // follows the same index as the mappedResponse array
      let sortedData = [];
      mappedResponse.forEach((item, index) => {
        const data = item.map((Object) => [Object.period, Number.parseFloat(Object.value)]);
        // console.log(data, 'mappedResponsex');
        sortedData = data.sort(
          // eslint-disable-next-line radix, comma-dangle
          (a, b) => Number.parseInt(a[0]) - Number.parseInt(b[0])
        );
        const datasource = this.dlGetDataSource(queryArray[index].datasource);
        let seriesObject = {};
        if (mappedValueTypes.length > 0) {
          const valueType = this.dlGetValueTypes(queryArray[index].value_type);
          seriesObject = this.createSeriesObject(valueType, datasource.datasource, sortedData);
        } else {
          seriesObject = { name: datasource?.datasource, data: sortedData };
        }
        chartSeriesArray.push(seriesObject);
        if (chartSeriesArray[0].data.length < 12) {
          this.showNoAvailablePrediction = true;
        } else {
          this.showNoAvailablePrediction = false;
        }
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
    // Function to get available data sources by indicator to accommodate...
    // ...new feature that only displays data sources related to the indicator
    async getAvailableDataSources() {
      const availableDataSource = await this.setDataSourcesDropdown(this.values.indicator.id);
      return availableDataSource;
    },
  },
};
</script>

<style lang="scss" scoped>
div.iddc_wrapper {
  position: relative;
  div.no_prediction {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
.desc-text {
  font-size: 0.9rem !important;
}

.title-text {
  font-size: 0.8rem !important;
  font-weight: 600 !important;
}
</style>
