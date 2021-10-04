<template>
  <b-container fluid class="large-spacer">
    <h2>Basic Profile</h2>

    <b-row no-gutters>
      <b-col
        class=""
        sm="12"
        md="7"
        style="background-color: #ffffff; padding: 3rem"
      >
        <h3>User Details</h3>

        <b-row class="mt-4">
          <b-col sm="3"><h4>Full Name:</h4></b-col>
          <b-col sm="9"><h4>John Doe</h4></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3"><h4>Organization:</h4></b-col>
          <b-col sm="9"><h4>USAID</h4></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3"><h4>Designation:</h4></b-col>
          <b-col sm="9"><h4>Public Health Analyst</h4></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3"><h4>Email Address:</h4></b-col>
          <b-col sm="9"><h4>johndoe123@mail.net</h4></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3"><h4>Password:</h4></b-col>
          <b-col sm="9"><h4>*****</h4></b-col>
        </b-row>
      </b-col>

      <!-- Profile Picture -->
      <b-col
        class="offset-md-1"
        sm="12"
        md="4"
        style="background-color: #ffffff; padding: 3rem; text-align: center"
      >
        <h3 style="text-align: center">profile picture</h3>
        <b-img
          :src="
            require('../../../../../../assets/img/health-think/profile.png')
          "
          alt=""
          width="200px"
          center
        ></b-img>

        <Button
          text="UPLOAD PHOTO"
          classes="mx-2 mt-4"
          bgcolor="#494299"
          colorsec="#FFFFFF"
          width="174px"
          height="39px"
          shadow="0px 2px 5px #493F9B5F"
          :hover="true"
        />

        <h4 style="text-align: center; margin-top: 1rem">REMOVE PHOTO</h4>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Button from '../../../forms/button.vue';

export default {
  name: 'BasicProfile',
  components: {
    Button,
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
h4 {
  text-align: left;
  font-size: 16px;
  /* font-weight: 700; */
  letter-spacing: 0px;
}
</style>
