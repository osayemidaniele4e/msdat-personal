<template>
  <b-container fluid>
    <b-tabs
      align="left"
      active-nav-item-class="active-main-tab"
      class="testing"
      nav-link="abc"
      active-tab-class="sub-tab"
      nav-class="main-tab"
      no-nav-style
      nav-wrapper-class="w-30"
    >
      <!-- first Tab for profile settings -->
      <b-tab active no-body>
        <template #title>
          <b-row no-gutters>
            <b-col xs="6">
              <b-img
                :src="
                  require('../../../../assets/img/health-think/Group_2398.svg')
                "
                alt="Image"
                class="img-style"
              ></b-img>
            </b-col>
            <b-col xs="6" class="titlestyle">
              <h4>Profile</h4>
            </b-col>
          </b-row>
        </template>
        <!-- basic profile template -->

        <BasicProfile />
        <Preferences />
        <Delete />
      </b-tab>
      <!-- Second Tab for Plans -->
      <b-tab no-body>
        <template #title>
          <b-row no-gutters>
            <b-col xs="6">
              <b-img
                :src="
                  require('../../../../assets/img/health-think/Group_2398.svg')
                "
                alt="Image"
                class="img-style"
              ></b-img>
            </b-col>
            <b-col xs="6" class="titlestyle">
              <h4>Plan</h4>
            </b-col>
          </b-row>
        </template>
        Plans Information Area
      </b-tab>
      <!-- Third Tab for Recent Activity -->
      <b-tab no-body>
        <template #title>
          <b-row no-gutters>
            <b-col xs="3">
              <b-img
                :src="
                  require('../../../../assets/img/health-think/Group_2398.svg')
                "
                alt="Image"
                class="rounded-0 img-style"
              ></b-img>
            </b-col>
            <b-col xs="9" class="titlestyle">
              <h4>Recent Activity</h4>
            </b-col>
          </b-row>
        </template>
        Activity Information area
      </b-tab>
    </b-tabs>
  </b-container>
</template>
<script>
import BasicProfile from './tabs/profile-tab/basic-profile.vue';
import Preferences from './tabs/profile-tab/preferences.vue';
import Delete from './tabs/profile-tab/delete.vue';

export default {
  name: 'iconsTile',
  components: {
    BasicProfile,
    Preferences,
    Delete,
  },
};
</script>
<style>
.img-style {
  width: 40px;
  display: block;
  padding: 10px 0;
  float: left;
}
h4 {
  font-size: 14px;
  text-align: left;
  padding: 10px 0;
}
.active-main-tab {
  background-color: white !important;
  margin: 0;
  /* width: 300px; */
}
/* .main-tab {
  background-color: #f1f0ff !important;
} */
/* .nav-link:not(.active) {
  background-color: red !important;
} */
/* .nav-item {
  margin-right: 50px;
  background-color: red;
} */
/* .nav-link .testing:not(.active) {
  background-color: red !important;
} */
.abc:not(.active) {
  background-color: red;
}
</style>
