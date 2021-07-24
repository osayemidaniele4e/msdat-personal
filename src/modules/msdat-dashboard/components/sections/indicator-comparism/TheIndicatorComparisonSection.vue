<template>
<base-overlay :show="loading">
<!-- the props ConfidenceOptions and showToggle show the cofidence range component
 and the chart type component respectively
 note: the confidence range prop just makes the this section look more like the mock-up
 and might need to be removed entirely -->
   <base-sub-card
     buttonToggle
      showControls
      sideControl="true"
      :ConfidenceOptions="false"
      :showToggle="false"
      @selected-datasource="onSelectedSource($event)"
      @toggle-confidence-range="onConfidenceRangeClicked($event)"
      v-if="values"
    >
        <template #title>
        <!-- the indicator property is eith an object when alone
        or an array when compared aganist another  -->
    <h6 class="work-sans" v-if="!values.indicator.length">
          Comparison Of <b>{{ values.indicator.short_name }}</b>
           according to the <b> {{values.datasource.datasource}} </b> across time
        </h6>
        <h6 class="work-sans" v-else>
          Comparison Of <b>{{ values.indicator[0].short_name }}</b>
           and <b> {{dlGetIndicator(values.indicator[1].id).short_name}} </b>
           according to the <b> {{values.datasource.datasource}} </b> across time
        </h6>
        </template>
       <BarChart :chartOptions="ChartOptions" />
     </base-sub-card>
  </base-overlay>
</template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { sortBy } from 'lodash';
import defaultOptions from '@/components/Barchart/defaultOption';
import formatter from '../../../mixins/formatter';

export default {
  mixins: [formatter],
  components: {
    BarChart,
  },
  data() {
    return {
      ChartOptions: {
        xAxis: {
          ...defaultOptions.xAxis,
          categories: [1998, 1999, 2003, 2004],
        },
        yAxis: {
          min: 0,
          plotLines: [{
            value: 49,
            color: '#999',
            width: 3,
          }],
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
            data: [[2015, 62.5], [2010, 54.1]],
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

    async onSelectedSource(datasourceArray) {
      console.log(' you selected');
      console.log('this', datasourceArray);
    },
    async onConfidenceRangeClicked(e) {
      console.log('doubt i need confidence range', e);
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
        this.loading = true;
        this.ChartOptions.series = [];

        // check if the indicator parameter is alone or is going to be compared with another one
        if (this.values.indicator.length) {
          for (let i = 0; i <= options.indicator.length - 1; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const data = await this.dlQuery({
              datasource: options.datasource.id,
              indicator: options.indicator[i].id,
              location: 1,
            });
            // create the various objects for the chart series
            const seriesObject = {
              name: this.dlGetIndicator(options.indicator[i].id).short_name,
              data: [],
            };
            data.map((series) => seriesObject.data.push(
              [Number(series.period), Number(series.value)],
            ));
            const mappedData = sortBy(seriesObject.data, [(o) => o[0]]);
            seriesObject.data = mappedData;
            this.ChartOptions.series.push(seriesObject);
            console.log('new series', seriesObject);
          }
        } else {
          const data = await this.dlQuery({
            datasource: options.datasource.id,
            indicator: options.indicator.id,
            location: 1,
          });
          const seriesObject = {
            name: this.dlGetIndicator(options.indicator.id).short_name,
            data: [],
          };
          data.slice(0, 7)
            .map((series) => seriesObject.data.push([Number(series.period), Number(series.value)]));
          this.ChartOptions.series.push(seriesObject);
        }
        this.loading = false;
      },
      deep: true,
    },

  },
  mounted() {},
};

</script>

        <style>

        </style>
