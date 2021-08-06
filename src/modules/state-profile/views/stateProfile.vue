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
      <b-col cols="12" class="my-auto">
        <b-row align-h="end" class="mx-auto">
          <p class="mr-3">Last Updated: 12.03.2020</p>
          <share />
          <print />
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
import { mapState } from 'vuex';
// import { StateProfileDashboard } from '@/config/dashboardGroups';
import programAreaOverview from '../components/programAreaOverview.vue';
import demographics from '../components/demographics.vue';
import share from '../components/share.vue';
import print from '../components/print.vue';
import dataMixins from '../../DataLayer/mixin';

export default {
  name: 'state-profile',
  props: ['state'],
  mixins: [dataMixins],
  components: {
    PAoverview: programAreaOverview,
    demographics,
    share,
    print,
  },
  created() {},
  computed: {
    ...mapState([]),
    states() {
      const allLocations = this.$store.state.DL.location;
      const states = [];
      allLocations.map(el => {
        if (el.level == 3) {
          states.push(el.name);
        }
      });
      // console.log(states)

      return states;
    },
  },
  methods: {
    navigateToState(state) {
      // state.preventDefault()
      this.$router.push({ name: 'state-profile', params: { state } });
      this.$router.go();
    },
  },
  data() {
    return {

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
          value: '5.80',
          previousValue: '5.6',
          change: '-2',
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
          colors: [
            '#EBF4F1',
            '#054A80',
            '#2C8CCA',
            '#3F7299',
            '#43893B',
            '#2C9F35',
            'rgba(238, 150, 50, 1)',
            'rgba(238, 150, 50, 0.12)',
          ],
          specificIndicators: [
            {
              indicator: 4,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 5,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 7,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 8,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
            },
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 10,
              dataSource: 5,
              year: 2018,
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
            },
          ],
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
          colors: ['#F4F7EA', '#8FB438', '#8FB438', '#8FB438', '#8FB438', '#8FB438'],
          specificIndicators: [
            {
              indicator: 14,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 15,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 16,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
            },
          ],
        },
        {
          name: 'Immunization',
          icon: 'injection',
          detail:
            'This section includes a set of immunization indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
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
          colors: ['#FBF0E4', '#EE9632', '#EE9632', '#EE9632', '#EE9632', '#EE9632'],
          specificIndicators: [
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 20,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 21,
              dataSource: 2,
              year: 2018,
            },
          ],
        },
        {
          name: 'Malaria',
          icon: 'mosquito',
          detail:
            'This section includes a set of malaria indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
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
          colors: ['#ECF3EB', '#43893B', '#43893B', '#43893B', '#43893B', '#43893B'],
          specificIndicators: [
            {
              indicator: 22,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 23,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 24,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
            },
          ],
        },

        {
          name: 'HIV',
          icon: 'ribbon',
          detail:
            'This section includes a set of HIV indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
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
          colors: ['#FBE5EA', '#EA1B4B', '#EA1B4B', '#EA1B4B', '#EA1B4B', '#EA1B4B'],
          specificIndicators: [
            {
              indicator: 26,
              dataSource: 16,
              year: 2019,
            },
            {
              indicator: 27,
              dataSource: 1,
              year: 2016,
            },
            {
              indicator: 28,
              dataSource: 5,
              year: 2018,
            },
          ],
        },
        {
          name: 'mortality',
          icon: 'patient',
          details:
            'This section includes a set of Mortality indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
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
          colors: ['#EAEAEA', '#313131', '#313131', '#313131', '#313131', '#313131'],
          specificIndicators: [
            {
              indicator: 29,
              dataSource: 6,
              year: 2019,
            },
            {
              indicator: 30,
              dataSource: 1,
              year: 2016,
            },
            {
              indicator: 31,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 32,
              dataSource: 2,
              year: 2018,
            },
          ],
        },
        {
          name: 'Health Facility Survey',
          icon: 'hospital',
          details:
            'This section includes a set of Health Facility Survey indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
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
          specificIndicators: [
            {
              indicator: 4,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 5,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 7,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 8,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
            },
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
            },
            {
              indicator: 10,
              dataSource: 5,
              year: 2018,
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
            },
          ],
        },
      ],
    };
  },
  mounted() {

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
.program-icon {
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  height: 84px;
  width: 84px;
}
</style>
