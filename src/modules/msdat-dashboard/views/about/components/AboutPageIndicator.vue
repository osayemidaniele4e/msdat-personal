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
      


        <div class="program-areas">
          <!-- left section -->

          <div class="program-area-sec"> 
<div v-for="(indicator, index) in indicators" :key="index">
{{ indicator.program_area }}
</div>

            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
            <div class="program-area-card" >Maternal</div>
          </div>


          <!-- right section -->

          <div class="program-area-des"> 

            description for the section to be built on

          </div>


        </div>


      </section>

      <div class="row d-flex justify-content-between align-items-center">
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
  </div>


</div>



</template>

<script>
import { groupIndicator } from '@/util/helper';

export default {
  data() {
    return {
      indicators: [],
      selected: 1,
    };
  },
  mounted() {
    this.indicators = groupIndicator(this.dlIndicator, 'program_area');
  },
};
</script>
<style scoped>
.sec-program-areas{
background-color: #80D3AF;

}

.program-areas{
  display: grid;
  grid-template-columns: 50% 50%;

}

.program-area-sec{
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.program-area-card{
  border: 1px solid black;
  margin: 15px;
  width: 150px;
  background-color: white;
  padding: 20px;

}

.program-area-des{
 border: 1px solid black;
 width: 500px;
 background-color: white;
 height: 400px;
}
</style>
