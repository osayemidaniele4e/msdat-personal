<template>
    <div>
      <Header ref="theHeader" />
      <div @click="$refs.theHeader.close()">
        <div class="title text-center border-0">
      <h3 class="mt-2">Account Settings</h3>
    </div>
     <div class="d-flex ">
       <div class="col-2 d-flex flex-column mt-3 p-5 border-right">
        <a href="#/profile" class="item"><b-icon-person-circle></b-icon-person-circle>&nbsp;&nbsp; Profile</a>
        <a href="#/notification" class="mt-4 item"><b-icon-bell-fill></b-icon-bell-fill>&nbsp;&nbsp; Notification</a>
        <a href="#/userActivity" class="mt-4 item"><b-icon-clock-history></b-icon-clock-history>&nbsp;&nbsp; User Activity</a>
       </div>
       <div class="col-10">
        <component :is="currentView" />
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

.item:hover{
    text-decoration: none;
}
a{
  color: #000 !important;
}
</style>
