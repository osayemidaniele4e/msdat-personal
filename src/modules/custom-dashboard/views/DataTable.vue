<template>
  <b-container class="text-justify px-5" fluid>
    <h2 style="background-color: #f5f5f5; width: 755px">
      Maternal and Immunization Tracker Dashboard
    </h2>
    <div style="background-color: #f5f5f5; width: 976px">
      <p>
        This dashboard is to track the state maternal health and immunization of
        under 5 children across national and subnational levels. This dashboard
        is owned by the Federal Body of Maternal and Child health, Nigeria.
      </p>
    </div>
    <data-table />
  </b-container>
</template>

<script>
import DataTable from '../components/preferences/dataTable/DataTable.vue';

export default {
  components: {
    DataTable,
  },
  mounted() {
    this.$store.commit('updateStep', 3);
  },
};
</script>
