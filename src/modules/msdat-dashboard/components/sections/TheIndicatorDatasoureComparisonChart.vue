<template>
  <base-overlay :show="loading">
    <base-sub-card showControls v-if="values">
      <template #title>
        <h6 class="work-sans">
          Comparison Of <b>{{ values.indicator.short_name }}</b> Across Different Data Source
        </h6>
      </template>
      <!-- <BarChart :chartOptions="BarChartOptions" /> -->
    </base-sub-card>
  </base-overlay>
</template>

<script>
// import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    // BarChart,
  },
  data() {
    return {
      BarChartOptions: {},
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

        const dataSources = this.dlGetDashboardDataSource();
        // debugger;
        for (let index = 0; index < dataSources.length; index += 1) {
          const element = dataSources[index];
          const filterDatasource = data.filter((item) => item.datasource === element.id);
          console.log(filterDatasource);
        }
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
