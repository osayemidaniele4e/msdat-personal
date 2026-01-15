<template>
  <div>
    <div v-for="(dataSource, index) in dataSources" :key="index">
      <h6 class="mb-2">{{ dataSource.classification }}</h6>
      <div class="row d-flex justify-content-between align-items-center">
        <b-form-select
          :key="index"
          :options="dataSource.indicators"
          :value="selected"
          value-field="id"
          text-field="datasource"
        ></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
import { groupIndicator } from '@/util/helper';

export default {
  data() {
    return {
      dataSources: [],
      selected: null,
    };
  },
  mounted() {
    this.dataSources = groupIndicator(this.dlDatasource, 'classification');
  },
};
</script>
<style scoped>
</style>
