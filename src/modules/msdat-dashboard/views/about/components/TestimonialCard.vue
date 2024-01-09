<template>
  <b-card class="shadow-sm ratio ratio-1x1" :class="current ? 'bg-lightblue' : 'bg-light'">
    <b-card-body>
      <div class="py-5 my-5 card-text">"{{ testimonial.text }}"</div>
      <hr class="mb-3" />
      <div class="mb-3 username text-left">{{ testimonial.username }}</div>
      <Ratings :value="testimonial.rating" :size="1.3" :spacing="5" disabled class=" text-left" />
    </b-card-body>
  </b-card>
</template>

<script>
import Ratings from '@/components/Ratings.vue';

export default {
  data() {
    return {};
  },
  components: {
    Ratings,
  },
  props: {
    testimonial: {
      type: Object,
      required: true,
    },
    current: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.card {
  font-size: 140%;
  font-weight: 400;
}
.card-text {
  text-align: center;
  line-height: 2.5;
}
.username {
  font-weight: 500;
}
.bg-lightblue {
  background-color: #dff3f3;
}
</style>
