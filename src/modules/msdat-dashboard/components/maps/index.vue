<template>
    <div>
        <h1>map</h1>
        <BaseMap :mapObject="{
         series :[{
          name: 'Nigeria',
          data: [
            ['Kano', 10],
            ['Delta', 200],
            ['Ondo', 123],
            ['Osun', 45],
            ['Enugu', 780],
            ['Nassarawa', 780],
            ['Federal Capital Territory', 780],
            ['South East',200],
          ],
         }],
          chart:{
            name:'Testing object',
          },
          title:{
            text:'Hello world'
          },
        }" :level="level" :lgaState="stateName"  />
        <button class="btn btn-lg btn-primary" @click="level = 2">Change Level</button>
        <input type="text" name="" class="input block" v-model="stateName">
        <button class="btn btn-lg btn-primary" @click="level = 3"> Change Level Lga</button>
    </div>
</template>

<script>
import BaseMap from './BaseMap.vue';

export default {
  data() {
    return {
      level: 1,
      stateName: 'Delta',
    };
  },
  components: {
    BaseMap,
  },

};
</script>

<style lang="scss" scoped>

</style>
