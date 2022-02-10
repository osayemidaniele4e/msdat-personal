<template>
  <div class="container">
    <base-overlay :show="loader">
      <base-sub-card
        v-if="Object.keys(controlPanelProps).length"
        showControls
        @dropdownTypeSelected="
          downLoadTypeMap($event, {
            indicator: controlPanelProps.indicator.short_name,
            datasource: controlPanelProps.datasource.datasource,
            year: controlPanelProps.year,
          })
        "
      >
        <template #title>
          <p class="text-dark work-sans mb-0 line-height">
            Distribution of
            <span class="font-weight-bold">
              {{ controlPanelProps.indicator.full_name }} </span
            >Across the
            <span class="font-weight-bold"> zones in the Country.</span> Source:
            <span class="font-weight-bold">
              {{ controlPanelProps.datasource.datasource }}
              {{ controlPanelProps.year }}</span
            >
          </p>
        </template>
        <div id="zonalMapComponent">
          <button @click="returnToNational" v-show="level !== 1">
            <img
              :src="require('../../../assets/chevron-left.svg')"
              alt="caret-left"
              width="15"
              height="15"
            />&nbsp;Back to National
          </button>
          <BaseMap
            ref="BaseMap"
            :mapObject="chart"
            :level="level"
            :lgaState="stateName"
          />

          <NoAvailableData
            v-if="showNoAvailableData"
            class="position-absolute"
            style="top: 9%;
            width: 50%; left: 25%"
          />
        </div>
      </base-sub-card>
    </base-overlay>
  </div>
</template>

<script>
import BaseMap from '@/components/maps/BaseMap.vue';
import chartDownload from '../../../mixins/chart_download';
import NoAvailableData from '../../NoData2.vue';
import { sortHighChartDataFormat } from '../../../mixins/util';
import { eventBus } from '@/main';

export default {
  mixins: [chartDownload],
  props: {
    controlPanelProps: {
      type: Object,
    },
    colors: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseMap,
    NoAvailableData,
  },
  data() {
    return {
      chart: {},
      loader: false,
      level: 1,
      stateName: 'Nigeria',
      showNoAvailableData: false,
    };
  },
  methods: {
    returnToNational() {
      const selectedPlace = this.dlGetLocation({ level: 1 });
      if (selectedPlace.length !== 0) {
        eventBus.$emit('handleClick', selectedPlace[0]);
      }
    },
  },

  watch: {
    controlPanelProps: {
      async handler(val) {
        this.loader = true;
        const data = await this.dlQuery({
          indicator: val.indicator.id,
          datasource: val.datasource.id,
          period: val.year,
        });
        const stateObject = this.dlGetLocation(val.location.id);
        // plot for LGA Data
        if (val.location.id !== 1) {
          const filteredLGADataForState = data.filter(
            (item) => this.dlGetLocation(item.location).parent === val.location.id,
          );
          if (filteredLGADataForState.length === 0) {
            this.showNoAvailableData = true;
          } else {
            this.showNoAvailableData = false;
          }
          const formatToHighChart = (dataValues) => dataValues.map((item) => [
            this.dlGetLocation(item.location).name,
            parseFloat(item.value),
          ]);
          const chartSeries = [];
          const formattedData = formatToHighChart(filteredLGADataForState);
          const sortedData = formattedData.sort(sortHighChartDataFormat);
          // remove LGAs sting from LGA name cause mapdata does not support the format
          sortedData.forEach((item) => {
            const newItem = item;
            newItem[0] = newItem[0].split('LGA')[0].trim();
            return newItem;
          });
          console.log('chart =>', sortedData, 'if');

          const stateData = data.find(
            (item) => item.location === val.location.id,
          );

          sortedData.unshift({
            name: stateObject.name,
            y: parseFloat(stateData.value),
            color: this.colors[0].color,
          });
          chartSeries.push({
            color: this.colors.find((item) => item.id === stateObject.parent)
              .color,
            name: stateObject.name,
            data: sortedData,
          });

          this.stateName = stateObject.name; // Please always change the state name before
          // changing the level else you would get an error
          this.level = 3;
          this.chart = {
            series: chartSeries,
          };
        } else {
          const formatToHighChart = (dataValues) => dataValues.map((item) => [
            this.dlGetLocation(item.location).name,
            parseFloat(item.value),
          ]);

          const chartSeries = [];

          // let color =  [2,3,4,5,6,7]; // already know the zonal levels/parent of all the value
          for (let index = 0; index < this.colors.length; index += 1) {
            const group = data.filter(
              (item) => this.dlGetLocation(item.location).parent
                === this.colors[index].id,
            );

            // if(group.length > 0 && group.length < 8){
            //   // i am assuming that the zonal level data is all that exist so switch zonal level
            //     this.level = 2;
            // }else{
            //   this.level = 3;
            // }
            const { color } = this.colors.find(
              (item) => item.id === this.colors[index].id,
            );
            const formattedData = formatToHighChart(group);
            const sortedData = formattedData.sort(sortHighChartDataFormat);
            const series = this.dlGetLocation(this.colors[index].id);

            chartSeries.push({
              color,
              name: series.name,
              data: sortedData,
            });
            /**
             * Function no fully functional
             * ! Need to fix the issue
             */
            for (let i = 0; i < chartSeries.length; i += 1) {
              if (chartSeries[i].data.length === 0) {
                this.showNoAvailableData = true;
              } else {
                this.showNoAvailableData = false;
              }
            }
          }
          this.stateName = stateObject.name; // Please always change the state name before
          // changing the level else you would get an error
          this.level = 1;
          this.chart = {
            series: chartSeries,
          };
        }
        this.loader = false;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
