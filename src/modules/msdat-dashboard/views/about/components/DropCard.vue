<template>
  <section class="d-none d-lg-inline-block">
    <div @click="showExpandedDropdown = false" class="backdrop"></div>
    <div class="container-fluid card dropdown-expanded work-sans">
      <div class="row p-3">
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Health Inputs</h5>
            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Health_Facility" target="_blank">
                <b-list-group-item>Health Facilities</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of indicators on the availability and distribution of
                health facilities.</span
              >
            </div>
            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Health_Financing" target="_blank">
                <b-list-group-item>Health Finance</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard includes indicators on funding sources and expenditure.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Health_Workforce" target="_blank">
                <b-list-group-item>Health Workforce</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of indicators on health personnel across different cadres.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/health-facilities-profile" target="_blank">
                <b-list-group-item
                  >Health Facilities Finder(GIS)- work in progress</b-list-group-item
                >
              </router-link>
              <span class="custom-tooltip"
                >This dashboard is a geographic tool for locating health facilities.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/health-facilities-profile" target="_blank">
                <b-list-group-item>Multi-Source Health Facilities Profile</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard provides a detailed description of the listed health facilities.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Health Outputs</h5>

            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Health_Service_Access" target="_blank">
                <b-list-group-item>Health Service Access</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of indicators on population access to health services.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <a
                href="https://msdat.fmohconnect.gov.ng/covid19_health_service_uptake/index.html"
                target="_blank"
              >
                <b-list-group-item> Health Service Uptake (NHMIS-Monthly)</b-list-group-item>
              </a>
              <span class="custom-tooltip"
                >This dashboard consists of selected indicators that are tracked quarterly.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/health-service-uptake" target="_blank">
                <b-list-group-item>Health Service Uptake (NHMIS-Quarterly)</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of selected indicators that are tracked quarterly.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <a href="https://monthly-nhmis-analysis.fmohconnect.gov.ng/" target="_blank">
                <b-list-group-item>Monthly NHMIS Insights</b-list-group-item></a
              >
              <span class="custom-tooltip"
                >This dashboard consists of analytical insights of selected RMCHN indicators from
                NHMIS monthly data.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Disease_Surveillance" target="_blank">
                <b-list-group-item>Disease Surveillance</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of Integrated Disease Surveillance and Response (IDSR)
                indicators of relevant communicable diseases.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Health Outcomes</h5>
            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Health_Outcomes_and_Service_Coverage" target="_blank">
                <b-list-group-item>Health Outcomes and Service Coverage</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of indicators that show disease burden and intervention
                coverage.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link
                to="/dashboard/Quarterly_Performance_Assessment_Dashboard"
                target="_blank"
              >
                <b-list-group-item>Quarterly Performance Assessment</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of selected indicators with quarterly analytics.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Advanced Analytics</h5>

            <b-list-group-item
              v-for="(section, index) in advancedSections"
              :key="section.label"
              @click="openAdvancedAnalytics(index, section.label)"
              class="cursor-pointer tooltip-wrapper"
            >
              {{ section.label }}
              <span class="custom-tooltip"
                >This dashboard provides tools for deep and interactive data analysis.
              </span>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Population</h5>
            <div class="tooltip-wrapper">
              <router-link to="/dashboard/Demographics" target="_blank">
                <b-list-group-item>Demographics</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of indicators that show population structure, growth, and
                distribution.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/dashboard/GIS_Mapping_Dashboard" target="_blank">
                <b-list-group-item>GIS Mapping</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard displays indicators using geospatial visualisation to show
                population distribution and its relationship with key health data.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Thematic Dashboard</h5>
            <div class="tooltip-wrapper">
              <router-link to="/external-ndr1" target="_blank">
                <b-list-group-item>HIV/AIDs National Repository Dashboard 1</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of comprehensive HIV-related data from national systems.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/external-ndr2" target="_blank">
                <b-list-group-item>HIV/AIDs National Repository Dashboard 2</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This dashboard consists of comprehensive HIV-related data from national systems.
              </span>
            </div>

            <div class="tooltip-wrapper">
              <router-link to="/external-ncdc" target="_blank">
                <b-list-group-item>Disease Surveillance (NCDC)</b-list-group-item>
              </router-link>
              <span class="custom-tooltip"
                >This shows the Nigeria Centre for Disease Control (NCDC) dashboard, with IDSR
                indicators of relevant diseases.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3">
          <b-list-group>
            <h5 class="text-underline">Other Dashboards</h5>
            <div class="tooltip-wrapper-2">
              <router-link to="/custom" target="_blank">
                <b-list-group-item>Create Your Dashboard</b-list-group-item>
              </router-link>
              <span class="custom-tooltip-2"
                >This enables users to build their dashboards using indicators and data sources
                available on the MSDAT.
              </span>
            </div>

            <div class="tooltip-wrapper-2">
              <router-link to="/health-profiles" target="_blank">
                <b-list-group-item>Health Profiles</b-list-group-item>
              </router-link>
              <span class="custom-tooltip-2"
                >This dashboard contains indicators that give an overview of the State or National
                health status.
              </span>
            </div>

            <div class="tooltip-wrapper-2">
              <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
                ><b-list-group-item>Governors' Dashboard</b-list-group-item></a
              >
              <span class="custom-tooltip-2"
                >This dashboard contains selected indicators that give high-level insights into
                health at the state level.
              </span>
            </div>

            <div class="tooltip-wrapper-2">
              <router-link to="/ministers-dashboard" target="_blank">
                <b-list-group-item>SWAP Ministerial Dashboard</b-list-group-item>
              </router-link>
              <span class="custom-tooltip-2"
                >This dashboard contains selected indicators that give high-level insights into
                health at the national level.
              </span>
            </div>

            <div class="tooltip-wrapper-2">
              <router-link to="/data-triangulation-dashboard" target="_blank">
                <b-list-group-item>Triangulation Dashboard</b-list-group-item>
              </router-link>
              <span class="custom-tooltip-2"
                >This dashboard enables users to analyze multiple sources to ensure data consistency
                and reliability for decision-making.
              </span>
            </div>

            <div class="tooltip-wrapper-2">
              <router-link to="/presidential-bond-scorecard" target="_blank">
                <b-list-group-item
                  >Scorecard Dashboard of Presidential Bond Indicators</b-list-group-item
                >
              </router-link>
              <span class="custom-tooltip-2"
                >This dashboard consists of indicators that monitor priority national health
                commitments.
              </span>
            </div>
          </b-list-group>
        </div>
        <div class="col mb-3" v-if="isAuthenticated">
          <b-list-group>
            <h5 class="text-underline">Custom Dashboards</h5>
            <div v-for="dashboard in userDashboards" :key="dashboard.id">
              <div class="tooltip-wrapper-2">
                <router-link :to="'/custom/public/' + dashboard.id" target="_blank">
                  <b-list-group-item> {{ dashboard.name_of_dashboard }}</b-list-group-item>
                </router-link>
                <span class="custom-tooltip-2"
                  >This dashboard is created by you or other users and is available for public
                  access.
                </span>
              </div>
              <!-- <router-link :to="'/custom/public/' + dashboard.id" target="_blank"
                ><b-list-group-item>
                  {{ dashboard.name_of_dashboard }}</b-list-group-item
                ></router-link
              > -->
            </div>
          </b-list-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  // eslint-disable-next-line no-unused-vars
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

import { advancedSections } from '../../analytics/sections';

export default {
  data() {
    return {
      loading: true,
      userDashboards: [],
      // publicDashboards: [],
      advancedSections,
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
      const userEmail = obj.email;
      const filteredArr = arr.filter((item) => item.email === userEmail);
      return filteredArr;
    },

    openAdvancedAnalytics(index, label) {
      this.showExpandedDropdown = false;
      console.log(`Opening Advanced Analytics for: ${label} (index ${index})`);

      const relativeUrl = this.$router.resolve({
        path: '/dashboard/Advanced_Analytics',
        query: { index },
      }).href;

      const fullUrl = `${window.location.origin}${relativeUrl}`;

      localStorage.setItem('advanced_url', fullUrl);
      window.open(fullUrl, '_blank');
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
    // const { origin } = window.location;
    const { data } = await this.SAVE_DASHBOARDS();
    console.log(data.results, '@@@');
    this.userDashboards = data.results.filter((item) => item.is_private === false);
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
@import '@/scss/abstracts/_variables.scss';

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  width: 100%; // ensure it wraps the whole item cleanly

  &:hover .custom-tooltip {
    visibility: visible;
    opacity: 1;
  }
}

.tooltip-wrapper-2 {
  position: relative;
  display: inline-block;
  width: 100%; // ensure it wraps the whole item cleanly

  &:hover .custom-tooltip-2 {
    visibility: visible;
    opacity: 1;
  }
}

.custom-tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 999;
  bottom: 50%; // place it above the item
  left: 60%;
  transform: translateX(-50%) translateY(-8px);
  background-color: #fff;
  color: #000;
  padding: 6px;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: normal; // allows line break
  width: 300px; // or whatever fits your layout
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  pointer-events: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e5e5;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #494545 transparent transparent transparent;
  }
}

.custom-tooltip-2 {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 999;
  bottom: 50%; // place it above the item
  left: 35%;
  transform: translateX(-50%) translateY(-8px);
  background-color: #fff;
  color: #000;
  padding: 6px;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: normal; // allows line break
  width: 300px; // or whatever fits your layout
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  pointer-events: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e5e5;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #494545 transparent transparent transparent;
  }
}

// .custom-tooltip {
//   visibility: hidden;
//   opacity: 0;
//   position: absolute;
//   z-index: 999;
//   bottom: 50%; // Place above the item
//   // left: 10;
//   transform: translateY(-50%);
//   background-color: #494545;
//   color: #fff;
//   padding: 6px 10px;
//   font-size: 0.75rem;
//   white-space: nowrap;
//   border-radius: 4px;
//   transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
//   pointer-events: none;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);

//   &::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;
//     transform: translateY(-50%);
//     margin-left: -5px;
//     border-width: 5px;
//     border-style: solid;
//     border-color: transparent #333 transparent transparent;
//   }
// }

div {
  &.dropdown-expanded {
    position: absolute;
    width: 94vw;
    z-index: 5;
    // left: -0.5vw;
    right: 1.5%;
    top: 5rem;
    color: black;
    // max-height: 70vh;
    overflow-y: auto;
    a {
      color: inherit;
    }
  }
  div.list-group {
    h5.text-underline {
      font-size: 0.9rem !important;
    }
  }
  .list-group-item {
    font-family: 'Work Sans';
    padding: 0.5rem;
    border: 0;
    font-size: 0.85rem;
  }
  .list-group a:hover {
    text-decoration: none !important;
    color: $primary;
    font-weight: 600;
  }
  .sub-nav {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
    font-family: 'Work Sans';
  }
}
h5.text-underline {
  border-bottom: 2px solid $primary;
  padding: 0 0 0.6rem 0.4rem;
  margin: 0.6rem 2% 0.2rem;
  font-size: 0.9rem !important;
  font-family: 'Work Sans';
  font-weight: 700;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  opacity: 0.5;
  z-index: 5;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
