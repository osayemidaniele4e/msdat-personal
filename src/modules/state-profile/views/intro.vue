<template>
  <b-container class="overflow-hidden">
    <b-row align-h="between">
      <b-col sm="12" md="5" lg="5" class="mt-5">
        <p class=" mt-3 mb-4 tittle">
          State Health <br />
          Profile Dashboard
        </p>

        <p class="text-left msg">
          This dashboard provides a single transparent view of data from states across the country.
          It presents health data across six (6) program areas: RMNCH, Malaria, Immunization,
          HIV/AIDS, Tuberculosis and Mortality. It also presents Health Facility Survey data for
          each state.
        </p>
        <b-row align-h="start">
          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img src="@/assets/state-profile/svg/pregnant.svg" class="img-fluid" alt="rmnch" />
            </b-button>
            <p class="text-center program-areas-text">RMNCH</p>
          </b-col>
          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img src="@/assets/state-profile/svg/salad.svg" class="img-fluid" alt="nutrition" />
            </b-button>
            <p class="text-center program-areas-text">Nutrition</p>
          </b-col>
          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img
                src="@/assets/state-profile/svg/injection.svg"
                class="img-fluid"
                alt="immunization"
              />
            </b-button>
            <p class="text-center program-areas-text">Immunization</p>
          </b-col>
          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img src="@/assets/state-profile/svg/mosquito.svg" class="img-fluid" alt="malaria" />
            </b-button>
            <p class="text-center program-areas-text">Malaria</p>
          </b-col>

          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img src="@/assets/state-profile/svg/ribbon.svg" class="img-fluid" alt="hiv/aids" />
            </b-button>
            <p class="text-center program-areas-text">HIV/AIDS</p>
          </b-col>
          <b-col cols="auto">
            <b-button class="program-areas shadow">
              <img src="@/assets/state-profile/svg/patient.svg" class="img-fluid" alt="mortality" />
            </b-button>
            <p class="text-center program-areas-text">Mortality</p>
          </b-col>
          <b-col cols="auto" class="">
            <b-button class="program-areas shadow">
              <img
                src="@/assets/state-profile/svg/hospital.svg"
                class="img-fluid"
                alt="health facility survey"
              />
            </b-button>
            <p class="text-center program-areas-text">Health Facility Survey</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="5" class="mt-5">
        <BaseMap :level="1" :mapObject="mapOptions"/>
        <!-- <stateProfileSvg :name="'map'"> </stateProfileSvg> -->
        <p class="mt-5 text-center map-text">Select a state on the map to view state profile</p>
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

  mounted() {
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
              click: (event) => {
                console.log(event.point.name);
                const state = event.point.name;
                this.$router.push({ name: 'state-profile', params: { state } });
              },
            },
          },
          borderColor: 'white',
          borderWidth: 3,
          data: [
            ['Kano', 1],
            ['Delta', 1],
            ['Jigawa', 1],
            ['Kano', 1],
            ['Katsina', 1],
            ['Kebbi', 1],
            ['Sokoto'],
            ['Kaduna', 1],
            ['Zamfara', 1],
            ['Nasarawa', 1],
            ['Niger', 1],
            ['Plateau', 1],
            ['Kwara', 1],
            ['Kogi', 1],
            ['Benue', 1],
            ['Federal Capital Territory', 1],
            ['Abia', 1],
            ['Ebonyi', 1],
            ['Imo', 1],
            ['Enugu', 1],
            ['Anambra', 1],
            ['Ondo', 1],
            ['Ogun', 1],
            ['Osun', 1],
            ['Lagos', 1],
            ['Ekiti', 1],
            ['Oyo', 1],
            ['Akwa Ibom', 1],
            ['Bayelsa', 1],
            ['Cross River', 1],
            ['Rivers', 1],
            ['Delta', 1],
            ['Edo', 1],
            ['Adamawa', 1],
            ['Bauchi', 1],
            ['Borno', 1],
            ['Gombe', 1],
            ['Taraba', 1],
            ['Yobe', 1],
            ['Sokoto', 123],
            ['Nassarawa', 780],
          ],
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
  font-size: 22px;
}
.program-areas-text {
  color: #5a5a5a;
  font-family: "Muli", sans-serif;
  font-size: 16px;
  margin-top: 10px;
}
</style>
