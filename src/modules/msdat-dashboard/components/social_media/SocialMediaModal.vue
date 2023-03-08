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
              @click="shareViaEmail"
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
            type="input"
            class="form-control"
            style="border-bottom-right-radius: 0px; border-top-right-radius: 0"
            placeholder=""
            ref="linkInput"
            v-model="shareURL"
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
            @click="copy"
          >
            {{ copy_text }}
            <b-icon class="" style="color: #007d53" icon="bookmarks" @click="copy" />
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 pt-3 pb-3">
      <h6 class="font-weight-bold work-sans">Share on social media</h6>
      <div class="row no-gutters">
        <div class="col">
          <ShareNetwork
            network="facebook"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
            hashtags="vuejs,vite"
          >
            <b-icon class="mx-3" style="color: #3b5998" font-scale="3" icon="facebook" />
          </ShareNetwork>

          <ShareNetwork
            network="twitter"
            :url="shareURL"
            :title="shareText"
            :description="shareDesc"
            :quote="shareDesc"
            hashtags="vuejs,vite,javascript"
            twitterUser="youyuxi"
          >
            <b-icon class="mx-3" style="color: #55acee" font-scale="3" icon="twitter" />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shareURL: window.location.href,
      shareDesc:
        'Take a look at this health indicator on the Multi-Source Data and Triangulation (MSDAT) platform',
      copy_text: 'Copy',
      shareText: 'MSDAT Platform',
      email: '',
      twitterUser: 'youyuxi',
    };
  },
  methods: {
    copy() {
      this.$refs.linkInput.select();
      document.execCommand('copy');
      this.copy_text = 'Copied';
    },

    shareViaEmail() {
      console.log(`mailto:${this.email}?subject=${this.shareText}&body=${this.shareURL}`);
      window.location = `mailto:${this.email}?subject=${this.shareText}&body=${this.shareDesc} : ${this.shareURL}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
