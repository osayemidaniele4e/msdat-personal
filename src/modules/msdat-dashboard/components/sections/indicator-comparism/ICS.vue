<template>
  <div>
    <base-overlay :show="loading">
      <base-sub-card
        buttonToggle
        showControls
        :sideControl="false"
        :ConfidenceOptions="false"
        :showToggle="false"
        v-if="values"
      >
        <template #title>
          <p
            class="text-dark work-sans mb-0 line-height"
            v-if="!values.indicator.length"
          >
            Comparison Of <b>{{ values.indicator.short_name }}</b> according to
            the <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}
          </p>
          <p class="text-dark work-sans mb-0 line-height" v-else>
            Comparison Of <b>{{ values.indicator[0].short_name }}</b> and
            <b>{{ values.indicator[1].short_name }}</b>
            according to the
            <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}s
          </p>
        </template>
        <BarChart :chartOptions="chartOptions" />
      </base-sub-card>
    </base-overlay>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import ControlPanelSetup from '@/modules/msdat-dashboard/mixins/control-panel-setup';
import moment from 'moment';
import defaultOptions from '@/components/Barchart/defaultOption';

export default {
  name: 'ICS',
  mixins: [ControlPanelSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      color: ['#17606B', '#E85D58'],
      dataSeries: [],
      loading: false,
      chartOptions: {},
    };
  },

  props: {
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },

  // methods: {
  //   formatHighChartData(dataSeries) {
  //     this.chartOptions = {
  //       chart: {
  //         type: 'line',
  //       },
  //       series: [],
  //     };
  //     this.chartOptions.series.push(dataSeries);
  //   },
  // },
  watch: {
    'values.indicator': {
      async handler() {
        // this.chartOptions = {};
        console.log(this.values);
        this.loading = true;
        await this.renderChart(this.values);
        this.loading = false;
      },
      immediate: true,
      // deep: true,
    },
    'values.datasource': {
      async handler() {
        // this.chartOptions = {};
        this.loading = true;
        await this.renderChart(this.values);
        this.loading = false;
      },
      // immediate: true,
      // deep: true,
    },
    'values.year': {
      async handler() {
        // this.chartOptions = {};
        this.loading = true;
        await this.renderChart(this.values);
        this.loading = false;
      },
    },
    'values.location': {
      async handler() {
        this.loading = true;
        await this.renderChart(this.values);
        this.loading = false;
      },
    },
    'values.compareBy': {
      async handler(data) {
        if (data.name === 'Period') {
          this.TOGGLE_VISIBILITY({
            panelIndex: 2,
            controlIndex: 2,
            visibility: false,
          });

          this.TOGGLE_VISIBILITY({
            panelIndex: 2,
            controlIndex: 3,
            visibility: true,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        } else if (data.name === 'State') {
          this.TOGGLE_VISIBILITY({
            panelIndex: 2,
            controlIndex: 2,
            visibility: true,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: 2,
            controlIndex: 3,
            visibility: false,
          });

          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        }
      },
      immediate: false,
    },
    'values.target.national': {
      handler(val) {
        const align = ['left', 'right'];
        const options = { ...this.chartOptions };

        if (val) {
          for (let k = 0; k < options.yAxis.length; k += 1) {
            debugger;
            const nationalTarget = this.dlGetIndicator(
              this.values.indicator[k].id,
            ).national_target;
            if (options.yAxis[k].plotLines.length > 0) {
              const index = options.yAxis[k].plotLines.findIndex(
                (item) => item.id === 'national',
              );
              if (index > -1) {
                options.yAxis[k].plotLines[index] = {
                  width: 1,
                  value: nationalTarget,
                  zIndex: 5,
                  label: {
                    text: `NT-${nationalTarget}`,
                    rotation: 90,
                    align: align[k],
                  },
                };
              }
            } else {
              options.yAxis[k].plotLines = [];
              options.yAxis[k].plotLines.push({
                width: 1,
                value: nationalTarget,
                zIndex: 5,
                label: {
                  text: `NT-${nationalTarget}`,
                  rotation: 90,
                  align: align[k],
                },
              });
            }
          }
        } else {
          for (let k = 0; k < options.yAxis.length; k += 1) {
            const index = options.yAxis[k].plotLines.findIndex(
              (item) => item.id === 'national',
            );
            options.yAxis[k].plotLines.splice(index, 1);
          }
        }

        this.chartOptions = { ...options };
        console.log(this.chartOptions);
      },
      deep: true,
    },
    // deep: true,
  },
  methods: {
    ...mapActions('MSDAT_STORE', [
      'SET_CONTROL_OPTIONS', // -> this.foo()
      'TOGGLE_VISIBILITY', // -> this.toggleVisibility()
    ]),
    displayFactorSign(factor) {
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
    async plotForState(values) {
      const highChartOptions = {
        chart: {
          type: 'column',
        },
        series: [],
        yAxis: [],
      };
      const dataPromises = values.indicator.map((item) => this.dlQuery({
        indicator: item.id,
        datasource: values.datasource.id,
        period: values.year,
        location: {
          level: 3,
        },
      }));

      const results = await Promise.all(dataPromises);
      console.log(results);

      for (let i = 0; i < results.length; i += 1) {
        // formate result to HighChart Format
        const indicator = values.indicator[i];
        const data = results[i];
        const toHighChartFormat = data.map((item) => [
          this.dlGetLocation(item.location).name,
          parseFloat(item.value),
        ]);
        // console.log(toHighChartFormat);
        const displayFactor = this.dlGetFactor(indicator.factor);
        const yAxis = {
          ...defaultOptions.yAxis,
          title: {
            ...defaultOptions.yAxis.title,
            text: displayFactor.display_factor,
          },
          opposite: !!i, // this will become either true of false as 0 or 1
        };

        // let fommater = () => `${point.y}${displayFactorSign1}`;
        const obj = {
          color: this.color[i],
          dataLabels: {
            enabled: true,
            format: `{y}${this.displayFactorSign(
              displayFactor.display_factor,
            )}`,
            style: {
              ...defaultOptions.yAxis.title.style,
              fontSize: '10px',
            },
          },
          yAxis: i,
          name: indicator.full_name,
          data: toHighChartFormat,
        };
        highChartOptions.yAxis.push(yAxis);
        highChartOptions.series.push(obj);
      }
      return highChartOptions;
    },

    async plotForPeriods(values) {
      const highChartOptions = {
        chart: {
          type: 'line',
        },
        yAxis: [],
        series: [],
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }

      const dataPromises = indicators.map((item) => this.dlQuery({
        indicator: item.id,
        datasource: values.datasource.id,
        location: values.location.id,
      }));

      const results = await Promise.all(dataPromises);
      debugger;
      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        const indicator = indicators[i];
        const filterOnlyYearlyValues = result.filter((item) => moment(item.period, 'YYYY', true).isValid());
        const formatToHighChartFormat = filterOnlyYearlyValues.map((item) => [
          item.period,
          Number.parseFloat(item.value),
        ]);
        const sortTheYear = formatToHighChartFormat.sort((a, b) => a[0] - b[0]);

        const displayFactor = this.dlGetFactor(indicator.factor);
        highChartOptions.yAxis.push({
          ...defaultOptions.yAxis,
          title: {
            ...defaultOptions.yAxis.title,
            text: displayFactor.display_factor,
          },
          opposite: !!i, // this will become either true of false as 0 or 1
        });
        const obj = {
          color: this.color[i],
          lineWidth: 3,
          yAxis: i,
          name: indicator.full_name,
          data: sortTheYear,
        };
        highChartOptions.series.push(obj);
      }
      return highChartOptions;
    },

    async renderChart(panelValues) {
      if (panelValues.compareBy.name === 'Period') {
        const highChartOptions = await this.plotForPeriods(panelValues);
        this.chartOptions = { ...highChartOptions };
      }

      if (panelValues.compareBy.name === 'State') {
        const highChartOptions = await this.plotForState(panelValues);
        this.chartOptions = { ...highChartOptions };
        console.log(this.chartOptions);
      }
    },
  },
  mounted() {
    console.trace('ICS mounted');
    // console.log(this.defaultIndicatorDropdown);
    // indicator dropdown
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 4,
      values: this.defaultIndicatorDropdown,
    });

    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 3,
      values: this.defaultLocationDropdown,
    });

    // datasource dropdown
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 1,
      values: this.defaultDataSourceDropdown,
    });
    // period dropdown;
    this.SET_CONTROL_OPTIONS({
      panelIndex: 2,
      controlIndex: 2,
      values: ['2010', '2015'],
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
