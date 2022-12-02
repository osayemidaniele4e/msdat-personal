<template>
  <b-container fluid>
    <div class='mt-0'>
      <div>
        <b-nav align="right" class='nav'>
          <b-nav-item @click="$router.push('/custom/register')">Register</b-nav-item>
          <b-nav-item @click="$router.push('/custom/login')">Login</b-nav-item>
        </b-nav>
      </div>
      <div class="header-text text-center mb-5">
        <h1>The Custom Dashboard</h1>
        <h2>Design your dashboard, customize your data</h2>
        <h3>No coding skills required!</h3>
      </div>
      <b-row align="center" class='mt-5 m-auto'>
        <b-col md="auto" sm="12" class="svg">
          <customDashboardSvg :name="61"></customDashboardSvg>
          <p style="font-size: 24px !important;">Select Data</p>
        </b-col>
        <b-col md="auto" sm="12" align-self="center" class="svg-arrow">
          <customDashboardSvg :name="78"></customDashboardSvg>
        </b-col>
        <b-col md="auto" sm="12" class="svg">
          <customDashboardSvg :name="62"></customDashboardSvg>
          <p style="font-size: 24px !important;">Arrange Widgets</p>
        </b-col>
        <b-col md="auto" sm="12" align-self="center" class="svg-arrow">
          <customDashboardSvg :name="79"></customDashboardSvg>
        </b-col>
        <b-col md="auto" sm="12" class="svg">
          <customDashboardSvg :name="77"></customDashboardSvg>
          <p style="font-size: 24px !important;">Visualize Dashboard</p>
        </b-col>
      </b-row>
      <div class="text-center">
        <b-button id="get-started" @click="$router.push('/custom/login')"  class="px-5 py-3">Get Started Here</b-button>
      <p id="samples">View samples here</p>
      </div>

    </div>
    <div class="image-scroll">
      <b-list-group horizontal class="overflow-auto">
        <b-list-group-item
          ><img src="@/assets/img/Image 3.png" alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births).png"
            alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) (NHMIS - 2019).png"
            alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) NDHS_2018.png"
            alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) (NHMIS - 2019) (1).png"
            alt=""
        /></b-list-group-item>
        <b-list-group-item
          ><img
            src="@/assets/img/(per 1000 live births) 2.png"
            alt=""
        /></b-list-group-item>
      </b-list-group>
    </div>

    <b-row
      style="padding-left: 70.000000026px; padding-right: 70.000000026px"
    >
      <b-col md="7" sm="12" class="p-0 text-left">
        <b-row class="features">
          <b-col>
            <h4 style="font-size: 24px !important;">Available health data</h4>
            <p class="d-flex" style="font-size: 14px !important;">
              Our platform helps you to set up your custom dashboard to suit
              your needs. The dashboard comes with cleaned data on the certain
              key health indicators in Nigeria. This data can be made available
              for your use. The platform allows for sectioning of your charts.
              So you can section your visualizations into any section of your
              choice, giving you control over your data and making it easier to
              analyse
            </p>
            <b-button>Design your dashboard</b-button>
          </b-col>
        </b-row>
        <b-row class="features">
          <b-col>
            <h4 style="font-size: 24px !important;">Customizable Data</h4>
            <p style="font-size: 14px !important;">
              GOODNEWS! This platform is not just limited to the available data,
              you can also upload the data you are tracking in your team. You
              will be able to input your data and choose any visualization of
              your choice. This feature is being developed and we are eager to
              capture your requirements into the design. If you are interested
              in contributing to the development of this feature, please
              indicate your interest below.
            </p>
            <b-button>INDICATE INTEREST HERE</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="5" sm="12">
        <div>
          <img
            class="img-fluid d-block mx-auto"
            src="@/assets/img/Group 81.png"
            alt=""
          />
        </div>
      </b-col>
    </b-row>
    <CdFooter />
  </b-container>
</template>

<script>
import CdFooter from '../components/footer.vue';
import customDashboardSvg from '../svg/customDashboardSvgs.vue';

export default {
  name: 'landing',
  components: {
    CdFooter,
    customDashboardSvg,
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  margin-top: 54.750000014px;
}
#get-started {
  margin-top: 30px;
  margin-bottom: 30px;
  // height: 67.500000017px;
  background-color: #3f8994;
  color: #ffffff;
  max-width: 306.000000077px;
  font-weight: bold;
  font-size: 30.000000008px;
  border-radius: 7.500000002px;
  text-transform: none;
}
#samples {
  text-decoration: underline;
  color: #202020;
  font-size: 22.5px;
  font-weight: normal;
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
