<template>
  <b-card class="shadow-sm testimonial-card h-100" :class="current ? 'bg-lightblue' : 'bg-light'">
    <b-card-body class="d-flex flex-column h-100">
      <div class="py-4 card-text flex-grow-1">"{{ testimonial.text }}"</div>
      <div class="mt-auto">
        <hr class="mb-3" />
        <div class="mb-3 username text-left">{{ testimonial.username }}</div>
        <Ratings :value="testimonial.rating" :size="1.3" :spacing="5" disabled class="text-left" />
      </div>
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
.testimonial-card {
  font-size: 140%;
  font-weight: 400;
  min-height: 400px;
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
