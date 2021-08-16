<template>
  <b-container fluid>
    <Navbar />
    <b-row class="container-box">
      <b-col>
        <img
          class="image-box"
          src="../../../../assets/img/health-think/shutterstock_416638408.png"
        />
      </b-col>
      <b-col>
        <b-card no-body class="full-width">
          <!-- b-tabs section -->
          <b-tabs
            content-class="mt-3"
            fill
            active-nav-item-class="font-weight-bold"
          >
            <!-- login form page -->

            <b-tab title="Login" title-item-class="w-50 my-tabs">
              <b-form @submit="onSubmit" class="form2">
                <h2>Login to your Account</h2>

                <b-form-group
                  id="input-group-1"
                  class="label-text"
                  label="EMAIL ADDRESS"
                  label-for="input-1"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="PASSWORD"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    class="label-text"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                  />
                </b-form-group>

                <!-- checkbox and buttons -->
                <b-row>
                  <b-col cols="6">
                    <b-form-checkbox
                      id="checkbox-1"
                      v-model="status"
                      name="checkbox-1"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                      Stay Logged In
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="6">
                    <p style="text-align: right">Forgot password?</p>
                  </b-col>

                  <b-col cols="12"
                    ><p>
                      Don’t have an account? <a href="#">Sign Up</a>
                    </p></b-col
                  >
                </b-row>

                <!-- login button -->
                <b-row no-gutters>
                  <b-col sm-12 md-6
                    ><Button
                      text="LOGIN"
                      classes="mx-2"
                      bgcolor="#494299"
                      colorsec="#FFFFFF"
                      width="100%"
                      height="39px"
                      shadow="0px 3px 6px #493F9B86"
                      :hover="true"
                  /></b-col>
                  <b-col sm-12 md-6></b-col>

                  <!-- divider -->
                  <p class="divide"><span class="dividesec">OR</span></p>
                </b-row>

                <Button
                  text="LOGIN WITH LINKEDIN"
                  classes="mx-2"
                  bgcolor="#0076B8"
                  colorsec="#FFFFFF"
                  width="100%"
                  height="39px"
                  shadow="0px 3px 6px #493F9B86"
                  :hover="true"
                />
              </b-form>
            </b-tab>

            <!-- signup form page -->
            <b-tab title="Sign Up" title-item-class="w-50 my-tabs">
              <b-form @submit="onSubmit" class="form2">
                <h2>Get started with a free account</h2>
                <h3 class="label-text">
                  Create a free HealthThink Database account and access over
                  3000 data resources
                </h3>

                <b-form-group
                  id="input-group-1"
                  class="label-text"
                  label="FULL NAME"
                  label-for="input-1"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    v-model="signupName"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="ORGANISATION"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    v-model="signupOrganisation"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="DESIGNATION"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    placeholder="Job Title"
                    v-model="signupDesignation"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="PURPOSE FOR DATA"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    v-model="signpupPurpose"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="EMAIL ADDRESS"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    placeholder="Enter email address"
                    v-model="signupEmails"
                  />
                </b-form-group>
                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="PASSWORD"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    v-model="signupPassword"
                  />
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  class="label-text"
                  label="REPEAT PASSWORD"
                  label-for="input-2"
                >
                  <BaseInput
                    width="100%"
                    height="37px"
                    bgcolor="white"
                    btnOutline="1px solid #827CC7"
                    textSize="11px"
                    v-model="signupRepeatPassword"
                  />
                </b-form-group>

                <b-row>
                  <b-col cols="12"
                    ><p>
                      Already have an account? <a href="#">Login</a>
                    </p></b-col
                  >
                </b-row>

                <!-- login button -->
                <b-row no-gutters>
                  <b-col cols="5"
                    ><Button
                      text="CREATE ACCOUNT"
                      classes="mx-2"
                      bgcolor="#494299"
                      colorsec="#FFFFFF"
                      width="100%"
                      height="39px"
                      shadow="0px 3px 6px #493F9B86"
                      :hover="true"
                  /></b-col>
                  <b-col cols="7"></b-col>

                  <!-- divider -->
                  <p class="divide"><span class="dividesec">OR</span></p>
                </b-row>

                <Button
                  text="LOGIN WITH LINKEDIN"
                  classes="mx-2"
                  bgcolor="#0076B8"
                  colorsec="#FFFFFF"
                  width="100%"
                  height="39px"
                  shadow="0px 3px 6px #493F9B86"
                  :hover="true"
                />
              </b-form>
            </b-tab> </b-tabs
        ></b-card>
      </b-col>
    </b-row>
    <Footer />
  </b-container>
</template>

<script>
import Navbar from '../../components/navbar.vue';
import Footer from '../../components/footer.vue';
import BaseInput from '../../components/forms/input.vue';
import Button from '../../components/forms/button.vue';

export default {
  name: 'signup',
  components: {
    Navbar,
    Footer,
    BaseInput,
    Button,
  },
  data() {
    return {
      signupName: '',
      signupOrganisation: '',
      signupDesignation: '',
      signupPurpose: '',
      signupEmail: '',
      signpupPassword: '',
      signupRepeatPassword: '',
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.bg-text {
  color: $HEALTH_THINK_COLOR;
}
.container-box {
  background-color: #f5f5f5;
}
.image-box {
  object-fit: contain;
  width: 546px;
  // height: 964px;
  margin: 100px 50px 0px 100px;
  // top: 352px;
  // left: 140px;
}
// .full-width .card-header-tabs {
//   margin-right: -21px;
//   margin-left: -21px;
// }

// .full-width .nav-tabs .nav-item {
//   margin-bottom: -1px;
//   flex-grow: 1;
//   text-align: center;
// }
.full-width {
  background-color: #ffffff;
  margin: 2rem 5rem 2rem 5rem;
  border: none;
}
.form2 {
  padding: 0rem 3rem 2rem 3rem;
}
h2 {
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  color: #454444;
  opacity: 1;
}
.label-text {
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0px;
  color: #747373;
  opacity: 1;
}
h4 {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0px;
  color: #454444;
  opacity: 1;
}
.divide {
  width: 100%;
  text-align: center;
  border-bottom: 2px solid #e0e0e0;
  line-height: 0.1em;
  margin: 30px 1rem 30px 1rem;
}

.divide .dividesec {
  background: #fff;
  padding: 0 30px;
}
// .active-tab {
//   background-color: red;
//   color: red;
// }
.my-tabs {
  background-color: #f6f5ff;
}
// ul.nav li.nav-item {
//   color: red;
// }
</style>
