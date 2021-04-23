<template>
  <b-container fluid class="px-md-5 mx-md-5 px-xs-5 overflow-hidden">
    <b-row align-h="between">
      <b-col sm="12" md="5" lg="5" class="mt-5">
        <b-button class="btn-outline-primary disabled">COMING SOON</b-button>
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

        <p class="text-left mt-3 msg2">
          This resource is currently not available. If you would like to be informed about its
          development, please leave your contact information below.
        </p>

        <form class="mb-4" v-on:submit.prevent="newInterest()">
          <b-row class="mt-4" no-gutters>
            <b-col cols="12" sm="7" class="">
              <b-form-input
                type="email"
                name="email"
                class="form-control ml-0"
                placeholder="Your e-mail address"
                required
              />
            </b-col>
            <b-col cols="12" sm="5" class="">
              <b-button type="submit" class="btn btn-primary pr-4 pl-4">
                Keep me Updated!
              </b-button>
            </b-col>
          </b-row>
        </form>
        <br />
        <br />

        <p class="link-text mt-4 mb-4 ml-1">
          <router-link to="" style="color: #007D53"
            ><i style="padding-top:2px;" class="fas fa-angle-left" aria-hidden="true"></i>
            <b-icon icon="chevron-left"></b-icon> Back to MSDAT</router-link
          >
        </p>
      </b-col>
      <b-col
        sm="12"
        md="6"
        lg="6"
        class="bg-white right pr-0 pl-0 pt-1 d-none d-md-inline-block"
        id="image"
      >
        <img src="@/assets/img/stateprofile.jpg" class="img-fluid" alt="State Profile Image" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="scss">
.msg {
  font-weight: normal;
  color: #232323;
  font-size: 16px;
  font-family: "Muli", sans-serif;
}
.msg2 {
  font-weight: normal;
  color: #5a5a5a;
  font-family: "Muli", sans-serif;
  font-size: 14px;
}
.btn-outline-primary {
  border: 2px solid #ff8f0f !important;
  color: #ff8f0f !important;
  font-weight: bold;
  background-color: white !important;
  opacity: 1;
  font-size: 11px;
  font-family: "Muli", sans-serif;
  cursor: default;
  height: 25px;
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

.btn-primary {
  color: #fff !important;
  font-weight: bold;
  border: 2px solid #ff8f0f !important;
  background-color: #ff8f0f !important;
  opacity: 1;
  font-size: 13px;
  font-family: "Muli", sans-serif;
  text-transform: none !important;
  margin: 0px;
  height: 41px;
  border-radius: 1.6666665px;
}
img {
  margin-left: 20%;
}
.form-control {
    height: auto;
    margin-top: 0px;
}
</style>
