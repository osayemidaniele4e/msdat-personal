<template>
    <div>
      <Header ref="theHeader" />
      <div @click="$refs.theHeader.close()">
        <div class="title text-center border-0">
      <h3 class="mt-2">Account Settings</h3>
    </div>
     <div class="d-flex ">
       <div class="col-lg-2 col-1 d-flex flex-column mt-3 px-2 py-5 border-right">
        <a href="#/profile" class="item"><b-icon-person-circle></b-icon-person-circle>&nbsp;&nbsp; <span class="d-none d-md-inline">Profile</span></a>
        <a href="#/notification" class="mt-4 item"><b-icon-bell-fill></b-icon-bell-fill>&nbsp;&nbsp; <span class="d-none d-md-inline">Notification</span></a>
        <a href="#/userActivity" class="mt-4 item"><b-icon-clock-history></b-icon-clock-history>&nbsp;&nbsp; <span class="d-none d-md-inline">User Activity</span></a>
       </div>
       <div class="col-10">
        <Profile :is="currentView" />
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

const routes = {
  '/': Profile,
  '/profile': Profile,
  '/notification': Notification,
  '/userActivity': userActivity,

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

.item{
  color: black !important;
}

.item:hover{
    text-decoration: none;
}
a{
  color: #000 !important;
}
</style>
