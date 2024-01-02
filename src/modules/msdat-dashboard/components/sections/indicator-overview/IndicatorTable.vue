<template>
  <div class="m-5 ">
    <table class="table table-bordered">
    <tableHeaders v-if="datasourcesObj !== null" :datasourcesObj="datasourcesObj" :indicator="indicator" />
    <tableMainBody :bodyValue="bodyValue" :datasourcesObj="datasourcesObj" :indicator="indicator" />
   <div class="w-100 my-2 px-3">
    <h4>Related Indicators</h4>
   </div>
   <tableFirstRelatedBody v-if="updatedDataSourcesObject !== null" :indicator="firstRelatedIndicator" :datasourcesObj="updatedDataSourcesObject" :location="location" />

    <tableSecondRelatedBody v-if="updatedDataSourcesObject !== null" :indicator="secondRelatedIndicator" :datasourcesObj="updatedDataSourcesObject" :location="location" />

    </table>
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';
import tableHeaders from './IndicatorTableHeader.vue';
import tableMainBody from './IndicatorMainData.vue';
import tableSecondRelatedBody from './indicatorSecondRelated.vue';
import tableFirstRelatedBody from './IndicatorFirstRelated.vue';

export default {
  components: {
    tableHeaders,
    tableMainBody,
    tableSecondRelatedBody,
    tableFirstRelatedBody,
  },
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
      datasourcesObj: null,
      availableClassification: null,
      bodyValue: null,
      indicator: null,
      secondRelatedIndicator: null,
      firstRelatedIndicator: null,
      location: null,
      updatedDataSourcesObject: null,
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
      return response.data;
    },

    showItems(item) {
      console.log(item, 'ABCDE');
    },

    reorderedTableHead(datasourcesObj) {
      // Filter NHMIS-DHIS2 (monthly) and NHMIS-DHIS2
      const nhmisDhis2Monthly = datasourcesObj.find((item) => item.datasource === 'NHMIS-DHIS2 (monthly)');
      const nhmisDhis2 = datasourcesObj.find((item) => item.datasource === 'NHMIS-DHIS2');

      // Remove NHMIS-DHIS2 (monthly) and NHMIS-DHIS2 from the array
      const filteredArray = datasourcesObj.filter((item) => item.datasource !== 'NHMIS-DHIS2 (monthly)' && item.datasource !== 'NHMIS-DHIS2');

      // Construct the new array with NHMIS-DHIS2 (monthly) and NHMIS-DHIS2 at the beginning
      const restructuredArray = [
        ...(nhmisDhis2Monthly ? [nhmisDhis2Monthly] : []),
        ...(nhmisDhis2 ? [nhmisDhis2] : []),
        ...filteredArray,
      ];

      return restructuredArray;
    },
  },

  async created() {
    try {
      const indicatorId = this.$route.query.indicatorId;
      const location = this.$route.query.location;
      const indicatorMetaData = await apiServices.getSingleIndicatorObj(indicatorId);
      this.indicator = indicatorMetaData.data;
      this.location = this.$route.query.location;
      // console.log(indicatorMetaData, 'ABCDEF');

      const datasources = indicatorMetaData.data.datasources;
      this.secondRelatedIndicator = indicatorMetaData.data.second_related;
      this.firstRelatedIndicator = indicatorMetaData.data.first_related;
      // const relatedIndicatorsPromises = [
      //   apiServices.getSingleIndicatorObj(indicatorMetaData.data.first_related),
      //   apiServices.getSingleIndicatorObj(indicatorMetaData.data.second_related),
      // ];

      // const [first_related, second_related] = await Promise.all(relatedIndicatorsPromises);

      const dataSourcesObjsPromises = datasources.map(async (dataSourceId) => {
        const dataObj = await apiServices.getSingleDataSourceObj(dataSourceId);
        return dataObj.data;
      });

      const dataSourcesObjs = await Promise.all(dataSourcesObjsPromises);
      // console.log(dataSourcesObjs, 'ABCDEF');
      this.datasourcesObj = this.reorderedTableHead(dataSourcesObjs);
      // console.log(this.datasourcesOb, 'ABCDEF 22');

      const temp = new Set();
      dataSourcesObjs.forEach((item) => {
        temp.add(item.classification);
      });

      this.availableClassification = [...temp];

      console.log(dataSourcesObjs, 'data sources object');

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

      console.log(dataSourcesObjs, 'ABCDEF y');

      console.log(updatedDataSources, 'ABCDEF x');

      this.updatedDataSourcesObject = updatedDataSources;

      // const indicators = [7, 6, 5];

      const tableDataPromises = updatedDataSources.map(async (item) => this.getValue(item, indicatorId, location));

      try {
        const tableData = await Promise.all(tableDataPromises);
        const tableBodyData = tableData.map((item) => (item.results.length ? item.results[0] : null));
        console.log(tableBodyData, 'ABCDEF 1');

        // console.log(tableBodyData, 'datasources main 2xx 1');
        if (tableBodyData !== null) {
          this.bodyValue = tableBodyData;
        }

        console.log(this.bodyValue, 'ABCDEF');

        // Continue with the rest of your logic using tableData
      } catch (error) {
        console.error('Error fetching table data:', error);
        // Handle the error as needed
        // const datasources = [
        //   { datasource: 'NNHS', id: 1 },
        //   { datasource: 'MICS', id: 1 },
        //   { datasource: 'NHMIS-DHIS2 (monthly)', id: 1 },
        //   { datasource: 'NHMIS-DHIS2 ', id: 2 },
        // ];
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
