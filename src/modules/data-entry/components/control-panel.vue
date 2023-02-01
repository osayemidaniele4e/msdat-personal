<template>
  <div class="row">
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Datasource</label>
        <multiselect v-model="value" :options="options"></multiselect>
      </div>
    </div>
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Period</label>
        <multiselect v-model="value" :options="options"></multiselect>
      </div>
    </div>
 <!-- -------- -->
 <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Value Type</label>
        <multiselect v-model="value" :options="options"></multiselect>
      </div>
    </div>
   <!-- -------- -->
   <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Location</label>
        <multiselect v-model="value" :options="options"></multiselect>
      </div>
    </div>
    <!-- -------- -->
  </div>
</template>

<script lang="js">

export default {
  name: 'panel',
  data() {
    return {
      options: ['list', 'of', 'options'],
    };
  },
};
</script>
