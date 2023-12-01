<template>
  <div>

    <section class="sec-program-areas">
      <div class="mt-5 d-flex flex-column align-items-center">
        <h3>PROGRAM AREAS</h3>
        <span>
          The indicators provided by the Central Analytic Dashboard can be selected on the dashboard by clicking on the
          Indicator. The list of indicators on the dashboard can be found below:
        </span>
      </div>
      <br><br>
      <div class="program-areas">
        <!-- left section -->

        <div class="program-area-sec">
          <div v-for="(indicator, index) in indicators" :key="index">
            <div class="program-area-card display: flex; justify-content: center; align-items: center;r" :class="{ 'green-card': indicator.program_area === selectedProgram }"
              @click="setSelected(indicator)">
              {{ indicator.program_area }}
            </div>

          </div>

        </div>


        <!-- right section -->

        <div class="program-area-des">
          <h3>{{ this.selectedProgram }}</h3>
          <hr>
          <li v-for="name in filteredFullNames" :key="name.id">
            {{ name.full_name }}
          </li>

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
      indicators: [],
      selected: 1,
      selectedIndicators: [],
      selectedProgram: ''
    };
  },

  methods: {
    setSelected(indicator) {
      console.log('[indicator]', indicator)
      this.selectedIndicators = indicator.indicators,
        this.selectedProgram = indicator.program_area
    }
  },
  computed: {
    filteredFullNames() {
      // Use the map function to extract the full_name field from each object
      return this.selectedIndicators.map(item => ({ id: item.id, full_name: item.full_name }));
    }
  },


  mounted() {
    this.indicators = groupIndicator(this.dlIndicator, 'program_area');
    if (this.indicators.length > 0) {
    // Set the selectedProgram to the first program area in the indicators array
    this.selectedProgram = this.indicators[0].program_area;
    // Call the setSelected method with the first indicator as an argument
    this.setSelected(this.indicators[0]);
  }
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
  grid-template-columns: 55% 45%;

}

.program-area-sec {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  height: 650px;
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
  font-size: 10px;
  /* overflow-x: scroll; */
  text-transform: uppercase;
  border: 1px solid #80D3AF;
}

.program-area-des {
  border: 1px solid #80D3AF;
  width: 600px;
  background-color: white;
  height: 650px;
  padding: 30px;
  font-size: 13px;
  overflow: scroll;
}

.green-card {
  background-color: green;
  color: white;
}
</style>
