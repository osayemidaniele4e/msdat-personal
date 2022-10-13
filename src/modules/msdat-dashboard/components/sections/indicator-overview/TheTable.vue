/* eslint-disable no-await-in-loop */
<template>
  <!-- <base-overlay :show="loading"> -->
  <div>
    <div v-if="!loading">
      <base-sub-card showControls :showDownload="false" v-if="Object.keys(values).length">
        <template #title>
          <p class="work-sans mb-0 line-height">
            <b>{{ values.indicator.short_name }}</b>
            and related indicators (with year of latest values) across available data sources.
          </p>
        </template>
        <TableComponent
          class="work-sans"
          v-if="TableData.length > 0"
          :dataArray="TableData"
          :values="values"
          :setSelectedSource="setTableSelected"
          @selected:source="updateControlPanel($event)"
          @selected:source-info="dataSourceModalFunc($event)"
          @selected:indicator-info="indicatorModalFunc($event)"
          @clickedDatasource="getValue"
          @key="getKey"
          @clickedReset="getReset"
        />
      </base-sub-card>
    </div>
    <TableLoader v-if="loading" />
    <base-modal :showModal="showModal" size="lg">
      <!-- <template v-if="DisplayType === 'indicator'"> -->
      <template #title>
        <div class="modal-title">{{ modalTitle }}</div>
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
  </div>
  <!-- </base-overlay> -->
</template>

<script>
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import TableLoader from '@/modules/msdat-dashboard/components/table/TableLoader.vue';
import chartDownload from '../../../mixins/chart_download';
import IndicatorMetaDataModal from './info_modal/IndicatorMetaDataModal.vue';
import DataSourceMetaDataModal from './info_modal/DataSourceMetaDataModal.vue';

export default {
  mixins: [chartDownload, formatter],
  components: {
    TableComponent,
    IndicatorMetaDataModal,
    DataSourceMetaDataModal,
    TableLoader,
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
      updateData: 0,
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
    updateData: {
      async handler() {
        // this.loading = true;
        // const formattedData = [];
        // let indicators = [
        //   this.values.indicator.id,
        //   this.values.indicator.first_related,
        //   this.values.indicator.second_related,
        // ];

        // if (!this.showTableRelatedIndicator) {
        //   indicators = [this.values.indicator.id];
        // }

        // for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
        //   const indicatorID = indicators[indicatorIndex];
        //   if (indicatorID) {
        //     const data = [];
        //     const dataSources = this.dlGetDashboardDataSource();
        //     const indicatorObject = this.dlGetIndicator(indicatorID);
        //     for (let index = 0; index < dataSources.length; index += 1) {
        //       const element = dataSources[index];
        //       // eslint-disable-next-line no-await-in-loop
        //       const ab = await this.dlGetLatestSourceAndIndicatorData({
        //         indicator: indicatorID,
        //         datasource: element.id,
        //         location: 1,
        //       });
        //       data.push(ab);
        //     }
        //     formattedData.push(this.tableComponentDataFormatter(indicatorObject, data));
        //   }
        //   this.TableData = formattedData;
        //   this.loading = false;
        // }
      },
      deep: true,
      immediate: false,
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
      if (this.$route.meta.title !== 'Demographics') {
        if (filteredIndicator.length > 0) {
          return filteredIndicator.reduce((max, currentValues) => {
            if (currentValues.period > max.period) {
              return currentValues;
            }
            return max;
          });
        }
      } else if (this.$route.meta.title === 'Demographics') {
        if (filteredIndicator.length > 0) {
          const presentYear = new Date().getFullYear();
          console.log(presentYear, 'hello');
          return filteredIndicator.reduce((max, currentValues) => {
            if (currentValues.period > max.period && currentValues.period <= presentYear) {
              console.log(currentValues, 'hello 1');
              return currentValues;
            }
            console.log(max, 'hello 2');
            return max;
          });
        }
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

    getValue(value) {
      this.$emit('value', value);
    },

    getKey(key) {
      this.$emit('key', key);
    },

    getReset() {
      this.$emit('reset');
    },
    async populateTableData() {
      const newValues = this.values.indicator;
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
  mounted() {
    this.updateData += 1;
    this.populateTableData();
  },
};
</script>

<style lang="scss" scoped>
.modal-title {
  font-weight: 700;
  color: black;
  opacity: 1;
  margin-left: 10px;
  font-size: 14px;
}
</style>
