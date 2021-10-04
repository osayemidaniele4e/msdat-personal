<template>
  <div>
    <b-button v-show="this.programArea.name == 'nutrition'" class="program-icon shadow mr-4">
      <img class="img-fluid" src="@/assets/state-profile/svg/salad.svg" alt="" />
    </b-button>
    <b-button v-show="this.programArea.name == 'mortality'" class="program-icon shadow mr-4">
      <img class="img-fluid" src="@/assets/state-profile/svg/patient.svg" alt="" />
    </b-button>
    <b-button
      v-show="this.programArea.name == 'Health Facility Survey'"
      class="program-icon shadow mr-4"
    >
      <img class="img-fluid" src="@/assets/state-profile/svg/hospital.svg" alt="" />
    </b-button>
    <b-button v-show="this.programArea.name == 'HIV'" class="program-icon shadow mr-4">
      <img class="img-fluid" src="@/assets/state-profile/svg/ribbon.svg" alt="" />
    </b-button>
    <b-button v-show="this.programArea.name == 'Malaria'" class="program-icon shadow mr-4">
      <img class="img-fluid" src="@/assets/state-profile/svg/mosquito.svg" alt="" />
    </b-button>
    <b-button v-show="this.programArea.name == 'Immunization'" class="program-icon shadow mr-4">
      <img class="img-fluid" src="@/assets/state-profile/svg/injection.svg" alt="" />
    </b-button>
    <b-button
      v-show="this.programArea.name == 'REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH'"
      class="program-icon shadow mr-4"
    >
      <img class="img-fluid" src="@/assets/state-profile/svg/pregnant.svg" alt="" />
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    programArea: Object,
  },
};
</script>

<style></style>
