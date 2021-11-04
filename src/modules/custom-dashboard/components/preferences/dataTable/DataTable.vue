<template>
  <div>
    <table class="table" style="border: 1px solid #e3e3e3">
      <thead>
        <tr style="">
          <th
            class="col-3"
            style="
              text-align: center;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
            "
          >
            INDICATORS
          </th>
          <th
            class="col-3"
            style="
              text-align: center;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
            "
          >
            DATA SOURCES
          </th>
          <th
            class="col-3"
            style="
              text-align: center;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
            "
          >
            LEVELS
          </th>
          <th
            class="col-3"
            style="
              text-align: center;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
            "
          >
            YEARS
          </th>
        </tr>
      </thead>
      <tbody v-for="(ind, idx) in indicatorsLevels" :key="idx">
        <tr style="" v-if="ind.parent.isChildSelected">
          <td
            colspan="4"
            style="
              background-color: #cee4e9;
              padding: 4px;
              font-size: 13px;
              padding-left: 23px;
              color: #000000;
              line-spacing: 21px;
              font-family: Work Sans;
              font-weight: bold;
            "
          >
            {{ ind.parent.value }}
          </td>
        </tr>
        <template v-for="child in ind.children">
          <tr style="" v-if="child.selected" :key="child.id">
            <td
              style="font-size: 12px; font-family: Work Sans; padding-left: 19 px"
            >
              {{ child.short_name }}
            </td>
            <td style="width: 350px">
              <template v-for="items in dataSources" class="">
                <template v-for="item in items.children" >
                <ul
                  v-if="item.selected"
                  class="col-4"
                  :key="item.id"

                  style="
                    list-style: none;
                    display: inline-block;
                    font-size: 12px;
                    font-family: Work Sans;
                    margin-bottom: 0rem!important;
                  "
                >
                  <li style="width: 60px">{{ item.datasource }}</li>
                </ul>
                </template>
              </template>
            </td>
            <td style="width: 400px">
              <template v-for="level in child.levels">
                <ul
                  class="col-6"
                  :key="level.value"
                  v-if="level.selected"
                  style="
                    list-style: none;
                    display: inline-block;
                    font-size: 12px;
                    font-family: Work Sans;
                    margin-bottom: 0rem!important;
                  "
                >
                  <li style="width: 200px">{{ level.value }}</li>
                </ul>
              </template>
            </td>
            <td style="width: 200px">
              <template v-for="year in child.years">
                <ul
                  class="col-3"
                  :key="year.value"
                  style="
                    list-style: none;
                    display: inline-block;
                    font-size: 12px;
                    
                    font-family: Work Sans;
                    margin-bottom: 0rem!important;
                  "
                  v-if="year.selected"
                >
                  <li style="width: 50px;">
                    {{ year.value }}
                  </li>
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
    dataSources() {
      return this.$store.getters.getDataSource;
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
