<template>
  <div class="position-relative" id="stateBarChartComponent" >
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
         <button @click="returnToNational" v-show="level !== 1">
            <img
              :src="require('../../../assets/chevron-left.svg')"
              alt="caret-left"
              width="15"
              height="15"
            />&nbsp;Back to National
          </button>
        <div @click="handleChartClick">
           <BarChart ref="BaseChart" :chartOptions="BarChartOptions" />
        </div>

      </base-sub-card>
    </base-overlay>
    <NoSubNationalData
      v-if="showNoSubNationalData"
      class="position-absolute"
      style="top: 15%; width: 80%; left: 20%;"
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
      BarChartOptions: {},
      loading: false,
      showNoSubNationalData: false,
      level: 1,
      updateData: 0,
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
        this.updateValue();
      },
      deep: true,
      immediate: false,
    },
    'BarChartOptions.series': {
      handler(newSeries) {
        for (let i = 0; i < newSeries.length; i += 1) {
          if (newSeries[0].data.length <= 0) {
            this.showNoSubNationalData = false;
            return;
          }
          if (i > 0) {
            this.showNoSubNationalData = true;
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
        this.updateValue();
      },
      deep: true,
      immediate: false,

    },
  },
  methods: {
    async updateValue() {
      this.loading = true;
      const data = await this.getData(this.values);
      // eslint-disable-next-line camelcase
      const { national_target, sdg_target } = this.dlGetIndicator(this.values.indicator.id);
      const displayFactor = this.dlGetFactor(this.values.indicator.factor).display_factor;
      const chartOptions = this.genHighChartOption(data, {
        nationalTarget: {
          value: national_target,
          show: this.values.target.national,
        },
        sdgTarget: {
          value: sdg_target,
          show: this.values.target.sdg,
        },
      });
      chartOptions.yAxis.title.text = `${displayFactor}`;
      // add nation and state selected to fit according to mockup 😢 😟 😡

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
        const seriesObject = {
          showInLegend: false,
          // eslint-disable-next-line camelcase
          color: parseFloat(parent.value) > national_target ? '#00a65a' : '#E85D58',
          // eslint-disable-next-line camelcase
          name: parseFloat(parent.value) > national_target ? 'On Target' : 'Below Target',
          data: [[this.values.location.name, Number(parseFloat(parent.value).toFixed(1))]],
        };
        chartOptions.series.unshift(seriesObject);
      }

      this.BarChartOptions = chartOptions;
      this.loading = false;
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
      return data;
    },

    handleChartClick(e) {
      const point = e.point.name;
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

    // console.log('values', this.values)
  },
};
</script>

<style lang="scss" scoped></style>
