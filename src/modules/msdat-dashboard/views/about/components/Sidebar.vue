<template>
  <div>
    <div class="col p-3">
      <div class="col mb-3">
        <a class="sub-item" href="https://msdat.fmohconnect.gov.ng/"><b>Home</b></a>
        <router-link class="sub-item" to="/faq"><b>Help & FAQ</b></router-link>
        <a class="sub-item" href="https://msdat.old.fmohconnect.gov.ng/" target="_blank"><b>Go back to MSDAT 1.5</b></a>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Population</h5>
          <router-link to="/dashboard/Demographics"
           class="sub-item" >Demographics</router-link
          >
          <router-link to="/dashboard/GIS_Mapping_Dashboard" _target="_blank"
             class="sub-item">GIS Mapping</router-link
          >
        </b-list-group>
      </div>
         <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Health Input</h5>
          <router-link to="/dashboard/Health_Facility" target="_blank"
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
            <div class="sub-item-bold" >Health Service Access</div>
            <router-link to="/dashboard/Health_Service_Access" target="_blank"
             class="sub-item">
            Health Service Access
            </router-link>
          </div>
          <div class="mb-2">
            <div class="sub-item-bold">Health Service Uptake</div>
            <a
              href="https://msdat.fmohconnect.gov.ng/covid19_health_service_uptake/index.html"
              target="_blank"
               class="sub-item"
            >
              Health Service Uptake
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
              <b class="sub-item-bold">Disease Surveillance</b>
              <a href="/dashboard/Disease_Surveillance" target="_blank" class="sub-item">
                Disease Surveillance
              </a
            >
              <a href="/external-ncdc" target="_blank" class="sub-item">
                Disease Surveillance (NCDC)
              </a
            >
          </div>
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Health Outcomes</h5>
          <router-link to="/dashboard/Health_Outcomes_and_Service_Coverage" target="_blank"  class="sub-item"
            >Health Outcomes and Service Coverage</router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Advanced Analytics</h5>
          <router-link
            v-for="(section, index) in advancedSections"
            :key="section.label"
            :to="`/dashboard/Advanced_Analytics?index=${index}`"
            class="sub-item"
            >
              {{ section.label }}
            </router-link
          >
        </b-list-group>
      </div>
      <div class="col mb-3">
        <b-list-group>
          <h5 class="text-underline main-item">Other Dashboards</h5>
          <router-link to="/custom"
           class="sub-item"
            >
              Create New Dashboard
            </router-link
          >
          <router-link to="/health-profiles"
           class="sub-item"
            >Health Profiles</router-link
          >
          <a href="https://ngf.fmohconnect.gov.ng/" target="_blank"
           class="sub-item"
            >Governors' Dashboard</a
          >
          <router-link to="/ministers-dashboard" target="_blank"  class="sub-item"
            >SWAP Ministerial Dashboard</router-link
          >
          <!-- <router-link to="/coming-soon/advanced_analytics" -->
          <!-- <router-link to="/advanced_analytics"
           class="sub-item"
            >
              Advanced Analytics
            </router-link
          > -->
        </b-list-group>
      </div>
      <div class="col mb-3 d-md-none">
        <b-list-group>
          <h5 class="text-underline main-item">User Profile</h5>
            <div v-b-toggle.sidebar-2 class="text-dark sub-item">
               Login/Register
              </div>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';

import { advancedSections } from '../../analytics/sections';

export default {
  // props: {
  //   show: {
  //     type: Boolean,
  //     required: true,
  //     default: false
  //   }
  // },

  data() {
    return {
      advancedSections,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
div {
  &.dropdown-expanded {
    position: absolute;
    width: 80vw;
    z-index: 5;
    left: -0.5vw;
    // right: 10px;
    // top: 3rem;
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
   justify-content: left;
    padding: 0.2rem 0;
    margin: 0.7rem 1.3rem;
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 20px/24px Work Sans;
    letter-spacing: 0px;
    color: #404040;
    opacity: 1;
}

.sub-item{
  display: flex;
  justify-content: left;
  margin-left: 1.3rem;
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal normal 16px/19px Work Sans;
  letter-spacing: 0px;
  color: #404040;
  opacity: 1;

  }

  .sub-item-bold{
  display: flex;
  justify-content: left;
  margin-left: 1.3rem;
  letter-spacing: var(--unnamed-character-spacing-0);
  font: normal normal 600 16px/19px Work Sans;
  letter-spacing: 0px;
  color: #404040;
  opacity: 1;
  font-size: 14px;

  }
</style>
<!--
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

<style lang="scss" scoped>
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
</style> -->
