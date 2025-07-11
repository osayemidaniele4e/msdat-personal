<template>
  <div class="backdrop">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Share dashboard</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="modal-section">
        <label class="label">Send by Email</label>
        <div class="input-group">
          <input
            type="email"
            v-model="email"
            placeholder="email address"
            class="input"
          />
          <button class="button" @click="sendEmail">Send</button>
        </div>
      </div>

      <div class="modal-section">
        <label class="label">Share link</label>
        <div class="input-group">
          <input
            type="text"
            :value="shareLink"
            readonly
            class="input"
          />
          <button class="button" @click="copyLink">Copy link</button>
        </div>
      </div>

      <div class="modal-section">
        <label class="label">Share via</label>
        <div class="icon-group">
          <div v-for="(platform, index) in platforms" :key="index" class="icon-item">
            <div class="icon-circle">
              <img :src="platform.icon" alt="" />
            </div>
            <div class="icon-label">{{ platform.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      shareLink: 'https://www.youtube.com/live/iHQp8x6NmGc?s=ELjk05JUHxf1OnEX',
      platforms: [
        { name: 'Embed', icon: 'https://img.icons8.com/ios-filled/24/code.png' },
        { name: 'WhatsApp', icon: 'https://img.icons8.com/ios-filled/24/whatsapp.png' },
        { name: 'X', icon: 'https://img.icons8.com/ios-filled/24/twitterx.png' },
        { name: 'Facebook', icon: 'https://img.icons8.com/ios-filled/24/facebook-new.png' },
        { name: 'LinkedIn', icon: 'https://img.icons8.com/ios-filled/24/linkedin.png' },
      ],
    };
  },
  methods: {
    sendEmail() {
      alert(`Email sent to ${this.email}`);
      this.email = '';
    },
    copyLink() {
      navigator.clipboard.writeText(this.shareLink);
      alert('Link copied!');
    },
  },
};
</script>

<style scoped>
/* Modal overlay */
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal box */
.modal {
  background: #fff;
  border-radius: 16px;
  width: 600px;
  padding: 24px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  position: relative;
  font-family: 'Segoe UI', sans-serif;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

/* Sections */
.modal-section {
  margin-top: 20px;
}

.label {
  font-weight: 500;
  margin-bottom: 6px;
  display: inline-block;
}

/* Inputs and Buttons */
.input-group {
  display: flex;
  width: 100%;
}

.input {
  flex: 1;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  outline: none;
}

.button {
  padding: 10px 14px;
  font-size: 14px;
  background: transparent;
  border: 1px solid #2e8b57;
  color: #2e8b57;
  border-left: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: 0.2s;
}

.button:hover {
  background: #f2fef7;
}

/* Icons */
.icon-group {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.icon-item {
  text-align: center;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background: #eee;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.icon-circle img {
  width: 22px;
  height: 22px;
}

.icon-label {
  margin-top: 6px;
  font-size: 12px;
}
</style>
