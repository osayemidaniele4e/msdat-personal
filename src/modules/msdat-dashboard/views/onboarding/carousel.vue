<template>
  <div class="">
    <carousel
      :items="1"
      :margin="10"
      :autoplay="false"
      :autoplayTimeout="5000"
      :rewind="false"
      :dots="true"
      :nav="false"
      :lazyLoad="true"
      :touchDrag="false"
      :mouseDrag="false"
      >
      <!-- :navText="owlNavText" -->
      <section>
        <div class="mx-4 mt-5">
          <img :src="pic1" alt="first image" />
        </div>
        <div class="mx-5">
          <h3 class="mt-5">Sections</h3>
          <p class="mb-0">
            This Platform contains <strong>six main sections.</strong>
          </p>
          <p>
            Each section allows you to carry out analysis with ease in relation
            to the title section
          </p>
        </div>
      </section>
      <section>
        <div class="mx-4 my-5">
          <img :src="pic2" alt="second image" />
        </div>
        <div class="mx-5">
          <h3>Controls</h3>
          <p>
            The function of the platform is managed with this
            <strong>control panel</strong>. <br />
            The user is able to select different variables and change the state
            of<br />
            the platform.<strong>
              The control also changes with respect to section</strong
            >
          </p>
        </div>
      </section>
      <section>
        <div class="mx-5 my-3">
          <img :src="pic3" alt="third image" height="250px" />
        </div>
        <div class="mx-3">
          <h3>Indicator Overview</h3>
          <p>Gives an overall view on the key health indicators</p>
        </div>
      </section>
      <section>
        <div class="mt-4 mx-4">
          <img :src="pic4" alt="fourth image" height="250px" />
        </div>
        <div class="mx-3 mt-4">
          <h3>Zonal Analysis</h3>
          <p class="mb-0">
            Shows the zonal distribution of key health indicators in the country
          </p>
        </div>
      </section>
      <section>
        <div class="mt-4 mx-4">
          <img :src="pic5" alt="fifth image" height="250px" />
        </div>
        <div class="mx-3 mt-5">
          <h3>Indicator Comparison</h3>
          <p>Allows for comparison of related indicators over a period</p>
        </div>
      </section>
      <section class="ml-3 mr-3">
        <div class="mt-4 mx-4">
          <img :src="pic6" alt="sixth image" height="250px" />
        </div>
        <div class="mx-3 mt-4">
          <h3>Dataset Comparison</h3>
          <p>Comparison of different sources of an indicator across states</p>
        </div>
      </section>
      <section>
        <div class="mt-4 mx-4">
          <img :src="pic7" alt="seventh image" height="250px" />
        </div>
        <div class="mx-3 mt-4">
          <h3>Multi-source indicator Comparison</h3>
          <p>
            Three modals allowing for comparisons of multiple sources and <br />
            indicators across states or a period
          </p>
        </div>
      </section>
      <section class="ml-3 mr-3">
        <div class="mt-4 mx-4">
          <img :src="pic9" alt="eight image" height="250px" />
        </div>
        <div class="mx-3 mt-4">
          <h3>Disaggregation Section</h3>
          <p>This section gives a deeper insight into indicators and their values</p>
        </div>
      </section>
      <section>
        <img
          :src="pic8"
          alt="ninth image"
          height="250px"
          width="200px"
          class="finalImg mt-2"
        />
        <h3>You're all set</h3>
        <p>
          Please always leave a feedback, help us make the platform more <br />
          effective for your needs
        </p>
        <button @click="close" class="carousel-done">Done</button>
      </section>

      <button slot="prev" class="prev carousel-prev">
        <span>Previous</span>
      </button>

      <button slot="next" class="next carousel-next"><span>Next</span></button>
    </carousel>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel';

const pic1 = require('./assets/onboarding/section1.png');
const pic2 = require('./assets/onboarding/section2.png');
const pic3 = require('./assets/onboarding/section3.png');
const pic4 = require('./assets/onboarding/section4.png');
const pic5 = require('./assets/onboarding/section5.png');
const pic6 = require('./assets/onboarding/section6.png');
const pic7 = require('./assets/onboarding/section7.png');
const pic8 = require('./assets/onboarding/section8.png');
const pic9 = require('./assets/onboarding/section9.png');

export default {
  components: {
    carousel,
  },
  data() {
    return {
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pic7,
      pic8,
      pic9,
    };
  },
  methods: {
    mybtn() {
      this.$emit('translated');
    },
    close() {
      this.$emit('closeOnboard');
    },
  },
  mounted() {
    const remove = document.querySelector('.owl-stage-outer');
    remove.style.overflow = 'visible';
  },
};
</script>

<style>
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

p h2 {
  font-family: Work Sans;
  font-weight: Regular;
  letter-spacing: 0.35px;
}
.carousel-dots {
  position: relative;
}
.carousel-done,
.carousel-done:focus {
  position: relative;
  bottom: -5.5rem;
  left: 0.2rem;
  outline: none;
}
.carousel-next,
.carousel-next:focus {
  position: relative;
  outline: none;
  /* bottom: 70px; */
  left: 0.1rem;
  /* padding: 7px 30px; */
}
.carousel-prev,
.carousel-prev:focus {
  position: absolute;
  bottom: 0.2rem;
  left: 16.2rem;
  background-color: white;
  color: #007d53;
  outline: none;
  bottom: 1rem;
}

.carousel-prev {
  left: 6.8rem;
  bottom: 1rem;
  left: 16.2rem;
}
.onboarding {
  display: flex;
  z-index: 100;
  position: fixed;
  top: 8%;
  left: 25%;
  background: blue;
}

.onboarding__img {
  opacity: 1;
  transition: all 300ms ease-out;
}
.finalImg {
  padding-left: 120px;
  padding-right: 120px;
}
</style>
