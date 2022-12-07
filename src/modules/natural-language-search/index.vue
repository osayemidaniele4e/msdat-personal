<template>
  <div class="container-fluid">
    <div class="container d-flex align-items-center justify-content-center flex-column p-5">
      <h4 class="mb-3"> MSDAT Intelligent Indicator Search</h4>
      <form class="input-group w-75  shadow" @submit.prevent="handleSearch()">
        <input
          v-model="search"
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
      <IndicatorTable :dataArray="dataArray"/>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/plugins/axios';
import IndicatorTable from './indicatorTable.vue';
import Services from './service';

export default {
  name: 'IndicatorSearch',
  components: {
    IndicatorTable,
  },
  data() {
    return {
      search: '',
      indicators: [],
      dataArray: [],
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async handleSearch() {
      const newArray = [];
      if (this.search.length > 3) {
        try {
          // step 1: Get the ai indicator
          this.indicators = await Services.getIndicators({ search: this.search });
          // step 2: get the datasources and their values using the id in the data object
          this.indicators.map((el) => {
            const indicator = el.full_name;
            const datasources = Promise.all(el.datasources?.map(async (i) => {
              const source = await axiosInstance.get(`/data/?datasource=${i}`);
              const datasource = source.data.results;
              console.log(datasources, 'datasources');
              return datasource;
            }));
            newArray.push({
              indicator, datasources,
            });
            this.dataArray = newArray;
          });
          console.log(this.dataArray);
          return this.dataArray;
        } catch (err) {
          console.log(err);
        }
      }
    },
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
