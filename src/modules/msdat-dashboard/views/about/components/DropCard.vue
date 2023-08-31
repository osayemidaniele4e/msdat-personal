<template>
  <div class="container-fluid card shadow dropdown-expanded work-sans">
    <div class="row p-3">
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Population</h5>
          <router-link to="/dashboard/Demographics" target="_blank"
            ><b-list-group-item>Demographics</b-list-group-item></router-link
          >
          <router-link to="/coming-soon/gis_mapping" target="_blank"
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
            ><b-list-group-item
              >Health Workforce</b-list-group-item
            ></router-link
          >
                     <router-link to="/external-ndr1" target="_blank"
            ><b-list-group-item
              >National Data Repository Dashboard 1</b-list-group-item
            ></router-link
          >

             <router-link to="/external-ndr2" target="_blank"
            ><b-list-group-item
              >National Data Repository Dashboard 2</b-list-group-item
            ></router-link
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
              href="https://msdat.old.fmohconnect.gov.ngcovid19_health_service_uptake/index.html"
              target="_blank"
            >
              <b-list-group-item>HSU Dashboard</b-list-group-item>
            </a>
            <a
              href="https://monthly-nhmis-analysis.fmohconnect.gov.ng/"
              target="_blank"
            >
              <b-list-group-item>Monthly NHMIS Insights</b-list-group-item></a
            >
            <router-link to="/dashboard/Disease_Surveillance" target="_blank"
              ><b-list-group-item
                >Disease Surveillance</b-list-group-item
              ></router-link
            >
               <router-link to="/external-ncdc" target="_blank"
              ><b-list-group-item
                >Disease Surveillance (NCDC)</b-list-group-item
              ></router-link
            >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outcomes</h5>
          <router-link to="/dashboard/Health_Outcomes_and_Service_Coverage" target="_blank"
            ><b-list-group-item
              >Health Outcomes and Service Coverage</b-list-group-item
            ></router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline">Other Dashboards</h5>
          <router-link to="/custom" target="_blank"
            ><b-list-group-item
              > Create Your Dashboard</b-list-group-item
            ></router-link
          >
          <router-link to="/health-profiles" target="_blank"
            ><b-list-group-item>Health Profiles</b-list-group-item></router-link
          >
          <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
            ><b-list-group-item>Governors' Dashboard</b-list-group-item></a
          >
          <router-link to="/coming-soon/advanced_analytics" target="_blank"
            ><b-list-group-item
              >Advanced Analytics</b-list-group-item
            ></router-link
          >
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
