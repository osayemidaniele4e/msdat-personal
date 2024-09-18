/* eslint-disable radix */
<template>
  <div class="iddc_wrapper confidenceRange_Intro">
    <base-overlay :show="loading || notShow">
      <!-- BASE SUBCARD FOR INDICATORS WITH CONFIDENCE RANGE -->
      <base-sub-card
        ref="SubCard"
        buttonToggle
        showControls
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
          <p class="work-sans mb-0 line-height">
            Comparison of <b>{{ values.indicator.short_name }}</b>
            (Time-series comparison of {{ values.indicator.short_name }}) across different data
            sources.
          </p>
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
          <p class="work-sans mb-0 line-height">
            Comparison of <b>{{ values.indicator.short_name }}</b> and related indicators
            (Time-series comparison of {{ values.indicator.short_name }}) across different data
            sources.
          </p>
        </template>

        <!-- refresh button to show all datasources in the chart -->
        <template #refresh>
          <b-icon-arrow-clockwise
            id="reset"
            @click="getReset()"
            class="pointer_click mx-1 font-weight-bold"
            font-scale="0.5"
          ></b-icon-arrow-clockwise>
        </template>
        <BarChart ref="BaseChart" :chartOptions="ChartOptions" :title="title" v-if="!notShow" />
      </base-sub-card>
    </base-overlay>
    <!-- <div class="no_data">
      <img
        :src="require('@/assets/no-data/No_Available_Data.svg')"
        alt="no data"
        class="img-fluid"
        height="auto"
        width="250px"
      />
    </div> -->
  </div>
</template>

<script>
import { sortBy, uniq } from 'lodash';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import defaultOptions from '@/components/Barchart/defaultOption';
import mixin from '@/modules/data-layer/mixin';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
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

    selectedDS: {
      async handler() {
        console.log('cali');
      },
      deep: false,
      immediate: false,
    },

    'values.datasource': {
      async handler(newVal, oldVal) {
        // debugger;
        // this.loading = true;
        // first condition checks if there is change in the old and new datasource then sets newVal as datasource selected
        let dataSourceSelected = [];
        if (oldVal !== newVal) {
          if (!Array.isArray(newVal)) {
            dataSourceSelected = [newVal];
          } else {
            dataSourceSelected = newVal;
          }
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSourceSelected);
          this.setUpHighChartConfig(seriesArray, years);
          this.loading = false;
        } else {
          const dataSources = await this.getAvailableDataSources(this.values.indicator.id);
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
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
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
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
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
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
          const { seriesArray, years } = await this.toHighChartSeriesSetup(dataSources);
          this.setUpHighChartConfig(seriesArray, years);
        }

        this.loading = false;
      },
      deep: true,
      immediate: false,
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

      // const beforeCurrentYearColor = 'rgba(173, 216, 230, 0.3)'; // Change this color as needed
      // const afterCurrentYearColor = 'rgba(144, 238, 144, 0.3)'; // Change this color as needed

      this.ChartOptions = {
        tooltip: {
          // pointFormat: '{series.name}: <b>{point.y:.1f}</b><br/>',
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
            // Plot line for the current year
            {
              value: currentYear,
              color: 'gray', // Change this color as needed
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
          // Divide the series data into two based on the current year only if the condition is met
          if (name === 'Demographics') {
            const dataBeforeCurrentYear = series.data.filter(([year]) => year < currentYear);
            const dataAfterCurrentYear = series.data.filter(([year]) => year >= currentYear);

            // Assign different line styles for data before and after the current year
            return [
              {
                // name: series.name + ' (Before ' + currentYear + ')',
                name: `${series.name}`,
                data: dataBeforeCurrentYear,
                lineDashStyle: 'Solid', // Change this to 'Dash' for a dashed line
              },
              {
                name: `${series.name} (Projection)`,
                //  name: `${series.name} (Projection)`,
                data: dataAfterCurrentYear,
                lineDashStyle: 'Dash', // Change this to 'Solid' for a solid line
              },
            ];
          }
          // If the condition is not met, use the original series data
          return series;
        }).flat(),
        plotOptions: {
          series: {
            // grouping: true,
            // pointWidth: 10,
            // connectNulls: false,
            // pointPlacement: 'between',
            // borderWidth: 0,
          },
          column: {
            borderRadius: 0,
            pointPadding: 0.5,
            groupPadding: 0.05,
            borderWidth: 5,
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
      const sortedYear = sortBy(uniq(allYears));

      // cause we know the queryArray  array
      // follows the same index as the mappedResponse array
      let sortedData = [];
      mappedResponse.forEach((item, index) => {
        const data = item?.map((Object) => [Object.period, Number.parseFloat(Object.value)]);
        sortedData = data.sort(
          // eslint-disable-next-line radix
          (a, b) => Number.parseInt(a[0]) - Number.parseInt(b[0]),
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
        // const dataSources = this.dlGetDashboardDataSource(); // get all dataSource for dashboard
        // const { seriesArray, years } = await this.toHighChartSeriesSetup(
        //   dataSources,
        // );
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
      const availableDataSource = await this.getDataSourcesFromDexie(this.values.indicator.id);
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
    async Reformat(seriesArray) {
      const name1 = seriesArray[0].name;
      const datar = seriesArray[0].data.map((item) => item[1]);
      const data1 = seriesArray[0].data.map((item, i) => [item[0], datar[i]]);
      const data2 = seriesArray[1].data.map((item) => item[1]);
      const data3 = seriesArray[2].data.map((item) => item[1]);
      const data = seriesArray[1].data.map((item, index) => [
        `Confidence Range for ${name1}`,
        parseFloat(data3[index].toFixed(1)),
        parseFloat(data2[index].toFixed(1)),
      ]);
      const seriesArr = [
        {
          name: name1,
          data: data1,
          zIndex: 1,
          marker: {
            fillColor: '#4482c2',
            lineWidth: 2,
            // lineColor: Highcharts.getOptions().colors[0]
          },
        },
        {
          name: `Confidence Range for ${name1}`,
          data,
          type: 'arearange',
          lineWidth: 2,
          linkedTo: ':previous',
          color: '#faa630',
          fillOpacity: 0.1,
          zIndex: 0,
          marker: {
            enabled: true,
            radius: 2,
            lineWidth: 1,
            width: 1,
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            formatter() {
              // eslint-disable-next-line no-unused-vars
              const pointData = data.find((row) => row.name === this.point.x);
            },
          },
        },
      ];
      return seriesArr;
    },

    getReset() {
      this.$emit('reset');
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
</style>
