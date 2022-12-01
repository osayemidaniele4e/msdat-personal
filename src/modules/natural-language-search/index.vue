<template>
  <div class="container-fluid">
    <div class="container d-flex align-items-center justify-content-center flex-column p-5">
      <h4 class="mb-3"> MSDAT Intelligent Indicator Search</h4>
      <form class="input-group w-75  shadow">
        <input
          type="text"
          class="form-control border-0"
          placeholder="Search an indicator ..."
        />
        <button class="btn input-group-append" type="submit">
            <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
    <div class="container d-flex align-items-center justify-content-center">
      <IndicatorTable/>
    </div>
  </div>
</template>

<script>
import IndicatorTable from './indicatorTable.vue';

export default {
  name: 'IndicatorSearch',
  components: {
    IndicatorTable,
  },
};
</script>

<style scoped>
.container-fluid {
  height: 100vh;
  color: green;
  background-color: #cee4e9;
  flex-direction: column;
}
.form-control {
    width: 93%;
}
.fa {
    color: #cee4e9;
    font-size: 20px;
    font-weight: 700;
}
.btn {
    background-color: green;
    align-items: center;
    justify-content: center;
    width: 7%;
}
</style>
