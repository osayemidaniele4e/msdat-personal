/* eslint-disable no-await-in-loop */
<template>
  <!-- <base-overlay :show="loading"> -->
  <div id="the-table">
    <div v-if="!loading">
      <base-sub-card showControls :showDownload="false" v-if="Object.keys(values).length">
        <template #title>
          <div
            class="w-100 d-flex justify-content-between align-items-center position-relative p-1"
          >
            <p class="work-sans mb-0 line-height sub-title">
              <b>{{ values.indicator.short_name }}</b>
              and related indicators (with year of latest values) across {{ values.location.name }}.
            </p>

            <div class="share-wrapper">
              <div
                @mouseover="showTooltip"
                @mouseout="hideTooltip"
                @click="toggleShowShareModal"
                class=""
              >
                <img src="@/assets/html.png" alt="" />
              </div>
            </div>
            <!-- <div v-if="showPopUp" class="pop-up">
              <h3 @click="toggleShowShareModal" >Share as HTML Code</h3>

            </div> -->
          </div>
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
          id="indicatorTable"
          :replaceItem="replaceItem"
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
    <ShareCodeModal
      @toggleShowShareModal="closeShareModal"
      v-if="showShareCodeModal"
      :tableContent="shareUrl"
    />
  </div>

  <!-- </base-overlay> -->
</template>

<script>
import { mapGetters } from 'vuex';
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import TableLoader from '@/modules/msdat-dashboard/components/table/TableLoader.vue';
import chartDownload from '../../../mixins/chart_download';
import IndicatorMetaDataModal from './info_modal/IndicatorMetaDataModal.vue';
import DataSourceMetaDataModal from './info_modal/DataSourceMetaDataModal.vue';
import ShareCodeModal from './shareTableModal.vue';

export default {
  mixins: [chartDownload, formatter],
  components: {
    TableComponent,
    IndicatorMetaDataModal,
    DataSourceMetaDataModal,
    TableLoader,
    ShareCodeModal,
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
      showShareCodeModal: false,
      tableObj: null,
      tableLink: null,
      isTooltipVisible: false,
      shareUrl: null,
      showPopUp: false,
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
      async handler({ indicator, location, datasource }) {
        this.loading = true;
        const formattedData = [];
        let indicators = [indicator.id, indicator.first_related, indicator.second_related];

        if (!this.getConfigObject.showTableRelatedIndicator) {
          indicators = [indicator.id];
        }

        for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
          const indicatorID = indicators[indicatorIndex];
          if (indicatorID) {
            const data = [];
            const dataSources = this.dlGetDashboardDataSource();
            const temp = dataSources.filter((item) => item.id !== 30);
            const indicatorObject = this.dlGetIndicator(indicatorID);
            for (let index = 0; index < temp.length; index += 1) {
              const element = temp[index];
              // eslint-disable-next-line no-await-in-loop
              const ab = await this.dlGetLatestSourceAndIndicatorData({
                indicator: indicatorID,
                datasource: element.id,
                location: location.id,
              });
              data.push(ab);
            }
            formattedData.push(this.tableComponentDataFormatter(indicatorObject, data));
          }
          this.TableData = formattedData;
          this.setTableSelected = datasource;
          this.loading = false;
        }
      },
      deep: true,
    },
    // 'values.datasource': {
    //   handler(newValue) {
    //     this.setTableSelected = newValue;
    //   },
    // },
    updateData: {
      async handler() {
        // this.loading = true;
        // const formattedData = [];
        // let indicators = [
        //   this.values.indicator.id,
        //   this.values.indicator.first_related,
        //   this.values.indicator.second_related,
        // ];
        // if (!this.getConfigObject.showTableRelatedIndicator) {
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
  computed: {
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
  },
  methods: {
    /**
     * @param {Object} queryObject  The query Object
     * @param {number} queryObject.indicator The id of the indicator
     * @param {number} queryObject.datasource The id of the datasource
     * @returns {dataObjectType}
     */

    toggleShowShareModal() {
      this.showPopUp = false;
      const routeTitle = this.$route.params.name;
      localStorage.setItem('dashboardName', routeTitle);
      console.log(this.$route);
      const storedIndicatorID = localStorage.getItem('indicatorID');
      const indicatorID = storedIndicatorID === null ? 7 : storedIndicatorID;
      const storedLocationId = localStorage.getItem('locationId');
      const locationId = storedLocationId === null ? 1 : storedLocationId;
      const url = `${window.location.origin}/indicator-table?dashboard_name=${routeTitle}&indicatorId=${indicatorID}&location=${locationId}`;
      console.log(url);
      const iframeUrl = `<iframe style="padding: 5px; width: 95%; padding: 10px; height: 500px; margin: 40px;" src="${url}" />`;
      this.shareUrl = iframeUrl;
      this.showShareCodeModal = true;
    },

    closeShareModal() {
      this.showShareCodeModal = false;
    },
    togglePopUp() {
      this.showPopUp = !this.showPopUp;
    },
    async dlGetLatestSourceAndIndicatorData(queryObject) {
      const routeTitle = this.$route.path;
      const filteredIndicator = await this.dlQuery(queryObject);
      if (routeTitle.endsWith('Demographics')) {
        if (filteredIndicator.length > 0) {
          const presentYear = new Date().getFullYear();
          return filteredIndicator.reduce((max, currentValues) => {
            if (currentValues.period > max.period && currentValues.period <= presentYear) {
              return currentValues;
            }
            return max;
          });
        }
      } else if (filteredIndicator.length > 0) {
        return filteredIndicator.reduce((max, currentValues) => {
          if (currentValues.period > max.period) {
            return currentValues;
          }
          return max;
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

    getValue(value) {
      this.$emit('value', value);
    },

    getKey(key) {
      this.$emit('key', key);
    },
    replaceItem(newItem) {
      this.TableData.splice(newItem.index, 1, newItem.formattedData[0]);
      console.log(newItem, '@@FX');
    },

    getReset() {
      this.$emit('reset');
    },
    async populateTableData() {
      const newValues = this.values.indicator;
      this.loading = true;
      const formattedData = [];
      let indicators = [newValues.id, newValues.first_related, newValues.second_related];

      if (!this.getConfigObject.showTableRelatedIndicator) {
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
    showTooltip() {
      this.isTooltipVisible = true;
    },
    hideTooltip() {
      this.isTooltipVisible = false;
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

.share-btn {
  // height: auto;
  // padding: 0;
  margin: 0 5px;
  // padding: 0 6px;
  // margin-right: 5px;
  // margin-top: 2px;
  // padding-bottom: 2px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b3b3b3;
  border-radius: 50px;
  cursor: pointer;
}

.share-btn img {
  width: 32px;
  height: 32px;
}

.share-wrapper {
  display: flex;
  cursor: pointer;
}

.tooltip-wrap {
  background-color: #333;
  color: #fff;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 1rem;
}

.pop-up {
  height: fit-content;
  background-color: #fff;
  z-index: 99999;
  padding: 10px;
  position: absolute;
  width: 200px;
  right: 0;
  top: 50px;
  border-radius: 10px;
  border: 1px solid #b3b3b3;
}
.pop-up h3 {
  font-size: 12px;
  cursor: pointer;
}
.pop-up h3:hover {
  color: #00ac40;
}
.sub-title {
  font-size: 14px;
}
</style>
