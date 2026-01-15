<template>
    <div class="container-fluid card shadow dropdown work-sans" v-if="open === true" >
      <div class="row p-3 d-flex user-details">
        <div class="col-3">
        <img :src="'https://msdat-api.fmohconnect.gov.ng' + getUser.avatar" class="profile-picture mr-1" width="48" height="48" />
        </div>
        <div class="col-8">
        <div>{{ getUser.username }}</div>
        <div>{{ getUser.email }}</div>
        </div>
        <div class="close mr-2" @click.prevent="close">
          <b-icon-x-circle></b-icon-x-circle>
        </div>
      </div>
      <div class="d-flex py-2">
        <router-link to="/account"><a href="#" class="ml-2">View Account</a></router-link>
        <div class="logout">
        <a href="#" class="mr-2" @click.prevent="logout">Log Out</a>
        </div>
      </div>
    </div>
  </template>

<script>
import { mapGetters } from 'vuex';
// import VueCookies from 'vue-cookies';

export default {
  name: 'drop',
  data() {
    return {
      open: true,
    };
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['getUser']),
  },
  methods: {
    // ...mapActions('AUTH_STORE', ['logout'])
    async logout() {
      this.$store.dispatch('AUTH_STORE/logout');
      if (!(this.$route.fullPath.includes('dashboard'))) {
        this.$router.push('/');
      }
    },
    close() {
      this.open = false;
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
      right: 1rem;
      color: black;
      max-height: 30rem;
      overflow-y: auto;
      a {
        color: inherit;
      }
    }
  }
  .user-details{
    background: #FAFAFA;
  }
  .logout{
    position: absolute;
    right: 0;
  }
  .close {
    position: absolute;
    right: 0;
  }
  </style>
