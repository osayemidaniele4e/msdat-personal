<template>
  <div>
    <br>
    <h3>Saved dashboards</h3>
    <div class="loader-screen" v-if="loading">
      <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>
    <div>
      <b-row>
        <template v-for="dashboard in userDashboards">
          <b-col cols="4" :key="dashboard.id">
            <b-card :title="dashboard.name" header-tag="header" footer-tag="footer">
              <b-card-text>{{ dashboard.title }}</b-card-text>
              <router-link target="_blank" :to="'/dashboard/' + dashboard.name">
                <b-button variant="primary">Visit dashboard</b-button>
              </router-link>
              <template #footer>
                <em>Private</em>
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
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser', 'getDashboards']),
  },

  methods: {
    ...mapActions('AUTH_STORE', ['SAVE_DASHBOARDS']),

    filterArray(obj, arr) {
      const userId = obj.id;
      const filteredArr = arr.filter((item) => item.user === userId);
      return filteredArr;
    },
  },

  async mounted() {
    this.loading = true;
    await this.SAVE_DASHBOARDS();
    this.userDashboards = this.filterArray(this.getUser, this.getDashboards.data);
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
