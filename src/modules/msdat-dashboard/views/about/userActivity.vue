<template>
  <div>
    <Header />
    <div class="title text-center border-0">
      <h3 class="mt-2">Account Settings</h3>
    </div>
    <div class="row">
      <div class="side-list mt-5 col-md-2">
        <!-- <ul> -->
        <button type="button">
          <b-icon-person-circle></b-icon-person-circle>&nbsp;&nbsp;Profile >
        </button>
        <button type="button">
          <b-icon-bell-fill></b-icon-bell-fill>&nbsp;&nbsp;Notifications
        </button>
        <button type="button">
          <b-icon-clock-history></b-icon-clock-history>&nbsp;&nbsp;Activity History
        </button>
        <!-- </ul> -->
      </div>
      <div class="col-md-10 mt-3 border-left">
        <div class="d-flex">
          <img src="./assets/analytics.png" height="33px" width="33px" />
          <h4 class="ml-2 mt-2">Dashboard History</h4>
        </div>
        <div class="activity mt-3">
          <div class="mb-3">
            <span class="month">August 2022</span>
          </div>
          <div class="row">
            <div class="col-md-3">
              <input type="checkbox" class="mr-2" />&nbsp;August 13, 2022 at 2:34am
            </div>
            <div class="col-md-3"><b>Dashboard</b>-Section</div>
            <div class="col-md-4">Indicator, Datasource Period, Location</div>
            <div class="col-md-1">
              <b-icon-trash></b-icon-trash>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './layout/theHeader.vue';
import Footer from './layout/theFooter.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
  },
};
</script>
<style scoped>
/* *{ */
/* } */
.title {
  display: flex;
  height: 70px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
}
h3 {
  font-weight: bold;
}
.side-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  /* row-gap: 20px; */
}
button {
  border: none;
  height: 50px;
  background: #fcfcfc;
}
h4 {
  color: #5e5e5e;
}
.month {
  font-weight: bold;
}
.activity ul {
  /* display: flex; */
  /* justify-content: space-around; */
  list-style: none;
}
</style>
