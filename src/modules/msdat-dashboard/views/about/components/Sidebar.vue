<template>
  <div>
    <div class="col p-3">
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Population</h5>
          <router-link to="/dashboard/Demographics"
            >Demographics</router-link
          >
          <router-link to="/coming-soon/gis_mapping" _target="_blank"
            >GIS Mapping</router-link
          >
        </b-list-group>
      </div>
         <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Input</h5>
          <router-link to="/dashboard/Health_Facility_Input" target="_blank"
            >Health Facility</router-link
          >
          <router-link to="/dashboard/Health_Financing" _target="_blank"
            >Health Finance</router-link
          >
          <router-link to="/dashboard/Health_Workforce" _target="_blank"
            >
            Health Workforce
            </router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outputs</h5>
          <div class="mb-2">
            <b>Health Service Access</b>
            <router-link to="/dashboard/Health_Service_Access" target="_blank">
            Health Service Access
            </router-link>
          </div>
          <div class="mb-2">
            <b>Health Service Uptake</b>
            <a
              href="https://msdat.fmohconnect.gov.ng/covid19_health_service_uptake/index.html"
              target="_blank"
            >
              HUC Dashboard
            </a>
            <a
              href="https://monthly-nhmis-analysis.fmohconnect.gov.ng/"
              target="_blank"
            >
              Monthly NHMIS Insights</a
            >
          </div>
          <div class="mb-2">
              <b>Surveillance Dashboards</b>
            <router-link to="/coming-soon/health_surveillance"
              >
                Health Surveillance
              </router-link
            >
            <router-link to="#"
              >
                RTA Surveillance
              </router-link
            >
          </div>
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outcomes</h5>
          <router-link to="/dashboard/Health_Outcomes" target="_blank"
            >Health Outcomes and Service Coverage</router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Other Dashboards</h5>
          <router-link to="/coming-soon/custom_dashboard"
            >
              Create New Dashboard
            </router-link
          >
          <router-link to="#"
            >Health Profiles</router-link
          >
          <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
            >Governors' Dashboard</a
          >
          <router-link to="/coming-soon/advanced_analytics"
            >
              Advanced Analytics
            </router-link
          >
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   show: {
  //     type: Boolean,
  //     required: true,
  //     default: false
  //   }
  // },

  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
div {
  &.dropdown-expanded {
    position: absolute;
    width: 80vw;
    z-index: 5;
    left: -0.5vw;
    top: 5.1vh;
    color: black;
    max-height: 30rem;
    overflow-y: auto;
    a {
      color: inherit;
    }
  }
  div.list-group{
    h5.text-underline{
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
</style>
