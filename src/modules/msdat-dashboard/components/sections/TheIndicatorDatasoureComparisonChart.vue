/* eslint-disable radix */
<template>
  <base-overlay :show="loading">
    <base-sub-card
      buttonToggle
      showControls
      sideControl="true"
      :dataSourceOptions="dataSourcesOptions"
      @toggled-button="updateChart($event)"
      @selected-datasource="onSelectedSource($event)"
      @toggle-confidence-range="onConfidenceRangeClicked($event)"
      :dataSourceOptionsSelected="selectedDS"
      v-if="values"
    >
      <template #title>
        <h6 class="work-sans">
          Comparison Of <b>{{ values.indicator.short_name }}</b> Across
          Different Data Source
        </h6>
      </template>
      <BarChart :chartOptions="ChartOptions" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { sortBy, uniq } from 'lodash';
import defaultOptions from '@/components/Barchart/defaultOption';
import formatter from '../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    BarChart,
  },
  data() {
    return {
      ChartOptions: {},
      loading: false,
      dataSourcesOptions: [
        {
          id: 8,
          datasource: 'IHME',
        },
        {
          id: 5,
          datasource: 'NNHS',
        },
        {
          id: 9,
          datasource: 'WHO-GHO',
        },
      ],
      selectedDS: {},
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
  },
  watch: {
    'values.indicator': {
      async handler() {
        this.loading = true;
        const dataSources = this.dlGetDashboardDataSource(); // get all dataSource for dashboard
        const { seriesArray, years } = await this.toHighChartSeriesSetup(
          dataSources,
        );
        this.setUpHighChartConfig(seriesArray, years);
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
     */
    setUpHighChartConfig(ChartSeriesObject, sortedYear = []) {
      this.ChartOptions = {
        xAxis: {
          ...defaultOptions.xAxis,
          categories: sortedYear,
        },
        chart: {
          ...defaultOptions.chart,
          type: 'line',
          height: '300',
        },
        title: {
          ...defaultOptions.title,
        },
        series: ChartSeriesObject,
      };
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
      valueTypeArray = [2],
      parameterObject = {
        indicator: this.values.indicator.id,
        location: this.values.location.id,
      },
    ) {
      debugger;
      const chartSeriesArray = [];
      const mappedDataSource = dataSources.map((item) => this.dlGetDataSource(item.id));
      const mappedValueTypes = valueTypeArray.map((item) => this.dlGetValueTypes(item));
      const queryArray = [];
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
        searchDataSource.datasource = datasource.id;
        if (mappedValueTypes.length > 0) {
          mappedValueTypes.forEach((valueType) => {
            // The Object.assign help copy if Object before pushing it into the array
            // else it tends to push the same values again and again
            searchDataSource.value_type = valueType.id;
            queryArray.push({ ...searchDataSource });
          });
        } else {
          // The Object.assign help copy if Object before pushing it into the array
          // else it tends to push the same values again and again
          queryArray.push({ ...searchDataSource });
        }
      });

      const mappedRequest = queryArray.map((item) => this.dlQuery(item));
      const mappedResponse = await Promise.all(mappedRequest);

      // mapping out all the years
      const allYears = [];
      mappedResponse.forEach((item) => {
        const years = item.map((itemObject) => itemObject.period);
        allYears.push(...years);
      });
      // sort and get only unique ears for the categories
      const sortedYear = sortBy(uniq(allYears));

      // cause we know the queryArray  array
      // follows the same index as the mappedResponse array
      let sortedData = [];
      mappedResponse.forEach((item, index) => {
        const data = item.map((Object) => [
          Object.period,
          Number.parseFloat(Object.value),
        ]);
        sortedData = data.sort(
          // eslint-disable-next-line radix
          (a, b) => Number.parseInt(a[0]) - Number.parseInt(b[0]),
        );
        const datasource = this.dlGetDataSource(queryArray[index].datasource);
        let seriesObject = {};
        if (mappedValueTypes.length > 0) {
          const valueType = this.dlGetValueTypes(queryArray[index].value_type);
          console.log(datasource);
          seriesObject = this.createSeriesObject(
            valueType,
            datasource.datasource,
            sortedData,
          );
        } else {
          seriesObject = { name: datasource.datasource, data: sortedData };
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
      const valueType = [2, 4, 3];
      /**
       * Bear in mind the the confidence Range options is a
       * radio button so it only returns/ selectees a single Object
       * at a time
       */
      debugger;
      const { seriesArray, years } = await this.toHighChartSeriesSetup(
        [datasourceArray],
        valueType,
      );
      this.setUpHighChartConfig(seriesArray, years);
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
        const valueType = [2, 4, 3];
        const { seriesArray, years } = await this.toHighChartSeriesSetup(
          [this.selectedDS],
          valueType,
        );
        this.setUpHighChartConfig(seriesArray, years);
      } else {
        this.selectedDS = {};
        const dataSources = this.dlGetDashboardDataSource(); // get all dataSource for dashboard
        const { seriesArray, years } = await this.toHighChartSeriesSetup(
          dataSources,
        );
        this.setUpHighChartConfig(seriesArray, years);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
