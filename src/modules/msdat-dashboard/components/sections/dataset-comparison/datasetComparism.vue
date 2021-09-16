/* eslint-disable no-await-in-loop */
<template>
  <div class="">
    <base-sub-card
      showControls
      @dropdownTypeSelected="
        downLoadType($event, {
          indicator: values.indicator.short_name,
          datasource: '',
          year: '',
        })
      "
    >
      <template #title>
        <p class="text-dark work-sans mb-0 line-height">
          Comparison of
          <span class="font-weight-bold">
            {{ values.datasource.full_name }} </span
          >across <span class="font-weight-bold">different sources </span>by
          <span class="font-weight-bold">states</span>
        </p>
      </template>
      <BaseChart
        ref="BaseChart"
        :chartOptions="chartConfig"
      />
    </base-sub-card>
  </div>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapActions } from 'vuex';
import { isDataYearly } from '@/util/helper';
import { uniq } from 'lodash';
import BaseChart from '../../../../../components/Barchart/BaseBarChart.vue';
import dataPipelineMixin from '../../../mixins/dataPipeline';
import chartDownload from '../../../mixins/chart_download';

export default {
  mixins: [chartDownload, dataPipelineMixin, ControlPanelSetup],
  components: {
    BaseChart,
  },
  data() {
    return {
      chartConfig: {},
      // DataSetConfig: cloneDeep(DataSetConfig),
    };
  },
  methods: {
    ...mapActions('MSDAT_STORE', [
      'SET_CONTROL_OPTIONS', // -> this.foo()
    ]),

    async setUpDataSourceNYearDropdown() {
      const multiSelectGroup = [];
      const dataSources = this.dlGetDashboardDataSource();
      for (let index = 0; index < dataSources.length; index += 1) {
        const dataSourceObject = dataSources[index];
        // eslint-disable-next-line no-await-in-loop
        const data = await this.dlQuery({
          indicator: this.values.indicator.id,
          datasource: dataSourceObject.id,
        });
        if (data) {
          const onlyYearlyData = data.filter((item) => {
            if (isDataYearly(item.period)) {
              return item;
            }
            return false;
          });
          const dates = onlyYearlyData.map((item) => item.period);
          const sortedDates = uniq(dates).sort((a, b) => b - a);

          const mapToDropdown = sortedDates.map((item) => ({
            id: `${dataSourceObject.id}-${item}`,
            item: `${dataSourceObject.datasource} ${item}`,
          }));

          multiSelectGroup.push({
            datasource: dataSourceObject.datasource,
            options: mapToDropdown,
          });
        }
      }
      return multiSelectGroup;
    },
  },
  props: {
    values: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  async mounted() {
    const dropDown = await this.setUpDataSourceNYearDropdown();
    this.SET_CONTROL_OPTIONS({
      panelIndex: 3,
      controlIndex: 0,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 3,
      controlIndex: 1,
      values: dropDown,
    });
  },

  watch: {
    values: {
      async handler(controlValues) {
        let dataSourcesNYear = [];
        if (!Array.isArray(controlValues.datasource)) {
          dataSourcesNYear = [controlValues.datasource];
        } else {
          dataSourcesNYear = controlValues.datasource;
        }
        const queryObject = dataSourcesNYear.map((element) => {
          const spiltDataSourcesNYear = element.id.split('-');
          const datasourceObject = this.dlGetDataSource(
            Number.parseInt(spiltDataSourcesNYear[0], 10),
          );
          return {
            indicator: controlValues.indicator.id,
            datasource: datasourceObject.id,
            period: spiltDataSourcesNYear[1],
            location: {
              level: 3,
            },
          };
        });
        const promises = queryObject.map((item) => this.dlQuery(item));
        const result = await Promise.all(promises);
        const orderResult = queryObject.map((item, index) => {
          const response = result[index];
          const dataValues = response.map((element) => [
            this.dlGetLocation(element.location).name,
            parseFloat(element.value),
          ]);
          // const dataSource = this.dlGetDataSource(item.datasource).datasource;

          return {
            name: dataSourcesNYear[index].item,
            data: dataValues,
          };
        });

        this.chartConfig = {
          plotOptions: {
            column: {
              dataLabels: {
                enabled: true,
              },
            },
          },
          chart: {
            type: 'column',
          },
          colors: ['#17606B', '#E85D58', '#58B74E'],
        };
        this.chartConfig.series = orderResult;
      },
      deep: true,
    },

    // The is the updated the control panel dropdown as indicator are gotten from the API
    // in the background (async)
    indicatorDropdownUpdated(newVal) {
      this.SET_CONTROL_OPTIONS({
        panelIndex: 2,
        controlIndex: 3,
        values: newVal,
      });
    },
  },
};
</script>

<style>
</style>
