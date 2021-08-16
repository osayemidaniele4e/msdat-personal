<template>
  <b-container fluid>
    <b-navbar toggleable="sm" class="container-style">
      <b-navbar-brand href="#">
        <img
          class="logo"
          src="../../../assets/img/health-think/healththink official  logo.svg"
          alt="healthink logo"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <!-- menu list -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" class="mx-3 nav-style">About</b-nav-item>
          <b-nav-item href="#" class="mx-3 nav-style">Insights</b-nav-item>
          <b-nav-item href="#" class="mx-3 nav-style">FAQs</b-nav-item>
          <b-nav-item href="#" class="mx-3 nav-style">Contact Us</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned buttons -->
        <b-navbar-nav class="ml-auto mr-10">
          <b-row>
            <b-col sm="12" md="6">
              <Button
                text="LOGIN"
                classes="sm-my-2"
                width="154px"
                height="39px"
                colorsec="#222222"
                bgcolor="white"
                btnOutline="2px solid #494299"
              />
            </b-col>
            <b-col sm="12" md="6">
              <Button
                text="START FOR FREE"
                classes=""
                bgcolor="#494299"
                colorsec="#FFFFFF"
                width="174px"
                height="39px"
                shadow="0px 2px 5px #493F9B5F"
                :hover="true"
            /></b-col>
          </b-row>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script>
import Button from './forms/button.vue';

export default {
  name: 'NavBar',
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
// .container-style {
//   padding:0px 95px !important;
// }
.navbar-brand {
  top: 24px;
  left: 140px;
  width: 170px;
  height: 67px;
}
.nav-item {
  font-size: 15px;
  font-weight: 600;
  color: black !important;
}
.logo {
  width: 75%;
}
button {
  float: left;
}
</style>
