<template>
  <div class="vh-100">
  <the-header ref="theHeader" />
  <div class="requests" v-if="unauthorized">
    <h3>Authorized Approvers Only!</h3>
  </div>
  <div class="requests" v-else-if="requests">
    <h3 v-if="!requests.length">No requests currently awaiting approval.</h3>
    <request-card @remove="remove" v-for="request in requests" :key="request.id" :request="request" />
  </div>
  <div class="requests" v-else-if="error">
    <h3>Error retrieving Requests!</h3>
  </div>
  <div class="requests" v-else>
    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
  </div>
  <the-footer/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import theHeader from '@/modules/msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '@/modules/msdat-dashboard/views/about/layout/theFooter.vue';
import RequestCard from '../components/RequestCard.vue';
import authorize from '../utils/authorizer';

export default {
  data() {
    return {
      requests: null,
      unauthorized: false,
      error: false,
    };
  },
  methods: {
    ...mapGetters('AUTH_STORE', ['getUser']),
    remove(id) {
      this.requests = this.requests.filter((request) => request.id !== id);
    },
  },
  components: {
    RequestCard,
    theFooter,
    theHeader,
  },
  created() {
    this.$store.dispatch('customDashboard', false);
  },
  mounted() {
    // Check currently logged-in user is Authorized
    const mail = this.getUser()?.email;
    if (!authorize(mail)) {
      this.unauthorized = true;
      return;
    }
    // GET ALL DASHBOARDS
    // Set Dashboards to Requests
    this.$store.dispatch('getDashboards').then(({ data }) => {
      if (data) {
        this.requests = Object.values(data).filter((request) => (!request.isConfirmed && !request.disapproved));
      }
    }).catch((err) => {
      this.error = true;
      console.log(err);
    });
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  padding: 0 15px;
}
.requests {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 25px 0 50px;
  min-height: 100%;
}
</style>
