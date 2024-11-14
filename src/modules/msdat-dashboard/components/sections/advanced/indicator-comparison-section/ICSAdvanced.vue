<template>
  <div class="ics_wrapper">
    <base-overlay :show="loading">
      <base-sub-card
        buttonToggle
        showControls
        :sideControl="false"
        :ConfidenceOptions="false"
        :showToggle="false"
        v-if="Object.keys(values).length"
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: values.datasource.datasource,
            year: '',
          })
        "
      >
        <template #title>
          <!-- Display comparison text when the selected indicator is not an array -->
          <p
            class="work-sans mb-0 line-height"
            v-if="!Array.isArray(values.indicator.length)"
          >
          Comparison of selected indicators across {{ values.compareBy.name}}s <b>({{ values.datasource.datasource }})</b>
          </p>
          <!-- <p class="text-dark work-sans mb-0 line-height" v-else>
           Comparison of <b>{{ values.indicator[0].short_name }}</b> and
            <b>{{ values.indicator[1].short_name }}</b>
            according to the
            <b> {{ values.datasource.datasource }} </b> across
            {{ values.compareBy.name }}s
          </p> -->
        </template>
        <BarChart ref="BaseChart"
        :title="title"
        :chartOptions="chartOptions" />
      </base-sub-card>
    </base-overlay>
    <!-- Display 'no_data' block when data is not loading and checkData() returns false -->
    <div v-if="!loading && !checkData() " class="no_data">
      <img
        :src="require('@/assets/no-data/No_Available_Data.svg')"
        alt="no data"
        class="img-fluid"
        height="auto"
        width="240px"
      />
    </div>
    <!-- Display the "no_indicator_data" block only when the data is not loading and there are indicators without available data -->
<div v-if="!loading && filteredIndicators.length > 0" class="no_ind_data">
   <!--list to present indicators without available data -->
  <ul>
  <!-- Loop through filtered indicators and display a list item for each -->
    <li v-for="(indicator, index) in filteredIndicators" :key="index"  >
   <!-- Display indicator's short name and a message indicating no available data -->
      <b>{{ indicator.short_name }},</b> does not have available data.
    </li>
  </ul>
</div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import moment from 'moment';
import AdvancedControlPanelSetup from '@/modules/msdat-dashboard/mixins/advanced-control-panel-setup';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import defaultOptions from '@/components/Barchart/defaultOption';
import chartDownload from '../mixins/chart_download';

export default {
  name: 'ICS',
  mixins: [chartDownload, AdvancedControlPanelSetup],
  components: {
    BarChart,
  },
  data() {
    return {
      title: '',
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
    controlIndex: {
      type: Number,
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
  computed: {
    filteredIndicators() {
    // Check if this.values.indicator is an array before using filter
      if (Array.isArray(this.values.indicator)) {
        return this.values.indicator.filter((indicator) => !this.hasDataForIndicator(indicator));
      }
      // Handle the case when this.values.indicator is not an array
      // console.error('Indicator is not an array:', this.values.indicator);
      return [];
    },
  },
  methods: {
    ...mapActions('MSDAT_STORE', ['SET_CONTROL_OPTIONS']),
    ...mapMutations('MSDAT_STORE', [
      'TOGGLE_VISIBILITY', 'SETUP_CONTROL_OPTIONS1',
    ]),
    hasDataForIndicator(indicator) {
      // Check if chartOptions and its series are defined
      if (this.chartOptions?.series) {
        // Exclude "Skilled birth attendance" from the check it is considered to have data
        if (indicator.short_name.toLowerCase() === 'skilled birth attendance') {
          return true;
        }
        // Find the series corresponding to the indicator
        const indicatorSeries = this.chartOptions.series.find(
          (series) => series.name.toLowerCase().includes(indicator.full_name.toLowerCase()),
        );

        // Check if the indicatorSeries has data points
        return indicatorSeries?.data && indicatorSeries.data.length > 0;
      }
      // Return false if chartOptions or series are not defined
      return false;
    },
    checkData() {
      const datar = this.chartOptions?.series?.map((el, i) => el.data[i]);
      if (datar !== undefined) {
        if (datar[0]?.length >= 1) {
          return true;
        }
        return false;
      }
      return false;
    },
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
        xAxis: {
          type: 'category',
          min: 0,
          labels: {
            x: 30,
          },
        },
        plotOptions: {
          series: {
            grouping: true,
            pointWidth: 10,
            connectNulls: false,
            pointPlacement: 'between',
            // borderWidth: 0,
          },
        },
      };
      let indicators = '';
      if (!Array.isArray(values.indicator)) {
        indicators = [values.indicator];
      } else {
        indicators = values.indicator;
      }
      const dataPromises = indicators?.map((item) => this.dlQuery({
        indicator: item.id,
        datasource: values.datasource.id,
        period: values.year,
        location: {
          level: 3,
        },
      }));

      const results = await Promise.all(dataPromises);
      /**
       * Map the display factors for the different indicators
       */
      const yTitles = [];
      for (let i = 0; i < results.length; i += 1) {
        const indicator = indicators[i];
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        yTitles.push(displayFactor.display_factor);
      }

      for (let i = 0; i < results.length; i += 1) {
        // formate result to HighChart Format
        const indicator = indicators[i];
        const data = results[i];
        const toHighChartFormat = data?.map((item) => [
          this.dlGetLocation(item.location).name,
          parseFloat(item.value),
        ]);
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        const yAxis = {
          yAxis: [
            {
              plotLines: [],
              labels: {
                style: {
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '11px',
                },
              },
              title: {
                style: {
                  ...defaultOptions.yAxis.title.style,
                  fontSize: '10px',
                },
              },
            },
          ],
          title: {
            ...defaultOptions.yAxis.title,
            // text: displayFactor.display_factor,
            text: [...new Set(yTitles)].join(' | '),
          },
          opposite: !!i, // this will become either true of false as 0 or 1
        };

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
          // name: indicator.full_name,
          name: `${indicator.full_name} ${displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''}`,
          data: toHighChartFormat,
        };
        // highChartOptions.yAxis.push(yAxis);
        if (i === 0) highChartOptions.yAxis.push(yAxis);
        if (toHighChartFormat.length) highChartOptions.series.push(obj);
      }
      return highChartOptions;
    },
    /**
     * This method loops through the list of indicators
     * and creates the SDG target line object if the
     * target exists and finally adds it to the chart
     */
    toggleSDGTargetLine(val) {
      let indicators = null;
      const plotLines = [];
      const options = { ...this.chartOptions };
      if (val) {
        if (!Array.isArray(this.values.indicator)) {
          indicators = [this.values.indicator];
        } else {
          indicators = this.values.indicator;
        }
        for (let n = 0; n < indicators.length; n++) {
          if (indicators[n].sdg_target) {
            plotLines.push({
              width: 0.5,
              id: 'sdgTarget',
              color: '#222222',
              value: indicators[n].sdg_target,
              dashStyle: 'longdashdot',
              label: {
                text: 'SDG',
                verticalAlign: 'top',
                rotation: 0,
                textAlign: 'right',
                y: 0,
                x: 0,
                style: {
                  fontSize: '10px',
                  fontFamily: '"Open Sans", sans-serif',
                },
              },
            });
            // Checks if the plotLines object exists
            if (options.yAxis[0]?.plotLines) {
              options.yAxis[0].plotLines.push(...plotLines);
            } else {
              options.yAxis[0].plotLines = [];
              options.yAxis[0].plotLines.push(...plotLines);
            }
            this.chartOptions = { ...options };
          }
        }
      } else {
        // Checks if the plotLines object exists
        if (options.yAxis[0]?.plotLines) {
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'sdgTarget');
          options.yAxis[0].plotLines = temp;
        } else {
          options.yAxis[0].plotLines = [];
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'sdgTarget');
          options.yAxis[0].plotLines = temp;
        }
        this.chartOptions = { ...options };
      }
    },
    /**
     * This method loops through the list of indicators
     * and creates the national target line object if the
     * target exists and finally adds it to the chart
     */
    toggleNationalTargetLine(val) {
      let indicators = null;
      const plotLines = [];
      const options = { ...this.chartOptions };
      if (val) {
        if (!Array.isArray(this.values.indicator)) {
          indicators = [this.values.indicator];
        } else {
          indicators = this.values.indicator;
        }
        for (let n = 0; n < indicators.length; n++) {
          if (indicators[n].national_target) {
            plotLines.push({
              width: 0.5,
              color: '#222222',
              id: 'ntLine',
              value: indicators[n].national_target,
              label: {
                text: 'NT',
                verticalAlign: 'top',
                rotation: 0,
                textAlign: 'left',
                y: 0,
                x: -13,
                style: {
                  fontSize: '10px',
                  fontFamily: '"Open Sans", sans-serif',
                },
              },
            });
            // Checks if the plotLines object exists
            if (options.yAxis[0]?.plotLines) {
              options.yAxis[0].plotLines.push(...plotLines);
            } else {
              options.yAxis[0].plotLines = [];
              options.yAxis[0].plotLines.push(...plotLines);
            }
            this.chartOptions = { ...options };
          }
        }
      } else {
        // Checks if the plotLines object exists
        if (options.yAxis[0]?.plotLines) {
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'ntLine');
          options.yAxis[0].plotLines = temp;
        } else {
          options.yAxis[0].plotLines = [];
          const temp = options.yAxis[0].plotLines.filter((line) => line.id !== 'ntLine');
          options.yAxis[0].plotLines = temp;
        }

        this.chartOptions = { ...options };
      }
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

      const dataPromises = indicators?.map((item) => this.dlQuery({
        indicator: item.id,
        datasource: values.datasource.id,
        location: values.location.id,
      }));

      const results = await Promise.all(dataPromises);
      // debugger;
      /**
       * Map the display factors for the different indicators
       */
      const yTitles = [];
      for (let i = 0; i < results.length; i += 1) {
        const indicator = indicators[i];
        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        yTitles.push(displayFactor.display_factor);
      }

      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        const indicator = indicators[i];
        const filterOnlyYearlyValues = result.filter((item) => moment(item.period, 'YYYY', true).isValid());
        const formatToHighChartFormat = filterOnlyYearlyValues?.map((item) => [
          item.period,
          Number.parseFloat(item.value),
        ]);
        const sortTheYear = formatToHighChartFormat.sort((a, b) => a[0] - b[0]);

        const displayFactor = this.dlGetFactor(indicator.factor) || { display_factor: '' };
        if (i === 0) {
          highChartOptions.yAxis.push({
            yAxis: [
              {
                plotLines: [],
                labels: {
                  style: {
                    fontFamily: 'Work Sans, sans-serif',
                    fontSize: '11px',
                  },
                },
                title: {
                  style: {
                    ...defaultOptions.yAxis.title.style,
                    fontSize: '10px',
                  },
                },
              },
            ],
            title: {
              ...defaultOptions.yAxis.title,
              // text: displayFactor.display_factor,
              text: [...new Set(yTitles)].join(' | '),
            },
            opposite: !!i, // this will become either true of false as 0 or 1
          });
        }
        const obj = {
          color: this.color[i],
          lineWidth: 3,
          // name: indicator.full_name,
          name: `${indicator.full_name} ${displayFactor.display_factor.trim() ? `(${displayFactor.display_factor})` : ''}`,
          data: sortTheYear,
        };
        if (sortTheYear.length) highChartOptions.series.push(obj);
      }
      // this functions checks to make years apear from smallest to highest when the first selected indicator
      // year have higher values than that of the second selected indicator
      if (highChartOptions.series.length > 1 && highChartOptions.series[0].data[0] > highChartOptions.series[1].data[0]) {
        const temporary = highChartOptions.series[1];
        highChartOptions.series[1] = highChartOptions.series[0];
        highChartOptions.series[0] = temporary;
      }
      return highChartOptions;
    },

    async renderChart(panelValues) {
      const { sdg, national } = this.values.target;
      this.chartOptions = {};
      if (panelValues.compareBy.name === 'Period') {
        const highChartOptions = await this.plotForPeriods(panelValues);
        this.chartOptions = { ...highChartOptions };
        /**
         * the purpose of the if check is to make sure we
         * don't try to add plotlines before the chart is
         * rendered
         */
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }

      if (panelValues.compareBy.name === 'State') {
        const highChartOptions = await this.plotForState(panelValues);
        this.chartOptions = { ...highChartOptions };
        if (Object.keys(this.chartOptions).length !== 0) {
          this.toggleSDGTargetLine(sdg);
          this.toggleNationalTargetLine(national);
        }
      }
    },
  },
  watch: {
    'values.indicator': {
      async handler() {
        // this.chartOptions = {}; // remove soon
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
            panelIndex: this.controlIndex,
            key: 'year',
            value: false,
          });

          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: true,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        } else if (data.name === 'State') {
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'year',
            value: true,
          });
          this.TOGGLE_VISIBILITY({
            panelIndex: this.controlIndex,
            key: 'location',
            value: false,
          });

          // get the list of years by datasource
          const setYearDropdown = await this.setYearDropdown();
          // period dropdown;
          this.SET_CONTROL_OPTIONS({
            panelIndex: 2,
            controlIndex: 2,
            values: setYearDropdown,
          });
          this.loading = true;
          await this.renderChart(this.values);
          this.loading = false;
        }
      },
      immediate: false,
    },
    /**
     * This adds or removes the target line
     * without re-plotting the entire chart
     */
    'values.target.sdg': {
      handler(val) {
        this.toggleSDGTargetLine(val);
      },
    },
    /**
     * This adds or removes the target line
     * without re-plotting the entire chart
     */
    'values.target.national': {
      handler(val) {
        this.toggleNationalTargetLine(val);
      },
    },
  },

  async mounted() {
    if (!this.values?.datasource) {
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: 2,
        key: 'datasource',
        value: this.dlDatasource.find((dat) => dat.id === 8),
      });
    }
    if (!Array.isArray(this.values.indicator.length)) {
      this.title = ` Comparison Of ${this.values.indicator.short_name} according to the ${this.values.datasource.datasource} across ${this.values.compareBy.name}`;
    } else {
      this.title = ` Comparison Of ${this.values.indicator[0].short_name} and ${this.values.indicator[1].short_name} according to the ${this.values.datasource.datasource} across ${this.values.compareBy.name}s`;
    }
  },
};
</script>

<style lang="scss" scoped>
div.ics_wrapper {
  position: relative;
  div.no_data {
    position: absolute;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.no_ind_data {
  position:fixed ;
  top:280px;
  right: 110px;
  padding: 10px;
  background-color: #ffffff;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  ul{
    list-style: none;
    padding: 0;
    margin: 0;
    position: sticky;
  }

  li {
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    line-height: 1.5;
    letter-spacing: 0.5px;
    text-align: left;
    margin-bottom: 0.5rem;
  }
}
</style>
