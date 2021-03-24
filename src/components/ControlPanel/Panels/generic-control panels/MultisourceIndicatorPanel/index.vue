<template>
  <div>
    <div class="row">
      <!-- Indicator one here -->
      <div class="col-lg-4 border-r">
        <indicator1 text="INDICATOR 1"  />
      </div>

   <div class="col-lg-4 border-r">
        <indicator1 text="INDICATOR 2"  />
      </div>

     <div class="col-lg-4 border-r">
        <indicator1 text="INDICATOR 3"  />
      </div>
    </div>
  </div>
</template>

<script>
import indicator1 from './indicator-1.vue';

export default {
  components: {
    indicator1,
  },

};
</script>
<style scoped>
.border-r {
  border-right: 3px solid #ebebeb;
}
</style>
