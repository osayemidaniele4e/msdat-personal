<template>
  <div>
    <div class="row">
      <!-- Indicator one here -->
      <div class="col-lg-4 border-r">
        <indicator1 />
      </div>

      <div class="col-lg-4 border-r">
        <indicator2 />
      </div>

      <div class="col-lg-4">
        <indicator3 />
      </div>
    </div>
  </div>
</template>

<script>
import indicator1 from './indicator-1.vue';
import indicator2 from './indicator-2.vue';
import indicator3 from './indicator-3.vue';

export default {
  components: {
    indicator1,
    indicator2,
    indicator3,
  },
};
</script>
<style scoped>
.border-r {
  border-right: 3px solid #ebebeb;
}
</style>
