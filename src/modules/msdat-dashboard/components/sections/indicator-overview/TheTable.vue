/* eslint-disable no-await-in-loop */
<template>
  <base-overlay :show="loading">
    <base-sub-card showControls v-if="values">
      <template #title>
        <p class="work-sans mb-0 line-height">
          <b>{{ values.indicator.short_name }}</b> And Related Indicators With
          Years Of Latest Value Across The <b>Country</b>
        </p>
      </template>
      <TableComponent
        class="work-sans"
        v-if="TableData.length"
        :dataArray="TableData"
        :setSelectedSource="setTableSelected"
        @selected:source="updateControlPanel($event)"
      />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    TableComponent,
  },
  data() {
    return {
      TableData: '',
      loading: true,
      setTableSelected: {},
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
        const formattedData = [];
        const indicators = [
          newValues.id,
          newValues.first_related,
          newValues.second_related,
        ];

        for (
          let indicatorIndex = 0;
          indicatorIndex < indicators.length;
          indicatorIndex += 1
        ) {
          const indicatorID = indicators[indicatorIndex];
          const data = [];
          const dataSources = this.dlGetDashboardDataSource();
          console.trace(dataSources);
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
          formattedData.push(
            this.tableComponentDataFormatter(indicatorObject, data),
          );
        }
        this.TableData = formattedData;
        this.loading = false;
      },
    },
    'values.datasource': {
      handler(newValue) {
        this.setTableSelected = newValue;
      },
    },
  },
  methods: {
    /**
     * @param {Object} queryObject  The query Object
     * @param {number} queryObject.indicator The id of the indicator
     * @param {number} queryObject.datasource The id of the datasource
     * @returns {dataObjectType}
     */
    async dlGetLatestSourceAndIndicatorData(queryObject) {
      const filteredIndicator = await this.dlQuery(queryObject);
      // console.log(queryObject);
      // console.log(filteredIndicator);
      if (filteredIndicator.length > 0) {
        return filteredIndicator.reduce((max, currentValues) => {
          // if (!(currentValues.period.length > 4)) {
          if (currentValues.period > max.period) {
            return currentValues;
          }
          return max;
          // }
          // return null;
        });
      }
      return null;
    },

    updateControlPanel(datasourceObject) {
      this.$store.commit('MSDAT_STORE/SET_DEFAULT', {
        controlIndex: 0,
        key: 'dataSource',
        value: datasourceObject,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
