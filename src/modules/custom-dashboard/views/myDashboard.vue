<!-- Auther: Ghufran Ahmed -->
<template>
  <div>
    <div
      v-if="
        $route.name === 'preference-table' ||
        $route.name === 'my-dashboard-details' ||
        $route.name === 'data-table' ||
        $route.name === 'sections'
      "
    >
      <stepper />
    </div>
    <router-view class="mt-5" />
  </div>
</template>

<script>
import stepper from '../components/stepper.vue';

export default {
  components: {
    stepper,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
