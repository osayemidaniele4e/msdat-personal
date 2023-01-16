<!-- Auther: Ghufran Ahmed -->
<template>
  <b-container style="width: 85%" fluid>
    <template>
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <h2
            style="
              background-color: #f5f5f5;
              width: 45%;
              font-family: Work Sans;
              font-size: 23px;
              font-weight: bold;
              margin-left: 30px;
            "
          >
            <span class="col-6">
              {{ details.name }}
            </span>
          </h2>
          <div
            style="
              background-color: #f5f5f5;
              width: 70%;
              font-family: Work Sans;
              font-size: 14px;
              margin-left: 30px;
              margin-bottom: 10px;
            "
          >
            <p class="col-12">
              {{ details.description }}
            </p>
          </div>
        </div>
        <!-- <span class="mb-5"
          ><b-button
            @click="approveData"
            style="
              font-size: 12.000004px;
              font-family: Work Sans;
              border-color: #3f8994;
              color: #3f8994;
              background-color: #ffffff;
            "
            >approve Data</b-button
          ></span -->
        <!-- > -->
      </div>
    </template>
    <data-table />
    <b-row align-h="end" class="mt-5 mb-5 mr-2 text-right">
      <!-- <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col> -->
      <b-col cols="auto"
        ><b-button
          style="font-family: Work Sans"
          class="editBtn"
          @click="backToPrefrence"
          >Edit Data Table</b-button
        ></b-col
      >
      <b-col cols="auto"
        ><b-button
          style="font-family: Work Sans"
          @click="approveData"
          class="nextBtn"
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
