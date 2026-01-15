<template>
  <b-container fluid>
    <b-row no-gutters class="mt-5">
      <b-col sm="12" style="background-color: #ffffff; padding: 3rem">
        <h3>Delete Account</h3>
        <b-row>
          <b-col sm="9" class="try">
            <p>
              What types of communication would you like to receive from
              HealthThink Database?
            </p>
          </b-col>
          <b-col sm="3">
            <!-- delete account button -->
            <Button
              text="UPLOAD PHOTO"
              classes="test"
              bgcolor="#CE1E1E"
              colorsec="#FFFFFF"
              width="174px"
              height="39px"
              shadow="0px 2px 5px #493F9B5F"
              :hover="true"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Button from '../../../forms/button.vue';

export default {
  name: 'Delete',
  components: {
    Button,
  },
};
</script>
<style>
.test {
  float: right;
}
</style>
