<template>
  <div>
    <Header  ref="theHeader"></Header>
    <b-row style="position: relative" class="my-0 py-0">
      <img style="height: 62vh; width: 63vw;" src="@/assets/img/analytics/bkg.png" alt="path background">
      <div style="position: absolute; left: 0; top: 0; padding: 6%; display: flex; flex-direction: column; align-items: center; justify-content: space-around; height: 100%; width: 100vw;">
        <div class="d-flex flex-column align-items-center">
          <h1 style="color: #348481; font-weight: 650; font-size: 2.5rem; text-align: center; letter-spacing: 2px; margin-bottom: 20px;">The Custom Dashboard</h1>
          <h3>Design your dashboard, customize data</h3>
          <h3>No coding skills required!</h3>
        </div>
      </div>
    </b-row>
    <b-container fluid class="pt-0 mt-0">
    <div class='mt-0'>
      <b-row align="center" class='mx-5 px-5 hero'>
        <b-col md="auto" lg="auto" sm="12" class="svg">
          <customDashboardSvg :name="61"></customDashboardSvg>
          <p style="font-size: 24px !important;">Select Data</p>
        </b-col>
        <b-col md="auto" lg="auto" sm="12" align-self="center" class="svg-arrow">
          <customDashboardSvg :name="78"></customDashboardSvg>
        </b-col>
        <b-col md="auto" lg="auto" sm="12" class="svg">
          <customDashboardSvg :name="62"></customDashboardSvg>
          <p style="font-size: 24px !important;">Arrange Widgets</p>
        </b-col>
        <b-col md="auto" lg="auto" sm="12" align-self="center" class="svg-arrow">
          <customDashboardSvg :name="79"></customDashboardSvg>
        </b-col>
        <div class="mxw-400">
          <b-col md="auto" lg="auto" sm="12" class="svg">
          <customDashboardSvg :name="77"></customDashboardSvg>
          <p style="font-size: 24px !important;">Visualize Dashboard</p>
        </b-col>
        </div>
      </b-row>
      <div class="text-center">
        <b-button id="get-started" @click="$router.push('/custom/login')"  class="px-4 py-3">Get Started Here</b-button>
      </div>
    </div>
    <div class="image-scroll">
      <p id="samples" class="mt-5">View Dashboard Samples</p>
      <div horizontal class="mt-0 mb-5 d-flex" style="width: 100%; overflow: hidden;">
        <img
            src="@/assets/img/Image 3.png"
            alt=""
            class="d-flex"
        />
        <img
            src="@/assets/img/(per 1000 live births).png"
            alt=""
            class="d-flex"
        />
        <img
            src="@/assets/img/(per 1000 live births) (NHMIS - 2019).png"
            alt=""
            class="d-flex"
        />
        <img
            src="@/assets/img/(per 1000 live births) NDHS_2018.png"
            alt=""
            class="d-flex"
        />
        <!-- <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) (NHMIS - 2019) (1).png"
            alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) 2.png"
            alt=""
        /></b-list-group-item> -->
      </div>
    </div>

    <b-row
      style="padding-left: 70.000000026px; padding-right: 70.000000026px"
    >
      <b-col lg="8" sm="12" class="p-0 text-left">
        <b-row class="features">
          <b-col>
            <h4 style="font-size: 24px; font-weight: 500;">Available Health Data</h4>
            <p class="d-flex text-justify mb-4" style="font-size: 15px !important;">
              Our platform helps you set up a custom dashboard to suit your needs.
              The dashboard includes cleaned data on specific key health indicators in Nigeria.
              This data is available for your use.
              The platform allows for the segmentation of your charts,
              enabling you to organize your visualizations into any section of your choice,
              giving you control over your data and making it easier to analyze.
            </p>
            <b-button style="font-size: 1rem; border-radius: 8px;">Design your dashboard</b-button>
          </b-col>
        </b-row>
        <b-row class="features">
          <b-col>
            <h4 style="font-size: 24px; font-weight: 500;">Customizable Data</h4>
            <p class="text-justify mb-4" style="font-size: 15px !important;">
              Good news! This platform is not limited to the available data;
              you can also upload the data you're tracking within your team.
              You'll have the ability to input your data and select your preferred visualization.
              This feature is currently in development,
              and we're eager to incorporate your requirements into the design.
              If you're interested in contributing to the development of this feature,
              please express your interest below.
            </p>
            <b-button style="font-size: 1rem; border-radius: 8px;">INDICATE INTEREST HERE</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="4" sm="12">
        <div>
          <img
            class="img-fluid d-block mx-auto pb-5 mb-5"
            src="@/assets/img/Group 81.png"
            alt=""
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
  <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import CdFooter from '../components/footer.vue';
// import SavedDashboardList from '../components/SavedDashboardList.vue';
import customDashboardSvg from '../svg/customDashboardSvgs.vue';
import Header from '../../msdat-dashboard/views/about/layout/theHeader.vue';
import Footer from '../../msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  name: 'landing',
  components: {
    // CdFooter,
    customDashboardSvg,
    // SavedDashboardList,
    Header,
    Footer,
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['isAuthenticated']),
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  margin-top: 54.750000014px;
}
.hero{
  width: 100%;
  margin: auto !important;
  align-items: center !important;
  justify-content: center !important;
}
#get-started {
  margin-top: 30px;
  margin-bottom: 30px;
  // height: 67.500000017px;
  background-color: #3f8994;
  color: #ffffff;
  max-width: 306.000000077px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 7.500000002px;
  text-transform: none;
}
#samples {
  color: #202020;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}
.btn {
  background-color: #3f8994;
  color: #ffffff;
  max-width: 253.500000063px;
  text-transform: uppercase;
}
.nav {
  padding: 0px 80px;
}
.header-text {
  color: #201f1f;
  font-family: "DM Sans", sans-serif;
  h1 {
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 32.250000008px;
  }
  h2 {
    font-weight: normal;
    color: #202020;
    font-size: 22.5px;
    margin-bottom: 11.250000003px;
  }
  h3 {
    font-weight: bold;
    color: #202020;
    font-size: 22.5px;
  }
}
.features:first-child {
  margin-bottom: 59.250000015px;
}
.features:last-child {
  margin-bottom: 91.500000023px;
}
.features {
  h4 {
    font-weight: normal;
    font-size: 22.5px;
    color: #202020;
    margin-bottom: 17.250000004px;
  }
  p {
    font-weight: normal;
    font-size: 15.000000004px;
    color: #202020;
    margin-bottom: 41.25000001px;
  }
}

.col-7 {
  padding: 0px;
}
a {
  color: #202020;
}
.svg {
  flex-grow: 0;
  margin-top: 62.250000016px;

  p {
    font-weight: normal;
    font-size: 27.000000007px;
    color: #202020;
    margin-bottom: 41.25000001px;
    margin-top: 20.287500005px;
  }
}
.list-group-item {
  border: none;
  background-color: #f6f6f6;
}
.list-group {
  margin-top: 54.000000014px;
  margin-bottom: 99.000000025px;
}
.list-group::-webkit-scrollbar {
  display: none;
}

@media(max-width: 680px) {
.nav{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  // background: #201f1f;
 }
 .header-text h1{
  font-size: 30px;
  margin-top:30px;
 }
  .header-text h2{
  font-size: 20px;
 }
  .header-text h3{
  font-size: 20px;
   margin-top:20px;
 }
}
</style>
