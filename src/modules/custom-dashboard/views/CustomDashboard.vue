<template>
  <b-container class="text-justify px-5 pb-5">
    <h1>Custom Dashboard</h1>
    <template v-if="showDashboardOverview">
      <h2
        style="
          background: #035c6e;
          width: 100%;
          color: #ffffff;
          font-size: 20px;
          padding-left: 30px;
        "
      >
        Dashboard Overview
      </h2>
      <the-table :values="TableValues" />
    </template>
    <template v-if="showZonalAnalysis">
      <h2
        style="
          background: #035c6e;
          width: 100%;
          color: #ffffff;
          font-size: 20px;
          padding-left: 30px;
        "
      >
        Zonal Analysis
      </h2>
    </template>
    <template v-if="showMultiSource">
      <h2
        style="
          background: #035c6e;
          width: 100%;
          color: #ffffff;
          font-size: 20px;
          padding-left: 30px;
        "
      >
        MultiSource Comparison
      </h2>
    </template>
    <template v-if="showMultiData">
      <h2
        style="
          background: #035c6e;
          width: 100%;
          color: #ffffff;
          font-size: 20px;
          padding-left: 30px;
        "
      >
        Multi-Data Comparison
      </h2>
    </template>
  </b-container>
</template>

<script>
import TheTable from '../../msdat-dashboard/components/sections/TheTable.vue';

export default {
  components: {
    TheTable,
  },
  data() {
    return {
      showDashboardOverview: true,
      showZonalAnalysis: true,
      showMultiSource: true,
      showMultiData: true,
      TableValues: {
        indicator: {
          id: 5,
          full_name: 'ANC Coverage (at least 1 visit)',
          short_name: 'ANC Coverage (at least 1 visit)',
          desirable_slope: 'Positive',
          indicator_type: 'Outcome',
          program_area: 'RMNCH',
          national_target: null,
          national_source: null,
          national_information: null,
          sdg_target: null,
          sdg_information: null,
          first_related: 6,
          second_related: 7,
          third_related: 8,
          fourth_related: null,
          created_at: null,
          updated_at: null,
          factor: 2,
          group: [],
        },
        location: {
          id: 1,
          name: 'Nigeria',
          parent: 1,
          created_at: null,
          updated_at: null,
          level: 1,
        },
        datasource: {
          id: 4,
          datasource: 'NMIS',
          full_name: 'Nigeria Malaria Indicator Survey',
          description:
            'Nigeria Malaria Indicator Survey is a survey conducted with the primary objectives of providing information on malaria indicators and malaria prevalence at the national level and also in each of the 36 states of the country and the Federal Capital Territory',
          year_available: '2010, 2015',
          period_available: '2018/2019',
          methodology:
            'A nationally representative survey conducted among all  women aged 15-49 in these households were eligible for individual interviews. Respondents are asked questions about malaria prevention during pregnancy and treatment of fever among their children. Children age 6 to 59 months were tested for anaemia and malaria using finger- or heel-prick blood samples. Thick blood smears and thin films were made in the field for malaria diagnosis. Microscopy was performed to determine the presence of malaria parasites and to identify the parasite species, with slide validation carried out. The sampling frame used was the 2006 National Population and Housing Census (NPHC) of the Federal Republic of Nigeria, conducted by the National Population Commission',
          subnational_data: 'Yes',
          classification: 'Survey',
          created_at: null,
          updated_at: null,
          group: [],
        },
        year: '',
        compareBy: '',
        visualization: 'state_map',
        target: { national: false, sdg: false },
        numdenum: false,
      },
    };
  },
};
</script>
