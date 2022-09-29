<template>
  <div class="px-5 stepper-body">
    <h4 @click='handleLogout()' class="d-flex flex-row-reverse">
      Signout
    </h4>
    <b-row class="mt-4 mb-1">
      <b-col sm="12" md="3" class="mb-4 mb-md-0">
        <div style="margin-top: 12px">
          <a v-show="this.step >= 2" @click="$router.back()" class="back">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"
              />
            </svg>
            Go Back
          </a>
        </div>
      </b-col>
      <b-col sm="12" md="8">
        <b-row>
          <b-col class="px-0" cols="auto">
            <b-avatar
              :class="this.step >= 1 ? 'active-step' : ''"
              text="1"
            ></b-avatar>
          </b-col>
          <b-col class="px-0">
            <hr class="between" />
          </b-col>
          <b-col class="px-0" cols="auto">
            <b-avatar
              :class="this.step >= 2 ? 'active-step' : ''"
              text="2"
            ></b-avatar>
          </b-col>
          <b-col class="px-0">
            <hr class="between" />
          </b-col>
          <b-col class="px-0" cols="auto">
            <b-avatar
              :class="this.step >= 3 ? 'active-step' : ''"
              text="3"
            ></b-avatar>
          </b-col>
          <b-col class="px-0">
            <hr class="between" />
          </b-col>
          <b-col class="px-0" cols="auto">
            <b-avatar
              :class="this.step >= 4 ? 'active-step' : ''"
              text="4"
            ></b-avatar>
          </b-col>
        </b-row>
        <b-row class="mt-2 d-none d-lg-flex stepper-text">
          <b-col class="px-0" cols="auto">
            <p class="text-center" style="margin-left: -60%">
              Input dashboard details
            </p>
          </b-col>
          <b-col class="px-0"> </b-col>
          <b-col class="px-0" cols="auto">
            <p class="text-center" style="margin-left: -20%">
              Select your preferences
            </p>
          </b-col>
          <b-col class="px-0"> </b-col>
          <b-col class="px-0" cols="auto">
            <p class="text-center" style="margin-right: -50%">
              Dashboard data table
            </p>
          </b-col>
          <b-col class="px-0"> </b-col>
          <b-col class="px-0" cols="auto">
            <p class="text-center" style="margin-right: -80%">
              Arrange dashboard sections
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
  name: 'cd-stepper',
  components: {},
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      VueCookies.remove('custom-access-token');
      VueCookies.remove('custom-refresh-token');
      VueCookies.remove('custom-user-details');
      this.$router.push({ path: '/custom/login' });
    },
  },
  computed: {
    step() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.step;
    },
  },
};
</script>

<style lang="scss" scoped>
.b-avatar {
  color: #000000;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  height: 36.000009px;
  width: 36.000009px;
  font-weight: normal;
}
.stepper-text {
  color: #000000;
  font-family: 'Work Sans', sans-serif;
  font-weight: normal;
  font-size: 11.250002813px;
}
.back {
  font-size: 15.00000375px;
  color: #000000;
  font-family: 'Work Sans', sans-serif;
  font-weight: normal;
}
.stepper-body {
  border-bottom: 3px solid #0000001f;
  border-top: 51px solid #035c6e;
}
.active-step {
  background-color: #035c6e;
  color: #ffffff;
  border: none;
}
a:hover {
  text-decoration: none;
  cursor: pointer;
}
</style>
