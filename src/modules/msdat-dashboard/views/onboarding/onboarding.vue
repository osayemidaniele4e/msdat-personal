<template>
  <div>
    <Modal
      :noBackdrop="true"
      :showBackground="background"
      @clickHide="close"
      showCloseButton
    >
      <div class="onboarding__bg">
        <div v-show="onboarding1st" class="onboarding__body">
          <div class="onboarding__img-container my-5 pt-4">
            <img
              :src="launchImg"
              alt="first_img"
              class="onboarding__img"
              width="250px"
            />
          </div>
          <h2 class="text" @click="removeBackground">Welcome to MSDAT V2.0</h2>
          <p class="text">Get analysis of health indicators easily</p>
          <button @click="onboarding1st = !onboarding1st">
            Start Tutorial
          </button>
          <br />
          <button @click="close" class="bg-white skip">Skip</button>
        </div>
        <Carousel v-show="!onboarding1st" v-on:closeOnboard="close"> </Carousel>
      </div>
    </Modal>
  </div>
</template>

<script>
import Carousel from './carousel.vue';
import Modal from './modal.vue';

const aboutImg = require('./assets/About-Dashboard-image.svg');
const launchImg = require('./assets/launch-new.png');

export default {
  components: {
    Carousel,
    Modal,
  },
  data() {
    return {
      aboutImg,
      launchImg,
      onboarding1st: true,
      background: true,
    };
  },
  methods: {
    removeBackground() {
      this.background = true;
    },
    close() {
      this.background = true;
      this.$emit('closeOnboard');
    },
  },
};
</script>

<style  scoped >
.text {
  font-family: 'Work Sans', sans-serif;
}

body {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

button {
  position: relative;
  color: white;
  background-color: #007d53;
  border-radius: 3px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  padding: 13px 20px;
  margin: 1px;
  outline: none;
}
button:active {
  outline: none;
  border: none;
}
.skip {
  outline: none;
  color: #007d53;
}

p {
  font: normal normal medium 35px/42px Work Sans;
  letter-spacing: 0.35px;
}
.darkScreen {
  position: absolute;
  z-index: 30;
  inset: 0;
  height: 200rem;
  opacity: 0.5;
  background-color: black;
}
.onboarding {
  display: flex;
  z-index: 100;
  position: fixed;
  top: 8%;
  left: 25%;
  background: blue;
}
.onboarding__bg {
  margin-left: 8px;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  width: 600px;
  height: 550px;
  z-index: 200;
  background: #fff;
  overflow: hidden;
}
@media only screen and (max-width: 600px) {
  .onboarding__bg {
    height: 600px;
    width: 300px;
  }
  .onboarding {
    left: 15%;
  }

  .btn-skip {
    position: relative;
    bottom: -7.5rem;
  }
}

.onboarding__img {
  opacity: 1;
  transition: all 300ms ease-out;
}
</style>
