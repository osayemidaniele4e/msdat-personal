<template>
  <div>
    <div v-if="
        $store.getters.getEmbedIframe !== null &&
        $store.getters.getEmbedUrl !== null
      " class="">
      <div
      v-if="
        $store.getters.getEmbedIframe !== null &&
        $store.getters.getEmbedIframe !== ''
      "
      class="mt-1"
    >
      <h1 class="url_title">{{ this.$store.getters.getIframeEmbedTitle }}</h1>
      <div class="w-100 url_height">
        <div v-html="$store.getters.getEmbedIframe"></div>
      </div>
    </div>

    <div
      v-if="
        $store.getters.getEmbedUrl !== null &&
        $store.getters.getEmbedUrl !== ''
      "
      :class="[
        $store.getters.getEmbedIframe === null || $store.getters.getEmbedIframe === ''
          ? 'url_body_2'
          : 'url_body',
      ]"
    >
      <h1 class="url_title">{{ this.$store.getters.getUrlTitle }}</h1>
      <div class="w-100 url_height">
        <iframe
          :src="$store.getters.getEmbedUrl"
          style="width: 100%; height: 800px; border: none"
        ></iframe>
      </div>
    </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
      <h1 class="url_title">No Embedded Dashboard Available</h1>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ScorecardSection',
};
</script>

<style lang="scss" scoped>
iframe {
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px !important;
  }
}

.iframe_container {
  max-height: 450px;
  overflow-y: auto;
}
.preview {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1500;
}
.url_height {
  height: 600px;
  width: 100%;
}

iframe {
  width: 100%;
  height: 800px; /* Adjust as needed */
  border: none;
}

.url_title {
  margin-bottom: 10px;
  font-weight: bold;
  color: gray;
  padding: 10px;
}
.url_body {
  margin-top: 20rem;
  margin-bottom: 25rem;
}
.url_body_2 {
  margin-top: 5rem;
  margin-bottom: 22rem;
}</style>
