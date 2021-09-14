<template>
  <div class="container-fluid card shadow" id="dropdown-expanded">
    <div class="row p-3">
      <div class="col-md-3 mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Input</h5>
          <b-list-group-item>Health Facility</b-list-group-item>
          <b-list-group-item>Health Finance</b-list-group-item>
          <b-list-group-item>Health Workforce</b-list-group-item>
        </b-list-group>
      </div>
      <div class="col-md-3 mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outputs</h5>
          <div class="mb-2">
            <b-list-group-item><b>Health Service Access</b></b-list-group-item>
            <b-list-group-item>Health Facility Survey</b-list-group-item>
          </div>
          <div class="mb-2">
            <b-list-group-item><b>Health Service Uptake</b></b-list-group-item>
            <b-list-group-item>HU-Covid Dashboard</b-list-group-item>
            <b-list-group-item>Monthly NHMIS Insights</b-list-group-item>
          </div>
          <div class="mb-2">
            <b-list-group-item><b>Surveillance Dashboards</b></b-list-group-item>
            <b-list-group-item>Health Surveillance</b-list-group-item>
            <b-list-group-item>RTA Surveillance</b-list-group-item>
          </div>
        </b-list-group>
      </div>
      <div class="col-md-3 mb-3">
        <b-list-group>
          <h5 class="text-underline">Health Outcomes</h5>
          <b-list-group-item>Health Outcomes and Service Coverage</b-list-group-item>
        </b-list-group>
      </div>
      <div class="col-md-3 mb-3">
        <b-list-group>
          <h5 class="text-underline">Other Dashboards</h5>
          <b-list-group-item>Create New Dahboard</b-list-group-item>
          <b-list-group-item>Demographics</b-list-group-item>
          <b-list-group-item>Health Profiles</b-list-group-item>
          <b-list-group-item>Governors' Dashboard</b-list-group-item>
          <b-list-group-item>Advanced Analytics</b-list-group-item>
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
  //     default: false,
  //   },
  // },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
div {
  &#dropdown-expanded {
    position: absolute;
    width: 80vw;
    z-index: 5;
    left: 8.2vw;
    top: 6.5vh;
    transition: opacity .3s ease;
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
