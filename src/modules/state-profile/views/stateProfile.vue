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
    <demographics 
      :state="state"
     :lgas='lgaNames'
      :stateDemographics="demographics"
      ></demographics>
    <!-- <PAoverview :state="state" :programArea="programAreas[0]"></PAoverview> -->
    <div class="mt-5" v-for="programArea in programAreas" :key="programArea.name">
      <PAoverview :state="state" :programArea="programArea"></PAoverview>
    </div>
     <p class="text-center final-text">This state profile dashboard has been curated majorly from the MSDAT Dashboard available at <span><a href="https://www.msdat.fmohconnect.gov.ng" target='_blank'>msdat.fmohconnect.gov.ng</a></span></p>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import { StateProfileDashboard } from '@/config/dashboardGroups';
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
    allLocations() {
      return this.$store.state.DL.location;
    },
    states() {
      // Dynamically populating the list
      // of states in the dropdown
      const states = [];
      this.allLocations.map((el) => {
        if (el.level == 3) {
          states.push(el.name);
        }
      });
      // console.log(states)

      return states;
    },
    lgaNames() {
      const chosenState = this.allLocations.filter((el) => el.name.includes(this.state) && el.level == 3)[0];
      const lgaObjects = this.allLocations.filter((val) => val.parent == chosenState?.id && val.level == 4);
      return lgaObjects;
    },
  },
  methods: {
    navigateToState(state) {
      // state.preventDefault()
      this.$router.push({ name: 'state-profile', params: { state } });
      // this.$router.go();
    },
    async getHealthFacilityData() {
      const facilityDataIndicators = [34, 58, 61, 39, 41, 49, 50];
      const allData = [];
      let data;
      // facilityDataIndicators.map(async el => {
      //    data = await this.dlQuery({
      //     datasource: 4,
      //     //indicator: el,
      //    // period: 2016,
      //   });
      //   console.log(data)
      // })
      data = await this.dlQuery({
        datasource: 19,
        // indicator: 34,
        // period: 2018
      });

      console.log({ data });
    },
  },
  watch: {

  },
  data() {
    return {

      demographics: [
        {
          name: 'Population estimate',
          indicatorId: 63,
          source: 'DSB',
          sourceId: 19, // available
          year: 2018,
          value: 6113503,
          previousValue: 6004642,
          previousYear: 2015,
          change: '+2',
        },
        {
          name: 'Population growth rate',
          indicatorId: 64,
          source: 'NPE',
          sourceId: 2, // NOT KNOWN YET
          year: 2018,
          value: '60%',
          previousValue: '62%',
          previousYear: 2015,
          change: '-2',
        },
        {
          name: 'Total Fertility Rate',
          indicatorId: 1, // availablex
          source: 'NDHS',
          sourceId: 2,
          year: 2018,
          value: '5.80',
          previousValue: '5.6',
          previousYear: 2015,
          change: '-2',
        },
        {
          name: 'Dependency ratio',
          indicatorId: 67,
          source: 'NLSS',
          sourceId: 20,
          year: 2018,
          value: '60%',
          previousValue: '58%',
          previousYear: 2015,
          change: '+2',
        },
        {
          name: 'Birth registration (Under Age 1)',
          indicatorId: 68, // AVAILABLE
          source: 'DSB',
          sourceId: 19,
          year: 2018,
          value: '60%',
          previousYear: 2015,
          previousValue: '55%',
          change: '+5',
        },
        {
          name: 'Population Who Have Never Attended School',
          indicatorId: 70,
          source: 'NLSS',
          sourceId: 20,
          year: 2018,
          previousYear: 2015,
          value: '60%',
          previousValue: '55%',
          change: '+5',
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
              color: '#054a80'
            },
            {
              indicator: 5,
              dataSource: 2,
              year: 2018,
              color: '#2c8cca'
            },
            {
              indicator: 7,
              dataSource: 2,
              year: 2018,
              color: '#3f7299'
            },
            {
              indicator: 8,
              dataSource: 2,
              year: 2018,
              color: '#43893b'
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
              color: '#2c9f35'
            },
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
              color: '#2c9f35'
            },
            {
              indicator: 10,
              dataSource: 5,
              year: 2018,
               color: '#8fb438'
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
               color: '#8fb438'
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
              color: '#8fb438'
            },
            {
              indicator: 15,
              dataSource: 2,
              year: 2018,
               color: '#8fb438'
            },
            {
              indicator: 16,
              dataSource: 2,
              year: 2018,
               color: '#8fb438'
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
               color: '#8fb438'
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
              color: '#EE9632'
            },
            {
              indicator: 20,
              dataSource: 2,
              year: 2018,
               color: '#EE9632'
            },
            {
              indicator: 21,
              dataSource: 2,
              year: 2018,
               color: '#EE9632'
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
              color: '#43893B'
            },
            {
              indicator: 23,
              dataSource: 2,
              year: 2018,
               color: '#43893B'
            },
            {
              indicator: 24,
              dataSource: 2,
              year: 2018,
               color: '#43893B'
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
               color: '#43893B'
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
              color: '#EA1B4B'
            },
            {
              indicator: 27,
              dataSource: 1,
              year: 2016,
              color: '#EA1B4B'
            },
            {
              indicator: 28,
              dataSource: 5,
              year: 2018,
              color:'#EA1B4B'
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
              color: '#313131'
            },
            {
              indicator: 30,
              dataSource: 1,
              year: 2016,
                 color: '#313131'
            },
            {
              indicator: 31,
              dataSource: 2,
              year: 2018,
                 color: '#313131'
            },
            {
              indicator: 32,
              dataSource: 2,
              year: 2018,
                 color: '#313131'
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
  async mounted() {
    // Check one more time if updating the series object works,
    // if not send the data from here directly
    await this.$DL.init({
      dashboardIndicators: StateProfileDashboard.indicators,
      defaultIndicators: StateProfileDashboard.defaultIndicators,
    });
  },
};
</script>

<style lang="scss">
.state-select {
  color: #3a3a3a;
}
p.final-text{
  margin-bottom: 9vh ;
  margin-top: 11vh !important;
  span a{
    color: #007D53;
    font-weight: bolder;
  }
}
p.final-text span a:hover{
  text-decoration: none;
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
