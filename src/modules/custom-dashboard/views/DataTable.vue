<template>
  <b-container class="text-justify px-5" fluid>
    <template>
    <h2 style="background-color: #f5f5f5; width: 546px; font-family: DM sans; font-size:23px; font-weight: bold ">
      <span class="col-6">
      {{details.name}}
      </span>
    </h2>
    <div style="background-color: #f5f5f5; width: 807px; font-family: DM sans; font-size: 14px;">
      <p class="col-12">
        {{details.description}}
      </p>
    </div>
    </template>
    <data-table />
    <b-row align-h="end" class="mt-5 text-right">
      <!-- <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col> -->
      <b-col cols="auto"
        ><b-button class="editBtn" @click="backToPrefrence"
          >Edit Data Table</b-button
        ></b-col
      >
      <b-col cols="auto"
        ><b-button @click="approveData" class="nextBtn"
          >Next Page</b-button
        ></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import DataTable from '../components/preferences/dataTable/DataTable.vue';

export default {
  components: {
    DataTable,
  },
  computed: {
    details() {
      return this.$store.getters.dashboardDetails;
    },
    // selectedIndicator() {
    //   return this.$store.getters.selectedIndicator;
    // },
    // selectedDataSource() {
    //   return this.$store.getters.selectedDataSource;
    // },
    // selectedYears() {
    //   return this.$store.getters.selectedYears;
    // },
    // selectedLevels() {
    //   return this.$store.getters.selectedLevels;
    // },
  },
  mounted() {
    this.$store.commit('updateStep', 3);
  },
  methods: {
    approveData() {
      this.$router.push('sections');
    },
    backToPrefrence() {
      this.$router.push('preference-table');
    },
  },
};
</script>

<style scoped>
.nextBtn {
  background-color: #3f8994;
  color: #ffffff;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #3f8994;
  font-size: 12.000004px;
}
.editBtn {
  background-color: #eaeaea;
  color: #000000;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #eaeaea;
  font-size: 12.000004px;
}
</style>
