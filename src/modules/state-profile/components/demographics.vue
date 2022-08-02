/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable eqeqeq */
<template>
    <b-container fluid>
    <b-row class="mb-3">
      <div class="program-icon shadow">
        <img src="@/assets/state-profile/svg/location.svg" alt="location">
      </div>
      <h2 class="ml-3 my-auto"> <b>DEMOGRAPHICS</b> </h2>
    </b-row>
    <b-row align-h="between">
      <b-col md="6">
        <p class="mb-5">This section provides
          demographic information about {{this.selectedState}}
           <span v-show="state !== 'Fct' && state !== 'National'">State</span>.</p>
        <div v-for=" d in dataContainer" :key= d.name>
          <hr v-show="dataContainer.indexOf(d) > 0 && d.value !== 0">
        <b-row v-show="d.value !== 0" >
          <b-col>
            <p> <b>{{d.name}}</b> </p>
          </b-col>
          <b-col class="text-right">
            <p v-if="d.indicatorId === 64" class="value"><b>{{d.value | commaValue}}%</b></p>
            <p v-else-if="d.sourceId === 19" class="value">
               <b>{{Math.round(d.value) | commaValue}}</b></p>
            <p v-else class="value"> <b>{{d.value  | commaValue}}</b></p>
            <p class="source">Source: {{d.source}} {{d.year}} <span><b-icon-info-circle-fill
        variant="primary"
        @click="showSrcModal(d.sourceId)"
        class="data-source-info"
      /></span> </p>
          </b-col>
        </b-row>
        <b-row class="compare">
          <b-col cols="auto" class="text-right" v-if="d.compare">
  <b-icon :icon= 'getChangeIcon()' :variant="pointer"></b-icon>
          </b-col>
          <b-col  v-if="d.compare" cols="auto">
            <p style="font-size: 11.50002625px">
           <b class="pr-1">{{d.change }}%</b>

           <b>
             {{ pointer=='success'?'increase':'decrease'}}
             </b>
           since {{d.previousYear}}
            ({{d.previousValue | commaValue}}
            <span v-if="d.indicatorId == 64">%</span>)
            </p>
          </b-col>
          </b-row>
        </div>

      </b-col>
      <b-col cols="auto">
          <div class="vl"></div>
      </b-col>
      <b-col md="5">
        <BaseMap v-if="state != 'National'"
        :level="3" :lgaState="selectedState"
         :mapObject="this.mapOptions"/>
        <BaseMap  v-else :level="1"
         :mapObject="mapOptionsNational"/>
         <p v-if="state == 'National'" class="text-center map-text">Select a state on the map to view state profile</p><br/>
        <b-row>
          <b-col cols="auto">
            <p>Land Area</p>
            <p><b>{{this.area | commaValue}} km<sup>2</sup></b></p>
          </b-col>
          <b-col cols="auto">
            <p>Co-ordinates</p>
            <p><b>{{this.coordinates}}</b></p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
     <base-modal :showModal="show" v-on:hidden="show = false" size="lg">
       <template #title>
        <h5>{{ modalTitle }}</h5>
      </template>
      <div id="srcModal">
    <DataSourceMetaDataModal
        v-if="show"
        :rawObject="singleSrc"
        :dataSourceID="srcId"
      />
      </div>
     </base-modal>
    </b-container>
</template>

<script>
import { mapState } from 'vuex';
import BaseMap from '@/components/maps/BaseMap.vue';
import DataSourceMetaDataModal from '@/modules/msdat-dashboard/components/sections/indicator-overview/info_modal/DataSourceMetaDataModal.vue';
import dataMixins from '../../DataLayer/mixin';
import * as requests from '../requests';
import landAreaData from './landData';

export default {
  name: 'demographics',
  components: { BaseMap, DataSourceMetaDataModal },
  props: {
    state: String,
    stateDemographics: Array,
  },
  mixins: [dataMixins],
  filters: {
    // Comma seperator for large numbers
    commaValue(num) {
      if (num) {
        const numParts = num.toString().split('.');
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (numParts[1]) {
          const stringified = String(numParts[1]).slice(0, 3);
          numParts[1] = Number(stringified);
        }
        return numParts.join('.');
      }
      return '';
    },
  },
  methods: {
    getChangeIcon() {
      if (this.pointer === 'success') {
        return 'caret-up-fill';
      }
      return 'caret-down-fill';
    },
    /**
     * This function uses the already fetched
     * data and populates the data object
     * accordingly
     */
    extractDemographicValues() {
      // Loop through the demographics object to
      // assign the required data
      this.dataContainer = this.stateDemographics.map((val, i) => {
        const container = {};
        container.name = val.name;
        container.indicatorId = val.indicatorId;
        container.source = val.source;
        container.sourceId = val.sourceId;

        // Only performs further computations where data
        // is available
        if (this.data[i].data.length !== 0) {
          if (this.data[i].data.length === 1) {
            // In this scenario there is no
            // previous data to compare it to
            container.value = this.data[i].data[0].value;
            container.year = this.data[i].data[0].period;
            container.compare = false;
          } else {
            const fullYears = this.data[i].data.filter((value) => value.period.length === 4);
            container.compare = true;
            // Sort returned results by latest year
            fullYears.sort((a, b) => b.period - a.period);
            container.value = fullYears[0].value;
            container.year = fullYears[0].period;
            container.previousValue = fullYears[1]?.value || null;
            container.previousYear = fullYears[1]?.period || null;
            container.change = this.calcDiff(container);
          }
        } else {
          container.value = 0;
          container.year = 'N/a';
          container.previousValue = ' ';
          container.change = ' ';
        }
        return container;
      });
    },
    /**
     * This function sets the land area and
     * coordinate values for each state. These values
     * are stored in the js file being imported from
     * '../../state-profile/components/landData'
     * @param this.state
     */
    setLandAreaData() {
      const { area, position } = landAreaData[this.state];
      this.coordinates = position;
      this.area = area;
    },
    showSrcModal(id) {
      this.show = true;
      // eslint-disable-next-line prefer-destructuring
      this.singleSrc = this.allSources.filter((val) => val.id === id)[0];
      this.srcId = this.singleSrc.id;
      this.modalTitle = this.singleSrc.full_name;
    },
    /**
     * This function calculates the percentage
     *  difference between the latest available
     * year and the closest year
     */
    calcDiff(val) {
      const ans = ((Number(val.value) - Number(val.previousValue))
       / Number(val.previousValue)) * 100;
      if (val.previousValue > val.value) {
        this.pointer = 'danger';
      } else {
        this.pointer = 'success';
      }
      return parseInt(ans, 10);
    },
    /**
     * This function fetches the data from
     * the API as the selected state @param this.state
     * changes
     * and stores it in a local varialble @var this.data
     *
     * The external API calls are made
     * using the 'request' object
     */
    async prepareDemographicData() {
      let selectedState;
      let temp;

      // eslint-disable-next-line eqeqeq
      if (this.state == 'National') {
        // eslint-disable-next-line prefer-destructuring
        selectedState = this.locations[0];
      } else {
        this.locations.forEach((el) => {
          // eslint-disable-next-line eqeqeq
          if (el.name == this.state) {
            selectedState = el;
          }
        });
      }
      try {
        temp = await requests.fetchDemographics(this.stateDemographics, selectedState.id);
        this.data = temp;
        this.extractDemographicValues();
      } catch (err) {
        console.log(err);
      }

      return temp;
    },
  },
  computed: {
    ...mapState([]),
    selectedState() {
      if (this.state === 'FCT') {
        return 'FCT';
      } if (this.state === 'National') {
        return 'Nigeria';
      }
      return this.state;
    },
  },
  watch: {
    // Watching for changes to state
    // So data can be recomputed as
    // required without page load
    state() {
      this.prepareDemographicData();
      this.setLandAreaData();
    },
  },
  data() {
    return {
      pointer: 'success', // SUCCESS or DANGER
      data: [],
      show: false,
      srcId: 0,
      singleSrc: {},
      allSources: [],
      modalTitle: '',
      locations: [],
      coordinates: '',
      area: 0,
      dataContainer: [],
      mapOptionsNational: {
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        plotOptions: {
          map: {
            nullColor: '#ffc482',
            nullInteraction: true,
            color: '#ffc482',
            joinBy: ['name', 'hc-key'],
            dataLabels: {
              style: {
                fontFamily: 'Muli',
                color: '#1c4d33',
              },
              enabled: true,
              formatter() {
                if (this.point.value) {
                  return this.point.name;
                }
                return this.point.name;
              },
            },
            colorAxis: {
              min: 0,
            },
          },
        },
        series: [{
          name: 'Nigeria',
          states: {
            hover: {
              color: '#3F6040',

            },
          },
          point: {
            events: {
              click: (event) => {
                let state = event.point.name;
                state = state.replace(/\s+/g, '');
                this.$emit('changeState', state);
              },
            },
          },
          borderColor: 'white',
          borderWidth: 3,
        }],
        colors: ['#007d53', '#fff'],
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        mapNavigation: {
          enabled: false,
        },
      },
      mapOptions: {
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        plotOptions: {
          map: {
            nullColor: '#EFA43E',
            nullInteraction: true,
            color: '#EFA43E',
            joinBy: ['name', 'hc-key'],
            dataLabels: {
              color: '#3F6040',
              enabled: true,
              formatter() {
                if (this.point.value) {
                  return this.point.name;
                }
                return this.point.name;
              },
            },
            colorAxis: {
              min: 0,
            },
          },
        },
        series: [{
          name: this.selectedState,
          data: [
            // ['Edu', 23]
          ],
          point: {
            events: {
              // //-----function to fire with point name --------//
              // click: (event) => {
              //   console.log(event.point.name);
              //   const state = event.point.name;
              //   this.$router.push({ name: 'state-profile', params: { state } });
              // },
            },
          },
          borderColor: 'white',
          borderWidth: 3,
        }],
        colors: ['#F3C382'],
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        mapNavigation: {
          enabled: false,
        },
      },
    };
  },
  async mounted() {
    const { theSources } = await requests.getIndicatorsAndSources();
    this.allSources = theSources.data;
    const locate = await requests.allLocations();
    this.locations = locate.data;
    this.prepareDemographicData();
    this.setLandAreaData();
  },
};
</script>
<style lang="scss" scoped>
hr {
  border-top: 1px solid #CCCCCC;
}
.bi-info-circle-fill{
  cursor: pointer;
}
#srcModal {
  padding: 35px 25px;
}
.vl {
  border: 1px dashed rgba(197, 197, 197, 1);
  opacity: 1;
  height: 100%;
}
.compare {
  justify-content: flex-end;
  padding-top: 7px;
}
.source {
  color: #7C7C7C
}
.value {
  color: #232323;
  font-size: 22.50005625px;
  font-weight: 600;
}
</style>
