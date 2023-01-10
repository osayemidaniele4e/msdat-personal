<template>
  <div class="container-fluid" style="max-height: 100vh; overflow: auto">
    <div
      class="
        container
        d-flex
        align-items-center
        justify-content-between
        flex-column
        p-5
      "
    >
      <h4 class="mb-3">MSDAT Intelligent Indicator Search</h4>
      <form class="input-group w-75 shadow" @submit.prevent="handleSearch">
        <input
          v-model="search"
          type="text"
          class="form-control border-0"
          placeholder="Search an indicator ..."
        />
        <button class="btn input-group-append" type="submit" :disabled="isLoading">
          <i class="fa fa-search"></i>
        </button>
      </form>
    </div>
    <div class="loader" v-if="isLoading">
      <Theloader />
    </div>
    <div v-else>
      <div class="bg-light p-5 d-flex w-50 m-auto align-items-center justify-content-center h-100" v-if="dataArray.length <= 0 && isLoading === false"> <h6 class="text-align-center"> No data to display !!!</h6></div>
      <IndicatorTable v-else :dataArray="dataArray" />
    </div>
  </div>
</template>

<script>
import { _, uniqBy } from 'lodash';
import IndicatorTable from '../components/indicatorTable.vue';
import Services from '../service';
import Theloader from '../components/theLoader.vue';

export default {
  name: 'IndicatorSearch',
  components: {
    IndicatorTable,
    Theloader,
  },
  data() {
    return {
      search: '',
      isLoading: false,
      indicators: [],
      dataArray: [],
      options: [],
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    async handleSearch() {
      let datasourceArr = [];
      const newArray = [];
      const newSourceArray = [];
      this.isLoading = true;
      if (this.search.length > 3) {
        try {
          // step 1: Get the ai indicator
          this.indicators = await Services.getIndicators({
            search: this.search,
          });
          // step 2: get the datasources and their values using the id in the data object
          this.indicators.map(async (el) => {
            // console.log(el, 'el');
            datasourceArr = await Promise.all(
              el.datasources.map(async (ds) => {
                const data = await Services.getDataSourceById(ds);
                return data;
              }),
            );
            newArray.push({
              indicatorId: el.id,
              indicator: el.full_name,
              datasourceArr: await datasourceArr,
            });
            newArray.map(async (newarr) => {
              const sources = await Promise.all(
                newarr?.datasourceArr.map(async (dataArr) => {
                  const data = await Services.getDataByIndicators(
                    dataArr.id,
                    newarr.indicatorId,
                  );
                  const dataValues = await data;
                  const locationArray = await Promise.all(
                    dataValues?.data?.results.map(async (locationArr) => {
                      const locations = await Services.getLocationById(
                        locationArr.location,
                      );
                      // console.log(locations, 'loc');
                      return [locations.name, parseFloat(locationArr.value)];
                    }),
                  );
                  const stateArray = await locationArray;
                  this.options = await stateArray;
                  return {
                    dataValues: dataValues.data.results,
                    datasourceName: dataArr.datasource,
                  };
                }),
              );
              newSourceArray.push({
                indicatorId: newarr.indicatorId,
                indicator: newarr.indicator,
                datasourceArr: await sources,
              });
              // this.dataArray = uniq(newSourceArray);
              // eslint-disable-next-line no-sequences
              this.dataArray = uniqBy(newSourceArray, 'indicatorId');
              console.log(this.dataArray, 'newArray');
            });
          });
        } catch (err) {
          console.log(err);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  z-index: 999999;
  align-items: center;
  background: rgba(76, 175, 80, 0.3);
  /* height: 67% !important; */
  /* transform: translate(-50%, -50%); */
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
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
