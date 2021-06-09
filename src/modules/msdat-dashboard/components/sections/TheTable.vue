/* eslint-disable no-await-in-loop */
/* eslint-disable no-await-in-loop */
<template>
  <SubCard showControls>
    <template #title>
      <h6 class="work-sans">
        Distribution Of
        <b>{{ values.indicator.short_name}}</b> Across The Country. Source:<b>
          {{ values.datasource.datatsource}} {{ values.year}}</b>
      </h6>
    </template>
    <TableComponent v-if="TableData.length" :dataArray="TableData" />
    <button @click="forTable()">Click me</button>
  </SubCard>
</template>

<script>
import SubCard from '@/components/ui-components/SubCard.vue';
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    SubCard,
    TableComponent,
  },
  data() {
    return {
      TableData: '',
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
    values: {
      async handler(newValues) {
        console.log(newValues);
      },
      deep: true,
    },
  },
  methods: {
    // async getData(optionsObject) {
    //   const {
    //     datasource, indicator, location, year,
    //   } = optionsObject;
    //   let locationValue = location;
    //   if (location.id === 1) {
    //     locationValue = { level: 3 };
    //   }
    //   const data = await this.dlQuery({
    //     datasource: datasource.id,
    //     indicator: indicator.id,
    //     period: year,
    //     value_type: 2,
    //     location: locationValue,
    //   });
    //   return data;
    // },
    async forTable() {
      const indicators = [7, 5, 8];
      const formattedData = [];

      for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
        const indicatorID = indicators[indicatorIndex];
        const data = [];
        const dataSources = this.dlGetDashboardDataSource();
        const indicatorObject = this.dlGetIndicator(indicatorID);
        for (let index = 0; index < dataSources.length; index += 1) {
          const element = dataSources[index];
          // eslint-disable-next-line no-await-in-loop
          const ab = await this.dlGetLatestSourceAndIndicatorData({
            indicator: indicatorID,
            datasource: element.id,
            location: 1,
          });
          data.push(ab);
        }
        formattedData.push(this.tableComponentDataFormatter(indicatorObject, data));
      }
      this.TableData = formattedData;
      console.log(formattedData);
    },
  },
};
</script>

<style lang="scss" scoped></style>
