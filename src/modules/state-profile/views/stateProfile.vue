<template>
  <b-container class="xxl-max-width" >
    <genericModal v-if="overviewLoading" :noBackdrop="false" :showBackground="false" class="over">
      <div class="text-center">
        <img src="@/modules/msdat-dashboard/views/onboarding/assets/About-Dashboard-image.svg" alt="first_img"
          width="250px" />
        <div class="">
          <h3 class="mr-4 mt-3">Fetching Data...</h3>
        </div>
      </div>
    </genericModal>

    <genericModal v-if="shareModalShowing" :noBackdrop="false" class="over" :showBackground="true">
      <div class="share-modal">
        <div class="top">
          <h3 class="mr-4">SHARE PLATFORM</h3>
        </div>
        <div class="body">
          <button class="social">
            <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`" target="_blank">
              <img class="img-fluid" src="@/assets/state-profile/img/linkedin.png" alt="linkedin-icon" />
            </a>
          </button>
          <button class="social">
            <a :href="`mailto:info@mail.com?subject=${shareText}&body=${shareUrl}`">
              <img class="img-fluid" src="@/assets/state-profile/img/email.png" alt="email-icon" />
            </a>
          </button>
          <button class="social">
            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank">
              <img class="img-fluid" src="@/assets/state-profile/img/facebook.png" alt="facebook-icon" />
            </a>
          </button>
          <button class="social">
            <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=`" target="_blank">
              <img class="img-fluid" src="@/assets/state-profile/img/twitter.png" alt="twitter-icon" />
            </a>
          </button>
          <button class="social link btn btn-outline-secondary" @click="copyTheLink">
            <span>
              <img class="img-fluid" src="@/assets/state-profile/img/link.png" alt="link-icon" />
            </span>
            {{ copyText }}
          </button>
        </div>
        <div class="footer">
          <button @click="toggleShareModal">CLOSE</button>
        </div>
      </div>
    </genericModal>
    <div ref="printMe" id="printMe">
      <b-row class="mt-4">
        <b-col cols="auto">
          <div>
            <b-dropdown variant="text" dropright toggle-class="text-decoration-none p-0 m-0 display-block state-select"
              no-caret>
              <template #button-content>
                <b-row align-v="center">
                  <b-col>
                    <h1>
                      {{ state }}
                    </h1>
                  </b-col>
                  <b-col>
                    <b-icon style="font-size: 20px; color: #232323" icon="chevron-down"></b-icon>
                  </b-col>
                </b-row>
              </template>
              <b-dropdown-item @click="navigateToState('National')">National</b-dropdown-item>
              <b-dropdown-item @click="navigateToState(s.name)" v-for="(s, i) in this.states" :key="`${s}+${i}`">{{ s.name
              }}</b-dropdown-item>
              <template #button-content>
                <b-row align-v="center">
                  <b-col>
                    <h1>
                      {{ state }}
                    </h1>
                  </b-col>
                  <b-col>
                    <b-icon style="font-size: 10px; color: #232323" icon="chevron-down"></b-icon>
                  </b-col>
                </b-row>
              </template>
            </b-dropdown>

          </div>
          <h3 style="font-size: 30px">
            {{ `${state === 'National' ? '' : 'State'}` }} Health Profile
          </h3>
        </b-col>
        <b-col cols="12" class="my-auto">
          <b-row align-h="end" class="mx-auto">
            <p class="mr-3">Last Updated: {{ this.regularDateFormat }}</p>
            <b-button class="mr-4 share-button" @click="toggleShareModal">
              <img class="img-fluid" src="@/assets/state-profile/svg/share.svg" alt="share-icon" />
              Share
            </b-button>
            <b-button class="print-button" @click="printing">
              <img class="img-fluid" src="@/assets/state-profile/svg/printing.svg" alt="print-icon" />
              Print Profile
            </b-button>
          </b-row>
        </b-col>
      </b-row>
      <hr style="border-top: 1px dashed #cccccc" class="mb-4" />
      <demographics :state="state" @changeState="stateClicked" :stateDemographics="demographics"></demographics>
      <div class="mt-5" v-for="(programArea, k) in programAreas" :key="k">
        <PAoverview :state="state" @overviewLoading="setLoadingState" :locations="allLocations"
          :indicatorDefinitions="indicatorDefinitions" :programArea="programArea"></PAoverview>
      </div>
      <p class="text-center final-text">
        This state profile dashboard has been curated majorly from the MSDAT Dashboard available at
        <span><a href="https://www.msdat.fmohconnect.gov.ng" target="_blank">msdat.fmohconnect.gov.ng</a></span>
      </p>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
// import { jsPDF } from 'jspdf';
import * as requests from '../requests';
import programAreaOverview from '../components/programAreaOverview.vue';
import demographics from '../components/demographics.vue';
import dataMixins from '../../data-layer/mixin';
import modalComponent from '../../msdat-dashboard/views/onboarding/modal.vue';

export default {
  name: 'state-profile',
  props: ['state'],
  mixins: [dataMixins],
  components: {
    PAoverview: programAreaOverview,
    demographics,
    genericModal: modalComponent,
  },

  data() {
    return {
      loading: true,
      regularDateFormat: '12.03.2020',
      copyText: 'Copy Link',
      shareModalShowing: false,
      allLocations: [],
      indicatorDefinitions: [],
      demographicData: [],
      incomingData: 0,
      overviewLoading: false,
      demographics: [
        {
          name: 'Population Estimate',
          indicatorId: 63,
          source: 'NPC',
          sourceId: 19,
          year: 2018,
          value: 0,
          previousValue: 0,
          previousYear: 2015,
          change: '+2',
        },
        {
          name: 'Total Fertility Rate',
          indicatorId: 1,
          source: 'NDHS',
          sourceId: 2,
          year: 2018,
          value: 0,
          previousValue: 0,
          previousYear: 2015,
          change: '-2',
        },
        {
          name: 'Birth Registration (Under Age 1)',
          indicatorId: 68,
          source: 'NPC',
          sourceId: 19,
          year: 2018,
          value: 0,
          previousYear: 2015,
          previousValue: 0,
          change: '+5',
        },
        {
          name: 'Dependency Ratio',
          indicatorId: 67,
          source: 'NLSS',
          sourceId: 20,
          year: 2018,
          value: 0,
          previousValue: 0,
          previousYear: 2015,
          change: '+2',
        },
        {
          name: 'Population Who Have Never Attended School',
          indicatorId: 70,
          source: 'NLSS',
          sourceId: 20,
          year: 2018,
          previousYear: 2015,
          value: 0,
          previousValue: 0,
          change: '+5',
        },
        {
          name: 'Population Growth Rate',
          indicatorId: 64,
          source: 'NPE',
          sourceId: 2,
          year: 2018,
          value: 0,
          previousValue: 0,
          previousYear: 2015,
          change: '-2',
        },
        {
          name: 'Maternal Mortality Ratio',
          indicatorId: 29,
          source: 'NHMIS',
          sourceId: 6,
          year: 2019,
          value: 0,
          previousValue: 0,
          previousYear: 2015,
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

          chartTitle: 'Coverage for key interventions across the continuum of care',
          colors: [
            '#EBF4F1',
            '#2c9f35',
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
              color: '#054a80',
            },
            {
              indicator: 5,
              dataSource: 2,
              year: 2018,
              color: '#2c8cca',
            },
            {
              indicator: 7,
              dataSource: 2,
              year: 2018,
              color: '#3f7299',
            },
            {
              indicator: 8,
              dataSource: 2,
              year: 2018,
              color: '#43893b',
            },
            {
              indicator: 13,
              dataSource: 1,
              year: 2016,
              color: '#2c9f35',
            },
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
              color: '#2c9f35',
            },
            {
              indicator: 10,
              dataSource: 5,
              year: 2018,
              color: '#8fb438',
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
              color: '#8fb438',
            },
          ],
        },
        {
          name: 'nutrition',
          icon: '/img/salad.svg',
          detail:
            'This section includes a set of nutirion indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
          sources: 'Nigeria Demographic and Health Survey (NDHS).',
          chartTitle: 'Coverage for key interventions in Nutrition',
          colors: ['#F4F7EA', '#8FB438', '#8FB438', '#8FB438', '#8FB438', '#8FB438'],
          specificIndicators: [
            {
              indicator: 14,
              dataSource: 2,
              year: 2018,
              color: '#8fb438',
            },
            {
              indicator: 15,
              dataSource: 2,
              year: 2018,
              color: '#8fb438',
            },
            {
              indicator: 16,
              dataSource: 2,
              year: 2018,
              color: '#8fb438',
            },
            {
              indicator: 17,
              dataSource: 2,
              year: 2018,
              color: '#8fb438',
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
          chartTitle: 'Coverage for key interventions in Immunization',
          colors: ['#FBF0E4', '#EE9632', '#EE9632', '#EE9632', '#EE9632', '#EE9632'],
          specificIndicators: [
            {
              indicator: 18,
              dataSource: 2,
              year: 2018,
              color: '#EE9632',
            },
            {
              indicator: 20,
              dataSource: 2,
              year: 2018,
              color: '#EE9632',
            },
            {
              indicator: 21,
              dataSource: 2,
              year: 2018,
              color: '#EE9632',
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

          chartTitle: 'Coverage for key interventions in Malaria',
          colors: ['#ECF3EB', '#43893B', '#43893B', '#43893B', '#43893B', '#43893B'],
          specificIndicators: [
            {
              indicator: 22,
              dataSource: 2,
              year: 2018,
              color: '#43893B',
            },
            {
              indicator: 23,
              dataSource: 2,
              year: 2018,
              color: '#43893B',
            },
            {
              indicator: 24,
              dataSource: 2,
              year: 2018,
              color: '#43893B',
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
          chartTitle: 'Coverage for key interventions in HIV',
          colors: ['#FBE5EA', '#EA1B4B', '#EA1B4B', '#EA1B4B', '#EA1B4B', '#EA1B4B'],
          specificIndicators: [
            {
              indicator: 26,
              dataSource: 16,
              year: 2019,
              color: '#EA1B4B',
            },
            {
              indicator: 27,
              dataSource: 1,
              year: 2016,
              color: '#EA1B4B',
            },
            {
              indicator: 28,
              dataSource: 5,
              year: 2018,
              color: '#EA1B4B',
            },
          ],
        },
        {
          name: 'mortality',
          icon: 'patient',
          detail:
            'This section includes a set of Mortality indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
          sources: 'Nigeria Demographic and Health Survey (NDHS)',
          chartTitle: 'Other Mortality Indicators',
          colors: ['#EAEAEA', '#313131'],
          specificIndicators: [
            {
              indicator: 29,
              dataSource: 6,
              year: 2019,
              color: '#313131',
            },
            {
              indicator: 30,
              dataSource: 1,
              year: 2016,
              color: '#313131',
            },
            {
              indicator: 31,
              dataSource: 2,
              year: 2018,
              color: '#313131',
            },
            {
              indicator: 32,
              dataSource: 2,
              year: 2018,
              color: '#313131',
            },
          ],
        },
        {
          name: 'Health Services',
          icon: 'hospital',
          detail:
            'This section includes a set of Health Facility Survey indicators. The graph shows the percentage of the target population receiving coverage for select interventions.',
          sources:
            'Multiple Indicator Cluster Survey (MICS), Nigeria Demographic and Health Survey (NDHS), and National Nutrition and Health Survey (NNHS).',
          chartTitle: '',
          colors: ['rgba(5, 146, 189, 1)'],
          specificIndicators: [
            {
              indicator: 34,
              dataSource: 17,
              year: 2016,
            },
            {
              indicator: 61,
              dataSource: 17,
              year: 2016,
            },
            {
              indicator: 39,
              dataSource: 17,
              year: 2016,
            },
            {
              indicator: 41,
              dataSource: 17,
              year: 2016,
            },
            {
              indicator: 49,
              dataSource: 17,
              year: 2016,
            },
            {
              indicator: 50,
              dataSource: 17,
              year: 2016,
            },
          ],
        },
      ],
      shareUrl: '',
      shareText: 'Health Profile Dashboard',
    };
  },
  created() {
    this.shareUrl = window.location.href;
  },
  computed: {
    ...mapState([]),
    states() {
      // Dynamically populating the list
      // of states in the dropdown
      const states = [];
      if (this.allLocations !== undefined) {
        this.allLocations.forEach((el) => {
          if (el.level === 3) {
            states.push(el);
          }
        });
      }
      return states;
    },
    lgaNames() {
      const chosenState = this.allLocations.filter(
        (el) => el.name.includes(this.state) && el.level === 3,
      )[0];
      const lgaObjects = this.allLocations.filter(
        (val) => val.parent === chosenState?.id && val.level === 4,
      );
      return lgaObjects;
    },
  },
  methods: {
    async printing() {
      const el = this.$refs.printMe;
      const options = {
        type: 'dataURL',
      };
      const output = await this.$html2canvas(el, options);
      const temp = document.createElement('a');
      temp.href = output;
      temp.download = 'StateProfile.png';
      temp.click();
    },
    async copyTheLink() {
      try {
        await navigator.clipboard.writeText(this.shareUrl);
        this.copyText = 'Link Copied!';
        console.log('Copied');
      } catch (err) {
        console.log('Cannot copy');
      }
    },
    toggleShareModal() {
      if (this.shareModalShowing) {
        this.shareModalShowing = false;
        this.copyText = 'Copy Link';
      } else {
        this.shareModalShowing = true;
      }
    },
    navigateToState(state) {
      this.$router.push({ name: 'health-profiles', params: { state } });
    },
    stateClicked(state) {
      this.navigateToState(state);
    },
    /**
     * The reason we're checking if
     * @param this.incomingData is 7 is because
     * we have 7 program areas, so the loading
     * is done when all seven send events to
     * indicate that their done fetching
     */
    setLoadingState() {
      // eslint-disable-next-line no-plusplus
      this.incomingData++;
      if (this.incomingData === 7) {
        this.overviewLoading = false;
      }
    },
  },
  watch: {
    state() {
      this.incomingData = 0;
      this.overviewLoading = true;
    },
  },
  async mounted() {
    this.overviewLoading = true;
    // Get all locations
    const locationData = await requests.allLocations();
    const { results } = locationData.data;
    this.allLocations = results;
    // get the API date
    const theDate = await requests.latestData();
    this.regularDateFormat = new Date(theDate.data).toLocaleDateString().replaceAll('/', '.');
    // Get specific datasource
    const { data } = await requests.datasourceSpecific();
    this.indicatorDefinitions = data.results;
  },
};
</script>

<style lang="scss">
.modal-body {
  padding: 0;

  button.social {
    background-color: transparent;
    margin: 5px 10px;
    color: #3a3a3a;
  }

  button.social.link {
    img {
      width: 16px;
    }
  }
}

.share-modal {

  .top,
  .footer {
    background-color: #d6cfcf;
    padding: 15px 25px;
  }

  button {
    font-size: 17px;
    padding: 5px;
  }

  .body {
    padding: 25px 20px;

    img {
      width: 32px;
    }
  }
}

.state-select,
.state-select:hover {
  color: #3a3a3a;
}

.print-button {
  background-color: #f2f2f2;
  border: 1px solid #cccccc;
  height: 38.250103125px;
  color: #3a3a3a;
}

.share-button {
  background-color: #f2f2f2;
  border: 1px solid #cccccc;
  height: 38.250103125px;
  color: #3a3a3a;
}

p.final-text {
  margin-bottom: 9vh;
  margin-top: 11vh !important;

  span a {
    color: #007d53;
    font-weight: bolder;
  }
}

p.final-text span a:hover {
  text-decoration: none;
}

.btn:focus {
  box-shadow: none;
}

h3 {
  font-size: 30px;
}

h2 {
  font-weight: bold;
  font-size: 31px;
}

h1 {
  font-size: 66px;
}

.program-icon {
  border-radius: 50%;
  background-color: #ffffff;
  text-align: center;
  padding-top: 1%;
  border: none;
  height: 84px;
  width: 84px;
}

ul.dropdown-menu.show {
  min-height: 20rem;
  max-height: 20rem;
  overflow-y: auto;
}
</style>
