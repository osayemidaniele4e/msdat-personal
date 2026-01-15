<template>
  <div>
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="px-5 py-3 shadow-sm">
        <h4 class="h3 text-muted font-weight-bold">Dashboard Management</h4>
        <!-- <span>You can create dashboard by clicking on the "Create Dashboard Link".</span>
        <el-link
          type="primary"
          href="/#/dashboard/create"
          class="btn btn-link text-primary"
          :underline="false"
          style="text-decoration: underline"
        >
          <strong>Create Dashboard</strong>
        </el-link> -->
        <div class="row align-items-center mt-4">
          <div class="col-md-6">
            <label class="h6 font-weight-bold d-block">Search Dashboard Title</label>
            <el-input v-model="searchParam" placeholder="Search" @input="performSearch">
              <svg-icon slot="prefix" icon-class="search" class="mt-2 py-1" />
            </el-input>
          </div>
        </div>
      </div>

      <!-- Scrollable Dashboard List -->
      <div class="dashboard-list-container">
        <section class="dashboard-list">
          <DashboardBar title />
          <div @click="navigateToDashboard(dashboard)"
               v-for="dashboard in filteredExistingDashboards"
               :key="'existing-' + dashboard.title"
               class="dashboard-item">
            <DashboardBar
              :params="dashboard"
              existing
              @dashboard-selected="handleDashboardSelection"
            />
          </div>
          <div @click="navigateToDashboard(dashboard)"
               v-for="dashboard in filteredSavedDashboards"
               :key="'saved-' + dashboard.title"
               class="dashboard-item">
            <DashboardBar
              :params="dashboard"
              @dashboard-selected="handleDashboardSelection"
            />
          </div>
          <el-alert v-if="error" type="error" show-icon center>
            <h6>{{ error }}</h6>
          </el-alert>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { existingDashboards } from './utils/dashboardParams';
import DashboardBar from './components/dashboardBar.vue';

export default {
  components: {
    DashboardBar,
  },
  data() {
    return {
      searchParam: '',
      existingDashboards,
      savedDashboards: [],
      loading: true,
      error: '',
    };
  },
  computed: {
    ...mapGetters('dashboard', ['indicators', 'datasources', 'dashboardError', 'dashboards']),
    filteredExistingDashboards() {
      return this.searchFilter(this.existingDashboards, this.searchParam);
    },
    filteredSavedDashboards() {
      return this.searchFilter(this.savedDashboards, this.searchParam);
    },
  },
  watch: {
    dashboards(boards) {
      this.savedDashboards = this.mapDashboards(boards);
    },
    indicators() {
      this.savedDashboards = this.mapDashboards(this.dashboards);
    },
    datasources() {
      this.savedDashboards = this.mapDashboards(this.dashboards);
    },
  },
  async mounted() {
    if (!this.dashboards.length || this.dashboardError.dashboards) {
      await this.loadDashboards();
    }
    if (!this.indicators.length || this.dashboardError.indicators) {
      await this.loadIndicators();
    }
    if (!this.datasources.length || this.dashboardError.datasources) {
      await this.loadDatasources();
    }
    const { indicators, datasources, dashboards } = this.dashboardError;
    if (indicators || datasources || dashboards) {
      this.error = 'Unable to load dashboards!';
    } else {
      this.savedDashboards = this.mapDashboards(this.dashboards);
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('dashboard', ['loadIndicators', 'loadDatasources', 'loadDashboards']),
    ...mapActions('activity', ['logActivity']),
    searchFilter(list, param) {
      if (!list) return [];
      return list.filter((item) => item.name.toLowerCase().includes(param.toLowerCase()));
    },
    cap(text) {
      return text
        .split('_')
        .map((word) => word.at(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    mapDashboards(dashboards) {
      const mappedDashboards = dashboards.map((dashboard) => ({
        id: dashboard.id,
        name: dashboard.title,
        category: dashboard.title,
        created: new Date(dashboard.created_at).toLocaleDateString(),
        updated: new Date(dashboard.created_at).toLocaleDateString(),
        indicator:
        // eslint-disable-next-line
          this.indicators.find((ind) => ind.id === (dashboard.initialIndicator || 0))?.full_name
          || '...',
        datasource:
          this.datasources.find((dash) => dash.id === (dashboard.initialDataSource || 0))
            ?.datasource || '...',
        link: `https://msdat.fmohconnect.gov.ng/dashboard/${dashboard.name}`,
      }));
      return mappedDashboards;
    },
    performSearch() {
      this.logActivity({
        type: 'SEARCH_DASHBOARD',
        userId: this.$store.state.user.id,
        timestamp: new Date().toISOString(),
        searchParam: this.searchParam,
      });
    },
    handleDashboardSelection(dashboard) {
      this.logActivity({
        type: 'VIEW_DASHBOARD',
        userId: this.$store.state.user.id,
        timestamp: new Date().toISOString(),
        dashboardId: dashboard.id,
        dashboardName: dashboard.name,
        category: dashboard.category,
      });
    },
    navigateToDashboard(dashboard) {
      // Log the activity
      this.handleDashboardSelection(dashboard);
      // Navigate to the dashboard link
      window.location.href = dashboard.link;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-list-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.dashboard-list {
  height: 100%;
  overflow-y: auto;
  padding: 0 30px 20px;
}

.dashboard-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.dashboard-item:hover {
  transform: translateY(-2px);
}

.overflow-x-hidden {
  overflow-x: hidden;
}
</style>
