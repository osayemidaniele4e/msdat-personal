<template>
  <base-overlay :show="loader" class="main">
    <base-sub-card
      showControls
      v-if="Object.keys(controlPanelProps).length"
      @dropdownTypeSelected="
        downLoadType($event, {
          indicator: controlPanelProps.indicator.short_name,
          datasource: '',
          year: '',
        })
      "
    >
      <template #title>
        <p class="work-sans mb-0 line-height">
          Distribution of
          <span class="font-weight-bold">{{ controlPanelProps.indicator.full_name }} </span>across
          <span class="font-weight-bold"> {{ controlPanelProps.location.name }}.</span> Source:
          <span class="font-weight-bold"> {{ controlPanelProps.datasource.datasource }}</span>
          {{ controlPanelProps.year }}
        </p>
      </template>
      <BarChart ref="BaseChart" :title="title" :chartOptions="chart" class="barchart" />
    </base-sub-card>
  </base-overlay>
</template>

<script>
import Highcharts from 'highcharts';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import formatter from '@/modules/msdat-dashboard/mixins/formatter';
import ApiServices from '@/modules/data-layer/services/ApiServices';
import chartDownload from '../../../mixins/chart_download';
import { sortHighChartDataFormat } from '../../../mixins/util';

export default {
  name: 'ZonalSectionChart',
  mixins: [chartDownload, formatter],
  data() {
    return {
      // later someone can add the name property
      // so that we can know to the zones as against to searching for the ids
      title: '',
      stateName: null,
      chart: {},
      loader: false,
      states: null,
    };
  },
  components: {
    BarChart,
  },
  props: {
    mapSelectedState: {
      type: String,
    },
    controlPanelProps: {
      type: Object,
      required: true,
    },
    colors: {
      type: [Object, Array],
      required: true,
    },
  },

  methods: {
    /**
     * @method computeChartPlotLines is from the
     * @mixin formatter
     */
    formatToHighChart(dataSeries) {
      // console.log(dataSeries, 'dataSeries');
      const displayFactor = this.dlGetFactor(
        this.controlPanelProps.indicator.factor,
      ).display_factor;

      this.chart = {
        chart: {
          type: 'column',
          zoomType: 'xy',
        },
        xAxis: {
          type: 'category',
          min: -0.3,
          max:
            dataSeries.reduce(
              (total, obj, ind) => total + obj.data.filter((dat) => ind === 0 || !dat[0].includes('-')).length,
              0,
            ) - 0.7,
        },
        yAxis: {
          gridLineWidth: 0,
          plotLines: [...this.computeChartPlotLines(this.controlPanelProps)],
          title: {
            text: 'Values',
            style: {
              fontSize: '13px',
              fontFamily: '"Work Sans", sans-serif',
            },
          },
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{y}',
            },
          },
        },
        series: dataSeries,
      };
      this.chart.yAxis.title.text = displayFactor;
    },

    getZonalDataInHighChartFormat(data) {
      const zonalColors = {
        'North-West': '#5c3819',
        'North-East': '#8ab9bb',
        'North-Central': '#89d880',
        'South-West': '#7d8ade',
        'South-East': '#f872a0',
        'South-South': '#e1e164',
      };
      const zonesSeries = [];
      for (let index = 1; index < this.colors.length; index += 1) {
        const zonal = data.find((item) => item.location === this.colors[index].id);
        const series = this.dlGetLocation(this.colors[index].id);
        if (zonal) {
          zonesSeries.push({
            name: series.name,
            y: parseFloat(zonal.value),
            color: Highcharts.color(zonalColors[series.name]).get(),
          });
        }
      }
      // sort Zonal series data in ascending order
      return zonesSeries.sort((a, b) => b.y - a.y);
    },

    filterNonEmptyData(series) {
      return series.filter((item) => {
        console.log(item.name, item.data); // Debugging the `data` value
        return item.data && item.data.length > 0;
      });
    },

    getStateDataAccordingToRegionInHighChartFormat(data) {
      // add this function to a mixin later
      const formatToHighChart = (dataValues) => dataValues.map((item) => [this.getAbbreviatedStateName(this.dlGetLocation(item.location).name), parseFloat(item.value)]);

      // already know the zonal levels/parent of all the value
      // index starts at one to skip region data for the series
      const chartSeries = [];
      for (let index = 1; index < this.colors.length; index += 1) {
        const group = data.filter(
          (item) => this.dlGetLocation(item.location).parent === this.colors[index].id,
        );
        const formattedData = formatToHighChart(group);
        const sortedData = formattedData.sort(sortHighChartDataFormat);
        const series = this.dlGetLocation(this.colors[index].id);
        chartSeries.push({
          color: this.colors[index].color,
          name: series.name,
          data: sortedData,
        });
      }
      // console.log(chartSeries, 'chartseries')
      return chartSeries;
    },

    getAbbreviatedStateName(stateName) {
      const stateAbbreviations = {
        Abia: 'ABI',
        Adamawa: 'ADA',
        'Akwa Ibom': 'AKW',
        Anambra: 'ANB',
        Bauchi: 'BAU',
        Bayelsa: 'BAY',
        Benue: 'BEN',
        Borno: 'BOR',
        'Cross River': 'CRS',
        Delta: 'DEL',
        Ebonyi: 'EBO',
        Edo: 'EDO',
        Ekiti: 'EKI',
        Enugu: 'ENU',
        FCT: 'FCT',
        Gombe: 'GOM',
        Imo: 'IMO',
        Jigawa: 'JIG',
        Kaduna: 'KAD',
        Kano: 'KAN',
        Katsina: 'KAT',
        Kebbi: 'KEB',
        Kogi: 'KOG',
        Kwara: 'KWA',
        Lagos: 'LAG',
        Nasarawa: 'NAS',
        Niger: 'NIG',
        Ogun: 'OGU',
        Ondo: 'OND',
        Osun: 'OSU',
        Oyo: 'OYO',
        Plateau: 'PLA',
        Rivers: 'RIV',
        Sokoto: 'SOK',
        Taraba: 'TAR',
        Yobe: 'YOB',
        Zamfara: 'ZAM',
      };
      return stateAbbreviations[stateName] || stateName;
    },
  },
  watch: {
    controlPanelProps: {
      async handler(val) {
        // console.log(val, 'dataSeries val');
        // debugger;
        this.chart = {};
        this.loader = true;
        const zonalResponse = await ApiServices.getZonalData({
          indicator: val.indicator.id,
          datasource: val.datasource.id,
          period: val.year,
        });
        const data = zonalResponse.data.results;
        // const data = await this.dlQuery({
        //   indicator: val.indicator.id,
        //   datasource: val.datasource.id,
        //   period: val.year,
        // });

        if (data.length > 0) {
          if (val.location.id !== 1) {
            const filteredLGADataForState = data.filter(
              (item) => this.dlGetLocation(item.location).parent === val.location.id,
            );

            const formattedData = filteredLGADataForState.map((item) => [
              this.getAbbreviatedStateName(this.dlGetLocation(item.location).name),
              parseFloat(item.value),
            ]);

            const chartSeries = [];
            const sortedData = formattedData.sort(sortHighChartDataFormat);

            const stateObject = this.dlGetLocation(val.location.id);

            const stateData = data.find((item) => item.location === val.location.id);

            sortedData.unshift({
              name: stateObject.name,
              y: parseFloat(stateData?.value),
              // color: this.colors[0].color,
              color: this.colors.find((item2) => item2.id === stateObject.parent).color,
            });

            const zoneColorObj = this.colors.find((item2) => item2.id === stateObject.parent);

            chartSeries.push({
              color: zoneColorObj.color,
              name: stateObject.name,
              data: sortedData,
            });

            this.formatToHighChart(chartSeries);
          } else {
            // already know the zonal levels/parent of all the value
            // index starts at one to skip region data for the series
            const chartSeries = this.getStateDataAccordingToRegionInHighChartFormat(data);

            const zonalSeries = this.getZonalDataInHighChartFormat(data);

            // console.log(zonalSeries);
            // add national to top of the zonal series series
            const national = data.find((item) => item.location === 1);
            zonalSeries.unshift({
              name: 'Nigeria',
              y: parseFloat(national.value),
              color: Highcharts.color('#000000').get(),
            });
            const zonalZee = {
              color: Highcharts.color('#000000').get(),
              name: 'Nigeria',
              data: zonalSeries,
            };
            // for the new chart, eact array of states has the zone included
            const newChart = [];

            chartSeries.forEach((item) => {
              const zonalP = zonalZee?.data.find((element) => element.color === item.color);
              if (zonalP !== undefined) {
                const newArr = [zonalP?.name, zonalP?.y];
                item.data.unshift(newArr);
                newChart.push(item);
              }
            });

            newChart.unshift();
            // add zonal series to top of main the series
            chartSeries.unshift(zonalZee);
            const filteredSeries = this.filterNonEmptyData(chartSeries);
            // chartSeries.unshift(zonalZee); //  removed this part
            this.formatToHighChart(filteredSeries);
          }
        }
        // Plot for LGAs

        this.loader = false;
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    this.title = ` Distribution of ${this.controlPanelProps.indicator.full_name} ccross the zones in the country. Source: ${this.controlPanelProps.datasource.datasource} ${this.controlPanelProps.year}`;
  },
};
</script>

<style scoped>
.barchart {
  height: 49.5vh;
}
</style>
