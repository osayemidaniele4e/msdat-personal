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
        const data = await this.getData(newValues);
        const dataSources = this.dlGetDashboardDataSource(); // get all dataSource for dashboard
        const allYears = data.map((item) => item.period); // mapOut all years
        const sortedYear = sortBy(uniq(allYears)); //  sort uniques years
        const ChartSeriesObject = [];

        for (let index = 0; index < dataSources.length; index += 1) {
          const element = dataSources[index];
          /*
           * filter data for a particular dataSource
           */
          const filterDatasource = data.filter(
            (item) => item.datasource === element.id,
          );
          const dataSourceDataArray = [];
          // find data for year on each values for the dataSource;
          sortedYear.forEach((yearItem) => {
            const dataFoundForYear = filterDatasource.find(
              (item) => item.period === yearItem,
            );
            if (dataFoundForYear) {
              dataSourceDataArray.push(parseFloat(dataFoundForYear.value));
            } else {
              dataSourceDataArray.push(null); // null is used to tell highChart to not connect
              // the dot it different from Zero
            }
          });
          // This is trying to following the Order to pass series to HighChart
          const seriesObj = {
            name: element.datasource,
            data: dataSourceDataArray,
          };
          ChartSeriesObject.push(seriesObj);
        }
        /*
         * according to the highChart options also according to mockup
         */
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
        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
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
    onSelectedSource(e) {
      console.log(e);
    },
    onConfidenceRangeClicked(e) {
      /**
       * initially set the first data source
       */
      if (e === 'ON') {
        this.selectedDS.push(this.dataSourcesOptions[0]);
      } else {
        this.selectedDS = [];
      }
    },
  },
  mounted() {
    // this.selectedDS.push(this.dataSourcesOptions[0]);
  },
};
</script>

<style lang="scss" scoped></style>
