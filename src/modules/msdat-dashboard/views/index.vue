<template>
  <div>
    <router-view v-if="loading"></router-view>

    <!-- <p v-else>loading</p> -->
    <!-- loading screen starts here -->
    <Loading
      v-else
      :noBackdrop="false"
      :showBackground="false"
      class="over"
    >
      <div class="center">
        <img :src="img" alt="first_img" width="250px" />
        <div class="mr-4">
          <h3>Initializing{{ loadingTitle }}</h3>
          <p>{{ loadingContent }}</p>
        </div>
      </div>
    </Loading>

    <Onboarding v-if="firstTime" v-on:closeOnboard="closeOnboard"> </Onboarding>
  </div>
</template>

<script>
import { MSDAT } from '@/config/dashboardGroups';
import Onboarding from './onboarding/onboarding.vue';
import Loading from './onboarding/modal.vue';

const img = require('./onboarding/assets/About-Dashboard-image.svg');

export default {
  data() {
    return {
      img,
      loading: false,
      firstTime: false,
      showtut: false,
      loadingContent: '',
      loadingData: 0,
    };
  },
  components: {
    Onboarding,
    Loading,
  },
  methods: {
    tutorial() {
      this.showtut = true;
    },
    closeOnboard() {
      this.firstTime = false;
      this.showtut = false;
    },
    changeLoadingData() {
      for (let i = 1; i < 4; i += 1) {
        setInterval(() => {
          // console.log(i);
          this.loadingData = i;
        }, i * 4000);
      }
    },
  },
  watch: {
    loadingData(newValue) {
      switch (newValue) {
        case 0:
          this.loadingTitle = '.';
          this.loadingContent = 'Getting the dashboard ready for the first time';
          break;
        case 1:
          this.loadingTitle = '..';
          this.loadingContent = 'Importing key health indicators...';
          break;
        case 2:
          this.loadingTitle = '...';
          this.loadingContent = 'Importing datasource across states...';
          break;
        case 3:
          this.loadingTitle = '....';
          this.loadingContent = 'Importing metadata, refining charts...';
          break;

        default:
        // code block
      }
    },
  },
  async mounted() {
    this.changeLoadingData();
    this.loadingContent = 'Getting the dashboard ready for the first time';
    this.loadingTitle = '';
    this.loading = false;
    await this.$DL.init({
      dashboardIndicators: MSDAT.indicators,
      defaultIndicators: MSDAT.defaultIndicators,
      dashboardDataSources: MSDAT.dataSources,
    });
    this.loading = true;
    const firstvisit = localStorage.getItem('visited');
    if (firstvisit == null) {
      this.firstTime = true;
      localStorage.setItem('visited', 1);
    } else {
      this.firstTime = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.text {
  font-family: 'Work Sans', sans-serif !important;
}
.over {
  z-index: 999999;
}
</style>
