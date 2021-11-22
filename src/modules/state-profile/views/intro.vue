<template>
  <b-container class="overflow-hidden">
    <b-row align-h="between">
      <b-col sm="12" md="5" lg="5" class="mt-5">
        <p class=" mt-3 mb-4 tittle">
          National and State Health <br />
          Profile Dashboard
        </p>

        <p class="text-left msg">
          This dashboard provides a single transparent view of
          health data across the country. It presents health data
          across six (6) program areas: RMNCH, Nutrition,
          Malaria, Immunization, HIV/AIDS and Mortality. It also provides
          insight on health facility service availability and
          readiness for each state.
        </p>
        <b-row align-h="start">
          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img src="@/assets/state-profile/svg/pregnant.svg" class="img-fluid" alt="rmnch" />
            </div>
            <p class="text-center program-areas-text">RMNCH</p>
          </b-col>
          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img src="@/assets/state-profile/svg/salad.svg" class="img-fluid" alt="nutrition" />
            </div>
            <p class="text-center program-areas-text">Nutrition</p>
          </b-col>
          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img
                src="@/assets/state-profile/svg/injection.svg"
                class="img-fluid"
                alt="immunization"
              />
            </div>
            <p class="text-center program-areas-text">Immunization</p>
          </b-col>
          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img src="@/assets/state-profile/svg/mosquito.svg" class="img-fluid" alt="malaria" />
            </div>
            <p class="text-center program-areas-text">Malaria</p>
          </b-col>

          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img src="@/assets/state-profile/svg/ribbon.svg" class="img-fluid" alt="hiv/aids" />
            </div>
            <p class="text-center program-areas-text">HIV/AIDS</p>
          </b-col>
          <b-col cols="auto">
            <div class="program-areas text-center pt-3 shadow">
              <img src="@/assets/state-profile/svg/patient.svg" class="img-fluid" alt="mortality" />
            </div>
            <p class="text-center program-areas-text">Mortality</p>
          </b-col>
          <b-col cols="auto" class="">
            <div class="program-areas text-center pt-3 shadow">
              <img
                src="@/assets/state-profile/svg/hospital.svg"
                class="img-fluid"
                alt="health services"
              />
            </div>
            <p class="text-center program-areas-text">Health Services</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="5" class="mt-5">
        <BaseMap :level="1" :mapObject="mapOptions"/>
        <!-- <stateProfileSvg :name="'map'"> </stateProfileSvg> -->
        <p class="mt-2 text-center map-text">Select a state on the map to view state profile</p>
        <div class="row justify-content-center">
          <button class="btn bottom-btn px-4 mt-3" @click='viewNationalProfile'>
            View National Profile</button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import stateProfileSvg from "../state-profile/svg/stateprofileSvg.vue";
import BaseMap from '@/components/maps/BaseMap.vue';

export default {
  name: 'intro',
  components: {
    // stateProfileSvg
    BaseMap,
  },

  data() {
    return {
      programAreas: [
        'rmnch',
        'nutrition',
        'immunization',
        'hiv/aids',
        'motrality',
        'malaria',
        'survey',
      ],
      mapOptions: {
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
              allowOverlap: true,
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
                this.$router.push({ name: 'state-profile', params: { state } });
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
    };
  },
  mounted() {

  },
  methods: {
    viewNationalProfile() {
      const state = 'National';
      this.$router.push({ name: 'state-profile', params: { state } });
    },
  },
};
</script>

<style lang="scss">
.msg {
  font-weight: normal;
  color: #232323;
  font-size: 16px;
  font-family: "Muli", sans-serif;
}

.tittle {
  color: #232323 !important;
  font-weight: bold;
  background-color: white !important;
  opacity: 1;
  font-size: 43px;
  line-height: 55px;
  font-family: "Muli", sans-serif;
}
.program-areas {
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  height: 84px;
  width: 84px;
  margin-top: 20px;
}
.map-text {
  color: #5a5a5a;
  font-family: "Muli", sans-serif;
  font-weight: bold;
  font-size: 18px;
}
.program-areas-text {
  color: #5a5a5a;
  font-family: "Muli", sans-serif;
  font-size: 16px;
  margin-top: 10px;
}
button.bottom-btn {
    background-color: #f2f2f2;
    border: 1px solid #cccccc;
    height: 38.250103125px;
    font-size: 14px;
    font-weight: 750;
     font-family: "Muli", sans-serif;
    border-radius: 5px;
    color: #3a3a3a;
}
button.bottom-btn:hover, button.bottom-btn:active{
  color: #3F6040;
  text-decoration: underline;
}
</style>
