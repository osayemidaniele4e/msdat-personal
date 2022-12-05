<!-- Auther: Ghufran Ahmed  -->
<template>
  <div class="container-fluid">
    <div
      v-show="
        this.$store.state.CUSTOM_DASHBOARD_STORE.allSelected === true &&
        showLoader

      "
      class="text-center"
      style="
        position: absolute;
        height: 100vh;
        width: 100%
        pointer-events: none;
        z-index: 99;
        overflow: none;
      "
    >
      <div

        style="
          position: fixed;
          z-index: 99;
          top: 50%;
          bottom: 50%;
          left: 0;
          right: 0;
          text-align: center;
          margin: 0 auto;
        "
      >
        <the-loader />

        <p style="font-family: Work Sans; font-weight: bold">
          All available data is in progress...
        </p>
      </div>
    </div>
  <div class="container-fluid table-responsive overflow-auto shadow-sm" style="overflow-x:auto; height: 60vh; overflow-y: auto;">
      <table class="table" style="border: 1px solid #e3e3e3">
      <thead style="position: sticky; top: 0: back-ground-color: white;">
        <tr>
          <th
            class="col-3"
            scope="col"
            style="
              text-align: left;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
              padding-left: 15px;
            "
          >
            INDICATORS
          </th>
          <th
            scope="col"
            class="col-3"
            style="
              text-align: left;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
              padding-left: 30px;
            "
          >
            DATA SOURCES
          </th>
          <th
            class="col-3"
            scope="col"
            style="
              text-align: left;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
              padding-left: 30px;
            "
          >
            LEVELS
          </th>
          <th
            class="col-3"
            scope="col"
            style="
              text-align: left;
              font-size: 13px;
              font-family: Work Sans;
              font-weight: normal;
              padding-left: 30px;
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
            scope="row"
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
              style="
                font-size: 12px;
                font-family: Work Sans;
                padding-left: 19 px;
                text-align: left;
              "
            >
              <div class="col-md-9 p-0">
                {{ child.short_name }}
              </div>
            </td>
            <td class="section__datasource" style="">
              <template v-for="items in dataSources" class="">
                <template v-for="item in items.children">
                  <div
                    class="col-6 pt-0 pb-0 pl-1 pr-0 col-md-4"
                    style="
                      display: inline-block;
                      font-size: 11px;
                      font-family: Work Sans;
                    "
                    v-if="item.selected"
                    :key="item.id"
                  >
                    {{ item.datasource }}</div
                  >
                </template>
              </template>
            </td>
            <td >
              <template v-for="level in child.levels">
                <div
                  class="col-8 col-md-6 p-0"
                  style="
                    display: inline-block;
                    font-size: 12px;
                    font-family: Work Sans;
                  "
                  v-if="level.selected"
                  :key="level.value"
                >
                  {{ level.value }}</div
                >
              </template>
            </td>
            <td >
              <template v-for="year in child.years">
                <div
                  class="col-4 p-0 col-md-3"
                  style="
                    display: inline-block;
                    font-size: 11px;
                    font-family: Work Sans;
                  "
                  v-if="year.selected"
                  :key="year.value"
                >
                  {{ year.value }}</div
                >
              </template>
            </td>
          </tr>
        </template>
        <tr style=""></tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import TheLoader from '../../Loading/TheLoader.vue';

export default {
  props: ['indicator', 'dataSource', 'level', 'years'],
  components: {
    TheLoader,
  },
  data() {
    return {
      indicatorData: [],
    };
  },

  computed: {
    // Load the selected Levels
    indicatorsLevels() {
      return this.$store.getters.getprogramArea;
    },
    // Load the selected datasources
    dataSources() {
      return this.$store.getters.getDataSource;
    },
    showLoader() {
      return this.$store.getters.showloader;
    },
  },
};
</script>

<style scoped>
@media (min-width: 740px) {
  .section__datasource {
    width: 25%;
  }
}

@media screen and (max-width: 520px) {
  .dragable-list {
    width: 35%;
  }
}
</style>
