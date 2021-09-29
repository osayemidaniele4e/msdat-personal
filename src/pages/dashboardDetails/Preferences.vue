<template>
  <div class="container " >
    <section class="row">
      <h5>Select your preferences.</h5>
      <p>
        Select the Program Areas, Data Sources, Period and Coverage Levels you
        are interested in.
      </p>

    </section>
    <div class="row border border-dark" >

      <section class="col-3 border-right border-dark">
        <div class="row p-2">
          <Card>
            <h5 style="font-size: 14px;">Indicators Selection</h5>
            <ul v-for="items in heading" :key="items" style="list-style:none; margin-left: -25px;" >
              <li style="background: #f3f3f3;">
                {{ items.parent }}
   
              </li>
              <li>
                <ul v-for="item in items.children" :key="item.id" style="list-style:none; ">
                  <li>
                    <input
                      type="checkbox"
                      name=""
                      :id="item.id"
                      :value="item.short_name"
                      @click="selectIndicator($event, items.parent, item.id)"
                    />
                    {{ item.short_name }}
                  </li>
                </ul>
              </li>
            </ul>
          </Card>
        </div>
        <div class="row p-2">
          <data-source @save-dataSource="saveData" />
        </div>
        <div v-if="showList" class="row p-2">
          <years-selection @save-year="ClickedYear" />
        </div>
        <div v-if="showList" class="row p-2">
          <level-selection @save-level="clickedLevel" />
        </div>
      </section>
      <section class="col-9" style="border-left: 1px solid">
        <data-table
          :indicator="selectedIndicator"
          :dataSource="selectedDataSource"
          :level="selectedLevel"
          :years="selectedYear"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Card from "../../components/Card.vue";
import DataSource from "../../components/dashboardDetails/DataSourceSelection.vue";
import LevelSelection from "../../components/dashboardDetails/LevelSelection.vue";
import YearsSelection from "../../components/dashboardDetails/YearsSelection.vue";
import DataTable from "../../components/dashboardDetails/dataTable/DataTable.vue";
export default {
  components: {
    Card,
    DataSource,
    DataTable,
    LevelSelection,
    YearsSelection,
  },
  data() {
    return {
      list: true,
      getRmnchList: [],
      selectedIndicator: [],
      selectedDataSource: [],
      selectedLevel: [],
      selectedYear: [],
      obj: {},
      showList: false,
    };
  },
  computed: {
    heading() {
      return this.$store.getters["indicators/getprogramArea"];
    },
    filteredIndicators() {
      return this.$store.getters["indicators/indicators"];
    },
  },

  created() {
    this.loadIndicators();

    this.loadDataSource();
  },

  methods: {
    loadIndicators() {
      this.$store.dispatch("indicators/loadIndicators");
    },

    loadDataSource() {
      this.$store.dispatch("indicators/loadDataSource");
    },
    opennav(value) {
      this.$store.dispatch("indicators/getByProgramAreaData", value);
      this.getRmnchList = this.$store.getters["indicators/getRmnchs"];
    },

    doesProgramAreaExist(programArea) {
      return this.filteredIndicators.filter(
        (x) => x.program_area === programArea
      );
    },
    selectIndicator(e, parentValue, childId) {
      this.$store.dispatch("indicators/loadCoverageLevels", childId);
      this.$store.dispatch("indicators/loadYears", childId);
      let parentObject = this.getParentEntity(parentValue);
      console.log(childId);
      if (e.target.checked) {
        let child = {
          value: e.target.value,
          id: childId,
        };
          this.showList = true;
        if (parentObject) {
          parentObject.childs.push(child);
        } else if (!parentObject) {
          parentObject = { childs: [child], parent: parentValue };
          this.selectedIndicator.push(parentObject);
        }
      } else {
        this.selectedIndicator;
        parentObject.childs = parentObject.childs.filter(
          (child) => child.id != childId
        );
        if (parentObject.childs.length == 0) {
          this.showList = false
          this.selectedIndicator = this.selectedIndicator.filter(
            (ind) => ind.parent != parentObject.parent
          );
        }
      }
      ("selectedIndicator");
      this.selectedIndicator;
    },
    saveData(data) {
      this.selectedDataSource = data;
    },
    clickedLevel(data) {
      this.selectedLevel = data;
    },
    ClickedYear(data) {
      this.selectedYear = data;
    },
    getParentEntity(parentKey) {
      if (this.selectedIndicator.length > 0) {
        let filteredList = this.selectedIndicator.filter(
          (item) => item.parent === parentKey
        );
        if (filteredList && filteredList.length > 0) {
          return filteredList[0];
        }
      }
      return null;
    },
  },
};
</script>

<style scoped>

</style>