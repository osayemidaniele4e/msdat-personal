<template>
  <b-container fluid class="large-spacer">
    <h2>Preferences</h2>

    <b-row no-gutters>
      <b-col sm="12" style="background-color: #ffffff; padding: 3rem">
        <!-- email preferences -->
        <h3>Email Preferences</h3>
        <b-row>
          <b-col sm="12">
            <p>
              What types of communication would you like to receive from
              HealthThink Database?
            </p>
            <b-row no-gutters>
              <b-col sm="9" class="test">
                <p>Latest digital health updates from our newsletter</p>
              </b-col>
              <b-col sm="3">
                <switchButton style="float: right" />
              </b-col>
            </b-row>
            <hr />
            <b-row no-gutters>
              <b-col sm="9" class="test">
                <p>Special offers and amazing deals</p>
              </b-col>
              <b-col sm="3">
                <switchButton classes="switch-style" style="float: right" />
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col sm="9" class="test">
                <p>Latest health data updates from HealthThink Blog</p>
              </b-col>
              <b-col sm="3">
                <switchButton style="float: right" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SwitchButton from '../../../forms/switchButton.vue';

export default {
  name: 'preferences',
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
h4 {
  text-align: left;
  font-size: 16px;
  /* font-weight: 700; */
  letter-spacing: 0px;
}
</style>
