export default {
  data() {
    return {
      observer: null,
    };
  },
  methods: {
    showSection(index) {
      const observedElements = document.querySelectorAll('.observable');
      // stop observer
      observedElements.forEach((el) => this.observer.unobserve(el));
      // scroll to section
      this.changeScroll(index);
      // resume observer
      setTimeout(() => {
        observedElements.forEach((el) => this.observer.observe(el));
      }, 1000);
    },
    changeSection(index) {
      this.position = index;
    },
    startScroll() {
      const callback = (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            const newIndex = Number(target.getAttribute('id'));
            this.changeSection(newIndex);
          }
        });
      };

      this.observer = new IntersectionObserver(callback, {
        threshold: 0.5,
      });
      document.querySelectorAll('.observable').forEach((el) => this.observer.observe(el));
    },
    changeScroll(refName) {
      const element = this.$refs[refName];
      const top = element.offsetTop;
      window.scrollTo({
        top: top - 150,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    this.startScroll();
  },
};
