/* eslint-disable no-await-in-loop */
<template>
  <base-overlay :show="loading">
    <base-sub-card showControls v-if="Object.keys(values).length">
      <template #title>
        <p class="work-sans mb-0 line-height">
          <b>{{ values.indicator.short_name }}</b> And Related Indicators With Years Of Latest Value
          Across The <b>Country</b>
        </p>
      </template>
      <TableComponent
        class="work-sans"
        v-if="TableData.length > 0"
        :dataArray="TableData"
        :setSelectedSource="setTableSelected"
        @selected:source="updateControlPanel($event)"
        @selected:source-info="dataSourceModalFunc($event)"
        @selected:indicator-info="indicatorModalFunc($event)"
      />
    </base-sub-card>
    <base-modal :showModal="showModal" size="lg">
      <!-- <template v-if="DisplayType === 'indicator'"> -->
      <template #title>
        <h5>{{ modalTitle }}</h5>
      </template>
      <IndicatorMetaDataModal
        v-if="showModal && DisplayType === 'indicator'"
        :indicatorSelectedID="indicatorSelectedID"
      />

      <DataSourceMetaDataModal
        v-if="showModal && DisplayType === 'datasource'"
        :dataSourceID="dataSourceID"
      />
      <!-- </template> -->
    </base-modal>
  </base-overlay>
</template>

<script>
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import IndicatorMetaDataModal from './info_modal/IndicatorMetaDataModal.vue';
import DataSourceMetaDataModal from './info_modal/DataSourceMetaDataModal.vue';

export default {
  mixins: [formatter],
  components: {
    TableComponent,
    IndicatorMetaDataModal,
    DataSourceMetaDataModal,
  },
  data() {
    return {
      TableData: '',
      loading: true,
      showModal: false,
      setTableSelected: {},
      indicatorSelectedID: '',
      dataSourceID: '',
      modalTitle: '',
      DisplayType: '',
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

    showTableRelatedIndicator: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    'values.indicator': {
      async handler(newValues) {
        this.loading = true;
        const formattedData = [];
        let indicators = [newValues.id, newValues.first_related, newValues.second_related];

        if (!this.showTableRelatedIndicator) {
          indicators = [newValues.id];
        }

        for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
          const indicatorID = indicators[indicatorIndex];
          if (indicatorID) {
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
            formattedData.push(this.tableComponentDataFormatter(indicatorObject, data));
          }
          this.TableData = formattedData;
          this.loading = false;
        }
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

    /*
     * updated control panel datasource when  table is clicked
     * @param {Object} indicatorObject  The indicator Object
     */

    updateControlPanel(datasourceObject) {
      this.$store.commit('MSDAT_STORE/SET_DEFAULT', {
        controlIndex: 0,
        key: 'dataSource',
        value: datasourceObject,
      });
    },
    indicatorModalFunc(e) {
      this.indicatorSelectedID = e.id;
      this.modalTitle = e.short_name;
      this.DisplayType = 'indicator';
      this.showModal = !this.showModal;
    },
    dataSourceModalFunc(e) {
      this.dataSourceID = e.id;
      this.modalTitle = e.datasource;
      this.DisplayType = 'datasource';
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
