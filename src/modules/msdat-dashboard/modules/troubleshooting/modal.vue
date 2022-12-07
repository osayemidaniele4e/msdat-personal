<template>
  <base-modal class="work-sans" :showModal="showModal" :size="'md'" :header="'white'">
    <template #title>
      <div class="w-75 work-sans">
        <h6 class="mb-0">
          <img :src="icon1" alt="warning-icon" width="7%" /><span class="ml-4 header_text"
            >MSDAT Dashboard not Loading?</span
          >
        </h6>
      </div>
    </template>
    <template>
      <p class="work-sans">
        This is quite unusual, but for some reason the Dashboard is not loading. We are really sorry
        about this.
      </p>
      <small
        ><strong class="work-sans"
          >We think clearing MSDAT cache from your browser might fix the problem:</strong
        ></small
      >
      <p class="mt-2 work-sans">Click on the button below to clear dashboard cache</p>
      <button class="btn btn-success work-sans py-3 px-5 mb-3 mt-2" @click="clearDBandReloadPage">
        CLEAR DASHBOARD CACHE
      </button>
      <div class="mt-3 list_item work-sans">
        <h6>Here are other things you could try:</h6>
        <ul>
          <!-- <li>Force a refresh by pressing Shift+F5.</li>
            <li>
              Open the dashboard in a new tab by
              <span class="text-primary"> clicking here.</span>
            </li>
            <li>Open the dashboard in Incognito mode.</li> -->
          <li>
            If you get this frequently, please
            <a href="http://">send us feedback</a>&ensp;<img
              :src="icon2"
              alt="link_icon"
              width="2%"
            />
          </li>
        </ul>
      </div>
    </template>
  </base-modal>
</template>

<script>
import icon1 from '../../../../assets/danger-sign.svg';
import icon2 from '../../../../assets/external-link-symbol.svg';

export default {
  name: 'TroubleShootingModal',
  components: {},
  data() {
    return {
      icon1,
      icon2,
      showModal: false,
    };
  },
  methods: {
    async clearDBandReloadPage() {
      if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === true) {
        this.showModal = false;
      }
      await this.$store.dispatch('DL/DELETE_DB');
      window.location.reload();
      this.$store.dispatch('resetState');
      this.$store.dispatch('customDashboard', false);
      this.showModal = false;
    },
  },
  mounted() {
    this.showModal = true;
  },
};
</script>

<style lang="scss" scoped>
span.header_text {
  color: black;
  font-weight: bold;
}
button.btn-success {
  background-color: #007d53;
  font-size: 0.8rem;
  color: #ebebeb;
}
div.list_item {
  font-size: 0.9rem;
  h6 {
    padding-bottom: 0.6rem;
  }
  li {
    margin-bottom: 0.7rem;
  }
}
div.cache_cleaner_loader {
  min-height: 20vh;
  // display: flex;
  // align-items: center;
  // width: 100%;
}
</style>
