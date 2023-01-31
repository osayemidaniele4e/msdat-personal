<template>
  <div class="row">
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Datasource</label>
        <multiselect
          v-model="DSValue"
          :options="DSList"
          placeholder="Pick a value"
          label="name"
          searchable
          close-on-select
          :hide-selected="true"
          @select="dispatchDataSource"
          selectLabel=""
          :loading="DSLoading"
        />
      </div>
    </div>
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Period</label>
        <multiselect v-model="periodValue" :options="options"></multiselect>
      </div>
    </div>
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Value Type</label>
        <multiselect v-model="typeValue" :options="options"></multiselect>
      </div>
    </div>
    <!-- -------- -->
    <div class="col-md-3 mb-3">
      <div class="form-group">
        <label for="period">Location</label>
        <multiselect v-model="LocValue" :options="options"></multiselect>
      </div>
    </div>
    <!-- -------- -->
  </div>
</template>

<script lang="js">
import { getDataSources, getPeriodsByDs } from '../services';

export default {
  name: 'panel',
  data() {
    return {
      options: ['list', 'of', 'options'],
      DSValue: '',
      periodValue: '',
      typeValue: '',
      LocValue: '',
      DSList: [],
      periodList: [],
      DSLoading: false,
    };
  },
  methods: {
    async dispatchDataSource() {
      if (this.DSValue?.id !== undefined) {
        this.periodList = await getPeriodsByDs(this.DSValue.id);
      }
    },
  },
  async mounted() {
    this.DSLoading = true;
    this.DSList = await getDataSources();
    this.DSLoading = false;
  },
};
</script>
