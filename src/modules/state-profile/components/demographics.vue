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
        <p class="mb-5">This section provides demographic information about {{state}} State.</p>
        <div v-for=" d in stateDemographics" :key= d.name>
          <hr v-show="stateDemographics.indexOf(d) > 0">
        <b-row >
          <b-col>
            <p> <b>{{d.name}}</b> </p>
          </b-col>
          <b-col class="text-right">
                  <p class="value"> <b>{{d.value}}</b></p>
                  <p class="source">Source: {{d.source}}</p>
          </b-col>
          <b-col cols="auto" class="text-right">
  <b-icon :icon= 'getChangeIcon(d.change)' :variant="d.change >= 0 ? 'success':'danger' "></b-icon>
          </b-col>
          <b-col cols="auto">
            <p style="font-size: 11.50002625px">
           <b>{{d.change}}</b> since 2015 ({{d.previousValue}})
            </p>
          </b-col>
        </b-row>
        </div>

      </b-col>
      <b-col cols="auto">
          <div class="vl"></div>
      </b-col>
      <b-col md="5">
        <BaseMap :level="3" :lgaState="state" :mapObject="this.mapOptions"/>
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

export default {
  name: 'demographics',
  components: {
    BaseMap,
  },
  props: {
    state: String,
    stateDemographics: Array,
  },
  methods: {
    getChangeIcon(change) {
      if (change >= 0) {
        return 'caret-up-fill';
      }
      return 'caret-down-fill';
    },
  },
  data() {
    return {
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
          name: 'Nigeria',
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
