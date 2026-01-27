<template>
  <b-container fluid class="large-spacer">
    <h2>BIlling</h2>

    <b-row no-gutters>
      <b-col sm="12" md="7" style="background-color: #ffffff; padding: 3rem">
        <!-- Payment method section -->
        <h3>Payment Methods</h3>

        <!-- subscribe to-- section -->
        <!-- Expiration date -->
        <b-row>
          <b-col sm="2">
            <img
              src="../../../../../../assets/img/health-think/master-card.svg"
              alt=""
            />
          </b-col>
          <b-col sm="10">
            <b-row no-gutters>
              <b-col sm="12"><h4>MasterCard ending in 4217</h4></b-col
              ><b-col sm="12"
                ><span style="font-size: 11px">Expires: 06/2021</span></b-col
              ></b-row
            ></b-col
          >
        </b-row>

        <!-- cardname holder -->
        <b-row>
          <b-col sm="2"> </b-col>
          <b-col sm="10">
            <b-row no-gutters>
              <b-col sm="12"><h4>Name on Card</h4></b-col
              ><b-col sm="12"
                ><span style="font-size: 11px">John Doe</span></b-col
              ></b-row
            ></b-col
          >
        </b-row>

        <!-- Delete Card -->
        <b-row>
          <b-col sm="2"> </b-col>
          <b-col sm="10">
            <b-row no-gutters>
              <b-col sm="12"><a href="#">Delete Card</a></b-col>
            </b-row></b-col
          >
        </b-row>
      </b-col>
      <b-col md="5"></b-col>
    </b-row>

    <!-- payment button -->

    <Button
      text="ADD PAYMENT METHOD"
      classes="mt-4"
      bgcolor="#494299"
      colorsec="#FFFFFF"
      width="174px"
      height="39px"
      shadow="0px 2px 5px #493F9B5F"
      :hover="true"
    />
  </b-container>
</template>
<script>
import Button from '../../../forms/button.vue';

export default {
  name: 'billing',
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
