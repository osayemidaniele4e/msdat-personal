<template>
    <div class="container-fluid card shadow dropdown work-sans">
      <div class="row p-3 d-flex user-details">
        <div class="col-3">
        <img :src="getUser.picture" class="profile-picture mr-1" width="48" height="48" />
        </div>
        <div class="col-9">
        <div>{{ getUser.username }}</div>
        <div>{{ getUser.email }}</div>
        </div>
      </div>
      <div class="d-flex py-2">
        <router-link to="/userHistory"><a href="#" class="ml-2">View Account</a></router-link>
        <div class="logout">
        <a href="#" class="mr-2" @click.prevent="logout">Log Out</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import VueCookies from 'vue-cookies';

export default {
  name: 'drop',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['getUser']),
  },
  methods: {
    ...mapActions('AUTH_STORE', ['logout']),
    async logout() {
      await this.logout();
    },
  },
};
</script>

  <style lang="scss" scoped>
  div {
    &.dropdown {
      position: absolute;
      width: 26vw;
      z-index: 5;
      // left: -0.5vw;
      right: 1rem;
      // top: 2.8rem;
      color: black;
      max-height: 30rem;
      overflow-y: auto;
      a {
        color: inherit;
      }
    }
    div.list-group{
      h5.text-underline{
        font-size: 1rem !important;
      }
    }
    .list-group-item {
      font-family: 'Work Sans';
      padding: 0.25rem 1.25rem;
      border: 0;
      font-size: 0.95rem;
    }
    .sub-nav {
      margin-top: 1rem;
      font-weight: 700;
      font-size: 1.1rem;
      font-family: 'Work Sans';
    }
  }
  h5.text-underline {
    border-bottom: 1px solid lightgrey;
    padding: 0.2rem 0;
    margin: 0.7rem 1.3rem;
    font-size: 1.2rem;
    font-family: 'Work Sans';
    font-weight: 700;
  }
  .user-details{
    background: #FAFAFA;
  }
  .logout{
    position: absolute;
    right: 0;
  }
  </style>
