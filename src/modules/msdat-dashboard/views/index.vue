<template>
    <div>
        <h1>MSDAT DASHBOARD</h1>
        <table-component />
        <table-comp :dataArray="exampleData">
          <template #NHMIS-DETAILS>
            <div class="">
              <h1>HEHEH</h1>
            </div>
          </template>
        </table-comp>
    </div>
</template>

<script>
import TableComponent from '../components/table/TableComponent.vue';
import tableComp from '../components/table/tableComp.vue';
import exampleData from '../components/table/data-format.example';

export default {
  data() {
    return {
      exampleData,
    };
  },
  components: { tableComp, TableComponent },
};
</script>

<style lang="scss" scoped>

.classification-row{
  font-size: 10px;

}
</style>
