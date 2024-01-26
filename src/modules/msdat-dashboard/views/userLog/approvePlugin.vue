<template>
  <div>
    <br>
    <h3>Submitted Plugins</h3>
    <div class="loader-screen" v-if="loading">
      <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>
    <div>
      <b-row>
        <template v-for="plugin in getSubmittedPlugins">
          <b-col cols="4" :key="plugin.id">
            <b-card :title="plugin.name" header-tag="header" footer-tag="footer">
              <b-card-text>{{ plugin.title }}</b-card-text>
              <b-card-text>
                <strong>Description:</strong>
                {{ plugin.description }}    </b-card-text>

                <a :href="plugin.plugin">
                  <b-button variant="warning">
                    <b-icon icon="download"></b-icon>
                    Download</b-button>
                </a>
                &nbsp;
                <b-button @click="approvePlugin(plugin.plugin, plugin.id)" variant="primary">
                  <b-icon icon="download"></b-icon>
                  Approve</b-button>

              <template #footer>
                <!-- <em>{{ dashboard.visibility }}</em> -->
              </template>
            </b-card>
          </b-col>
        </template>
      </b-row>
    </div>
    <b-modal id="modal-1" title="BootstrapVue" centered hide-header no-close-on-backdrop hide-footer>
      <div>
      Selected plugin has been approved, CI/CD integration will take 20 - 25 mins
      <br>
      <b-spinner label="Spinning"></b-spinner>
    </div>
  </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      userDashboards: {},
    };
  },

  computed: {
    ...mapGetters(['getSubmittedPlugins']),
  },

  methods: {
    ...mapActions(['GET_PLUGINS', 'APPROVE_PLUGIN']),

    filterArray(obj, arr) {
      const userId = obj.id;
      const filteredArr = arr.filter((item) => item.user === userId);
      return filteredArr;
    },

    async approvePlugin(file, id) {
      const urlParts = file.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const fileObject = {
        id: id,
        name: fileName
      }
      await this.APPROVE_PLUGIN(fileObject);
      await this.$bvModal.show('modal-1');
    },
  },

  async mounted() {
    this.loading = true;
    await this.GET_PLUGINS();
    console.log('plugins', this.getSubmittedPlugins);
    this.loading = false;
  },
};
</script>

<style>
.loader_screen {
  width: 100vh;
  height: 100vw;
  justify-content: center;
  align-items: center;
}
</style>
