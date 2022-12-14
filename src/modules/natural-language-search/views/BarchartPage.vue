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
      <form class="input-group w-75 shadow" @submit.prevent="handleSearch">
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
    <div
      class="container d-flex align-items-center justify-content-center"
      style="height: 60vh; width: 100%"
    >
      <Barchart :optionsArray="dataArray" />
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/plugins/axios';
import { uniq } from 'lodash';
import Barchart from '../components/Barchart.vue';
import Services from '../service';

export default {
  name: 'IndicatorSearch',
  components: {
    Barchart,
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
      const newArray = [];
      if (this.search.length > 3) {
        try {
          // step 1: Get the ai indicator
          this.indicators = await Services.getIndicators({
            search: this.search,
          });
          // console.log(this.indicators, 'this.indicators');
          const indicatoryears = await axiosInstance.get(
            `https://msdat-api.fmohconnect.gov.ng/api/indicator_years_available/?indicator=${this.indicators[0].id}&size=3&ordering=-updated_at`,
          );
          // console.log(indicatoryears.data.results, 'indicatoryears');

          const datasourceArr = await Promise.all(
            this.indicators[0].datasources.map(async (ds) => {
              const { data } = await axiosInstance.get(`/datasources/${ds}`);
              return data;
            }),
          );

          // step 3: get the latest years
          const years = indicatoryears.data.results.map((el) => el.year);
          const uniqYears = uniq(years?.map((el) => el.split('-')[0]));
          const checkUniqYears = uniqYears.map((el) => (el?.split(' ')?.length > 1 ? el?.split(' ')[1] : el?.split(' ')[0]));
          // sort the checkUniqYears
          const sortedYears = checkUniqYears.sort((a, b) => a - b);

          // STEP 4: using the datasource array get the values for the indicators by year and datasource
          const datavalues = Promise.all(datasourceArr.map(async (el) => {
            await Promise.all(sortedYears.map(async (et) => {
              const { data } = await axiosInstance.get(`https://msdat-api.fmohconnect.gov.ng/api/data/?indicator=${this.indicators[0].id}&datasource=${el.id}&period=${et}`);
              // console.log(data, 'data');
              const getLocation = Promise.all(data.results.map(async (ef) => {
                // console.log(ef, 'ef');
                const locdata = await axiosInstance.get(`https://msdat-api.fmohconnect.gov.ng/api/location/${ef.location}`);
                // console.log(locdata.data, 'locdata');
                if (locdata.data.level === 3) {
                  newArray.push([locdata.data.name, Number(ef.value)]);
                  this.dataArray = await newArray;
                  console.log(newArray, 'dataarray');
                // return this.dataArray;
                }
                return [ef.value, locdata.name];
              }));
            }));
          }));
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
