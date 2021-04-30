<template>
    <div>
        <h1>MSDAT DASHBOARD</h1>
        <button @click="execute()" class="btn btn-primary rounded-0">GO</button>
    </div>
</template>

<script>
import { MSDAT } from '@/config/dashboardGroups';
import formatter from '../mixins/formatter';

export default {
  mixins: [formatter],
  async mounted() {
    await this.$DL.init(
      {
        dashboardIndicators: MSDAT.dashboardIndicators,
        defaultIndicators: MSDAT.defaultIndicators,
      },
    );

    const data = this.dlQuery({ datasource: 8, indicator: 7 });
    console.log({ query: data });
  },
  methods: {
    execute() {
      const data = [];
      const dataSources = this.dlGetDashboardDataSource();
      console.log(dataSources);
      debugger;
      const indicatorObject = this.dlGetIndicatorDataObject(7);
      dataSources.forEach((item) => {
        data.push(this.dlGetLatestSourceAndIndicatorData(
          { indicator: 7, datasource: item, location: 1 },
        ));
      });

      console.log(data);
      console.log(this.tableComponentDataFormatter(indicatorObject, data));
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
