<template>
  <div>
    <table class="table" style="border: 1px solid #e3e3e3">
      <thead>
        <tr style="">
          <th class="col-3" style="text-align: center">Indicators</th>
          <th class="col-3" style="text-align: center">Data Source</th>
          <th class="col-3" style="text-align: center">Levels</th>
          <th class="col-3" style="text-align: center">Years</th>
        </tr>
      </thead>
      <tbody v-for="ind in indicator" :key="ind">
        <tr style="">
          <td
            colspan="4"
            style="background-color: #cee4e9; padding: 4px; font-size: 20px"
          >
            {{ ind.parent }}
          </td>
        </tr>
        <tr style="" v-for="child in ind.childs" :key="child.id">
          <td>
            {{ child.value }}
          </td>
          <td style="width: 400px">
            <ul
              v-for="data in dataSource"
              :key="data"
              style="list-style: none; display: inline-block"
            >
              <li>{{ data }}</li>
            </ul>
          </td>
          <td style="width: 400px" >
            <ul
              v-for="ind_levels in level"
              :key="ind_levels"
              style="list-style: none; display: inline-block"
            >
              <li>{{ ind_levels }}</li>
            </ul>
          </td>
          <td style="width: 200px">
            <ul
              v-for="year in years"
              :key="year"
              style="list-style: none; display: inline-block"
            >
              <li>{{ year }}</li>
            </ul>
          </td>
        </tr>
        <tr style=""></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['indicator', 'dataSource', 'level', 'years'],

  // data() {
  //   return {
  //     levelData: [],
  //   };
  // },
  // computed: {
  //   indicatorsLevels() {
  //     // debugger;
  //     return this.$store.getters["indicators/indicatorsLevels"];
  //   },
  // },
  // //   watch: {
  // //     abc() {
  // //       if (this.levelData) {
  // //         const data = this.$store.getters["indicators/indicatorsLevels"];
  // //         ('asd');
  // //       }
  // //     },
  // //   },
  //   mounted() {
  //     this.levelsManagement()
  //   },
  //   methods: {
  //     levelsManagement() {
  //       this.levelData = this.$store.getters["indicators/indicatorsLevels"];
  //     },
  //   },
};
</script>

<style scoped>
</style>
