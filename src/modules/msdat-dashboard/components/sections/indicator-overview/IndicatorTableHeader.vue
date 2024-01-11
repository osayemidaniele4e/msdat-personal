<template>
  <thead>
    <tr v-if="datasourcesObj.length">
      <!-- Use v-for to loop through dynamicTableHead array -->
      <th style="width: 150px">Indicator</th>
      <th v-for="column in datasourcesObj" :key="column">{{ column.datasource }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    indicator: Object,
    datasourcesObj: Array,
  },
  mounted() {
    console.log(this.datasourcesObj, 'DataHeaderx');
  },
};
</script>

<style lang="scss" scoped></style>
