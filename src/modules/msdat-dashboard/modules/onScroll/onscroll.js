export default {
  data() {
    return {
      observer: null,
    };
  },
  methods: {
    showSection(index) {
      debugger;
      const observedElements = document.querySelectorAll('.observable');
      // stop observer
      observedElements.forEach((el) => this.observer.unobserve(el));
      // scroll to section
      // console.log('jjsx', index);
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
      console.log('abc', refName);
      const element = this.$refs[refName];
      console.log('ref', this.$refs);
      console.log('el', element);
      const top = element.offsetTop || element[0].offsetTop;
      window.scrollTo({
        top: top - 150,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
  async mounted() {
    console.log('on scroll mixins');
    await this.$nextTick();
    setTimeout(() => {
      this.startScroll();
    }, 2000);
  },
};
