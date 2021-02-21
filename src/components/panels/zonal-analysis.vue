<template>
  <div class="d-flex">
    <!-- Indicator here -->
    <div class="d-flex flex-column w-30">
      <label class="panel-label">Indicator</label>

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
    <div class="d-flex flex-column w-20 ml-3">
      <label class="panel-label">location</label>

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
      value: [],
      payload: {
        indicator: '',
        location: '',
        data: '',
        year: '',
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
        'MICS',
        'NNHS',
        'NDHS',
        'NARHS',
        'World Bank',
        'WHO-GHO',
        'WUENIC',
      ],
      yearOptions: [
        'Latest Available',
        '2017',
        '2016',
        '2014',
        '2013',
        '2012',
        '2011',
      ],

      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
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
.w-25 {
  width: 25px;
}
.check-label {
  font-size: 0.875rem;
  color: #171717;
  opacity: 0.87;
}
</style>
