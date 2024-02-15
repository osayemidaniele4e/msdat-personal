<template>
  <div class="parent">
    <div class="loader" v-if="isLoading">
      <the-loader />
    </div>
    <b-embed
      type="iframe"
      aspect="21by9"
      :src="url"
      :width="width"
      :height="height"
      ref="iframe"
    ></b-embed>
  </div>
</template>

<script>
import TheLoader from '@/modules/custom-dashboard/components/Loading/TheLoader.vue';

export default {
  name: 'CorrelationSection',
  components: { TheLoader },
  data() {
    return {
      isLoading: true,
      url: 'https://correlation.e4eweb.space/viz',
      width: '100%',
      height: '400',
    };
  },
  methods: {
    isLoaded() {
      const canvas = document.querySelector('.embed-responsive-item');
      const content = canvas.contentDocument || canvas.contentWindow.document;
      const intervalId = setInterval(() => {
        if (content.readyState === 'complete') {
          this.isLoading = false;
          clearInterval(intervalId);
        } else {
          console.error('canvas not found', canvas);
        }
      }, 1000);
    },
  },
  mounted() {
    this.isLoaded();
  },
};
</script>

<style scoped>
.parent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
