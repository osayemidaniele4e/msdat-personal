<template>
  <div>
    <the-header ref="theHeader" />

    <div class="main d-flex flex-column">
      <br />
      <!-- <span>
          <b-icon-info-circle-fill />
      Dashboard developed by NCDC to show the outbreak of diseases across states in Nigeria from 2006 - 2021.
    </span> -->
      <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm base">
        <template #title>
          <h5 class="font-weight-bold work-sans text-white">
            National Data Repository Dashboard 2
          </h5>
        </template>

        <div class="dashboard-link-container">
          <p class="dashboard-link-description">
            Click the link below to view the National Data Repository Dashboard 2
          </p>
          <button
            class="btn btn-primary dashboard-link-button mt-2"
            href="#"
            @click="openInNewTab(url)"
          >
            Open dashboard in new tab
          </button>
        </div>

        <!-- <b-embed type="iframe" aspect="16by9" :src="url" :width="width" :height="height"></b-embed> -->
      </base-sub-card>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  name: 'NCDC',
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      title: '',
      configObject: {}, // This should be an Object initially
      url: 'https://ndr.nascp.gov.ng/public/dashboard',
      width: '70%',
      height: '400',
      showComing: true,
    };
  },
  methods: {
    openInNewTab(url) {
      // Open the URL in a new tab
      window.open(url, '_blank');
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.base {
  height: 24vh;
  width: 70vw;
}
.heading {
  margin: 10px;
}
.dashboard-link-container {
  text-align: center;
  margin-top: 20px;
}
.dashboard-link-description {
  font-size: 16px;
  margin-bottom: 10px;
}
.dashboard-link-button {
  padding: 10px 20px;
  border: none !important;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: #348481;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dashboard-link-button:hover {
  background-color: #246d6b;
}
</style>
