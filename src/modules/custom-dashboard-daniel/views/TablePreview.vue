<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <CustomTable />
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <button @click="$router.go(-1)" class="btn btn-inverse">
          EDIT TABLE
        </button>
        <router-link to="/my-dashboard/config" class="btn"
          >NEXT TABLE</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import CustomTable from '../components/TheCustomTable.vue';

export default {
  components: {
    CustomTable,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #3f8994;
  color: #ffffff;
  text-transform: uppercase;
  // border-color: #3f8994;
  font-size: 16px;
}
.btn-inverse {
  background-color: #eaeaea;
  color: black;
  font-size: 16px;
  text-transform: uppercase;
}
</style>
