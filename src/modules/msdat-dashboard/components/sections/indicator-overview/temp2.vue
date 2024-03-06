<template>
  <div class="m-5 border">
    <h1>Hello, its me</h1>
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';

export default {
  data() {
    return {
      // valueType: [],
      valueType: [
        {
          id: 1,
          value_type: 'Estimate',
        },
        {
          id: 2,
          value_type: 'Survey',
        },
        {
          id: 3,
          value_type: 'Lower bound',
        },
        {
          id: 4,
          value_type: 'Upper bound',
        },
        {
          id: 5,
          value_type: 'Routine',
        },
        {
          id: 6,
          value_type: 'Numerator',
        },
        {
          id: 7,
          value_type: 'Denominator',
        },
      ],
    };
  },

  methods: {
    async getValue(datasource, indicator, location) {
      const valueType = datasource.value_type;
      const datasourceId = datasource.id;
      const response = await apiServices.getIndicatorTableData(
        indicator,
        datasourceId,
        valueType,
        location,
      );
      console.log(response, 'datasources main 1');
      return response;
    },
  },

  async created() {
    try {
      const indicatorId = this.$route.query.indicatorId;
      const location = this.$route.query.location;
      const indicatorMetaData = await apiServices.getSingleIndicatorObj(indicatorId);

      const datasources = indicatorMetaData.data.datasources;
      const relatedIndicatorsPromises = [
        apiServices.getSingleIndicatorObj(indicatorMetaData.data.first_related),
        apiServices.getSingleIndicatorObj(indicatorMetaData.data.second_related),
      ];

      // const [first_related] = await Promise.all(relatedIndicatorsPromises);
      await Promise.all(relatedIndicatorsPromises);

      const dataSourcesObjsPromises = datasources.map(async (dataSourceId) => {
        const dataObj = await apiServices.getSingleDataSourceObj(dataSourceId);
        return dataObj.data;
      });

      const dataSourcesObjs = await Promise.all(dataSourcesObjsPromises);

      const updatedDataSources = dataSourcesObjs.map((item) => {
        const valueTypeItem = this.valueType.find((v) => v.value_type === item.classification);
        if (valueTypeItem) {
          return {
            ...item,
            value_type: valueTypeItem.id,
          };
        }
        return item; // Handle the case where no matching classification is found
      });

      const tableData = updatedDataSources.map(async (item) => {
        const response = await this.getValue(item, indicatorId, location);
        return response;
      });
      console.log(tableData, 'datasources main 2');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
};
</script>

<style lang="scss" scoped></style>
