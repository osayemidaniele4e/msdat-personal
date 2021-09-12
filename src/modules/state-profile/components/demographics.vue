<template>
    <b-container fluid>
    <b-row class="mb-3">
      <b-button class="program-icon shadow">
        <img src="@/assets/state-profile/svg/location.svg" alt="location">
      </b-button>
      <h2 class="ml-3 my-auto"> <b>DEMOGRAPHICS</b> </h2>
    </b-row>
    <b-row align-h="between">
      <b-col md="6">
        <p class="mb-5">This section provides
          demographic information about {{this.selectedState}}
           <span v-show="state !== 'Fct' && state !== 'National'">State</span>.</p>
        <div v-for=" d in stateDemographics" :key= d.name>
          <hr v-show="stateDemographics.indexOf(d) > 0">
        <b-row >
          <b-col>
            <p> <b>{{d.name}}</b> </p>
          </b-col>
          <b-col class="text-right">
                  <p class="value"> <b>{{d.value}}</b></p>
                  <p class="source">Source: {{d.source}} {{d.year}}</p>
          </b-col>
          <b-col cols="auto" class="text-right">
  <b-icon :icon= 'getChangeIcon()' :variant="pointer"></b-icon>
          </b-col>
          <b-col cols="auto">
            <p style="font-size: 11.50002625px">
           <b class="pr-1">{{d.change }}%</b>
           <b>{{ pointer=='success'?'increase':'decrease'}}</b>
           since {{d.previousYear}} ({{d.previousValue}})
            </p>
          </b-col>
        </b-row>
        </div>

      </b-col>
      <b-col cols="auto">
          <div class="vl"></div>
      </b-col>
      <b-col md="5">
        <BaseMap v-if="state != 'National'" :level="3" :lgaState="selectedState" :mapObject="this.mapOptions"/>
        <BaseMap  v-else :level="1" :mapObject="mapOptionsNational"/>
        <b-row>
          <b-col cols="auto">
            <p>Land Area</p>
            <p><b>3,080 km2</b></p>
          </b-col>
          <b-col cols="auto">
            <p>Co-ordinates</p>
            <p><b>10°31’23’N ’7°26’25’’E</b></p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    </b-container>
</template>

<script>
import BaseMap from '@/components/maps/BaseMap.vue';
import { mapState } from 'vuex';
import dataMixins from '../../DataLayer/mixin';

export default {
  name: 'demographics',
  components: {
    BaseMap,
  },
  props: {
    state: String,
    stateDemographics: Array,
    lgas: Array,
  },
  mixins: [dataMixins],
  methods: {
    getChangeIcon() {
      if (this.pointer === 'success') {
        return 'caret-up-fill';
      }
      return 'caret-down-fill';
    },
    /**
     * This function get the values from the
     * database and populates the data object
     * accordingly
     */
    extractDemographicValues() {
      // Get the selected state ID
      const allLocations = this.$store.state.DL.location;
      let selectedState;
      const val = this.state;
      if(this.state == 'National'){
        selectedState = allLocations[0]
      } else {
        allLocations.map((el) => {
        if (el.name == val) {
          selectedState = el;
        }

      });
     }
      // Get the selected state ID

      // Loop through the demographics object to
      // get the required data
      for (const i in this.stateDemographics) {
        const data = this.dlQuery({
          datasource: this.stateDemographics[i].sourceId,
          indicator: this.stateDemographics[i].indicatorId,
          location: selectedState.id,
        });
        data.then((el) => {
          // Only performs further computations where data
          // is available
          if (el.length !== 0) {
            // Sort returned results by latest year
            el.sort((a, b) => b.period - a.period);
            this.stateDemographics[i].value = el[0].value;
            this.stateDemographics[i].year = el[0].period;
            this.stateDemographics[i].previousValue = el[1].value || null;
            this.stateDemographics[i].previousYear = el[1].period || null;
            this.stateDemographics[i].change = this.calcDiff(this.stateDemographics[i]);
          } else {
            this.stateDemographics[i].value = 'N/a';
            this.stateDemographics[i].year = 'N/a';
            this.stateDemographics[i].previousValue = ' ';
            this.stateDemographics[i].change = ' ';
          }
        });
      }
    },
    /**
     * This function calculates the percentage
     *  difference between the latest available
     * year and the closest year
     */
    calcDiff(val) {
      let ans;
      ans = ((Number(val.value) - Number(val.previousValue)) / Number(val.previousValue)) * 100;
      if (val.previousValue > val.value) {
        this.pointer = 'danger';
      } else {
        this.pointer = 'success';
      }
      return parseInt(ans);
    },
    // setDemographicData(data){

    // }
  },
  computed: {
    ...mapState([]),
    selectedState() {
      if (this.state == 'FCT') {
        return 'Fct';
      } else if (this.state == 'National'){
        return 'Nigeria'
      } else {
          return this.state;
      }
    },
  },
  watch: {
    // Watching for changes to state
    // So data can be recomputed as
    // required without page load
    state(newState) {
      console.log({ newState });
      this.extractDemographicValues();
    },
  },
  data() {
    return {
      pointer: 'success', // SUCCESS or DANGER
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
              style:{
                fontFamily: "Muli",
                color: '#1c4d33'
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
                  
                }
            },
          point: {
            events: {
              click: (event) => {
                let state = event.point.name;
                state = state.replace(/\s+/g, '');
                this.$emit('changeState', state)
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
          enabled: true,
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
  mounted() {
    this.extractDemographicValues();
  },
};
</script>
<style lang="scss" scoped>
hr {
  border-top: 1px solid #CCCCCC;
}
.vl {
  border: 1px dashed rgba(197, 197, 197, 1);
  opacity: 1;
  height: 100%;
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
