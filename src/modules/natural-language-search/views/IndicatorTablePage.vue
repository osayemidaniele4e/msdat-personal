<template>
  <div class="container-fluid" style="max-height: 100vh; overflow: auto">
    <div
      class="
        container
        d-flex
        align-items-center
        justify-content-center
        flex-column
        p-5
      "
    >
      <h4 class="mb-3">MSDAT Intelligent Indicator Search</h4>
      <form
        class="input-group w-75 shadow"
        @submit.prevent="handleSearch"
      >
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
    <div class="container d-flex align-items-center justify-content-center"  style="height: 60vh; overflow:auto;">
      <IndicatorTable :dataArray="dataArray" />
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/plugins/axios';
import { uniq } from 'lodash';
import IndicatorTable from '../components/indicatorTable.vue';
import Services from '../Service';

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
      options: [],
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
          this.indicators = await Services.getIndicators({
            search: this.search,
          });
          console.log(this.indicators, 'this.indicators');
          // step 2: get the datasources and their values using the id in the data object
          this.indicators.map(async (el) => {
            // console.log(el, 'el');
            datasourceArr = await Promise.all(
              el.datasources.map(async (ds) => {
                const { data } = await axiosInstance.get(`/datasources/${ds}`);
                return data;
              }),
            );
            newArray.push({
              indicatorId: el.id,
              indicator: el.full_name,
              datasourceArr: await datasourceArr,
            });
            // console.log(newArray, 'newArray');
            const SourceValue = await newArray.map(async (newarr) => {
              // console.log(newarr, 'newArr');
              const sources = await Promise.all(
                newarr.datasourceArr.map(async (dataArr, k) => {
                  const { data } = await axiosInstance.get(
                    `/data/?datasource=${dataArr.id}&location=1&indicator=${newarr.indicatorId}`,
                  );
                  const dataValues = await data.results;
                  console.log(dataValues, 'dataarrk');
                  const locationArray = await Promise.all(
                    dataValues.map(async (locationArr) => {
                      const locations = await axiosInstance.get(
                        `/location/${locationArr.location}`,
                      );
                      return [
                        locations.data.name,
                        parseFloat(locationArr.value),
                      ];
                    }),
                  );
                  const stateArray = await locationArray;
                  // console.log(stateArray, 'location');
                  this.options = await stateArray;
                  // console.log(this.options, 'val options');
                  return { dataValues, datasourceName: dataArr.datasource };
                }),
              );
              newSourceArray.push({
                indicatorId: newarr.indicatorId,
                indicator: newarr.indicator,
                datasourceArr: await sources,
              });
              // console.log(newSourceArray, 'dataarr');
              this.dataArray = await newSourceArray;
              console.log(this.dataArray, 'dataArray');
              return newSourceArray;
            });
            // console.log(SourceValue, 'newArray');
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    async getIndicatorsByPeriod() {
      try {
        const indicatorArr = await Services.getIndicators({
          search: this.search,
        });
        console.log(indicatorArr);
        const indicatoryears = await axiosInstance.get(
          `https://msdat-api.fmohconnect.gov.ng/api/indicator_years_available/?indicator=${indicatorArr[0].id}&size=3&ordering=-updated_at`,
        );
        console.log(indicatoryears.data.results, 'indicatoryears');
        const years = indicatoryears.data.results.map((el) => el.year);
        const uniqYears = uniq(years?.map((el) => el.split('-')[0]));
        const checkUniqYears = uniqYears.map((el) => (el?.split(' ')?.length > 1
          ? el?.split(' ')[1]
          : el?.split(' ')[0]));
        // sort the checkUniqYears
        const sortedYears = checkUniqYears.sort((a, b) => a - b);
        console.log(sortedYears, 'sorted');
        return sortedYears;
      } catch (err) {
        console.log(err);
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
