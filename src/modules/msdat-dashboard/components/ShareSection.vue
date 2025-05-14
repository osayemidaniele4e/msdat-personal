<!-- eslint-disable camelcase -->
<!-- eslint-disable camelcase -->
<template>
    <div class="row">

      <div class="border-bottom col-12 pt-3 pb-3">
        <h6 class="font-weight-bold work-sans">Share Specific Link</h6>
        <div class="row no-gutters">
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              style="border-bottom-right-radius: 0px; border-top-right-radius: 0"
              placeholder="Shareable Specific URL"
              ref="sharedInput"
              v-model="shareLink"
              readonly
            />
          </div>
          <div class="col-md-3">
            <button
              type="button"
              class="btn btn-block btn-primary py-2 text-uppercase border"
              style="
                color: #007d53;
                border-bottom-left-radius: 0px;
                border-top-left-radius: 0;
                background-color: #dff3f3;
                border-color: #dff3f3;
              "
              @click="copy_shared_text"
            >
              {{ copy_shared }}
              <b-icon class="" style="color: #007d53" icon="bookmarks" @click="copy_shared_text" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      shareURL: window.location.href,
      shareDesc:
          'Take a look at this health indicator on the Multi-Source Data and Triangulation (MSDAT) platform',
      copy_text: 'Copy',
      shareText: 'MSDAT Platform',
      email: '',
      twitterUser: '@eHealth4every1',
      hashtags:
          'HealthTech,HealthData,DataAnalytics,HealthDataAnalytics,BigData,DataSources,Data,DataScientist,DataAnalyst,HealthIndicators',
      shareLink: '',
      copy_shared: 'Copy',
    };
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getSelectedConfig']),
  },
  mounted() {
    // this.shareDesc = `Take a look at '${this.getSelectedConfig.indicator.full_name}' on the Multi-Source Data and Triangulation (MSDAT) platform`;
    const { name } = this.$route.params;

    if (name === 'Advanced_Analytics') {
      const advancedUrl = localStorage.getItem('advanced_url');
      this.shareLink = advancedUrl;
    } else if (name === undefined) {
      this.shareLink = `${window.location.origin}${window.location.pathname}`;
      // logic for 'Other_Section'
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('year', this.$store.state.MSDAT_STORE.selectedConfigurations.period);
      params.set('section', this.$store.state.MSDAT_STORE.selectedSection);
      this.shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', this.shareLink);
    }
    // if (name === 'Advanced_Analytics') {
    //   const advancedUrl = localStorage.getItem('advanced_url');
    //   this.shareLink = advancedUrl;
    // } else if (name === 'health-service-uptake') {
    //   this.shareLink = `${window.location.origin}${window.location.pathname}`;
    //   // logic for 'Other_Section'
    // } else if (name === 'health-facilities-profile') {
    //   this.shareLink = `${window.location.origin}${window.location.pathname}`;
    //   // logic for 'Other_Section'
    // } else if (name === 'Quarterly_Performance_Assessment_Dashboard') {
    //   this.shareLink = `${window.location.origin}${window.location.pathname}`;
    //   // logic for 'Other_Section'
    // } else {
    //   const params = new URLSearchParams(window.location.search);
    //   params.set('section', this.$store.state.MSDAT_STORE.selectedSection);
    //   this.shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    //   window.history.pushState({}, '', this.shareLink);
    // }

    // if (name === 'Advanced_Analytics') {
    //   const advancedUrl = localStorage.getItem('advanced_url');
    //   this.shareLink = advancedUrl;
    // } else if {
    //   const params = new URLSearchParams(window.location.search);
    //   params.set('section', this.$store.state.MSDAT_STORE.selectedSection);
    //   this.shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    //   window.history.pushState({}, '', this.shareLink);
    // }else {
    //   const params = new URLSearchParams(window.location.search);
    //   params.set('section', this.$store.state.MSDAT_STORE.selectedSection);
    //   this.shareLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    //   window.history.pushState({}, '', this.shareLink);
    // }

    // Update the shareable link with the new parameter
  },

  methods: {
    copy() {
      this.$refs.linkInput.select();
      document.execCommand('copy');
      this.copy_text = 'Copied';
    },

    copy_shared_text() {
      this.$refs.sharedInput.select();
      document.execCommand('copy');
      this.copy_shared = 'Copied';
    },

    shareViaEmail() {
      console.log(`mailto:${this.email}?subject=${this.shareText}&body=${this.shareURL}`);
      window.location = `mailto:${this.email}?subject=${this.shareText}&body=${this.shareDesc} : ${this.shareURL}`;
    },
  },
};
</script>

  <style lang="scss" scoped></style>
