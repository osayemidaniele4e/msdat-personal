<template>
<base-overlay :show="loading">
   <base-sub-card
     buttonToggle
      showControls
      sideControl="true"
      :ConfidenceOptions="false"
      :showToggle="false"
      :dataSourceOptions="dataSourcesOptions"
      @toggled-button="updateChart($event)"
      @selected-datasource="onSelectedSource($event)"
      @toggle-confidence-range="onConfidenceRangeClicked($event)"
      :dataSourceOptionsSelected="selectedDS"
      v-if="values"
    >
    <h1 slot="title">yoloo title</h1>
 <template #title>
        <h6 class="work-sans">
          Comparison Of <b>{{ values.indicator.short_name }}</b>
           and <b> dash </b> according to the <b> {{values.datasource.datasource}} </b> across time
        </h6>
      </template>
       <BarChart :chartOptions="ChartOptions" />

<div>
         <!-- <pre> {{data}} </pre> -->
         <pre> {{forChart}} </pre>
          <button @click="run()" class="mr-2"> run </button>
           <button @click="showValues()"  class="mr-2"> show values </button>
           <button @click="runQuery()"> run query </button>
</div>
   </base-sub-card>
</base-overlay>
        </template>

<script>
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import { sortBy, uniq, get } from 'lodash';
import defaultOptions from '@/components/Barchart/defaultOption';
import formatter from '../../mixins/formatter';

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
          categories: [1990, 1999, 2003, 2007, 2008, 2010, 2011, 2012, 2013, 2015, 2016, 2018],
        },
        yAxis: {
          plotLines: [{
            value: 49,
            color: '#999',
            width: 3,
            // label: {
            // text: 'dope label',
            // },
          }],
          // title: {
          //  text: 'dope label',
          // },
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
            data: [90, 25, 43, 23, 40],
            name: 'ANC coverage (atleast 1 visit)',
          },
          {
            data: [10, 25],
            name: 'Adolesent birth rate',
          },
        ],
      },
      loading: false,
      sortedYear: null,
      data: {},
      forChart: {},
      indicatorNames: null,
      dataSourcesOptions: [
        {
          id: 8,
          datasource: 'IHME',
        },
        {
          id: 5,
          datasource: 'NNHS',
        },
        {
          id: 9,
          datasource: 'WHO-GHO',
        },
      ],

    };
  },
  methods: {

    setUpHighChartConfig(ChartSeriesObject, sortedYear = []) {
      this.ChartOptions = {
        xAxis: {
          ...defaultOptions.xAxis,
          categories: [1998, 1999],
        },
        yAxis: {
          plotLines: [{
            value: 50,
            color: 'green',
            width: 2,
            label: {
              text: 'Last quarter minimum',
            },
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
        series: ChartSeriesObject,
      };
    },
    async runQuery() {
      const data = await this.dlQuery({
        indicator: 5,
        datasource: 4,
      });
      console.log('this is the query', data);
    },

    async run() {
      console.log('run');
      this.data = await this.dlQuery({
        indicator: 7,
        datasource: 6,
        location: 10,
      });
      const newValues = this.data.map((item) => {
        const newObject = {
          ...item,
        };
        newObject.indicator = this.dlGetIndicator(item.indicator).short_name;
        newObject.datasource = this.dlGetDataSource(item.datasource).datasource;
        newObject.location = this.dlGetLocation(item.location).name;
        newObject.parent = this.dlGetLocation({ parent: item.location }).name;
        return newObject;
      });
      console.log(newValues);
      this.forChart = newValues;
    },
    showValues() {
      console.log('show values', this.values.indicator.map((item) => item.short_name), this.values);
    },

    updateChart(e) {
      console.log('update chart');
    },
    async onSelectedSource(datasourceArray) {
      console.log(' you selected');
      console.log('this', datasourceArray);
    },
    async onConfidenceRangeClicked(e) {
      console.log('doubt i need confidence range');
    },
    // datalayer/mixin.js
    // async run() {
    //  this.data = await this.dlQuery({
    //    indicator: 16,
    //   datasource: 8,
    //   location: 1,
    // });
    // },
  },
  props: {
    /**
     * input values
     */
    values: {
      type: [Object, String, Array],
      required: true,
    },
  },
  watch: {
    'values.indicator': {
      async handler() {
        this.loading = true;
        console.log('changed indicator niggaa');
        // const newArray = this.values.indicator.map((item) => {
        // item.forEach(this.dlQuery( {indicator: item.id}))
        // })
        // this.value.indicator.id;
        console.log(this.values);
        this.loading = false;
      },
    },
    'values.datasource': {
      async handler() {
        this.loading = true;
        console.log('changed datasource niggaa');
        console.log(this.values.datasource);
        this.loading = false;
      },
    },
  },
  mounted() {
    console.log('mounted my section');
    console.log('values', this.values);
    console.log(this.values.map((ollo) => ollo.indicator.short_name));
  // const indiNames = this.values.map((name) => name.indicator.short_name);
    // console.log("are", indiNames);
    // this.indicatorNames = indiNames;
  },
};

</script>

        <style>

        </style>
