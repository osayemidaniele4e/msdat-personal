<template>
  <div class="row">
    <!-- Indicator here -->
    <div class="col-md-4">
      <label class="text-uppercase font-weight-bold">Indicator</label>

      <div>
        <multiselect
          v-model="payload.indicator"
          :options="indicatorOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Location here -->
    <div class="col">
      <label class="text-uppercase font-weight-bold">location</label>

      <div>
        <multiselect
          v-model="payload.location"
          :options="locationOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Data sources here -->
    <div class="col">
      <label class="text-uppercase font-weight-bold">data sources</label>

      <div>
        <multiselect
          v-model="payload.data"
          :options="dataSourceOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- year here -->
    <div class="col">
      <label class="text-uppercase font-weight-bold">year</label>

      <div>
        <multiselect
          v-model="payload.year"
          :options="yearOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Targets here -->
  <div class="col">
      <label class="text-uppercase font-weight-bold">Targets</label>

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

export default {
  mixins: [ControlMixins],
  components: { Multiselect, BaseCheckbox },
};
</script>

<style scoped>

</style>
