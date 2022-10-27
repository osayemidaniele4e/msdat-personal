<template>
  <div class="position-relative" id="stateBarChartComponent">
    <base-overlay :show="loading">
      <base-sub-card
        ref="SubCard"
        showControls
        v-if="Object.keys(values).length"
        @dropdownTypeSelected="
          downLoadType($event, {
            indicator: values.indicator.short_name,
            datasource: values.datasource.datatsource,
            year: values.year,
          })
        "
      >
        <template #title>
          <p class="work-sans mb-0 line-height">
            Distribution Of
            <b>{{ values.indicator.short_name }}</b> Across The Country. Source:<b>
              {{ values.datasource.datasource }} {{ values.year }}</b
            >
          </p>
        </template>
        <button
          @click="returnToNational"
          v-show="level !== 1"
          class="bg-transparent text-dark font-weight-bold"
        >
          <b-icon icon="chevron-left" />
          &nbsp;Back to National
        </button>
        <div @click="handleChartClick">
          <BarChart ref="BaseChart"
          :chartOptions="BarChartOptions"
          :title="title"
           />
        </div>
      </base-sub-card>
    </base-overlay>
    <NoSubNationalData
      v-if="showNoSubNationalData"
      class="position-absolute"
      style="top: 15%; width: 80%; left: 20%"
    />
  </div>
</template>
<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import { eventBus } from '@/main';
import chartDownload from '../../../mixins/chart_download';
import NoSubNationalData from '../../NoData.vue';

export default {
  mixins: [chartDownload, formatter],
  components: {
    BarChart,
    NoSubNationalData,
  },
  data() {
    return {
      title: '',
      BarChartOptions: {},
      loading: false,
      showNoSubNationalData: false,
      level: 1,
      updateData: 0,
      desirable_slope: '',
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
    closeOverlay: {
      type: Boolean,
    },
  },
  watch: {
    // Watch closeOverlay
    closeOverlay: {
      handler(newValue) {
        if (newValue) {
          this.closeOverlay = true;
          this.$refs.SubCard.close();
        }
      },
      deep: true,
    },
    values: {
      async handler() {
        await this.updateValue();
      },
      deep: true,
      immediate: false,
    },
    'BarChartOptions.series': {
      handler(newSeries) {
        for (let i = 0; i < newSeries.length; i += 1) {
          if (newSeries[0].data.length <= 0) {
            this.showNoSubNationalData = true;
            return;
          }
          if (i > 0) {
            this.showNoSubNationalData = false;
            if (newSeries[i].data.length > 0) {
              this.showNoSubNationalData = false;
              return;
            }
          }
        }
      },
    },
    updateData: {
      async handler() {
        await this.updateValue();
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    async getNDData(queryArray) {
      const nums = await queryArray.map((item) => this.queryDBForNumDenum({
        datasource: item.datasource,
        period: item.period,
        indicator: item.indicator,
        location: item.location,
      }));
      const returnedNums = await Promise.allSettled(nums);
      const noData = returnedNums.every((value) => value.value.length === 0);
      if (!noData) {
        const mappedValues = returnedNums.map((item) => {
          const num = item?.value.find((el) => el.value_type === 6);
          const denum = item?.value.find((el) => el.value_type === 10);
          return {
            datasource: denum?.datasource || null,
            period: denum?.period || null,
            indicator: denum?.indicator || null,
            location: denum?.location || null,
            numerator: num?.value || null,
            denominator: denum?.value || null,
          };
        });
        return mappedValues;
      }
      return [];
    },
    async updateValue() {
      this.loading = true;
      const data = await this.getData(this.values);
      if (this.values.indicator?.id === undefined) {
        return;
      }
      // eslint-disable-next-line camelcase
      const { national_target, sdg_target, desirable_slope } = this.dlGetIndicator(this.values.indicator.id);
      const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
      const national = await this.computeNationalND();
      let ndData = [];
      if (this.values.numdenum === true) {
        ndData = await this.getNDData(data);
      }

      const chartOptions = this.genHighChartOption(data, {
        nationalTarget: {
          value: national_target,
          show: this.values.target.national,
          slope: desirable_slope,
        },
        sdgTarget: {
          value: sdg_target,
          show: this.values.target.sdg,
          slope: desirable_slope,
        },
      }, await ndData, this.values.numdenum);
      chartOptions.yAxis.title.text = `${displayFactor}`;
      // add nation and state selected to fit according to mockup :cry: :worried: :rage:
      const parentValue = await this.dlQuery({
        indicator: this.values.indicator.id,
        datasource: this.values.datasource.id,
        period: this.values.year,
        // value_type: 5,
        location: this.values.location.id,
      });
      // because i know i am expecting only on value in the array of results
      if (parentValue.length > 0) {
        const parent = parentValue[0];

        if (national_target === null) {
          const seriesObject = {
            showInLegend: false,
            // eslint-disable-next-line camelcase
            color: '#0000FF',
            // eslint-disable-next-line camelcase
            name: parseFloat(parent.value) > national_target ? 'On Target' : 'Below Target',
            data: [
              {
                name: this.values.location.name,
                y: Number(parseFloat(parent.value).toFixed(1)),
                nd: national.numerator || 0,
                dn: national.denominator || 0,
              }],
          };
          chartOptions.series.unshift(seriesObject);
        }

        if (national_target !== null) {
          if (desirable_slope === 'Positive') {
            const seriesObject = {
              showInLegend: false,
              // eslint-disable-next-line camelcase
              color: parseFloat(parent.value) > national_target ? '#00a65a' : '#E85D58',
              // eslint-disable-next-line camelcase
              name: parseFloat(parent.value) > national_target ? 'On Target' : 'Below Target',
              data: [
                {
                  name: this.values.location.name,
                  y: Number(parseFloat(parent.value).toFixed(1)),
                  nd: national.numerator || 0,
                  dn: national.denominator || 0,
                }],
            };
            chartOptions.series.unshift(seriesObject);
          }

          if (desirable_slope === 'Negative') {
            const seriesObject = {
              showInLegend: false,
              // eslint-disable-next-line camelcase
              color: parseFloat(parent.value) > national_target ? '#E85D58' : '#00a65a',
              // eslint-disable-next-line camelcase
              name: parseFloat(parent.value) > national_target ? 'On Target' : 'Below Target',
              data: [
                {
                  name: this.values.location.name,
                  y: Number(parseFloat(parent.value).toFixed(1)),
                  nd: national.numerator || 0,
                  dn: national.denominator || 0,
                }],
            };
            chartOptions.series.unshift(seriesObject);
          }
        }
      }
      if (this.values.numdenum === true) {
        chartOptions.tooltip.backgroundColor = 'rgba(255, 255, 255, 1)';
        chartOptions.tooltip.outside = true;
        chartOptions.tooltip.pointFormat = `${'<span style="font-size:10px; color:black;font-weight:bold;">'
          + '{series.name}:'
          + ' {point.y:.2f}'}<br>`
          + '<span style="font-size:10px; color:black;">'
          + '('
          + '{point.nd} '
          + 'of'
          + ' {point.dn}'
          + ')'
          + '</span>';
      }
      this.BarChartOptions = chartOptions;
      this.loading = false;
    },
    async computeNationalND() {
      if (this.values.numdenum === true) {
        const numeratorData = await this.dlQuery({
          datasource: this.values.datasource.id,
          indicator: this.values.indicator.id,
          period: this.values.year,
          location: this.values.location.id,
          value_type: 6,
        });
        const denominatorData = await this.dlQuery({
          datasource: this.values.datasource.id,
          indicator: this.values.indicator.id,
          period: this.values.year,
          location: this.values.location.id,
          value_type: 10,
        });
        if (numeratorData.length > 0 || denominatorData.length > 0) {
          return {
            numerator: Number(numeratorData[0].value).toLocaleString(),
            denominator: Number(denominatorData[0].value).toLocaleString(),
          };
        }
        return {
          numerator: null,
          denominator: null,
        };
      }
      return {
        numerator: null,
        denominator: null,
      };
    },
    async getData(optionsObject) {
      const {
        datasource, indicator, location, year,
      } = optionsObject;
      let locationValue = location;
      if (location.id === 1) {
        locationValue = { level: 3 };
      } else {
        locationValue = { parent: location.id };
      }
      // debugger;
      const data = await this.dlQuery({
        datasource: datasource.id,
        indicator: indicator.id,
        period: year,
        location: locationValue,
        // value_type: 5,
      });
      // loop through data and parseFloat the value toFixed(1)
      for (let i = 0; i < data.length; i += 1) {
        data[i].value = parseFloat(data[i].value).toFixed(1);
      }
      return data;
    },
    handleChartClick(e) {
      const point = e?.point?.name;
      const selectedPlace = this.dlGetLocation({ level: 3 }).filter((val) => val.name === point);
      if (selectedPlace.length !== 0) {
        eventBus.$emit('handleClick', selectedPlace[0]);
      }
      this.level = 3;
    },
    returnToNational() {
      const selectedPlace = this.dlGetLocation({ level: 1 });
      if (selectedPlace.length !== 0) {
        eventBus.$emit('handleClick', selectedPlace[0]);
      }
      this.level = 1;
    },
  },
  mounted() {
    this.updateData = +1;
    this.title = `Distribution Of ${this.values.indicator.short_name} Across The Country. Source: ${this.values.datasource.datasource} ${this.values.year}`;
  },
};
</script>
<style lang="scss" scoped></style>
