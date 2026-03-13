<template>
  <tbody v-if="bodyValue !== null">
    <tr class="row-bg">
      <td class="indicator">{{ indicatorData.full_name }}</td>
      <td v-for="(header, i) in updatedDataSources" :key="i">
        <div v-for="(item, i) in bodyValue" :key="i" class="">
          <div class="content-row" v-if="header.id === item?.datasource">
            <h4>
              {{ item.value }}
            </h4>
            <p>{{ item.period }}</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';

export default {
  props: {
    indicator: Number,
    datasourcesObj: Array,
    location: String,
  },
  data() {
    return {
      indicatorData: null,
      bodyValue: null,
      updatedDataSources: null,
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
      console.log(response, 'Data body nnn');
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
      console.log(this.indicator, ' XXXXX 0');
      const indicatorMetaData = await apiServices.getSingleIndicatorObj(this.indicator);
      this.indicatorData = indicatorMetaData.data;

      const tableDataPromises = this.datasourcesObj.map(async (item) => this.getValue(item, this.indicator, this.location));
      try {
        const tableData = await Promise.all(tableDataPromises);
        const tableBodyData = tableData.map((item) => (item.results.length ? item.results[0] : null));

        // console.log(tableBodyData, 'datasources main 2xx 1');
        if (tableBodyData !== null) {
          this.bodyValue = tableBodyData;
        }
        this.updatedDataSources = this.reorderedTableHead(this.datasourcesObj);

        // console.log(updated, 'HAHAHAHAHXXX');

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

      // const indicators = [7, 6, 5];
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
};
</script>

<style lang="scss" scoped>
.indicator {
  width: 250px;
  font-size: 15px;
  font-weight: bold;
}
.content-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-row p {
    font-size: 12px;
}
</style>
