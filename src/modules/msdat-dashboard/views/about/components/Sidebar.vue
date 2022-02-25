<template>
  <div>
    <div class="col p-3">
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Population</h5>
          <router-link to="/dashboard/Demographics"
           class="sub-item" >Demographics</router-link
          >
          <router-link to="/coming-soon/gis_mapping" _target="_blank"
             class="sub-item">GIS Mapping</router-link
          >
        </b-list-group>
      </div>
         <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Health Input</h5>
          <router-link to="/dashboard/Health_Facility_Input" target="_blank"
             class="sub-item">Health Facility</router-link
          >
          <router-link to="/dashboard/Health_Financing" _target="_blank"
             class="sub-item">Health Finance</router-link
          >
          <router-link to="/dashboard/Health_Workforce" _target="_blank"
            class="sub-item" >
            Health Workforce
            </router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Health Outputs</h5>
          <div class="mb-2">
            <b class="main-item" >Health Service Access</b>
            <router-link to="/dashboard/Health_Service_Access" target="_blank"  class="sub-item">
            Health Service Access
            </router-link>
          </div>
          <div class="mb-2">
            <b class="main-item">Health Service Uptake</b>
            <a
              href="https://msdat.fmohconnect.gov.ng/covid19_health_service_uptake/index.html"
              target="_blank"
               class="sub-item"
            >
              HUC Dashboard
            </a>
            <a
              href="https://monthly-nhmis-analysis.fmohconnect.gov.ng/"
              target="_blank"
               class="sub-item"
            >
              Monthly NHMIS Insights</a
            >
          </div>
          <div class="mb-2">
              <b class="main-item">Surveillance Dashboards</b>
            <router-link to="/coming-soon/health_surveillance"
             class="sub-item"
              >
                Health Surveillance
              </router-link
            >
            <router-link to="#"
             class="sub-item"
              >
                RTA Surveillance
              </router-link
            >
          </div>
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Health Outcomes</h5>
          <router-link to="/dashboard/Health_Outcomes" target="_blank"  class="sub-item"
            >Health Outcomes and Service Coverage</router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Other Dashboards</h5>
          <router-link to="/coming-soon/custom_dashboard"
           class="sub-item"
            >
              Create New Dashboard
            </router-link
          >
          <router-link to="#"
           class="sub-item"
            >Health Profiles</router-link
          >
          <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
           class="sub-item"
            >Governors' Dashboard</a
          >
          <router-link to="/coming-soon/advanced_analytics"
           class="sub-item"
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

// to check this
.main-item{
   display: flex;
   justify-content: right;
}

.sub-item{
  display: flex;
  justify-content: right;

  }
</style>
