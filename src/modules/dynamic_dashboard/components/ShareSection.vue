<template>
  <div class="datasource-container">
    <div class="whats-new-content">
      <div @click="closeComponent" class="close-btn">
        <img src="../../../assets/close-icon.png" alt="" />
      </div>
      <div class="d-flex w-100 justify-content-start mt-2 title">
        <h1>Share Section</h1>
      </div>
      <div class="m-5">
        <div class="mb-4">
          <label class="form-label fw-bold">Send by Email</label>
          <div class="input-group">
            <input
              type="email"
              class="form-control email-input"
              placeholder="email address"
              v-model="email"
            />
            <button class="btn btn-outline-success send-button" @click="shareViaEmail">Send</button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Share Link</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control email-input"
              placeholder="email address"
              v-model="shareLink"
              readonly
              ref="sharedInput"
            />
            <button class="btn btn-outline-success send-button" @click="copy_shared_text">
              {{ copy_shared }}

              <b-icon class="" style="color: #007d53" icon="bookmarks" />
            </button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label fw-bold">Share Via</label>
          <div class="d-flex align-items-center">
            <div @click="share('whatsapp')" class="icon-wrap">
              <img src="@/assets/whatapp.png" alt="" />
              <span>Whatsapp</span>
            </div>
            <div @click="share('x')" class="icon-wrap-2">
              <img src="@/assets/twitter.png" alt="" />
              <span class="mt-4">Twitter</span>
            </div>
            <div @click="share('facebook')" class="icon-wrap-2">
              <img src="@/assets/facebook.png" alt="" />
              <span class="mt-4">Facebook</span>
            </div>
            <div @click="share('linkedin')" class="icon-wrap-3">
              <img src="@/assets/linkedin.png" alt="" />
              <span class="mt-4">Linkedin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

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
  methods: {
    ...mapMutations('MSDAT_STORE', ['closeShowShareSection']),

    closeComponent() {
      this.closeShowShareSection();
    },

    copy_shared_text() {
      this.$refs.sharedInput.select();
      document.execCommand('copy');
      this.copy_shared = 'Copied';
    },

    shareViaEmail() {
      if (!this.email) {
        // eslint-disable-next-line no-alert
        alert('Please enter a valid email address');
        return;
      }

      const subject = encodeURIComponent(this.shareText);
      const body = encodeURIComponent(`${this.shareDesc}: ${this.shareURL}`);
      const recipient = encodeURIComponent(this.email);

      const mailtoURL = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // This line MUST be triggered by a user click event
      window.location.href = mailtoURL;
    },
    share(platform) {
      const encodedLink = encodeURIComponent(this.shareLink);
      let url = '';

      switch (platform) {
        case 'whatsapp':
          url = `https://wa.me/?text=${encodedLink}`;
          break;
        case 'x':
          url = `https://twitter.com/intent/tweet?url=${encodedLink}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
          break;
        case 'linkedin':
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
          break;
        default:
          // eslint-disable-next-line no-alert
          alert(`Unsupported platform: ${platform}`);
          return;
      }

      window.open(url, '_blank');
    },
  },
  mounted() {
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
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.email-input {
  height: 40px; /* increased height */
  font-size: 16px;
  padding: 10px 14px;
}

.icon-wrap {
  // padding: 5px;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
}

.icon-wrap-2 {
  // padding: 5px;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
  padding: 10px 0;
  cursor: pointer;
}

.icon-wrap-3 {
  // padding: 5px;
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
  margin-top: 6px;
}
.icon-wrap img {
  width: 99px;
  height: 91px;
}

.icon-wrap-2 img {
  width: 65px;
  height: 65px;
  object-fit: contain;
  margin-top: 5px;
}

.icon-wrap-3 img {
  width: 58px;
  height: 58px;
  margin-top: 8px;
}

.send-button {
  height: 40px; /* match input height */
  font-size: 16px;
  padding: 0 24px; /* wider button */
}

.datasource-container {
  position: relative;
  border: 1px solid #c3c3c3;
  background-color: rgba(0, 0, 0, 0.4); // Adjust opacity only for the background
  height: 100%;
  width: 100%;
  //padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 16px;
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
}

.close-btn img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.whats-new-content {
  position: relative;
  //   right: 20px;
  min-height: 400px;
  width: 800px;
  // top: 5rem;
  background-color: white;
  // padding: 30px 0;
  border-radius: 50px;
}
.title {
  margin-top: 30px;
  padding: 20px 40px;
  border-bottom: 1px solid #dfdada;
}

.title h1 {
  font-size: 24px;
  color: #212121;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 23px;
}
.new-item {
  margin: 10px 0;
  display: flex;
}
.icon img {
  height: 35px;
  width: 35px;
}
.info {
  width: 100%;
  margin: 0 10px;
}
.info h2 {
  margin: 0;
  font-size: 16px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}

.info h3 {
  margin: 0;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #202020;
}
.info p {
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
}

.link {
  font-size: 14px;
  color: #348461;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #202020;
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
  color: #0e3a27;
  cursor: pointer;
}
</style>
