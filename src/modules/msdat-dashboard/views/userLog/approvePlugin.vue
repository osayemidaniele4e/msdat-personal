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
              <router-link target="_blank" :to="'/dashboard/' + plugin.name">
                <b-button variant="primary">Approve Pluigin</b-button>
              </router-link>
              <router-link target="_blank" :to="plugin.file">
                <b-button variant="primary">Download Pluigin</b-button>
              </router-link>

              <a :href="plugin.file">frfr</a>
              <template #footer>
                <!-- <em>{{ dashboard.visibility }}</em> -->
              </template>
            </b-card>
          </b-col>
        </template>
      </b-row>
    </div>
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
    ...mapActions(['GET_PLUGINS']),

    filterArray(obj, arr) {
      const userId = obj.id;
      const filteredArr = arr.filter((item) => item.user === userId);
      return filteredArr;
    },
  },

  async mounted() {
    this.loading = true;
    await this.GET_PLUGINS();
    console.log('plugins', this.getSubmittedPlugins)
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
