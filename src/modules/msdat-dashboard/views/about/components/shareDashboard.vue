<template>
  <div class="row">
    <div class="border-bottom col-12 pb-3">
      <h6 class="font-weight-bold work-sans">Send by Email</h6>
      <form class="row no-gutters" @submit.prevent="shareViaEmail">
        <div class="col-md-10">
          <input
            type="email"
            required="required"
            class="form-control"
            style="border-bottom-right-radius: 0px; border-top-right-radius: 0"
            placeholder="Enter email address"
            v-model="email"
          />
        </div>
        <div class="col-md-2">
          <button
            type="submit"
            class="btn btn-block btn-primary py-2 text-uppercase"
            style="
              border-bottom-left-radius: 0px;
              border-top-left-radius: 0;
              background-color: #007d53;
            "
          >
            Send
            <b-icon
              class=""
              style="color: #ffffff"
              icon="caret-right-fill"
            />
          </button>
        </div>
      </form>
    </div>
    <div class="border-bottom col-12 pt-3 pb-3">
      <h6 class="font-weight-bold work-sans">Share Link</h6>
      <div class="row no-gutters">
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            style="border-bottom-right-radius: 0px; border-top-right-radius: 0"
            placeholder="Shareable URL"
            ref="linkInput"
            v-model="shareURL"
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
            @click="copyToClipboard"
          >
            {{ copy_text }}
            <b-icon class="" style="color: #007d53" icon="bookmarks" />
          </button>
        </div>
      </div>
    </div>
    <div class="border-bottom col-12 pt-3 pb-3">
      <h6 class="font-weight-bold work-sans">Share Specific Link</h6>
      <div class="row no-gutters">
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            style="border-bottom-right-radius: 0px; border-top-right-radius: 0"
            placeholder="Shareable Specific URL"
            ref="linkInput"
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
            @click="copyToClipboard"
          >
            {{ copy_text }}
            <b-icon class="" style="color: #007d53" icon="bookmarks" />
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 pt-3 pb-3">
      <h6 class="font-weight-bold work-sans">Share on social media</h6>
      <div class="row no-gutters">
        <div class="col" style="align-items: center; display: flex;">
          <ShareNetwork
            network="facebook"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
            :hashtags="hashtags"
          >
            <b-icon class="mx-3" style="color: #3b5998" font-scale="3" icon="facebook" />
          </ShareNetwork>

          <ShareNetwork
            network="twitter"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
            :hashtags="hashtags"
            :twitterUser="twitterUser"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
          </ShareNetwork>

          <ShareNetwork
            network="linkedin"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
          >
            <b-icon class="mx-3" style="color: #55acee" font-scale="3" icon="linkedin" />
          </ShareNetwork>

          <ShareNetwork
            network="whatsapp"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
            :hashtags="hashtags"
          >
            <b-icon class="mx-3" style="color: #25d366" font-scale="3" icon="whatsapp" />
          </ShareNetwork>
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
      shareURL: '',
      shareDesc: '',
      copy_text: 'Copy',
      shareText: 'MSDAT Platform',
      email: '',
      twitterUser: '@eHealth4every1',
      hashtags: 'HealthTech,HealthData,DataAnalytics,HealthDataAnalytics,BigData,DataSources,Data,DataScientist,DataAnalyst,HealthIndicators',
      socialNetworks: [
        { name: 'facebook', color: '#3b5998', icon: 'facebook' },
        {
          name: 'twitter', color: '#55acee', icon: 'twitter', customIcon: true, twitterUser: '@eHealth4every1',
        },
        { name: 'linkedin', color: '#0077b5', icon: 'linkedin' },
        { name: 'whatsapp', color: '#25d366', icon: 'whatsapp' },
      ],
    };
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getSelectedConfig']),
  },
  mounted() {
    console.log('wheree', this.getSelectedConfig);
    const id = this.$route.params.id;
    this.shareURL = `${window.location.origin}/custom/public/${id}`;
    this.shareDesc = `Take a look at '${this.getSelectedConfig.indicator.full_name}' on the Multi-Source Data and Triangulation (MSDAT) platform`;
  },
  methods: {
    copyToClipboard() {
      this.$refs.linkInput.select();
      document.execCommand('copy');
      this.copy_text = 'Copied';
      setTimeout(() => {
        this.copy_text = 'Copy';
      }, 3000);
    },
    shareViaEmail() {
      const mailtoLink = `mailto:${this.email}?subject=${encodeURIComponent(this.shareText)}&body=${encodeURIComponent(this.shareDesc)} : ${encodeURIComponent(this.shareURL)}`;
      window.location.href = mailtoLink;
    },
  },
};
</script>

<style scoped></style>
