<template>
  <b-container fluid class="large-spacer">
    <h2>Plan</h2>

    <b-row no-gutters>
      <b-col sm="12" md="7" style="background-color: #ffffff; padding: 3rem">
        <!-- Curent Planr -->
        <h3>Current Plan</h3>

        <!-- subscribe to-- section -->
        <b-row>
          <b-col sm="5">
            <h4>You are currently subscribed to:</h4>
          </b-col>
          <b-col sm="7" class="box-style">
            <b-row no-gutters>
              <b-col><h4>Standard Plan</h4></b-col
              ><b-col
                ><span style="font-size: 11px">Change plan</span></b-col
              ></b-row
            ></b-col
          >
        </b-row>

        <!-- Plan Expiration section -->
        <b-row>
          <b-col sm="5">
            <h4>Plan expires:</h4>
          </b-col>
          <b-col sm="7" class="box-style">
            <b-row no-gutters>
              <b-col sm="12"><h4>20th April 1998</h4></b-col></b-row
            ></b-col
          >
        </b-row>

        <!-- Auto Renew section -->
        <b-row>
          <b-col sm="5">
            <h4>Auto renew:</h4>
          </b-col>
          <b-col sm="7" class="box-style">
            <b-row no-gutters>
              <b-col><h4>On</h4></b-col><b-col> <SwitchButton /> </b-col></b-row
          ></b-col>
        </b-row>

        <b-row>
          <b-col sm="5"> </b-col>
          <b-col sm="7" class="box-style">
            <b-row no-gutters>
              <b-col sm="12">
                <span style="font-size: 11px"
                  >Your plan will be automatically renewed on 20th April
                  1998</span
                >
              </b-col></b-row
            ></b-col
          >
        </b-row>
      </b-col>
      <b-col md="5"></b-col>
    </b-row>
  </b-container>
</template>
<script>
import SwitchButton from '../../../forms/switchButton.vue';

export default {
  name: 'plan',
  components: {
    SwitchButton,
  },
};
</script>
<style>
h3 {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
}
.box-style {
  display: inline-block;
}
h4 {
  text-align: left;
  font-size: 16px;
  /* font-weight: 700; */
  letter-spacing: 0px;
}
</style>
