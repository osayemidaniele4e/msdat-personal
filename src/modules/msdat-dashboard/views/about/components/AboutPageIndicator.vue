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
            <div class="program-area-card" :class="{ 'green-card': indicator.program_area === selectedProgram }"
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

.program-area-sec {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  height: 600px;
  overflow: scroll;
}

.program-area-card {
  border: 1px solid black;
  margin: 5px;
  width: 150px;
  height: 70px;
  background-color: white;
  padding: 20px;
  cursor: pointer;
  font-size: 13px;
  overflow: scroll;

}

.program-area-des {
  border: 1px solid black;
  width: 700px;
  background-color: white;
  height: 650px;
  padding: 30px;
  overflow: scroll;
}

.green-card {
  background-color: green;
  color: white;
}
</style>
