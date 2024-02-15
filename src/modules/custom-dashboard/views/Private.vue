<template>
  <div class="vh-100 d-flex flex-column">
  <the-header ref="theHeader" />
  <main @click="$refs.theHeader.close()" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
    <span class="h1 text-center px-3" v-if="msg">
      {{ msg }}
    </span>
    <div v-else class="pb-3">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>
    <button @click="$router.push('/custom')" class="btn btn-secondary rounded-pill px-3 mt-3">
      <b-icon class="mr-2 rounded-circle bg-primary text-white" icon="arrow-left-short" font-scale="2"></b-icon>
      <span class="h4 text-primary">Home</span>
    </button>
  </main>
  <the-footer/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import theHeader from '@/modules/msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '@/modules/msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  data() {
    return {
      msg: '',
      timeout: null,
    };
  },
  components: {
    theHeader,
    theFooter,
  },
  created() {
    this.$store.dispatch('customDashboard', false);
  },
  computed: {
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser', 'getDashboards']),
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.msg = 'Retrieving Dashboard taking too long. Kindly try again later.';
    }, 10000);
  },
  watch: {
    getDashboards(dashboards) {
      clearTimeout(this.timeout);
      const id = this.$route.params.id;
      const data = dashboards.find((dash) => dash.id === id);
      console.log(data);
      if (data) {
        if (this.isAuthenticated) {
          const config = JSON.parse(data.config);
          const {
            dashboardDetails, composedData, surveyArray, sectionsArray,
          } = config;

          this.$store.dispatch('resetState');
          this.$store.dispatch('dashboardConfiguration', dashboardDetails);
          this.$store.dispatch('customDashboard', true);

          this.$store.commit('setPArea', composedData);
          this.$store.commit('setDArea', surveyArray);
          this.$store.commit('arrangedSections', sectionsArray);

          const t = config.dashboardDetails.name.replace(/\s+/g, '_').toLowerCase();
          this.$router.push({
            path: `/dashboard/${t}`,
            component: () => import('../../dynamic-dashboard/index.vue'),
          });
        } else {
          this.msg = 'You need to be logged in to view your Dashboards!';
        }
      } else {
        this.msg = 'Dashboard not found!';
      }
    },
  },
};
</script>
