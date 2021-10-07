<template>
  <b-container>
    <h2 style="color: #202020">
      Select your sections and arrange your widgets
    </h2>
    <br />
    <div v-for="value in values" :key="value">
      <input type="checkbox" name="dashboard" id="dashboard" />
      <label for="dashboard" class="fields">{{ value.fieldName }}</label>
      <p style="width: 476px">
        This section shows an overview of your dashboard. This is a brief
        description...
      </p>
      <br />
      <img :src="value.fieldImage" class="layout" />
    </div>
    <br />
    <b-row
            align-h="end"
            class="mt-5 text-right"
          >
            <!-- <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col> -->
            <b-col cols="auto"><b-button  class="editBtn" disabled>Edit Data Table</b-button></b-col>
            <b-col cols="auto"><b-button @click="approveData" class="nextBtn">Next Page</b-button></b-col>
          </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      values: [
        {
          fieldName: 'Dashboard Overview',
          fieldImage: '/img/dashboardPreviewImages/Dashboard.PNG',
        },
        {
          fieldName: 'Zonal Analysis',
          fieldImage: '/img/dashboardPreviewImages/ZonalAnalysis.PNG',
        },
        {
          fieldName: 'Multisource Comparison',
          fieldImage: '/img/dashboardPreviewImages/MultiSourceComparison.PNG',
        },
        {
          fieldName: 'Multisource Comparison',
          fieldImage:
            '/img/dashboardPreviewImages/MultiSourceComparisonCharts.PNG',
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('updateStep', 4);
  },
  methods: {
      approveData(){
          this.$router.push('/my-custom-dashboard');
      }
  }
};
</script>

<style scoped>
.layout {
  top: 522px;
  left: 140px;
  width: 671px;
  height: 269px;
  margin-bottom: 24px;
}
.fields {
  background: #f5f5f5;
  width: 309px;
  height: 30px;
  padding-left: 5px;
  margin-left: 10px;
}
.nextBtn {
  background-color: #3f8994;
  color: #ffffff;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #3f8994;
  font-size: 15.00000375px;
}
.editBtn {
  background-color: #EAEAEA;
  color: #000000;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #EAEAEA;
  font-size: 15.00000375px;
}
</style>