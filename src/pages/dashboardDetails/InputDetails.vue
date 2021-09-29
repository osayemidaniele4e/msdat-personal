<template>
  <div class="container">
    <div class="row">
      <details-form @save-data="saveData">
        <h3 class="mt-5"
          style="height:26px font: var(--unnamed-font-style-normal) normal bold var(--unnamed-font-size-20)/var(--unnamed-line-spacing-26) var(--unnamed-font-family-dm-sans);
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--unnamed-color-202020);
text-align: left;
font: normal normal bold 20px/26px DM Sans;
letter-spacing: 0px;
color: #202020;
opacity: 1;"
        >
          Select dashboard data
        </h3>
        <span class="text">
          Go through our database and select the data that is relevent to your
          dashboard.
        </span>
        <span class="text mt-5">
          Select your indicators, your preferred data source, the years and the
          coverage area(National or subnational).
        </span>
      </details-form>
    </div>
  </div>
  <!-- <h2>Abc</h2>
  <p>{{ userDetails }}</p> -->
</template>

<script>
import DetailsForm from "../../components/dashboardDetails/DetailsForm.vue";
export default {
  components: {
    DetailsForm,
  },

  methods: {
    saveData(data) {
      this.$router.push("/prefrences");
    },
  },
};
</script>

<style scoped>
.text {
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-normal) var(--unnamed-font-size-20) /
    var(--unnamed-line-spacing-26) var(--unnamed-font-family-dm-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(--unnamed-color-202020);
  text-align: left;
  font: normal normal normal 20px/26px DM Sans;
  letter-spacing: 0px;
  color: #202020;
  opacity: 1;
}
</style>