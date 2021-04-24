<template>
    <div class="row">
    <div class="col-md-4">
      <label class="text-uppercase font-weight-bold">Indicator</label>

      <div>
        <multiselect
          v-model="payload.indicator"
          :options="indicatorOptions"
          :searchable="true"
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
          :searchable="true"
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
          :searchable="true"
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
    <!-- Toggle here -->
    <div class="col">
      <label></label>
      <div class="d-flex align-items-center">
        <toggle @change="payload.numdenum = $event" class="" />
        <p class="px-4 numerator align-items-center">Numerator/ Denominator</p>
      </div>
    </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import BaseCheckbox from '@/components/ControlPanel/components/checkbox.vue';
import ControlMixins from '@/components/ControlPanel/ControlMixins';
import toggle from '@/components/ControlPanel/components/toggle-switch.vue';

export default {
  mixins: [ControlMixins],
  components: { Multiselect, BaseCheckbox, toggle },
};
</script>

<style scoped>

</style>
