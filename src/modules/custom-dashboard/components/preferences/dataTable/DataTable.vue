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
      <tbody v-for="(ind, idx) in indicatorsLevels" :key="idx">
        <tr style="" v-if="ind.parent.isChildSelected">
          <td
            colspan="4"
            style="background-color: #cee4e9; padding: 4px; font-size: 20px"
          >
            {{ ind.parent.value }}
          </td>
        </tr>
        <template v-for="child in ind.children">
          <tr style="" v-if="child.selected" :key="child.id">
            <td>
              {{ child.short_name }}
            </td>
            <td style="width: 250px">
              <template v-for="data in child.sources">
                <ul
                  v-for="dataSource in data.children"
                  :key="dataSource"
                  style="
                    list-style: none;
                    display: inline-block;
                    padding-left: 30px;
                    font-size: 16px;
                  "
                >
                  <li>{{ dataSource }}</li>
                </ul>
              </template>
            </td>
            <td style="width: 400px">
              <template v-for="level in child.levels" >
                <ul
                :key="level.value"
                  v-if="level.selected"
                  style="list-style: none; display: inline-block"
                >
                  <li>{{ level.value }}</li>
                </ul>
              </template>
            </td>
            <td style="width: 200px">
              <template v-for="year in child.years">
                <ul
                  :key="year.value"
                  style="
                    list-style: none;
                    display: inline-block;
                    padding-left: 35px;
                  "
                  v-if="year.selected"
                >
                  <li>{{ year.value }}</li>
                </ul>
              </template>
            </td>
          </tr>
        </template>
        <tr style=""></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  props: ['indicator', 'dataSource', 'level', 'years'],

  data() {
    return {
      indicatorData: [],
    };
  },
  computed: {
    indicatorsLevels() {
      return this.$store.getters.getprogramArea;
    },
  },

  // watch: {
  //   indicators() {
  //   this.indicatorData this.$store.getters.getprogramArea;
  //   },
  // },

  //

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
