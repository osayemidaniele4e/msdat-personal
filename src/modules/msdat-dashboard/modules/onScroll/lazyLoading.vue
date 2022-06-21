<template>
  <div ref="lazy">
    <div :class="loader">
      <slot v-if="showComp"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComp: false,
      loader: 'loader',
    };
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.observer.observe(this.$refs.lazy);
  },
  methods: {
    handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        // console.log('entry', entry);
        if (entry.isIntersecting) {
          this.showComp = entry.isIntersecting;
          this.loader = 'load';
          observer.unobserve(this.$refs.lazy);
        }
      });
    },
  },
};
</script>

<style>
.loader {
  height: 400px;
  background-color: rgb(255, 255, 255);
}
.load {
  height: auto;
}
</style>
