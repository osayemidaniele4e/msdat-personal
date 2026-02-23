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
      // Progress through loading phases tied to actual elapsed time
      const phases = [1, 2, 3];
      phases.forEach((phase, index) => {
        setTimeout(() => {
          this.loadingData = phase;
        }, (index + 1) * 1500);
      });
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
