<template>
  <div class="row">
    <!-- Indicator here -->
    <div class="col-md-5">
      <label class="h6 text-uppercase work-sans">indicator</label>
      <div>
        <multiselect
          v-model="payload.indicator"
          :options="indicatorOptions"
           track-by="id"
           label="short_name"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Data sources here -->
    <div class="col-md-5">
    <label class="h6 text-uppercase work-sans">data sources</label>
      <div>
        <multiselect
          v-model="payload.data"
          :options="dataSourceOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :max="3"
          placeholder="Pick some"
          track-by="id"
          label="datasource"
          :preselect-first="false"
        >
        </multiselect>
      </div>
    </div>

    <!-- Targets here -->
    <div class="col">
      <label class="h6 text-uppercase work-sans">Targets</label>

      <div class="d-flex">
        <!-- National Target here -->
        <div class="d-flex">
          <BaseCheckbox @input="payload.target.national = $event" />
          <p class="check-label ml-1">National</p>
        </div>

        <!-- SDG Target here -->
        <div class="d-flex ml-3">
          <BaseCheckbox  @input="payload.target.sdg = $event" />
          <p class="check-label ml-1">SDG</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import ControlMixins from '@/components/ControlPanel/ControlMixins';
// import toggle from '@/components/generic/toggle-switch.vue';

export default {
  mixins: [ControlMixins],
  components: { Multiselect, BaseCheckbox },
};
</script>

<style scoped>

</style>
