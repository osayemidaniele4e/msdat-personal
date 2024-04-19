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
      <transition name="fade">
      <div class="datasetComparison" v-show="showNationalComparison">
        <div class="noComparison" v-if="comparisonUnavailable">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 8.4502V12.4502M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 15.4502V15.5502L11.9502 15.5498V15.4502H12.0498Z"
                stroke="#E85D58"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <div>
            <p>Comparison can only be done for 2 data sources</p>
          </div>
        </div>
        <div class="comparison" v-else>
          <div>
            <p>
              The value of <strong>{{ indicatorOne }}</strong
                > is {{ this.positiveDifference === true ? 'HIGHER' : 'LOWER' }} than <strong>{{ indicatorTwo }}</strong> by:
            </p>
          </div>
<div>
  <h6>{{ Math.abs(this.value) }}%</h6>

</div>
        </div>
      </div>
      </transition>
      <BaseChart ref="BaseChart" :title="title" :chartOptions="chartConfig" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import Highcharts from 'highcharts';
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
      comparisonLocation: null,
      indicatorTwo: null,
      value: null,
      positiveDifference: false,
      // DataSetConfig: cloneDeep(DataSetConfig),
      loading: true,
    };
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'SETUP_CONTROL_OPTIONS1', // -> this.foo()
    ]),
    getOlderYear(year1, year2) {
      // eslint-disable-next-line radix
      const extractYear = (str) => parseInt(str.match(/\d{4}/)?.[0] || 0);
      const yearValue1 = extractYear(year1);
      const yearValue2 = extractYear(year2);

      if (yearValue1 < yearValue2) {
        return year1;
      }
      if (yearValue1 > yearValue2) {
        return year2;
      }
      return 'equal';
    },
    configureDifferenceForAllLocations() {
      const series = this.chartConfig.series;
      if (series.length === 2) {
        this.comparisonUnavailable = false;
        const obj1Data = series[0].data;
        const obj2Data = series[1].data;
        if (obj1Data.length && obj2Data.length) {
          this.indicatorOne = series[0].name;
          this.indicatorTwo = series[1].name;

          const updatedObj1 = obj1Data.map((item1) => {
            const matchingItem2 = obj2Data.find((item2) => item1.name === item2.name);
            if (matchingItem2) {
              return { ...item1, extraData: this.computeDiffValues(item1, matchingItem2).value, isPositive: this.computeDiffValues(item1, matchingItem2).isPositive };
            }
            return item1;
          });
          const updatedObj2 = obj2Data.map((item1) => {
            const matchingItem1 = updatedObj1.find((item2) => item1.name === item2.name);
            if (matchingItem1) {
              return { ...item1, extraData: matchingItem1.extraData, isPositive: matchingItem1.isPositive };
            }
            return item1;
          });
          this.chartConfig.series[0].data = updatedObj1;
          this.chartConfig.series[1].data = updatedObj2;
          this.chartConfig.tooltip.pointFormat = '{point.name}: <b>{point.y:.1f}</b><br>Difference:{point.extraData}%';
        }
      } else {
        this.comparisonUnavailable = true;
      }
      return null;
    },
    handleMouseOut(data) {
      if (data.comparisonData) {
        this.comparisonLocation = 'Nigeria';
        this.value = data.comparisonData;
      }
    },
    handlePointMouseOver(data) {
      if (data.comparisonData) {
        this.showNationalComparison = true;
        if (data.location === 'Nigeria') {
          this.comparisonLocation = data.location;
        } else {
          this.comparisonLocation = `${data.location} state`;
        }
        this.value = data.comparisonData;
        this.positiveDifference = data.isPositive;
      } else {
        this.showNationalComparison = false;
      }
    },
    computeDiffValues(indicatorOne, indicatorTwo) {
      let final = 0;
      let initial = 0;
      const denominator = indicatorTwo.y;
      initial = indicatorTwo.y;
      final = indicatorOne.y;
      const isPositive = final >= initial;
      const diff = final - initial;
      const value = this.customRound((diff / denominator) * 100);
      return { value, isPositive };
    },
    customRound(number) {
      if (number < 1 && number % 1 !== 0) {
        return parseFloat(number.toFixed(1));
      }
      return Math.round(number);
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
    this.$on('pointMouseOver', this.handlePointMouseOver);
    this.$on('mouseOut', this.handleMouseOut);
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
          const dataValues = response.map((element) => ({
            name: this.dlGetLocation(element.location).name,
            y: parseFloat(element.value),
            extraData: '',
            isPositive: false,
          }));

          // This adds national to the top;
          // eslint-disable-next-line no-await-in-loop
          const query = await this.dlQuery({
            indicator: controlValues.indicator.id,
            // eslint-disable-next-line radix
            datasource: parseInt(dataSourcesNYear[index].id.split('-')[0]),
            period: dataSourcesNYear[index].id.split('-')[1],
            location: 1,
          });

          const nationValueSeries = {
            name: this.dlGetLocation(query[0]?.location)?.name,
            y: parseFloat(query[0]?.value),
            extraData: '',
            isPositive: false,
          };

          // add it ot the top of the series
          dataValues.unshift(nationValueSeries);

          orderResult.push({
            name: dataSourcesNYear[index].item,
            data: dataValues,
            dataSorting: {
              enabled: true,
              sortKey: 'extraData',
            },
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
                formatter() {
                  return Highcharts.numberFormat(this.y, 0, '', ',');
                },
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
        this.chartConfig.tooltip = {};
        this.chartConfig.plotOptions.series = {};
        this.chartConfig.plotOptions.series.point = {};
        this.chartConfig.plotOptions.series.point.events = {};
        this.chartConfig.series = orderResult;
        if (this.chartConfig.series.length === 2) {
          this.comparisonUnavailable = false;
          // Only add the event listeners if the series length is 2
          this.configureDifferenceForAllLocations();
          this.chartConfig.plotOptions.series.point.events.mouseOver = (event) => {
            this.$emit('pointMouseOver', {
              seriesName: event.target.series.name,
              isPositive: event.target.isPositive,
              comparisonData: event.target.extraData,
              location: event.target.name,
              value: event.target.y,
            });
          };

          this.chartConfig.plotOptions.series.point.events.mouseOut = (event) => {
            this.$emit('pointMouseOut', {
              seriesName: event.target.series.name,
              comparisonData: event.target.extraData,
              isPositive: event.target.isPositive,
              location: event.target.name,
              value: event.target.y,
            });
          };
        } else if (this.chartConfig.series.length > 2) {
          this.comparisonUnavailable = true;
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.datasetComparison {
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.comparison {
  border-radius: 10px;
  border: 1px solid #c1c1c1;
  width: 45%;
  height: 63px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.noComparison {
  border-radius: 10px;
  border: 1px solid #e85d58;
  width: 35%;
  height: 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.comparison p {
  color: #000;
  font-size: 13px;
  font-weight: 400;
  padding-top: 10px;
  font-family: 'Inter', sans-serif;
}

.noComparison p {
  color: #e85d58;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  padding-top: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.comparison h6 {
  font-family: 'Inter', sans-serif;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
}

@media only screen and (max-width: 768px) {
  .comparison, .noComparison {
    width: auto;
  }
}
</style>
