<template>
  <div>
    <Header ref="theHeader" />
    <div @click="$refs.theHeader.close()">
      <!-- <div class="title text-center border-0">
        <button class="btn btn-primary px-2" @click="$router.go(-1)">
          &larr;&nbsp;Back to Home
        </button>
        <h3 class="mt-2">Account Settings</h3>
      </div> -->
      <div class="title border-0 d-flex justify-content-between align-items-center">
        <button class="btn btn-primary px-3 ml-4" @click="$router.go(-1)">&larr;&nbsp;Back</button>
        <h3 class="mt-2 text-center" style="font-family: Work sans">Account Settings</h3>
        <div></div>
        <!-- Add an empty div for spacing or other content if needed -->
      </div>
      <div class="d-flex" style="font-family: Work sans">
        <div class="col-lg-2 col-1 d-flex flex-column mt-3 px-2 py-5 border-right">
          <!-- <a href="#/profile" class="item"><b-icon-person-circle></b-icon-person-circle>&nbsp;&nbsp; <span class="d-none d-lg-inline">Profile</span></a>
        <a href="#/notification" class="mt-4 item"><b-icon-bell-fill></b-icon-bell-fill>&nbsp;&nbsp; <span class="d-none d-lg-inline">Notification</span></a> -->
          <a href="#/userActivity" class="mt-4 item"
            ><b-icon-clock-history></b-icon-clock-history>&nbsp;&nbsp;
            <span class="d-none d-lg-inline">User Activity</span></a
          >
          <a href="#/savedDashboards" class="mt-4 item"
            ><b-icon-card-heading></b-icon-card-heading>&nbsp;&nbsp;
            <span class="d-none d-lg-inline">Saved Dashboards</span></a
          >
          <a href="#/createPlugin" class="mt-4 item blue"
            ><b-icon-cloud-upload></b-icon-cloud-upload>&nbsp;&nbsp;
            <span class="d-none d-lg-inline">Create a plugin</span></a
          >
        </div>
        <div class="col-lg-10 col-11">
          <savedDashboards :is="currentView" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/modules/msdat-dashboard/views/about/layout/theHeader.vue';
import Footer from '@/modules/msdat-dashboard/views/about/layout/theFooter.vue';
import Profile from './profile.vue';
import Notification from './notifications.vue';
import userActivity from './userActivity.vue';
import savedDashboards from './savedDashboards.vue';
import createPlugin from './createPlugin.vue';

const routes = {
  '/': userActivity,
  '/profile': Profile,
  '/notification': Notification,
  '/userActivity': userActivity,
  '/savedDashboards': savedDashboards,
  '/createPlugin': createPlugin,
};

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'];
    },
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash;
    });
  },
};
</script>

<style scoped>
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

.item {
  color: black !important;
}

.item:hover {
  text-decoration: none;
}
a {
  color: #000 !important;
}

.blue {
  color: blue;
}
</style>
