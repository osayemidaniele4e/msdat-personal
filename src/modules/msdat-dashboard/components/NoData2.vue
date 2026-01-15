<template>
  <div class="nodata">
    <!-- <h5>NO SUB-NATIONAL LEVEL DATA</h5>
    <p>
      There is no sub-national data available for the indicator, data source and
      period you have selected. Try selecting another data source or period
    </p> -->
    <!-- <img src="@/assets/no-data/No_Available_Data.svg" alt="no data" class="img-fluid" /> -->
  </div>
</template>

<script>
export default {
  name: 'NoAvailableData',
};
</script>

<style lang="scss" scoped>
.nodata {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
