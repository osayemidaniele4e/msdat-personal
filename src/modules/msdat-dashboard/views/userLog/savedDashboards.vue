<template>
  <div>
    <h1>Saved dashboards</h1>
    <div>
      <b-card-group deck>
        <b-card
        v-for="dashboard in userDashboards"
        :key="dashboard.id"
        :title="dashboard.name" header-tag="header" footer-tag="footer">
          <b-card-text>{{ dashboard.title }}</b-card-text>
         
          <router-link :to="'/dashboard/'+dashboard.name">
            <b-button variant="primary">Visit dashboard</b-button>
          </router-link>
          <template #footer>
            <em>Private</em>
          </template>
        </b-card>

        <!-- <b-card title="Title" header-tag="header" footer-tag="footer">
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
          <template #footer>
            <em>Footer Slot</em>
          </template>
        </b-card> -->
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
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
    await this.SAVE_DASHBOARDS();
    this.userDashboards = this.filterArray(this.getUser, this.getDashboards.data);
  },
};
</script>

<style></style>
