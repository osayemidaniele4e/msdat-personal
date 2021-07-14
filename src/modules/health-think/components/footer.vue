<template>
  <b-container fluid class="bg-body container-style">
    <b-row class="">
      <b-col cols="2">
        <!-- Logo -->
        <b-row>
          <b-col
            ><img
              class="logo"
              src="../../../assets/img/health-think/healththink official  logo (2).svg"
              alt="healthink logo"
          /></b-col>
          <b-col>
            <span class="footer-info">Product of eHealth4everyone</span>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="6">
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
      <b-col cols="4">
        <b-row>
          <b-col>
            <h2>Subscribe to HealthThink via Email</h2>
            <b-row>
              <b-col>
                <BaseInput
                  width="224px"
                  height="27px"
                  placeholder="Email Address"
                  bgcolor="#413A76"
                  btnOutline="1px solid #9188FF"
                  colorsec="#FFFFFF"
                  color="white"
                  textSize="11px"
                />
              </b-col>
              <b-col>
                <Button
                  text="SUBSCRIBE"
                  classes="mt-1 ml-0"
                  bgcolor="#FFFFFF"
                  colorsec="#222222"
                  width="90px"
                  height="27px"
                  textSize="11px"
                />
              </b-col>
            </b-row> </b-col
        ></b-row>
      </b-col>

      <!-- Subscribe tab -->
    </b-row>
  </b-container>
</template>
<script>
import BaseInput from './forms/input.vue';
import Button from './forms/button.vue';

export default {
  name: 'Footer',
  components: {
    BaseInput,
    Button,
  },
};
</script>

<style lang="scss" scoped>
.footer-info {
  text-align: left;
  font-size: 11px;
  margin-left: 1.5rem;
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
  font-weight: 700;
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
  background-color: #413a76;
}
img {
  width: 9rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
