<template>
    <div>
        <BaseMap
          :mapObject="mapObject" 
          :level="level" 
          :lgaState="stateName"
        />
        <button class="btn btn-lg btn-primary" @click="level = 2">Change Level = 2 => (Region)</button>
        <input type="text" name="" class="input block" v-model="stateName">
        <button class="btn btn-lg btn-primary" @click="level = 3"> Change Level = 3 => (LGA)</button>
    </div>
</template>

<script>
import BaseMap from './BaseMap.vue';

export default {
  components: {
    BaseMap
  },
  data() {
    return {
      level: 1,
      stateName: 'Delta',
      mapObject: {
        series: [
          {
            name: 'Nigeria',
            data: [
              [ 'Kano', 10 ],
              [ 'Delta', 200 ],
              [ 'Ondo', 123 ],
              [ 'Osun', 45 ],
              [ 'Enugu', 780 ],
              [ 'Nassarawa', 780 ],
              [ 'Federal Capital Territory', 780 ],
              [ 'South East', 200 ]
            ]
          }
        ],
        chart: {
          name:'Testing object',
        },
        title: {
          text:'Hello world'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
