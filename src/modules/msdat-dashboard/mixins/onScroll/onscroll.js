export default {
  methods: {
    showSection(index) {
      this.changeScroll(index);
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

      const observer = new IntersectionObserver(callback, {
        // root: document.querySelector('#observer-root'),
        threshold: 0.6,
      });
      document.querySelectorAll('.observable').forEach((el) => observer.observe(el));
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
