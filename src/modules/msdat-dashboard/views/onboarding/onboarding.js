import Onboarding from './onboarding.vue';

export default {
  components: {
    Onboarding,
  },
  data() {
    return {
      firstTime: false,
    };
  },

  methods: {
    onCloseOnBoarding() {
      this.firstTime = false;
      // This function is called form another mixins add in the root instance component "tour.js:
      this.runIntro();
    },
  },
  mounted() {
    if (localStorage.getItem('visited') === null) {
      this.firstTime = true;
      localStorage.setItem('visited', 1);
    }
  },
};
