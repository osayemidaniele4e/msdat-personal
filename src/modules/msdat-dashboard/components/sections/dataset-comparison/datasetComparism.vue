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
        <p class="work-sans mb-0 line-height">
          Comparison of
          <span class="font-weight-bold">{{ values.indicator.full_name }}</span>
          <span class="font-weight-bold"> {{ values.datasource.full_name }} </span>across
          <span class="font-weight-bold">different sources </span>by
          <span class="font-weight-bold">states</span>
        </p>
      </template>
      <!-- <div class="datasetComparison" v-show="showNationalComparison">
        <div class="noComparison" v-if="comparisonUnavailable">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 8.4502V12.4502M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 15.4502V15.5502L11.9502 15.5498V15.4502H12.0498Z" stroke="#E85D58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <p>Comparison not allowed</p>
        </div>
        <div class="comparison" v-else>
          <p>Overall comparison ratio between <strong>{{indicatorOne}}</strong> and <strong>{{indicatorTwo}}</strong>:</p>
          <h6>{{this.value}}%</h6>
        </div>
      </div> -->
      <BaseChart ref="BaseChart" :title="title" :chartOptions="chartConfig" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import { mapMutations } from 'vuex';
import { uniq } from 'lodash';
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { isDataYearly } from '@/util/helper';
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
      title: '',
      showNationalComparison: false,
      comparisonUnavailable: true,
      chartConfig: {},
      indicatorOne: null,
      indicatorTwo: null,
      value: null,
      // DataSetConfig: cloneDeep(DataSetConfig),
      loading: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'SETUP_CONTROL_OPTIONS1', // -> this.foo()
    ]),
    configureDifferenceIndicator() {
      const series = this.chartConfig.series;
      if (series.length === 2) {
        this.comparisonUnavailable = false;
        const seriesOne = series[0]?.data[0];
        const seriesTwo = series[1]?.data[0];
        if (seriesOne.length && seriesTwo.length) {
          this.indicatorOne = series[0].name;
          this.indicatorTwo = series[1].name;
          const diff = seriesOne[1] - seriesTwo[1];
          this.value = Math.round(Math.abs(diff));
        }
      } else {
        this.comparisonUnavailable = true;
      }
      return null;
    },
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
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload;
    },
  },
  async mounted() {
    this.title = ` Comparison of ${this.values.indicator.full_name} ${this.values.datasource.full_name}} across different sources by states`;
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
            this.dlGetLocation(query[0]?.location)?.name,
            parseFloat(query[0]?.value),
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
        const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
        this.chartConfig.yAxis.title.text = displayFactor;
        this.chartConfig.series = orderResult;
        if (this.chartConfig.series.length > 1) {
          this.showNationalComparison = true;
          this.configureDifferenceIndicator();
        } else {
          this.showNationalComparison = false;
        }
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
.datasetComparison {
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.comparison {
  border-radius: 10px;
  border: 1px solid #C1C1C1;
  width: auto;
  padding-left: 10em;
  padding-right: 10em;
height: 83px;
text-align: center;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 20px
}
.noComparison{
  border-radius: 10px;
  border: 1px solid #E85D58;
  width: auto;
height: 83px;
text-align: center;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
align-items: baseline;
gap: 20px;
padding-top: 25px;
padding-left: 5em;
  padding-right: 5em;
}
.comparison p {
  color: #000;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.noComparison p {
  color: #E85D58;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.comparison h6 {
  color: #000;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
}
</style>
