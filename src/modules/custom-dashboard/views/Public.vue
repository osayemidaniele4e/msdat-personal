<template>
  <div class="vh-100 d-flex flex-column">
  <the-header ref="theHeader" />
  <main @click="$refs.theHeader.close()" class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
    <span class="h1" v-if="msg">
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
import theHeader from '@/modules/msdat-dashboard/views/about/layout/theHeader.vue';
import theFooter from '@/modules/msdat-dashboard/views/about/layout/theFooter.vue';

export default {
  data() {
    return {
      msg: '',
    };
  },
  components: {
    theHeader,
    theFooter,
  },
  created() {
    this.$store.dispatch('customDashboard', false);
  },
  mounted() {
    const id = this.$route.params.id || this.$route.query.id;
    // GET A DASHBOARD BY ID
    // Check confirmation status
    // Route to Dashboard if approved, otherwise display unapproved status.
    this.$store.dispatch('getDashboard', id).then(({ data }) => {
      const result = data.data;
      if (result) {
        const isConfirmed = result.is_confirmed;
        if (isConfirmed === false) {
          const config = JSON.parse(result.config);
          const {
            dashboardDetails, composedData, surveyArray, sectionsArray,
          } = config;

          this.$store.dispatch('resetState');
          this.$store.dispatch('dashboardConfiguration', dashboardDetails);
          this.$store.dispatch('customDashboard', true);

          this.$store.commit('setPArea', composedData);
          this.$store.commit('setDArea', surveyArray);
          this.$store.commit('arrangedSections', sectionsArray);
          this.$store.commit('setEmbedUrl', result.embedded_url);
          this.$store.commit('setEmbedIframe', result.embedded_iframe);
          this.$store.commit('setEmbedUrlTitle', result.embedded_url_title);
          this.$store.commit('setEmbedIframeTitle', result.embedded_iframe_title);

          const t = config.dashboardDetails.name.replace(/\s+/g, '_').toLowerCase();
          this.$router.push({
            path: `/dashboard/${t}/${id}/`,
            query: { id },
            component: () => import('../../dynamic-dashboard/index.vue'),
          });
        } else if (data.disapproved) {
          this.msg = 'The requested Dashboard was not approved!';
        } else {
          this.msg = 'The requested Dashboard is currently awaiting approval!';
        }
      }
    }).catch(() => {
      this.msg = 'An error occured!';
    });
  },
};
</script>
