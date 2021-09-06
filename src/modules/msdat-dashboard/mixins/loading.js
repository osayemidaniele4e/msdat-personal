import Loading from '../views/onboarding/modal.vue';

const loadingImg = require('../assets/loadingImg.svg');

export default {
  data() {
    return {
      loadingImg,
      loading: false,
      loadingContent: '',
      loadingData: 0,
      loadingTitle: '',
    };
  },
  components: {
    Loading,
  },
  methods: {
    changeLoadingData() {
      for (let i = 1; i < 4; i += 1) {
        setInterval(() => {
          // console.log(i);
          this.loadingData = i;
        }, i * 1000);
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
  mounted() {
    this.changeLoadingData();
    this.loadingContent = 'Getting the dashboard ready for the first time';
    this.loadingTitle = '';
  },
};
