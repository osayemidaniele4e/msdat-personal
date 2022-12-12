<template>
  <div class="container-fluid" style="max-height: 100vh; overflow:auto">
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
    <div class="container d-flex align-items-center justify-content-center"  style="height: 70vh;">
      <IndicatorTable :dataArray="dataArray" />
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
      let datasourceArr = [];
      const newArray = [];
      const newSourceArray = [];
      if (this.search.length > 3) {
        try {
          // step 1: Get the ai indicator
          this.indicators = await Services.getIndicators({ search: this.search });
          // step 2: get the datasources and their values using the id in the data object
          this.indicators.map(async (el) => {
            // console.log(el, 'el');
            datasourceArr = await Promise.all(el.datasources.map(async (ds) => {
              const { data } = await axiosInstance.get(`/datasources/${ds}`);
              return data;
            }));
            newArray.push({
              indicatorId: el.id,
              indicator: el.full_name,
              datasourceArr: await datasourceArr,
            });
            // console.log(newArray, 'newArray');
            const SourceValue = await newArray.map(async (newarr) => {
              // console.log(newarr, 'newArr');
              const sources = await Promise.all(newarr.datasourceArr.map(async (dataArr) => {
                const { data } = await axiosInstance.get(`/data/?datasource=${dataArr.id}&location=1&indicator=${newarr.indicatorId}`);
                const dataValues = await data.results;
                console.log(dataValues, 'dataarr');
                return { dataValues, datasourceName: dataArr.datasource };
              }));
              newSourceArray.push({
                indicator: newarr.indicator,
                datasourceArr: await sources,
              });
              this.dataArray = await newSourceArray;
              // console.log(this.dataArray, 'dataArray');
              return newSourceArray;
            });
            // console.log(SourceValue, 'newArray');
          });
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
