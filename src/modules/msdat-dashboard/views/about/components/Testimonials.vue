<template>
  <b-container fluid class="box">
    <h2>WHAT OUR USERS SAY</h2>
    <span class="top-text">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod <br>
      tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    </span>
    <router-link to="/testimonials" class="btn btn-primary rounded-0 m-5 px-5"><span class="px-3">View All</span></router-link>
    <div class="position-relative" style="z-index: 0; width: 1150px">
      <button
        class="btn btn-outline-primary arrow left"
        @click="$refs.carousel.prev()"
      >
        <b-icon icon="chevron-left" font-scale="3"></b-icon>
      </button>
      <button
        class="btn btn-outline-primary arrow right"
        @click="$refs.carousel.next()"
      >
        <b-icon icon="chevron-right" font-scale="3"></b-icon>
      </button>
      <el-carousel
        :interval="4000"
        arrow="never"
        :autoplay="false"
        indicator-position="none"
        type="card"
        height="650px"
        :initial-index="1"
        ref="carousel"
        @change="currentCard = $event"
      >
        <el-carousel-item v-for="(testimonial, ind) in testimonials" :key="ind">
          <div class="h-100 d-flex align-items-center">
            <TestimonialCard :testimonial="testimonial" :current="currentCard == ind" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </b-container>
</template>

<script>
import TestimonialCard from './TestimonialCard.vue';

export default {
  data() {
    return {
      testimonials: [
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          username: 'Neo Amadi',
          rating: 3,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          username: 'Neo Amadi',
          rating: 4,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          username: 'Neo Amadi',
          rating: 4,
        },
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          username: 'Neo Amadi',
          rating: 5,
        },
      ],
      currentCard: 1,
    };
  },
  components: {
    TestimonialCard,
  },
  mounted() {
    console.log(this.$refs.carousel);
  },
};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1400px;
  overflow-x: auto;
}
.box h2 {
  font-weight: bold;
  padding: 1rem;
}
.top-text {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 400
}
.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 64px;
  width: 64px;
}
.arrow.left {
  left: -84px;
}
.arrow.right {
  right: -84px;
}
</style>
