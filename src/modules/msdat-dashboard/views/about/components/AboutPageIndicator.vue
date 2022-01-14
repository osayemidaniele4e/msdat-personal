<template>
  <div class="row d-flex justify-content-between align-items-center">
    <div class="col-3" v-for="(indicator, index) in indicators" :key="index">
      <label for="">{{ indicator.program_area }}</label>
      <b-form-select
        :key="index"
        :options="indicator.indicators"
        :value="selected"
        value-field="id"
        text-field="short_name"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
import { groupIndicator } from '@/util/helper';

export default {
  data() {
    return {
      indicators: [],
      selected: 1,
    };
  },
  mounted() {
    this.indicators = groupIndicator(this.dlIndicator, 'program_area');
  },
};
</script>
<style scoped>
</style>
