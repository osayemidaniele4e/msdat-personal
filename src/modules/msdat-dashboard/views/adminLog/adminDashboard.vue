<template>
  <b-col class="p-lg-5 p-3">
    <b-col class="summary">
      <h4>Summary</h4>
      <b-row class="summary-section">
        <b-col cols="12" md="4" class="summary-card">
          <div class="card-content">
            <b-row>
              <b-col class="count-tile" >
                <div class="summary-number">{{ usersCount }}</div>
              </b-col>
              <span class="view-all"><a href="#/users">View all</a></span>
            </b-row>
            <div class="summary-title">Active Users</div>
            <span class="summary-updated">Last Updated: {{ formattedDate }}</span>
          </div>
        </b-col>
        <b-col cols="8" md="4" class="summary-card">
          <div class="card-content">
            <b-row>
              <b-col class="count-tile">
                <div class="summary-number">{{ activeDashboardsCount }}</div>
              </b-col>
              <span class="view-all"><a href="#">View all</a></span>
            </b-row>
            <div class="summary-title">Active Dashboards</div>
            <span class="summary-updated">Last Updated: {{ formattedDate }}</span>
          </div>
        </b-col>
        <b-col cols="8" md="4" class="summary-card">
          <div class="card-content">
            <b-row>
              <b-col class="count-tile">
                <div class="summary-number">{{ availablePluginsCount }}</div>
              </b-col>
              <span class="view-all"><a href="#">View all</a></span>
            </b-row>
            <div class="summary-title">Available Plug-ins</div>
            <span class="summary-updated">Last Updated: {{ formattedDate }}</span>
          </div>
        </b-col>
      </b-row>
    </b-col>
    <b-row class="plug-nots" >
      <b-row>
        <div  >
          <b-col>
            <h4>plug ins</h4>
            <div class="plug-card ">
              <div class="card-content">
                <b-row class="plug-spaced">
                  <b-col class="count-tile ">
                    <div class="summary-number">{{ availablePluginsCount }}</div>
                    <div class="summary-title">Available Plug-ins</div>
                  </b-col>
                  <span class="view-all"><a href="#">View all</a></span>
                </b-row>
              </div>
            </div>
          </b-col>
        </div>
        <div  >
        </div>
      </b-row>
      <!-- notifications -->
      <b-row>
        <div  >
          <b-col>
            <h4>Notifications</h4>
            <div class="plug-card ">
              <div class="card-content">
                <b-row class="plug-spaced">
                  <b-col class="count-tile ">
                    <div class="summary-number">14</div>
                    <div class="summary-title">Pending Notifications</div>
                  </b-col>
                  <span class="view-all"><a href="#/notification">View all</a></span>
                </b-row>

              </div>

            </div>

          </b-col>

        </div>
        </b-row>
        <div  >

        </div>
    </b-row>

  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'adminDashboard',
  data() {
    return {
      pluginsImported: [], // If you need to manage this locally
      currentDate: null,
    };
  },
  computed: {
    ...mapGetters(['usersCount', 'activeDashboardsCount', 'availablePluginsCount']),
    formattedDate() {
      if (this.currentDate) {
        // Format the current date to include the full month name
        return this.currentDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      return ''; // Return an empty string if currentDate is not set
    },
  },
  methods: {
    ...mapActions(['GET_USERS', 'GET_ACTIVE_DASHBOARDS', 'SET_PLUGINS_IMPORTED']),

    setCurrentDate() {
      this.currentDate = new Date(); // Set the current date
    },
  },
  async mounted() {
    this.setCurrentDate();
    await this.GET_USERS();
    await this.GET_ACTIVE_DASHBOARDS();
  },
};
</script>

<style scoped>
.summary{
  margin-bottom: 50px;
  padding: 0px 30px;
}
.summary-section {
 margin-top: 20px;
 gap: 40px;
 justify-content: center;
}

.summary-card {
 display: flex;
 border: 0.5px solid #D4D4D4;
 border-radius: 8px;
 max-width: 280px;
}

.card-content{
  padding: 10px;
  width: 100%;
}

.summary-number {
 font-size: 3em;
 font-weight: bold;
}

.summary-title {
 font-size: 1.2em;
 margin-top: 4px;
}

.summary-updated {
 font-size: 0.8em;
 color: #888;
}

.view-all {
 margin-top: 2px;
 font-size: 0.9em;
 color: #007D53;
}

.view-all a {
 text-decoration: none;
 color: inherit;
}
.plug-nots{
  margin-top: 40px;
  gap: 80px;
  margin-left: 30px;
}

.plug-card {
  display: flex;
  border: 0.5px solid #D4D4D4;
  border-radius: 8px;
  padding: 10px 20px 10px 10px;
  margin-top: 20px;
}

.plug-spaced {
  gap: 90px;
  justify-content: center;
}
</style>
