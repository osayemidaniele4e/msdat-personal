<template>
  <b-container fluid>
    <div>
      <div>
        <b-nav align="right">
          <b-nav-item>Register</b-nav-item>
          <b-nav-item>Login</b-nav-item>
        </b-nav>
      </div>
      <div class="header-text text-center">
        <h1>Advanced Analytics</h1>
   
      </div>
  

    </div>
\
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
</style>
