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
      selectedDS: [],
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
      async handler(newValues) {
        debugger;
        this.loading = true;
        // Query the data from db;
        console.log(newValues);
        // const data = await this.getData(newValues);
        const dataSources = this.dlGetDashboardDataSource(); // get all dataSource for dashboard
        const queryObject = {
          indicator: newValues.id,
          location: 1,
          value_type: 2,
        };
        const {
          sortedYear,
          ChartSeriesObject,
        } = await this.formatToHighChartSeries(queryObject, dataSources);
        this.setUpHighChartConfig(sortedYear, ChartSeriesObject);
        console.log(ChartSeriesObject);
        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setUpHighChartConfig(sortedYear, ChartSeriesObject) {
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
    async formatToHighChartSeries(addSearchObject, dataSources) {
      const mappedRequest = dataSources.map((item) => this.dlQuery({
        ...addSearchObject,
        datasource: item.id,
      }));
      const arrayOfResponses = await Promise.all(mappedRequest);
      console.log(arrayOfResponses);
      const allYears = [];
      arrayOfResponses.forEach((item) => {
        const periodsArray = item.map((items2) => items2.period);
        allYears.push(...periodsArray);
      });
      const sortedYear = sortBy(uniq(allYears));
      const ChartSeriesObject = [];
      for (let index = 0; index < dataSources.length; index += 1) {
        const dataSourceObject = dataSources[index];
        // Knowing fully well that the datasource follows the same array position
        // as the Promise.all result
        const dataSourceData = arrayOfResponses[index];
        const dataSourceDataArray = [];

        sortedYear.forEach((yearItem) => {
          const dataFound = dataSourceData.find(
            (item) => item.period === yearItem,
          );
          if (dataFound) {
            dataSourceDataArray.push(parseFloat(dataFound.value));
          } else {
            dataSourceDataArray.push(null);
          }
        });
        const seriesObj = {
          name: dataSourceObject.datasource,
          data: dataSourceDataArray,
        };
        ChartSeriesObject.push(seriesObj);
      }
      return {
        ChartSeriesObject,
        sortedYear,
      };
    },
    async getData(controlObject) {
      const data = await this.dlQuery({
        indicator: controlObject.id,
        location: 1, // id 1 is for National Nigeria
        value_type: 2, // value_types 2 is for values
      });
      return data;
    },
    updateChart(e) {
      this.ChartOptions.chart.type = e;
    },
    async onSelectedSource(e) {
      console.log(e);
      const dataSourcesSelected = e.map((datasource) => this.dlGetDataSource(datasource.id));
      const queryObject = {
        indicator: this.values.indicator.id,
        location: 1,
        value_type: [2, 3, 4],
      };

      const {
        sortedYear,
        ChartSeriesObject,
      } = await this.formatToHighChartSeries(queryObject, dataSourcesSelected);
      this.setUpHighChartConfig(sortedYear, ChartSeriesObject);
    },
    async onConfidenceRangeClicked(e) {
      /**
       * initially set the first data source
       */
      this.loading = true;
      if (e === 'ON') {
        this.selectedDS.push(this.dataSourcesOptions[0]);
        const dataSourcesSelected = this.selectedDS.map(
          (datasource) => this.dlGetDataSource(datasource.id),
        );
        const queryObject = {
          indicator: this.values.indicator.id,
          location: 1,
          value_type: 2,
        };

        const {
          sortedYear,
          ChartSeriesObject,
        } = await this.formatToHighChartSeries(queryObject, dataSourcesSelected);
        this.setUpHighChartConfig(sortedYear, ChartSeriesObject);
      } else {
        this.selectedDS = [];
      }
      this.loading = false;
    },
  },
  mounted() {
    // this.selectedDS.push(this.dataSourcesOptions[0]);
  },
};
</script>

<style lang="scss" scoped></style>
