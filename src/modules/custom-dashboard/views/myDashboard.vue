<template>
  <div>
    <stepper/>
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
    return {

    };
  },
};
</script>

<style></style>
