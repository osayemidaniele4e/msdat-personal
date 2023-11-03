<!-- <template>
  <div>
    <div v-for="(dataSource, index) in dataSources" :key="index">
      <h4 class="mb-2">{{ dataSource.classification }}</h4>
      <div class="row d-flex justify-content-between align-items-center">
        <b-form-select
          :key="index"
          :options="dataSource.indicators"
          :value="selected"
          value-field="id"
          text-field="datasource"
        ></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
import { groupIndicator } from '@/util/helper';

export default {
  data() {
    return {
      dataSources: [],
      selected: null,
    };
  },
  mounted() {
    this.dataSources = groupIndicator(this.dlDatasource, 'classification');
  },
};
</script>
<style scoped>
</style> -->


<template>
  <div>
  
    <section class="sec-program-areas">
          <div class="mt-5 d-flex flex-column align-items-center">
            <h3>DATA SOURCES</h3>
          <span>
            The indicators provided by the Central Analytic Dashboard can be selected on the dashboard by clicking on the
  Indicator. The list of indicators on the dashboard can be found below:
          </span>
          </div>
          <br><br>
          <div class="program-areas">
            <!-- left section -->
            <!-- <pre>
              {{ classifications }}
            </pre>
            -->


<div>
  <div v-for="classi in classifications" :key="classi" class="classification-sec">

<h3>{{ classi }}</h3>

<div class="program-area-sec"> 
<div v-for="(indicator, index) in filteredIndicators(classi)[0].indicators" :key="index">
<div
class="program-area-card"
:class="{ 'green-card': indicator.datasource === selectedDatasource }"
@click="setSelected(indicator)"
>
{{ indicator.datasource }}
</div>

</div>

</div>
</div>
</div>

        
             
          
            <!-- right section -->
  
            <div class="program-area-des"> 
              <!-- <pre>
                {{ selectedIndicators }}
              </pre> -->
              <span class="program-area-des-header">
                <span class="program-area-des-header-t1">
                  {{ selectedIndicators.classification }}
                </span>
               
                <span class="program-area-des-header-t2">
                  {{ selectedIndicators.datasource }}
                </span>

                
              </span>

              <hr>

              <h4>Fullname:</h4>
              <span>{{ selectedIndicators.full_name }}</span>
              <br><br>
              <h4>Description:</h4>
              <span>{{ selectedIndicators.description }}</span>
              <br><br>
              <h4>Tears with available data:</h4>
              <span>{{ selectedIndicators.year_available }}</span>
              <br><br>
              <h4>Link:</h4>
              <span>{{ selectedIndicators.link }}</span>
              <br><br>
              <h4>Methodology:</h4>
              <span>{{ selectedIndicators.methodology }}</span>
              <br><br>
              <h4>Sub-national data:</h4>
              <span>{{ selectedIndicators.subnational_data }}</span>
          
            </div>
  
  
          </div>
  
  
        </section>
  
        <!-- <div class="row d-flex justify-content-between align-items-center">
      <div class="col-3" v-for="(indicator, index) in indicators" :key="index">
        <label for="">{{ indicator.program_area }}</label>
        <b-form-select
          :key="index"
          :options="indicator.indicators"
          :value="selected"
          value-field="id"
          text-field="short_name"
        ></b-form-select>
      </div>
    </div> -->


 
  
  
  </div>
  
  
  
  </template>
  
  <script>
  import { groupIndicator } from '@/util/helper';
  
  export default {
    data() {
      return {
        dataSources: [],
        indicators: [],
        selected: 1,
        selectedIndicators: [],
        selectedDatasource: '',
        classifications: []
      };
    },
  
    methods: {
      setSelected(indicator){
        console.log('[indicator]', indicator)
        this.selectedIndicators = indicator,
        this.selectedDatasource = indicator.datasource
  },

  filterClassifications() {
      // Iterate through your data and extract classification names
      this.classifications = this.dataSources.map(item => item.classification);
    },

    filteredIndicators(classification) {
    return this.dataSources.filter(indicator => indicator.classification === classification);
  },
    },
    computed: {
      filteredFullNames() {
        // Use the map function to extract the full_name field from each object
        return this.selectedIndicators.map(item => ({ id: item.id, full_name: item.full_name }));
      },
    //   filteredIndicators(classification) {
    //   return this.dataSources.filter(indicator => indicator.classification === classification);
    // },
    },
  
   
   async mounted() {
      this.dataSources = await groupIndicator(this.dlDatasource, 'classification');

      this.indicators = await groupIndicator(this.dlIndicator, 'program_area');

      if (this.dataSources.length > 0) {
    // Set the selectedDatasource to the first datasource in the dataSources array
    this.selectedDatasource = this.dataSources[0].indicators[0].datasource;
    // Call the setSelected method with the first indicator as an argument
    this.setSelected(this.dataSources[0].indicators[0]);
  }

      this.filterClassifications();

      console.log('datasources', this.dataSources)


    },
  };
  </script>
  <style scoped>
  .sec-program-areas {
    background-color: #DFF3F3;
    padding: 100px;
  
  }
  
  .program-areas {
  display: grid;
  grid-template-columns: 50% 50%;

}
  
  .program-area-sec{
    display: grid;
    grid-template-columns: 33% 33% 33%;
    max-height: 350px;
    overflow: scroll;
  }
  
  .program-area-card {
  margin: 5px;
  width: 200px;
  height: 50px;
  background-color: white;
  padding: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  overflow-x: scroll;
  text-transform: uppercase;
  border: 1px solid #80D3AF;
}

.program-area-des {
  border: 1px solid #007D53;
  width: 700px;
  background-color: white;
  height: 900px;
  padding: 30px;
  overflow: scroll;
  margin-top: 40px;
}

.program-area-des-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.program-area-des-header-t1{
  font-size: 23px;
  font-weight: 700;
}

.program-area-des-header-t2{
  font-size: 23px;
  color: #007D53;
}

.classification-sec{
  max-height: 550px;
  overflow: scroll;
  margin-bottom: 50px;
}
  
  .green-card{
    background-color: green;
    color: white;
  }
  </style>
  