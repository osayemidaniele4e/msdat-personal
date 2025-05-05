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
      for (let i = 1; i < 1; i += 1) {
        setInterval(() => {
          // console.log(i);
          this.loadingData = i;
        }, i * 1000);
      }
    },
  },
  watch: {
    loadingData(newValue) {
      // const firstvisit = localStorage.getItem('visited');
      switch (newValue) {
        case 0:
          this.loadingTitle = '.';
          this.loadingContent = 'Preparing Data';
          break;
        case 1:
          this.loadingTitle = '..';
          this.loadingContent = 'Setting up visualizations...';
          break;
        case 2:
          this.loadingTitle = '...';
          this.loadingContent = 'Completed...';
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
    // const firstvisit = localStorage.getItem('visited');
    this.changeLoadingData();
    this.loadingContent = 'Setting up visualizations...';
    this.loadingTitle = '';
  },
};
