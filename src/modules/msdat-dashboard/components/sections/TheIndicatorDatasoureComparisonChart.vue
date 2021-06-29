<template>
  <base-overlay :show="loading">
    <base-sub-card showControls v-if="values">
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
import { sortBy } from 'lodash';
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
        this.loading = true;
        // Query the data from db;
        const data = await this.dlQuery({
          indicator: newValues.id,
          location: 1, // id 1 is for National Nigeria
          value_type: 2, // value_types 2 is for values
        });

        /*
        * Sort data
        *
        */
        // const sortedData = data.sort((a, b) => Number(a.period) - Number(b.period));
        // console.log(sortedData);
        // const sortedData = sortBy(data, ['period']);
        // console.log(sortedData);
        const dataSources = this.dlGetDashboardDataSource();
        // debugger;
        const ChartSeriesObject = [];
        for (let index = 0; index < dataSources.length; index += 1) {
          const element = dataSources[index];
          const filterDatasource = data.filter(
            (item) => item.datasource === element.id,
          );
          // console.log(filterDatasource);
          const arry = filterDatasource.map((item) => [
            item.period,
            parseFloat(item.value),
          ]);
          console.log(arry);
          const sortedData = sortBy(arry, ['period']);
          const seriesObj = {
            name: element.datasource,
            data: sortedData,
          };
          ChartSeriesObject.push(seriesObj);

          // console.log(seriesObj);
        }
        this.ChartOptions = {
          chart: {
            type: 'line',
            zoomType: 'xy',
          },
          series: ChartSeriesObject,
        };
        // this.ChartOptions.series = ChartSeriesObject;
        // console.log(ChartSeriesObject);
        // const filterDatasource = data.filter((item) => item.datasource === 2);
        // console.log(filterDatasource);
        // console.log(data);
        // const data = await this.getData(newValues);
        this.loading = false;
      },
      deep: true,
    },
  },
  methods: {
    async getData(optionsObject) {
      const {
        datasource, indicator, location, year,
      } = optionsObject;
      let locationValue = location;
      if (location.id === 1) {
        locationValue = { level: 3 };
      }
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        value_type: 2,
        location: locationValue,
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
