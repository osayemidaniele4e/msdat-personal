<template>
  <b-container fluid class="bg-body container-style">
    <b-row class="bg-text">
      <b-col cols="2">
        <!-- Logo -->
        <b-row>
          <b-col
            ><img
              src="../../../assets/img/health-think/healththink official  logo.svg"
              alt="healthink logo"
          /></b-col>
          <b-col>
            <span class="footer-info">Product of eHealth4everyone</span>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="7">
        <b-row>
          <!-- About tab-->
          <b-col>
            <h2>ABOUT</h2>
            <ul>
              <li>Our Data</li>
              <li>HealthThink Analytics</li>
              <li>Pricing</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </b-col>

          <!--solutions tab -->
          <b-col>
            <h2>SOLUTIONS</h2>
            <ul>
              <li>Data Broking</li>
              <li>Submit Data</li>
              <li>Request Data</li>
              <li>On-Demand Consultancy</li>
              <li>One-Time Data Access</li>
              <li>FAQ</li>
            </ul>
          </b-col>

          <!-- Insights Tab -->
          <b-col>
            <h2>INSIGHTS</h2>
            <ul>
              <li>Research Articles</li>
              <li>Publications</li>
              <li>Journals</li>
              <li>White Papers</li>
              <li>HealthThink Blog</li>
            </ul>
          </b-col>

          <!-- Contact Us Tab -->
          <b-col>
            <h2>CONTACT US</h2>
            <ul>
              <li>+2349021720570</li>
              <li>info@ehealth4everyone.com</li>
            </ul>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-row>
          <b-col>
            <h2>Subscribe to HealthThink via Email</h2>
            <ul>
              <li>+2349021720570</li>
              <li>info@ehealth4everyone.com</li>
            </ul>
          </b-col></b-row
        >
      </b-col>

      <!-- Subscribe tab -->
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'Footer',
  components: {},
};
</script>

<style lang="scss" scoped>
.footer-info {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.bg-body {
  background-color: $HEALTH_THINK_COLOR;
}
h2 {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 21px;
}
li {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0px;
  color: #ffffff;
}
.container-style {
  padding: 3rem 0;
}
</style>
