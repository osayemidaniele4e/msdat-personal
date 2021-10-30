/* eslint-disable no-await-in-loop */
<template>
  <base-overlay :show="loading">
    <base-sub-card
      showControls
      v-if="Object.keys(values).length"
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
      <BaseChart ref="BaseChart" :chartOptions="chartConfig" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapMutations } from 'vuex';
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
      loading: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'SETUP_CONTROL_OPTIONS1', // -> this.foo()
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
        if (data.length > 0) {
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
    controlIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    payload() {
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex]
        .payload;
    },
  },
  async mounted() {
    this.loading = true;
    const dropDown = await this.setUpDataSourceNYearDropdown();
    this.SETUP_CONTROL_OPTIONS1({
      panelIndex: this.controlIndex,
      key: 'datasource',
      values: dropDown,
    });
    this.loading = false;
  },

  watch: {
    values: {
      async handler(controlValues) {
        this.loading = true;
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
        const orderResult = [];
        for (let index = 0; index < queryObject.length; index += 1) {
          const response = result[index];
          const dataValues = response.map((element) => [
            this.dlGetLocation(element.location).name,
            parseFloat(element.value),
          ]);

          // This adds national to the top;
          // eslint-disable-next-line no-await-in-loop
          const query = await this.dlQuery({
            indicator: controlValues.indicator.id,
            // eslint-disable-next-line radix
            datasource: parseInt(dataSourcesNYear[index].id.split('-')[0]),
            period: dataSourcesNYear[index].id.split('-')[1],
            location: 1,
          });

          const nationValueSeries = [
            this.dlGetLocation(query[0].location).name,
            parseFloat(query[0].value),
          ];

          // add it ot the top of the series
          dataValues.unshift(nationValueSeries);

          orderResult.push({
            name: dataSourcesNYear[index].item,
            data: dataValues,
          });
        }

        // const orderResult = queryObject.map((item, index) => {
        //   const response = result[index];
        //   const dataValues = response.map((element) => [
        //     this.dlGetLocation(element.location).name,
        //     parseFloat(element.value),
        //   ]);
        //   // const dataSource = this.dlGetDataSource(item.datasource).datasource;

        //   console.trace({
        //     indicator: controlValues.indicator.id,
        //     // eslint-disable-next-line radix
        //     datasource: parseInt(controlValues.datasource.id.split('-')[0]),
        //     period: controlValues.datasource.id.split('-')[1],
        //     location: 1,
        //   });

        //   return {
        //     name: dataSourcesNYear[index].item,
        //     data: dataValues,
        //   };
        // });

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
          yAxis: {
            title: {
              text: 'Values',
              style: {
                fontSize: '13px',
                fontFamily: '"Work Sans", sans-serif',
              },
            },
          },
          colors: ['#17606B', '#E85D58', '#58B74E'],
        };
        const displayFactor = this.dlGetFactor(
          this.values.indicator.factor,
        ).display_factor;
        this.chartConfig.yAxis.title.text = displayFactor;
        this.chartConfig.series = orderResult;
        this.loading = false;
      },
      deep: true,
    },
    'payload.indicator': {
      async handler() {
        this.loading = true;
        const dropDown = await this.setUpDataSourceNYearDropdown();
        this.SETUP_CONTROL_OPTIONS1({
          panelIndex: this.controlIndex,
          key: 'datasource',
          values: dropDown,
        });
        this.loading = false;
      },
    },
  },
};
</script>

<style>
</style>
