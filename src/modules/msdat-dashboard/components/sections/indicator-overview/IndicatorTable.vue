<template>
  <div class="m-5 border" v-if="this.availableDataSources !== null">
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
      :availableDataSources="availableDataSources"
      :specificIndicators="specificIndicators"
      :factors="factors"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import TableComponent from '@/modules/msdat-dashboard/components/table/ShareTable/TableComponent.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import apiServices from '@/modules/data-layer/services/ApiServices';
import { formatFactor } from '@/util/helper';
import defaultConfig from './defaultConfig.json';
// import TableLoader from '@/modules/msdat-dashboard/components/table/TableLoader.vue';
import chartDownload from '../../../mixins/chart_download';
// import IndicatorMetaDataModal from './info_modal/IndicatorMetaDataModal.vue';
// import DataSourceMetaDataModal from './info_modal/DataSourceMetaDataModal.vue';
import DB from '../../../../data-layer/services/database.worker';

export default {
  mixins: [chartDownload, formatter],
  components: {
    TableComponent,
  },
  data() {
    return {
      values: {
        indicator: null,
        datasource: null,
      },
      TableData: [],
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
      isTooltipVisible: false,
      availableDataSources: [],
      specificIndicators: [],
      valueType: [
        {
          id: 1,
          value_type: 'Estimate',
          created_at: null,
          updated_at: null,
        },
        {
          id: 2,
          value_type: 'Survey',
          created_at: null,
          updated_at: null,
        },
        {
          id: 3,
          value_type: 'Lower bound',
          created_at: null,
          updated_at: null,
        },
        {
          id: 4,
          value_type: 'Upper bound',
          created_at: null,
          updated_at: null,
        },
        {
          id: 5,
          value_type: 'Routine',
          created_at: null,
          updated_at: null,
        },
        {
          id: 6,
          value_type: 'Numerator',
          created_at: '2021-07-02T08:45:20.707139Z',
          updated_at: '2021-07-02T08:45:20.707348Z',
        },
        {
          id: 7,
          value_type: 'Denominator',
          created_at: '2021-07-02T08:56:10.401735Z',
          updated_at: '2021-07-02T08:56:10.401798Z',
        },
      ],
      factors: [],
      tempData: [],
    };
  },
  watch: {
    'values.indicator': {
      async handler(newValues) {
        console.log(newValues);
        this.loading = true;
        const formattedData = [];
        const { indicatorId, indicatorFirstRelated, indicatorSecondRelated } = this.$route.query;
        // const indicators = [newValues.id, newValues.first_related, newValues.second_related];
        // const indicators = [indicatorId, indicatorFirstRelated, indicatorSecondRelated];
        const indicators = [Number(indicatorId), Number(indicatorFirstRelated), Number(indicatorSecondRelated)];

        console.log(indicators, 'length HH 1');

        for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
          const indicatorID = indicators[indicatorIndex];
          console.log(indicatorID, 'indicatorID');
          if (indicatorID) {
            const data = [];
            this.returnIndicatorObj(indicatorID);
            const dataSources = this.availableDataSources;
            // eslint-disable-next-line no-await-in-loop
            const indicatorObject = await this.returnIndicatorObj(indicatorID);
            console.log(dataSources, 'indicatorID 1');
            console.log(indicatorObject, 'indicatorID 2');
            console.log(dataSources.length, 'indicatorID 3');
            for (let index = 0; index < dataSources.length; index += 1) {
              const element = dataSources[index];
              console.log(element, 'indicatorID 3');
              // eslint-disable-next-line no-await-in-loop
              const ab = await this.dlGetLatestSourceAndIndicatorData({
                indicator: indicatorID,
                datasource: element.id,
                location: 1,
              });
              data.push(ab);
            }

            // eslint-disable-next-line no-await-in-loop
            const newData = await this.tableComponentDataFormat(indicatorObject, data);
            // console.log(newData, 'newData');
            // console.log(formattedData, '&&&HH');
            // eslint-disable-next-line no-await-in-loop
            // this.tempData.push(newData);
            formattedData.unshift(newData);
          }
          // console.log(formattedData, 'this.dataArray');
          this.TableData = formattedData;
          // console.log(this.TableData, '&&&HH&&');
          this.loading = false;
        }
      },
    },
    'values.datasource': {
      handler(newValue) {
        this.setTableSelected = newValue;
      },
    },
    // updateData: {
    //   async handler() {},
    //   deep: true,
    //   immediate: false,
    // },
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getControlConfig', 'getConfigObject']),
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'ADD_CONTROL_PANEL',
      'CLEAR_CONTROL_PANEL',
      'SET_CONFIGURATIONS',
      'SET_SELECTED_CONFIG',
    ]),
    /**
     * @param {Object} queryObject  The query Object
     * @param {number} queryObject.indicator The id of the indicator
     * @param {number} queryObject.datasource The id of the datasource
     * @returns {dataObjectType}
     */

    toggleShowShareModal() {
      const routeTitle = this.$route.path;
      console.log(routeTitle);
      this.$router.push('/indicator-table');
      // this.showShareCodeModal = !this.showShareCodeModal;
      // const tableObjTemp = document.getElementById('indicatorTable').innerHTML;
      // this.tableObj = this.bootstrapCDN + tableObjTemp;
    },
    async dlGetLatestSourceAndIndicatorData(queryObject) {
      const routeTitle = this.$route.path;
      console.log(queryObject, 'queryObject');
      const filteredIndicator = await this.getLocalDlQuery(queryObject);
      //  console.log(filteredIndicator, 'queryObject');
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

    getReset() {
      this.$emit('reset');
    },
    async populateTableData() {
      const newValues = this.values.indicator;
      this.loading = true;
      const formattedData = [];
      const { indicatorId, indicatorFirstRelated, indicatorSecondRelated } = this.$route.query;
      // const indicators = [newValues.id, newValues.first_related, newValues.second_related];
      // let indicators = [indicatorId, indicatorFirstRelated, indicatorSecondRelated];
      // let indicators = [3, 4, 1];
      let indicators = [Number(indicatorId), Number(indicatorFirstRelated), Number(indicatorSecondRelated)];

      if (!this.getConfigObject.showTableRelatedIndicator) {
        indicators = [newValues.id];
      }

      for (let indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex += 1) {
        const indicatorID = indicators[indicatorIndex];
        if (indicatorID) {
          const data = [];
          const dataSources = this.availableDataSources;
          console.log(dataSources, 'this.dataArray');
          // eslint-disable-next-line no-await-in-loop
          const indicatorObject = await this.returnIndicatorObj(indicatorID);
          for (let index = 0; index < dataSources.length; index += 1) {
            const element = dataSources[index];
            // eslint-disable-next-line no-await-in-loop
            const ab = await this.dlGetLatestSourceAndIndicatorData({
              indicator: indicatorID,
              datasource: element.id,
              location: 1,
            });
            console.log(ab, 'dataSources');
            data.push(ab);
          }
          // eslint-disable-next-line no-await-in-loop
          formattedData.push(await this.tableComponentDataFormat(indicatorObject, data));
        }
        this.TableData = formattedData;
        console.log(this.TableData, '@@&&');
        this.loading = false;
      }
    },
    showTooltip() {
      this.isTooltipVisible = true;
    },
    hideTooltip() {
      this.isTooltipVisible = false;
    },

    async returnIndicatorObj(id) {
      const response = await apiServices.getSingleIndicatorObj(id);
      console.log(response);
      return response.data;
    },
    async getDatasources() {
      try {
        const name = this.$route.query.dashboard_name;
        const [dashboardResponse, dataSourceResponse] = await Promise.all([
          apiServices.getDashboard(),
          apiServices.getAllDataSources(),
        ]);

        const results = dashboardResponse.data;
        const dashboard = results.find((item) => item?.name === name);
        const dashboardDasourceIds = dashboard.dataSources;
        const dataSources = dataSourceResponse.data.results.filter((item) => dashboardDasourceIds.includes(item.id));
        return dataSources;
      } catch (error) {
        // Handle any errors, e.g., log the error or return a default value
        console.error('Error in getDatasources:', error);
        return [];
      }
    },

    // eslint-disable-next-line consistent-return
    async getLocalDlQuery(queryObject) {
      console.log(queryObject);
      const datasourceItem = this.availableDataSources.filter((datasource) => datasource.id === queryObject.datasource);
      console.log(datasourceItem);

      // const valuetype = this.dlGetValueTypes({ value_type: datasource.classification });
      const valuetype = this.valueType?.filter(
        (item) => item.value_type === datasourceItem[0]?.classification
      );
      // eslint-disable-next-line no-param-reassign
      queryObject.value_type = valuetype[0]?.id;

      console.log(queryObject, 'valuetype');

      // check for undefined
      function hasUndefinedOrNullValues(obj) {
        return Object.values(obj).some((val) => val === undefined || val === null);
      }
      if (hasUndefinedOrNullValues(queryObject) === false) {
        const result = await DB.queryDB(queryObject);
        return result;
      }
    },

    async tableComponentDataFormat(indicatorObject, dataObjectArray) {
      const data = {};
      data.indicator = indicatorObject;
      data.values = [];
      console.log(indicatorObject, dataObjectArray, 'HHHH');

      dataObjectArray.forEach((e) => {
        if (e) {
          // const datasourceTemp = this.availableDataSources.filter((datasource) => datasource.id === e.datasource);
          const factor = this.factors.find((item) => item.id === indicatorObject.factor);
          const datasource = this.availableDataSources.find((item) => item.id === e.datasource);
          console.log(datasource, factor, 'datasourceTemp');
          data.values.push({
            dataSources: datasource,
            // change 2 decimal place to 1 decimal place
            value: new Intl.NumberFormat().format(Number(e.value).toFixed(1)),
            factor: formatFactor(factor.display_factor),
            year: e.period,
            classification: datasource.classification,
          });

          // console.log(data, '&&&');
        }
      });
      return data;
    },
  },
  async created() {
    const name = this.$route.query.dashboard_name;
    const response = await apiServices.getDashboard();
    const factorsResponse = await apiServices.getFactors();
    const dataSourceResponse = await apiServices.getAllDataSources();
    const specificIndicatorsData = await apiServices.getSpecificIndicator();
    this.specificIndicators = specificIndicatorsData.data.results;
    const results = response.data;
    const dashboard = results.find((item) => item?.name === name);
    const dashboardDataSource = await apiServices.getDashboardDatasources(dashboard.id);
    const dashboardDasourceIds = dashboard.dataSources;
    const dataSources = dataSourceResponse.data.results.filter((item) => dashboardDasourceIds.includes(item.id));
    console.log(dataSourceResponse.data.results, 'dataSources');
    console.log(factorsResponse, 'factorsResponse');
    console.log(dashboardDataSource, 'Dashboard Response');
    this.factors = factorsResponse.data.results;
    this.availableDataSources = dataSources;
    console.log(this.availableDataSources, 'this.availableDataSources');
  },
  mounted() {
    setTimeout(() => {
      console.log(defaultConfig);
      this.values = defaultConfig[0].payload;
      this.updateData += 1;
      this.populateTableData();
    }, 5000);
  },
};
</script>

<style lang="scss" scoped></style>
