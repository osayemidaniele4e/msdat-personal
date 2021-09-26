/* eslint-disable max-len */
<template>
  <div>
    <!-- <base-sub-card :backgroundColor="'#348481'"> -->

    <base-overlay :show="loading">
      <!-- the props ConfidenceOptions and showToggle show the cofidence range component
            and the chart type component respectively
            note: the confidence range prop just makes the this section look more like the mock-up
            and might need to be removed entirely -->
      <base-sub-card
        buttonToggle
        showControls
        :sideControl="false"
        :ConfidenceOptions="false"
        :showToggle="false"
        @toggle-confidence-range="onConfidenceRangeClicked($event)"
        v-if="values"
      >
        <template #title>
          <!-- the indicator property is eith an object when alone
        or an array when compared aganist another  -->
          <h6 class="work-sans" v-if="!values.indicator.length">
            Comparison Of <b>{{ values.indicator.short_name }}</b> according to
            the <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}
          </h6>
          <h6 class="work-sans" v-else>
            Comparison Of <b>{{ values.indicator[0].short_name }}</b> and
            <b> {{ dlGetIndicator(values.indicator[1].id).short_name }} </b>
            according to the
            <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}s
          </h6>
        </template>
        <BarChart :chartOptions="ChartOptions" />
      </base-sub-card>
    </base-overlay>
    <!-- </base-sub-card> -->
  </div>
</template>

<script>
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import { mapActions } from 'vuex';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { sortBy } from 'lodash';
import defaultOptions from '@/components/Barchart/defaultOption';
import formatter from '../../../mixins/formatter';
import controlPanelOptions from './indicator-comparism-config';

export default {
  mixins: [formatter, ControlPanelSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      ChartOptions: {
        xAxis: {
          ...defaultOptions.xAxis,
        },
        tooltip: {
          shared: true,
        },
        yAxis: {
          min: 0,
          plotLines: [
            {
              value: 49,
              color: '#999',
              width: 3,
            },
          ],
        },
        chart: {
          ...defaultOptions.chart,
          type: 'line',
          height: '300',
        },
        title: {
          ...defaultOptions.title,
        },
        series: [
          {
            data: [
              [2015, 62.5],
              [2010, 54.1],
            ],
            name: 'ANC Coverage (at least 1 visit)',
          },
        ],
      },

      loading: false,
      sortedYear: null,
      data: {},
      forChart: {},
      indicatorNames: null,
    };
  },
  methods: {
    ...mapActions('MSDAT_STORE', [
      'SET_CONTROL_OPTIONS', // -> this.foo()
    ]),
    async onConfidenceRangeClicked(e) {
      console.log('doubt i need confidence range', e);
    },
    getAvailableDataSourceYears(datas) {
      let list = [];
      if (datas.year_available.includes(',')) {
        // if the years are seperated by commas, split them
        list = datas.year_available.split(',');
      } else if (datas.year_available.includes('-')) {
        // if the years are seperated with a dash, loop through the first year to the last year
        const bounds = datas.year_available.split('-');
        for (let i = Number(bounds[0]); i <= Number(bounds[1]); i += 1) {
          list.push(i.toString());
        }
      }
      return list;
    },

    displayFactor(factor) {
      const dpfactor = factor;
      let sign;
      switch (dpfactor) {
        case 'in percentage':
          sign = '%';
          break;
        default:
          sign = '';
      }

      return sign;
    },
  },
  props: {
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },

  watch: {
    values: {
      // so the idea here is to always empty the chart and re-plot the chart for either
      // single object or an array depending on the size of the indicator parameter/parameters
      async handler(options) {
        console.log('the options', options);
        this.loading = true;
        this.ChartOptions.series = [];
        const chartChange = options.compareBy.name;
        if (chartChange === 'Period') {
          // check if the indicator parameter is alone or is going to be compared with another one
          // if the indicator is an array of 2
          if (this.values.indicator.length > 1) {
            const indicatorDisplayFactor1 = this.dlGetFactor(
              options.indicator[0].factor,
            ).display_factor;
            const indicatorDisplayFactor2 = this.dlGetFactor(
              options.indicator[1].factor,
            ).display_factor;

            const indicatorTarget1 = options.indicator[0].national_target;
            const indicatorTarget2 = options.indicator[1].national_target;

            this.ChartOptions = {
              yAxis: [
                {
                  lineWidth: 0,
                  gridLineWidth: 0,
                  title: {
                    text: indicatorDisplayFactor1,
                  },
                  plotLines: [
                    {
                      value: indicatorTarget1,
                      color: 'black',
                      width: 2,
                      label: {
                        style: {
                          fontSize: '20px',
                        },
                        text: `NT: ${indicatorTarget1}`,
                        align: 'right',
                        rotation: 90,
                      },
                    },
                  ],
                },
                {
                  opposite: true,
                  title: {
                    text: indicatorDisplayFactor2,
                  },

                  plotLines: [
                    {
                      value: indicatorTarget2,
                      color: 'black',
                      width: 2,
                      label: {
                        style: {
                          fontSize: '20px',
                        },
                        text: `NT: ${indicatorTarget2}`,
                        align: 'right',
                        rotation: 90,
                      },
                    },
                  ],
                },
              ],
              chart: {
                type: 'line',
              },
              series: [],
            };
            for (let i = 0; i <= options.indicator.length - 1; i += 1) {
              // eslint-disable-next-line no-await-in-loop
              const data = await this.dlQuery({
                datasource: options.datasource.id,
                indicator: options.indicator[i].id,
                location: 1,
              });
              // create the various objects for the chart series
              const seriesObject = {
                yAxis: i,
                name: this.dlGetIndicator(options.indicator[i].id).short_name,
                data: [],
              };
              data.map((series) => seriesObject.data.push([series.period, Number(series.value)]));
              // sort the values according to the year they appear
              const mappedData = sortBy(seriesObject.data, [(o) => o[0]]);
              seriesObject.data = mappedData;
              this.ChartOptions.series.push(seriesObject);
              console.log('new series', seriesObject);
            }
          } else if (this.values.indicator.length === 1) {
            // if the indicator array is alone
            const data = await this.dlQuery({
              datasource: options.datasource.id,
              indicator: options.indicator[0].id,
              location: 1,
            });
            const seriesObject = {
              name: this.dlGetIndicator(options.indicator[0].id).short_name,
              data: [],
            };
            data.map((series) => seriesObject.data.push([series.period, Number(series.value)]));
            this.ChartOptions.yAxis.splice(1, 1);
            this.ChartOptions.chart.type = 'line';
            this.ChartOptions.series.push(seriesObject);
          } else {
            // if the indicator is an object
            const data = await this.dlQuery({
              datasource: options.datasource.id,
              indicator: options.indicator.id,
              location: 1,
            });
            const seriesObject = {
              name: this.dlGetIndicator(options.indicator.id).short_name,
              data: [],
            };
            data.map((series) => seriesObject.data.push([series.period, Number(series.value)]));
            this.ChartOptions.series.push(seriesObject);
          }
        } else if (chartChange === 'State') {
          const queryObject2 = options.indicator.map((element) => ({
            indicator: element.id,
            datasource: options.datasource.id,
            period: '2015',
            location: 1,
          }));
          const promises2 = queryObject2.map((item) => this.dlQuery(item));
          const nationalData = await Promise.all(promises2);
          const orderNational = queryObject2.map((item, index) => {
            const response = nationalData[index];
            const dataValues = response.map((element) => [
              'National',
              parseFloat(element.value),
            ]);
            return {
              yAxis: index,
              data: dataValues,
            };
          });
          console.log('national', orderNational);

          const queryObject = options.indicator.map((element) => ({
            indicator: element.id,
            datasource: options.datasource.id,
            period: '2015', // tried to make this dynamic
            location: {
              level: 3,
            },
          }));
          const promises = queryObject.map((item) => this.dlQuery(item));
          const result = await Promise.all(promises);
          const orderResult = queryObject.map((item, index) => {
            const response = result[index];
            const dataValues = response.map((element) => [
              this.dlGetLocation(element.location).name,
              parseFloat(element.value),
            ]);
            const indicator = this.dlGetIndicator(item.indicator).short_name;

            return {
              yAxis: index,
              name: indicator,
              data: dataValues,
            };
          });
          const mappedData = sortBy(orderResult.data, [(o) => o[0]]);
          orderResult.data = mappedData;
          const indicatorDisplayFactor1 = this.dlGetFactor(
            options.indicator[0].factor,
          ).display_factor;
          const indicatorDisplayFactor2 = this.dlGetFactor(
            options.indicator[1].factor,
          ).display_factor;
          const indicatorTarget1 = options.indicator[0].national_target;
          const indicatorTarget2 = options.indicator[1].national_target;

          const displayFactorSign1 = this.displayFactor(
            indicatorDisplayFactor1,
          );
          // const displayFactorSign2 = this.displayFactor(indicatorDisplayFactor2);
          this.ChartOptions = {
            tooltip: {
              shared: true,
            },
            yAxis: [
              {
                lineWidth: 0,
                gridLineWidth: 0,
                title: {
                  text: indicatorDisplayFactor1,
                },
                plotLines: [
                  {
                    value: indicatorTarget1,
                    color: 'black',
                    width: 2,
                    label: {
                      style: {
                        fontSize: '2px',
                      },
                      text: `NT: ${indicatorTarget1}`,
                      align: 'right',
                      rotation: 90,
                    },
                  },
                ],
              },
              {
                opposite: true,
                title: {
                  text: indicatorDisplayFactor2,
                  rotation: 270,
                },

                plotLines: [
                  {
                    value: indicatorTarget2,
                    color: 'black',
                    width: 2,
                    label: {
                      style: {
                        fontSize: '10px',
                      },
                      text: `NT: ${indicatorTarget2}`,
                      align: 'right',
                      rotation: 90,
                    },
                  },
                ],
              },
            ],

            plotOptions: {
              column: {
                dataLabels: {
                  enabled: true,
                  formatter() {
                    return `${this.point.y}${displayFactorSign1}`;
                  },
                },
              },
            },
            chart: {
              type: 'column',
            },
            series: orderResult,
          };
          // this.ChartOptions.chart.type = 'column';
          // this.ChartOptions.series = orderResult;
          console.log('chart series is', this.ChartOptions.series);
        }
        this.loading = false;
      },
      deep: true,
      immediate: true,
    },
    'values.datasource': {
      async handler(data) {
        // change the year to the available years in the datasource

        const availableYears = this.getAvailableDataSourceYears(data);
        const mappedYears = availableYears.map((each, i) => ({
          id: i + 1,
          year: each,
        }));
        this.SET_CONTROL_OPTIONS({
          panelIndex: 2,
          controlIndex: 2,
          values: mappedYears ?? [
            { id: 1, year: '2010' },
            { id: 2, year: '2015' },
          ],
        });
      },
      deep: true,
    },
    'values.compareBy': {
      handler(data) {
        if (data.name === 'Period') {
          controlPanelOptions.setup[2].visibility = false;
        } else if (data.name === 'State') {
          controlPanelOptions.setup[2].visibility = true;
        }
      },
      immediate: false,
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
  async mounted() {
    const setYearDropdown = await this.setYearDropdown();
    console.trace(setYearDropdown);
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 3,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 1,
      values: this.defaultDataSourceDropdown,
    });
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 2,
      values: setYearDropdown,
    });
  },
};
</script>

        <style>
</style>
