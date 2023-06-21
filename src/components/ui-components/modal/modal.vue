<template>
  <div>
    <div>
      <div>
        <div v-if="toggleModal" class="darkScreen" @click="closeContactform"></div>
      </div>
      <div v-show="toggleModal" class="modal_content">
        <div class="modal_header">
          <slot name="title" width="10"></slot>
          <span @click="closeContactform" class="modal_close">&times;</span>
        </div>
        <div class="modal_body">
          <slot name="body_msg"></slot>
          <p v-show="nofields" class="alert alert-warning">Please fill all fields correctly</p>
          <p v-show="successmessage" class="alert alert-success fonttxt" role="alert">
            Thank you. We will keep you informed about the latest updates to the HealthThink
            Platform.
          </p>
          <p v-show="errormessage" class="alert alert-danger rounded">
            An error occured, please try again later.
          </p>
          <div class="form-group">
            <slot name="top1"></slot>
            <slot name="top2"></slot>
            <slot name="top3" class="feedback"></slot>
          </div>
          <div class="sendButton send--send">
            <button class="send send--right white--text" @click="submitbtn">SEND</button>
          </div>

          <div class="modal_footer rounded">
            <slot name="bottom1"></slot>
            <slot name="bottom2"></slot>
            <button class="send send--close red--text" @click="closeContactform">
              CLOSE
              <!-- <v-icon style="color: white;" right>send</v-icon> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nofields: Boolean,
    successmessage: Boolean,
  },
  data() {
    return {
      toggleModal: true,
      errormessage: false,
    };
  },
  methods: {
    submitbtn() {
      this.$emit('submitContact');
    },

    closeContactform() {
      this.$emit('closeContact');
    },
    showtoggleModal() {
      this.toggleModal = true;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.feedback {
  color: rgb(155, 149, 149);
}
.send {
  position: relative;
  color: white;
  background-color: #494299;
  border-radius: 3px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  padding: 13px 20px;
  margin: 10px;
  outline: none;
}

.send--close {
  background-color: rgb(209, 66, 90);
  padding: 8px 35px;
}
.send--send {
  top: -20px;
}

.darkScreen {
  position: absolute;
  z-index: 30;
  inset: 0;
  opacity: 0.5;
  background-color: black;
}

.modal {
  position: fixed;
  display: flex;
  align-items: center;
  inset: 0;
}
.modal_title {
  font-weight: 1000;
  font-size: 17px;
  color: red;
}

.modal_content {
  bottom: 4rem;
  height: auto;
  position: relative;
  z-index: 50;
  width: 600px;
  min-width: 370px;
  border-radius: 5px;
  background: #fff;
  margin: auto;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.modal_header {
  display: flex;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  height: 45px;
  font-weight: 1000;
  background-color: rgb(223, 215, 215);
}

.modal_close {
  padding: 10px;
  cursor: pointer;
  font-size: 25px;
}

.modal_body {
  padding: 10px;
  text-align: justify;
}

.modal_footer {
  border-top: 2px solid #eee;
  text-align: left;
  position: absolute;
  bottom: 1rem;
}

.form-group {
  text-align: left;
}
.sendButton {
  position: relative;
  text-align: right;
}

.bottom {
  margin-top: 20px;
  text-align: left;
}
.fonttxt {
  font-family: 'adobe-clean', sans-serif;
  color: rgb(109, 106, 106);

  padding: 0px 10px;
}
</style>
