<template>
  <div class="d-flex">
    <!-- Compare by here -->
    <div class="d-flex flex-column w-10">
      <label class="panel-label">compare by</label>

      <div>
        <multiselect
          v-model="payload.indicator"
          :options="compareOptions"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- Data sources here -->
    <div class="d-flex flex-column w-20 ml-3">
      <label class="panel-label">data sources</label>

      <div>
        <multiselect
          v-model="payload.data"
          :options="dataSources"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :preselect-first="true"
        ></multiselect>
      </div>
    </div>

    <!-- year here -->
    <div class="d-flex flex-column w-20 ml-3">
      <label class="panel-label">year</label>

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

    <!-- Indicator here -->
    <div class="d-flex flex-column w-30 ml-3">
      <label class="panel-label">Indicator</label>

      <div>
        <multiselect
          v-model="payload.value"
          :options="indicatorOptions"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :max=2
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
        compareBy: '',
        data: '',
        year: '',
        indicator: '',
        value: [],
      },
      compareOptions: ['Period', 'States'],

      locationOptions: [
        'National',
        'Abia',
        'Adamamwa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Benue',
        'Borno',
      ],
      dataSources: [
        'NHMIS',
        'MICS',
        'NNHS',
        'NDHS',
        'NARHS',
        'World Bank',
        'WHO-GHO',
        'WUENIC',
      ],
      yearOptions: ['2017', '2016', '2014', '2013', '2012', '2011'],

      indicatorOptions: [
        { name: 'MORTALITY' },
        { name: 'INFANT MORTALITY RATE' },
        { name: 'MATERNAL MORTALITY RATIO' },
        { name: 'UNDER 5 MORTALITY RATE' },
        { name: 'NEONATAL MORTALITY RATE' },
        { name: 'RMNCH + N' },
        { name: 'SKILLED ATTENDANCE AT DELIVERY OR BIRTH' },
        { name: 'ANC COVERAGE (AT LEAST 1 VISIT)' },
        { name: 'ANC COVERAGE (4 VISITS)' },
        { name: 'CONTRACEPTIVE PREVALENCE RATE' },
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
.w-20 {
  width: 200px;
}
.w-10{
    width: 120px;
}
.w-25 {
  width: 25px;
}
.check-label {
  font-size: 0.875rem;
  color: #171717;
  opacity: 0.87;
}
</style>
