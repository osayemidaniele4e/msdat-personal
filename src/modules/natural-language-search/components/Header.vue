<template>
  <div class="w-100 bg-dark" style="color: whitesmoke;">
    <div class="container p-2">
        <div class="d-flex aligh-items-center justify-content-between">
          <div>
            Indicator: <span class="mr-5">{{indicatorName}}</span>
            Datasource: <span>{{dataSourceName}} {{year}}</span>
          </div>
          <div @click="handleClick" style='text-decoration: underline; cursor: pointer;'>
            <span v-if="barchart"> Barchart</span>
            <span v-if="!barchart"> Table</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSourceName: String,
    indicatorName: String,
    year: String,
    barchart: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit('clicked', !this.barchart);
    },
  },
};
</script>

<style>

</style>
