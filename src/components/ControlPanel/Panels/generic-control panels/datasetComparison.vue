<template>
  <div class="d-flex">
    <!-- Indicator here -->
    <div class="d-flex flex-column w-30 ml-3">
      <label class="panel-label">indicator</label>

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

    <!-- Data sources here -->
    <div class="d-flex flex-column w-30 ml-3">
      <label class="panel-label">data sources</label>

      <div>
        <multiselect
          v-model="payload.data"
          :options="dataSources"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :max="3"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="false"
        >
        </multiselect>
      </div>
    </div>

    <!-- Targets here -->
    <div class="d-flex flex-column w-20 ml-3">
      <label class="panel-label">Targets</label>

      <div class="d-flex">
        <!-- National Target here -->
        <div class="d-flex">
          <CCheckbox />
          <p class="check-label ml-1">National</p>
        </div>

        <!-- SDG Target here -->
        <div class="d-flex ml-3">
          <CCheckbox />
          <p class="check-label ml-1">SDG</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import CCheckbox from '@/components/generic/checkbox.vue';

export default {
  data() {
    return {
      activetab: 1,

      payload: {
        data: [],
        indicator: '',
      },
      indicatorOptions: [
        'MORTALITY',
        'INFANT MORTALITY RATE',
        'MATERNAL MORTALITY RATIO',
        'UNDER 5 MORTALITY RATE',
        'NEONATAL MORTALITY RATE',
        'RMNCH + N',
        'SKILLED ATTENDANCE AT DELIVERY OR BIRTH',
        'ANC COVERAGE (AT LEAST 1 VISIT)',
        'ANC COVERAGE (4 VISITS)',
        'CONTRACEPTIVE PREVALENCE RATE',
      ],

      dataSources: [
        { name: 'MICS' },
        { name: 'MICS 2016' },
        { name: 'MICS 2011' },
        { name: 'MICS 2007' },
        { name: 'MICS 199' },
        { name: 'NHMIS' },
        { name: 'NHMIS 2017' },
        { name: 'NHMIS 2016' },
        { name: 'NHMIS 2015' },
        { name: 'NHMIS 2014' },
      ],
    };
  },
  components: { Multiselect, CCheckbox },
};
</script>

<style scoped>
.w-30 {
  width: 421px;
}

.check-label {
  font-size: 0.875rem;
  color: #171717;
  opacity: 0.87;
}
</style>
