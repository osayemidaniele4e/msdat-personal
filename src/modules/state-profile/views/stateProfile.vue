<template>
  <b-container class="overflow-hidden">
    <b-row class="mt-4">
      <b-col cols="auto">
        <div>
          <b-dropdown
            variant="text"
            dropright
            toggle-class="text-decoration-none p-0 m-0 display-block state-select"
            no-caret
          >
            <template #button-content>
              <b-row align-v="center">
                <b-col>
                  <h1>
                    {{ state }}
                  </h1>
                </b-col>
                <b-col>
                  <b-icon style="font-size: 10px; color: #232323;" icon="chevron-down"></b-icon>
                </b-col>
              </b-row>
            </template>
            <b-dropdown-item @click="navigateToState(s)" v-for="s in this.states" :key="s">{{
              s
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
        <h3 style="font-size: 15px">State Health Profile</h3>
      </b-col>
      <b-col class="my-auto">
        <b-row align-h="end" class="mx-auto">
          <p class="mr-3">Last Updated: 12.03.2020</p>
          <share/>
          <print/>
        </b-row>
      </b-col>
    </b-row>
    <hr style="border-top: 1px dashed #CCCCCC;" class="mb-4" />
    <demographics :state="state" :stateDemographics="demographics"></demographics>
    <div class="mt-5" v-for="programArea in programAreas" :key="programArea.name">
      <PAoverview :state="state" :programArea="programArea"></PAoverview>
    </div>
  </b-container>
</template>

<script>
import programAreaOverview from '../components/programAreaOverview.vue';
import demographics from '../components/demographics.vue';
import share from '../components/share.vue';
import print from '../components/print.vue';

export default {
  name: 'state-profile',
  props: [
    'state',
  ],
  components: {
    PAoverview: programAreaOverview,
    demographics,
    share,
    print,
  },
  created() {
  },
  methods: {
    navigateToState(state) {
      this.$router.push({ name: 'state-profile', params: { state } });
      this.$router.go();
    },
  },
  data() {
    return {
      states: ['Kano', 'kanduna', 'Enugu', 'Yola', 'Niger', 'Lagos'],
      demographics: [
        {
          name: 'Population',
          source: 'MNCH 2018',
          value: '6,113,503',
          previousValue: '6,004,642',
          change: '+2',
        },
        {
          name: 'Crude Birth Rate',
          source: 'MNCH 2018',
          value: '60%',
          previousValue: '62%',
          change: '-2',
        },
        {
          name: 'Crude Death Rate',
          source: 'MNCH 2018',
          value: '60%',
          previousValue: '55%',
          change: '+5',
        },
        {
          name: 'Total Fertility Rate (TFR) (total births per woman)',
          source: 'MNCH 2018',
          value: '60%',
          previousValue: '55%',
          change: '+5',
        },
        {
          name: 'Under-5 Population (UFP)',
          source: 'MNCH 2018',
          value: '60%',
          previousValue: '58%',
          change: '+2',
        },
      ],
      programAreas: [
        {
          name: 'REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH',
          icon: 'pregnant',
          detail:
            'This section includes a set of indicators along the continuum of care - from pre-pregnancy to childhood. The graph shows the percentage of the target population receiving coverage for select interventions.',
          sources:
            'Multiple Indicator Cluster Survey (MICS) and Nigeria Demographic and Health Survey (NDHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Coverage for key interventions across the continuum of care',
          colors: ['rgba(238, 150, 50, 1)', 'rgba(238, 150, 50, 0.12)'],
        },
        {
          name: 'nutrition',
          icon: '/img/salad.svg',
          detail:
            'This section includes a set of nutirion indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
          sources: 'Nigeria Demographic and Health Survey (NDHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Coverage for key interventions in Nutrition',
          colors: ['rgba(143, 180, 56, 1)', 'rgba(143, 180, 56, 0.1)'],
        },
        {
          name: 'Immunization',
          icon: 'injection',
          detail:
            'This section includes a set of immunization indicators. The graph shows the percentage of the target population receiving coverage for select interventions. NOTE: sources for each of the indicators in the graph below were selected based on most recent and most reliable estimates.',
          sources:
            'Multiple Indicator Cluster Survey (MICS), Nigeria Demographic and Health Survey (NDHS), and National Nutrition and Health Survey (NNHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Coverage for key interventions in Immunization',
          colors: ['rgba(238, 150, 50, 1)', 'rgba(238, 150, 50, 0.12)'],
        },
        {
          name: 'Malaria',
          icon: 'mosquito',
          detail:
            'This section includes a set of malaria indicators. The graph shows the percentage of the target population receiving coverage for select interventions. NOTE: sources for each of the indicators in the graph below were selected based on most recent and most reliable estimates.',
          sources:
            'Multiple Indicator Cluster Survey (MICS), Nigeria Demographic and Health Survey (NDHS), and National Nutrition and Health Survey (NNHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Coverage for key interventions in Malaria',
          colors: ['rgba(67, 137, 59, 1)', 'rgba(67, 137, 59, 0.1)'],
        },

        {
          name: 'HIV',
          icon: 'ribbon',
          detail:
            'This section includes a set of HIV indicators. The graph shows the percentage of the target population receiving coverage for select interventions. NOTE: sources for each of the indicators in the graph below were selected based on most recent and most reliable estimates.',
          sources:
            'Multiple Indicator Cluster Survey (MICS), Nigeria Demographic and Health Survey (NDHS), and National Nutrition and Health Survey (NNHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Coverage for key interventions in HIV',
          colors: ['rgba(234, 27, 75, 1)', 'rgba(234, 27, 75, 0.1)'],
        },
        {
          name: 'mortality',
          icon: 'patient',
          details:
            'This section includes a set of Mortality indicators. The graph shows the percentage of the target population receiving coverage for select interventions. NOTE: sources for each of the indicators in the graph below were selected based on most recent and most reliable estimates.',
          sources: 'Nigeria Demographic and Health Survey (NDHS)',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: 'Other Mortality Indicators',
          colors: ['rgba(49, 49, 49, 1)', 'rgba(49, 49, 49, 0.1)'],
        },
        {
          name: 'Health Facility Survey',
          icon: 'hospital',
          details:
            'This section includes a set of Health Facility Survey indicators. The graph shows the percentage of the target population receiving coverage for select interventions. NOTE: sources for each of the indicators in the graph below were selected based on most recent and most reliable estimates.',
          sources:
            'Multiple Indicator Cluster Survey (MICS), Nigeria Demographic and Health Survey (NDHS), and National Nutrition and Health Survey (NNHS).',
          definitions: [
            '- Modern contraceptive prevalence: Percentage of women who are married or in union using contraception (modern or traditional) out of all women of reproductive age (WRA)',
            '- Antenatal care 4+ visits: Percentage of women who attended at least four antenatal care visits',
            '- Skilled attendance at delivery or birth: Percentage of live births in the five years preceding survey assisted by a skilled health personnel',
            '- Postnatal care coverage (mother):Percentage of women giving birth in the two years preceding survey who received a postnatal checkup within the first two days after birth',
            '- Children <6 months who were exclusively breastfed: Percentage of infants 0-5 months of age who received only breast milk on the previous day and did not receive any other foods or liquids during the previous day',
            '- DPT3/ Penta 3 coverage rate: Percentage of children 12-23 months who received the third dose of Pentavalent (DPT3) vaccination',
            '- Children with diarrhoea who received treatment: Percentage of children under age five years who had diarrhea in the previous two weeks who received ORS and Zinc',
            '- Vitamin A supplementation coverage: Percentage of children age 6-59 months who received at least one high-dose vitamin A supplement in the six months preceding survey For specific definitions, including numerator and denominator by source, see the Multisource Health Data Analytics Dashboard for details (https://msdat.fmohconnect.gov.ng).',
          ],
          chartTitle: '',
          colors: ['rgba(5, 146, 189, 1)'],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.state-select {
  color: #3a3a3a;
}
.btn:focus {
  box-shadow: none;
}
h3 {
  font-size: 20px;
}
h2 {
  font-weight: bold;
  font-size: 21px;
}
h1 {
  font-size: 56px;
}
.btn-secondary {
  background-color: #f2f2f2;
  border: 1px solid #cccccc;
  height: 38.250103125px;
  color: #3a3a3a;
}
.program-icon {
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  height: 84px;
  width: 84px;
}
</style>
