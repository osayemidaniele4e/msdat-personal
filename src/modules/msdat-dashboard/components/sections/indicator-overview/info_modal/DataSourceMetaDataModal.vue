<template>
  <div>
    <!--
  <div>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize">Full Name:</span>
      <span>{{ dataSourceDetails.full_name }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Description:</span
      >
      <span>{{ dataSourceDetails.description }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Methodology:</span
      >
      <span>{{ dataSourceDetails.methodology }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Year Available:</span
      >
      <span>{{ dataSourceDetails.year_available }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Period Available:</span
      >
      <span>{{ dataSourceDetails.period_available }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Sub-national Data:</span
      >
      <span>{{ dataSourceDetails.subnational_data }}</span>
    </p>
    <p :class="rawObject ? 'pb-3' : ''">
      <span class="mr-1 font-weight-bold mr-1 text-capitalize"
        >Classification:</span
      >
      <span>{{ dataSourceDetails.classification }}</span>
    </p>
  </div> -->
    <div>
      <p>
        <div class="text1">Full Name</div>
        <div class="text2">{{ dataSourceDetails.full_name }}</div>
      <p>

      <p>
        <div class="text1">Description</div>
        <div class="text2">
          {{ dataSourceDetails.description }}
        </div>
      <p>

      <!-- new grid -->

      <div class="grid1">
        <div>
          <div class="grid1-left-text1">Years With Available data</div>
          <div class="grid1-left-text2">{{ dataSourceDetails.year_available }}</div>
        </div>

        <!-- Next Available data is not available -->

        <div>
          <div class="grid1-right-text1">Classification</div>
          <div class="grid1-right-text2">{{ dataSourceDetails.classification}}</div>
        </div>
      </div>

      <p>
        <div class="text1">Link</div>
        <a :href="dataSourceDetails.link" class="text2">{{ dataSourceDetails.link }}</a>
      <p>

      <p>
        <div class="text1">Methodology</div>
        <div class="text2">{{ dataSourceDetails.methodology }}</div>
      <p>

      <div>
        <div class="text1">Sub-national Data Available</div>
        <div class="text2">{{ dataSourceDetails.subnational_data }}</div>
      </div>
    </div>
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
    rawObject: {
      type: Object,
      required: false,
    },
  },
  watch: {
    dataSourceID(newValID) {
      this.dataSourceDetails = this.dlGetDataSource(newValID);
    },
  },
  mounted() {
    if (this.rawObject) {
      this.dataSourceDetails = this.rawObject;
    } else {
      this.dataSourceDetails = this.dlGetDataSource(this.dataSourceID);
    }
  },
};
</script>

<style lang="scss" scoped>
.text1 {
  font-weight: 700;
  border-bottom: 0.5px solid green;
  color: black;
  opacity: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
}

.text2 {
  font-size: 13.5px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.grid1 {
  display: grid;
  grid-template-columns: 50% 50%;

&-left-text1 {
  font-weight: 700;
  border-bottom: 0.5px solid green;
  color: black;
  opacity: 1;
  margin-left: 10px;
  font-size: 14px;
  border-right: 0.5px solid green;
}

&-left-text2 {
  border-right: 0.5px solid green;
  font-size: 13px;
  margin-bottom: 20px;
  margin-left: 10px;
}

&-right-text1 {
  font-weight: 700;
  border-bottom: 0.5px solid green;
  color: black;
  opacity: 1;
  font-size: 14px;
  padding-left: 10px;
}

&-right-text2 {
  font-size: 13px;
  margin-bottom: 20px;
  padding-left: 10px;
}
}

</style>
