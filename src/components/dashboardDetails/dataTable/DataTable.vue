<template>
  <div>
    <table class="table">
      <thead>
        <tr style="">
          <th class="col">Indicators</th>
          <th class="col">Data Source</th>
          <th class="col">Levels</th>
          <th class="col">Years</th>
        </tr>
      </thead>
      <tbody v-for="ind in indicator" :key="ind">
        <tr style="">
          <td
            colspan="4"
            style="
              background-color: #cee4e9;
              padding: 4px;
              font-size: 10px;
              font-weight: bold;
            "
          >
            {{ ind.parent }}
          </td>
        </tr>
        <tr style="" v-for="child in ind.childs" :key="child.id">
          <td style="border-bottom: 1px solid gray">
            {{ child.value }}
          </td>
          <td style="border-bottom: 1px solid gray">
            <div v-for="data in dataSource" :key="data">{{ data }}</div>
          </td>
          <td style="border-bottom: 1px solid gray">
            <div v-for="ind_levels in level" :key="ind_levels">
              {{ ind_levels }}
            </div>
          </td>
          <td style="border-bottom: 1px solid gray; width:200px;">
            <ul v-for="year in years" :key="year" style="
        list-style: none;
        display: inline-block;
">
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
  props: ["indicator", "dataSource", "level", "years"],

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
