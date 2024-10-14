<template>
  <div class="container-fluid card shadow dropdown-expanded work-sans">
    <div class="row p-3">
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Population</h5>
          <router-link to="/dashboard/Demographics" target="_blank"
            ><b-list-group-item>Demographics</b-list-group-item></router-link
          >
          <router-link to="/dashboard/GIS_Mapping_Dashboard" target="_blank"
            ><b-list-group-item>GIS Mapping</b-list-group-item></router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Input</h5>
          <router-link to="/dashboard/Health_Facility" target="_blank"
            ><b-list-group-item>Health Facility</b-list-group-item></router-link
          >
          <router-link to="/dashboard/Health_Financing" target="_blank"
            ><b-list-group-item>Health Finance</b-list-group-item></router-link
          >
          <router-link to="/dashboard/Health_Workforce" target="_blank"
            ><b-list-group-item>Health Workforce</b-list-group-item></router-link
          >
          <router-link to="/external-ndr1" target="_blank"
            ><b-list-group-item
              >HIV/AIDs National Repository Dashboard 1</b-list-group-item
            ></router-link
          >

          <router-link to="/external-ndr2" target="_blank"
            ><b-list-group-item
              >HIV/AIDs National Repository Dashboard 2</b-list-group-item
            ></router-link
          >
          <!-- <a
            target="_blank"
            v-for="dashboard in publicDashboards.filter((dash) => {
              return dash.category === 'health_input' && dash.isConfirmed;
            })"
            :href="dashboard.link"
            :key="dashboard.id"
          >
            <b-list-group-item>
              {{ dashboard.name_of_dashboard }}
            </b-list-group-item>
          </a> -->
          <router-link to="/state-health-facility" target="_blank"
            ><b-list-group-item>Health Facilities Profile (GIS)</b-list-group-item></router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outputs</h5>
          <router-link to="/dashboard/Health_Service_Access" target="_blank">
            <b-list-group-item>Health Service Access</b-list-group-item>
          </router-link>
          <a
            href="https://msdat.fmohconnect.gov.ng/covid19_health_service_uptake/index.html"
            target="_blank"
          >
            <b-list-group-item>HSU Dashboard</b-list-group-item>
          </a>
          <a href="https://monthly-nhmis-analysis.fmohconnect.gov.ng/" target="_blank">
            <b-list-group-item>Monthly NHMIS Insights</b-list-group-item></a
          >
          <router-link to="/dashboard/Disease_Surveillance" target="_blank"
            ><b-list-group-item>Disease Surveillance</b-list-group-item></router-link
          >
          <router-link to="/external-ncdc" target="_blank"
            ><b-list-group-item>Disease Surveillance (NCDC)</b-list-group-item></router-link
          >
          <!-- <a
            target="_blank"
            v-for="dashboard in publicDashboards.filter((dash) => {
              return dash.category === 'health_outputs' && dash.isConfirmed;
            })"
            :href="dashboard.link"
            :key="dashboard.id"
          >
            <b-list-group-item>
              {{ dashboard.name_of_dashboard }}
            </b-list-group-item>
          </a> -->
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outcomes</h5>
          <router-link to="/dashboard/Health_Outcomes_and_Service_Coverage" target="_blank">
            <b-list-group-item>Health Outcomes and Service Coverage</b-list-group-item>
          </router-link>
          <router-link to="/quarterly-review" target="_blank"
            ><b-list-group-item>Quarterly Performance Assessment</b-list-group-item></router-link
          >
          <!-- <a
              target="_blank"
              v-for="dashboard in publicDashboards.filter((dash) => {
                return (dash.category === 'health_outcomes' && dash.isConfirmed)
              })"
              :href="dashboard.link"
              :key="dashboard.id"
            >
            <b-list-group-item>
              {{ dashboard.name_of_dashboard }}
            </b-list-group-item>
          </a> -->
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Other Dashboards</h5>
          <router-link to="/custom" target="_blank"
            ><b-list-group-item> Create Your Dashboard</b-list-group-item></router-link
          >
          <router-link to="/health-profiles" target="_blank"
            ><b-list-group-item>Health Profiles</b-list-group-item></router-link
          >
          <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
            ><b-list-group-item>Governors' Dashboard</b-list-group-item></a
          >
          <div class="position-relative">
            <router-link to="/advanced_analytics" target="_blank"
              ><b-list-group-item>Advanced Analytics</b-list-group-item></router-link
            >
            <span
              class="advanced_arrow"
              :class="{ advancedSectionsOpen }"
              @click="advancedSectionsOpen = !advancedSectionsOpen"
            >
              <b-icon icon="caret-right-fill" style="height: 0.7em; width: 0.7em;"></b-icon>
            </span>
          </div>
          <div class="advanced_sections pl-2" :class="{ advancedSectionsOpen }">
            <router-link
              v-for="(title, index) in advancedTitles"
              :key="title"
              :to="`/dashboard/Advanced_Analytics?index=${index}`"
              target="_blank"
              >
                <b-list-group-item><em class="small">{{ title }}</em></b-list-group-item>
              </router-link
            >
          </div>
        </b-list-group>
      </div>
      <div class="col mb-3" v-if="isAuthenticated">
        <b-list-group>
          <h5 class="text-underline">Custom Dashboards</h5>
          <div v-for="dashboard in userDashboards" :key="dashboard.id">
            <!-- <router-link :to="'/dashboard/' + dashboard.name" target="_blank" -->
            <router-link :to="'/custom/private/' + dashboard.id" target="_blank"
              ><b-list-group-item> {{ dashboard.title }}</b-list-group-item></router-link
            >
          </div>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

import { advancedTitles } from '../../analytics/sections';

export default {
  data() {
    return {
      loading: true,
      userDashboards: [],
      advancedTitles,
      advancedSectionsOpen: false,
      // publicDashboards: [],
    };
  },

  computed: {
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser', 'getDashboards']),
    publicDashboards() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.allPublicDashboards;
    },
  },

  methods: {
    ...mapActions('AUTH_STORE', ['SAVE_DASHBOARDS']),
    ...mapMutations('AUTH_STORE', ['UPDATE_USER_DASHBOARDS']),

    filterArray(obj, arr) {
      const userId = obj.id;
      const filteredArr = arr.filter((item) => item.user === userId);
      return filteredArr;
    },

    refreshUserData() {
      this.loading = true;

      // Update user dashboards
      this.userDashboards = this.filterArray(this.getUser, this.getDashboards);

      // Perform any other necessary actions for newly authenticated users

      this.loading = false;
    },
    getUserDashboards() {
      this.$store.dispatch('getDashboards');
    },
  },

  async mounted() {
    this.loading = true;

    // prevent excess request in dev mode
    const { origin } = window.location;
    if (!origin.includes('//localhost') && !origin.includes('//192')) {
      await this.SAVE_DASHBOARDS();
      this.userDashboards = await this.filterArray(this.getUser, this.getDashboards);
      this.getUserDashboards();
    }
    this.loading = false;
  },

  watch: {
    isAuthenticated(newValue, oldValue) {
      if (newValue && !oldValue) {
        // User is newly authenticated
        this.refreshUserData();
      }
      // this.getUserDashboards();
    },
    getDashboards(newValue) {
      this.userDashboards = this.filterArray(this.getUser, newValue);
    },
  },
};
</script>

<style lang="scss">
div {
  &.dropdown-expanded {
    position: absolute;
    width: 80vw;
    z-index: 5;
    // left: -0.5vw;
    right: 2rem;
    // top: 2.8rem;
    color: black;
    max-height: 30rem;
    overflow-y: auto;
    a {
      color: inherit;
    }
  }
  div.list-group {
    h5.text-underline {
      font-size: 1rem !important;
    }
  }
  .list-group-item {
    font-family: 'Work Sans';
    padding: 0.25rem 1.25rem;
    border: 0;
    font-size: 0.95rem;
  }
  .sub-nav {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
    font-family: 'Work Sans';
  }
}
h5.text-underline {
  border-bottom: 1px solid lightgrey;
  padding: 0.2rem 0;
  margin: 0.7rem 1.3rem;
  font-size: 1.2rem;
  font-family: 'Work Sans';
  font-weight: 700;
}
.advanced_arrow {
  position: absolute;
  bottom: 0;
  left: -10;
  cursor: pointer;
  transition: ease all 0.1s;
}
.advanced_sections {
  height: 0px;
  overflow: hidden;
  transition: ease height 0.3s;
}
.advanced_arrow.advancedSectionsOpen {
  transform: rotate(90deg);
}
.advanced_sections.advancedSectionsOpen {
  height: fit-content;
}
</style>
