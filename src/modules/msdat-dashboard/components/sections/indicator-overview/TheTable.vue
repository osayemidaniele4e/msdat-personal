/* eslint-disable no-await-in-loop */
<template>
  <!-- <base-overlay :show="loading"> -->
  <div id="the-table">
    <div v-if="!loading">
      <base-sub-card
        :showDropdown="false"
        showControls
        :showDownload="false"
        v-if="Object.keys(values).length"
      >
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
                class="share-btn"
              >
                <img src="@/assets/html.png" alt="" />
              </div>
              <!-- <div class="analyze-btn"
                   @click.prevent="toggleShowAnalysis"
                   :class="{ 'disabled': analysisLoading }"
              >
                <img src="@/assets/img/analysis.svg" alt="Analyze" />
                <span v-if="analysisLoading" class="loading-indicator">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </span>
              </div> -->
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
    <ChartAnalysisModal
      :show="showAnalysisModal"
      :chartImage="capturedChart"
      :indicatorData="values.indicator"
      @close="closeAnalysisModal"
    />
  </div>

  <!-- </base-overlay> -->
</template>

<script>
import { mapGetters } from 'vuex';
import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import TableLoader from '@/modules/msdat-dashboard/components/table/TableLoader.vue';
import html2canvas from 'html2canvas';
import chartDownload from '../../../mixins/chart_download';
import IndicatorMetaDataModal from './info_modal/IndicatorMetaDataModal.vue';
import DataSourceMetaDataModal from './info_modal/DataSourceMetaDataModal.vue';
import ShareCodeModal from './shareTableModal.vue';
import ChartAnalysisModal from './ChartAnalysisModal.vue';

export default {
  mixins: [chartDownload, formatter],
  components: {
    TableComponent,
    IndicatorMetaDataModal,
    DataSourceMetaDataModal,
    TableLoader,
    ShareCodeModal,
    ChartAnalysisModal,
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
      showAnalysisModal: false,
      capturedChart: null,
      analysisLoading: false,
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
            
            // const temp = dataSources.filter((item) => item.id !== 30);
            const indicatorObject = this.dlGetIndicator(indicatorID);
            for (let index = 0; index < dataSources.length; index += 1) {
              const element = dataSources[index];
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
      const storedIndicatorID = localStorage.getItem('indicatorID');
      const indicatorID = storedIndicatorID === null ? 7 : storedIndicatorID;
      const storedLocationId = localStorage.getItem('locationId');
      const locationId = storedLocationId === null ? 1 : storedLocationId;
      const url = `${window.location.origin}/indicator-table?dashboard_name=${routeTitle}&indicatorId=${indicatorID}&location=${locationId}`;
    
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
    parsePeriodToDate(period) {
      // Check for "week" format, e.g., "2024 week 40"
      const weekMatch = period.match(/^(\d{4})\s+week\s+(\d{1,2})$/i);
      if (weekMatch) {
        const year = parseInt(weekMatch[1], 10);
        const week = parseInt(weekMatch[2], 10);

        // Week-based date: approximate start of the week (Monday)
        const simple = new Date(year, 0, 1 + (week - 1) * 7);
        const day = simple.getDay();
        const ISOweekStart = new Date(simple); // clone date

        if (day <= 4) {
          ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        } else {
          ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        }

        return ISOweekStart;
      }

      // Try to parse as "Month Year"
      const fullDate = new Date(period);
      if (!Number.isNaN(fullDate)) return fullDate;

      // Fallback: just a year (e.g., "2015")
      const yearOnly = new Date(`${period}-01-01`);
      return yearOnly;
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
        if (filteredIndicator.length === 0) return null;

        return filteredIndicator.reduce((latest, current) => {
          const latestDate = this.parsePeriodToDate(latest.period);
          const currentDate = this.parsePeriodToDate(current.period);

          return currentDate > latestDate ? current : latest;
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
    async toggleShowAnalysis(e) {
      // Prevent default event behavior and stop propagation
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // If modal is already open, just close it
      if (this.showAnalysisModal) {
        this.closeAnalysisModal();
        return;
      }

      try {
        this.analysisLoading = true;
       

        // Find the chart element
        const chartElement = document.querySelector('#state-bar-chart .iddc_wrapper');
      
        if (!chartElement) {
          console.error('Chart element not found');
          return;
        }

        // Wait for next tick to ensure chart is rendered
        await this.$nextTick();
       

        // Capture the chart
       
        const canvas = await html2canvas(chartElement, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('.iddc_wrapper');
            if (clonedElement) {
              clonedElement.style.visibility = 'visible';
              clonedElement.style.display = 'block';
            }
          },
        });
        

        // Store the captured image
        this.capturedChart = canvas.toDataURL('image/png');
        console.log(
          'Chart converted to data URL, length:',
          this.capturedChart ? this.capturedChart.length : 0
        );

        // Show the modal
        this.showAnalysisModal = true;
        console.log('Modal state set to true');

        console.log('Toggle analysis:', {
          showAnalysisModal: this.showAnalysisModal,
          hasChart: !!this.capturedChart,
          hasIndicator: !!this.values.indicator,
        });
      } catch (error) {
        console.error('Error capturing chart:', error);
      } finally {
        this.analysisLoading = false;
      }
    },
    closeAnalysisModal() {
      this.showAnalysisModal = false;
      // Reset the captured chart to prevent memory issues
      this.capturedChart = null;
    },
    onChartCaptured({ image }) {
      console.log('Chart captured:', {
        hasImage: !!image,
        imageLength: image ? image.length : 0,
      });
      this.capturedChart = image;
      // Optional: automatically show analysis after capture
      this.toggleShowAnalysis();
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

.analyze-btn {
  // Similar styling to share-btn
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b3b3b3;
  border-radius: 50px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    border: 1px solid #61a229;
  }

  position: relative;

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
