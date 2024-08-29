<template>
  <div class="parent d-flex justify-content-center">
    <div class="loader" v-if="isLoading">
      <!-- <the-loader /> -->
      <div class="spinner-border spinner-height text-success mx-3" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div style="max-width: 1400px; width: 100%">
      <b-embed
        type="iframe"
        :src="url"
        :width="width"
        :height="height"
      ></b-embed>
    </div>
  </div>
</template>

<script>
// import TheLoader from '@/modules/custom-dashboard/components/Loading/TheLoader.vue';

export default {
  name: 'DescriptiveAnalysis',
  components: {
    // TheLoader
  },
  data() {
    return {
      isLoading: true,
      url: 'https://public.tableau.com/views/Descriptiveanalytics_17060149555940/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
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
.loader-img {
  height: 300px;
  width: 300px;
}

.spinner-height {
  height: 10rem;
  width: 10rem;
  margin: 3rem 0;
}
</style>
