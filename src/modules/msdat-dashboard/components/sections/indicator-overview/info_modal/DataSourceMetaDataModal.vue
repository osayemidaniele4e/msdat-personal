<template>
  <div>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize">Full Name:</span>
      <span>{{ dataSourceDetails.full_name }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Description:</span
      >
      <span>{{ dataSourceDetails.description }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Methodology:</span
      >
      <span>{{ dataSourceDetails.methodology }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Year Available:</span
      >
      <span>{{ dataSourceDetails.year_available }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Period Available:</span
      >
      <span>{{ dataSourceDetails.period_available }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Sub-national Data:</span
      >
      <span>{{ dataSourceDetails.subnational_data }}</span>
    </p>
    <p>
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Classification:</span
      >
      <span>{{ dataSourceDetails.classification }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DataSourceMetaDataModal',
  data() {
    return {
      dataSourceDetails: {},
    };
  },
  props: {
    dataSourceID: {
      type: Number,
      required: true,
    },
  },
  watch: {
    dataSourceID(newValID) {
      this.dataSourceDetails = this.dlGetDataSource(newValID);
    },
  },
  mounted() {
    this.dataSourceDetails = this.dlGetDataSource(this.dataSourceID);
  },
};
</script>

<style lang="scss" scoped>
</style>
