<template>
  <b-container class="text-justify px-5" fluid>
    <p><b>Select your preferences</b></p>
    <p>
      Select the Program Areas, Data Sources, Period and Coverage Levels you are
      interested in.
    </p>
    <p id="link-to-about">
      <b>View datasheet</b>- see all available data in database
    </p>
    <b-card>
      <b-row>
        <!-- **** Preferences Selection *****  -->

        <b-col sm="12" lg="3">
          <indicators-selection @IndicatorSelect="SelectiveIndicator" />
          <br />
          <data-source />
          <br />
          <div v-if="showList == true">
            <years-selection @show-notes="showNote" />
            <br />
            <level-selection />
          </div>
          <div v-if="showNotes">
            <notes />
          </div>
        </b-col>

        <!-- ****** Selected Items Table ****** -->

        <b-col sm="12" lg="9">
          <data-table />
          <b-row align-h="end" class="text-right">
            <b-col cols="auto"
              >Indicators: <b>{{ indicatorsCount }} selected</b></b-col
            >
            <b-col cols="auto"
              >Data Sources: <b>{{ dataSourceCount }} selected</b></b-col
            >
            <b-col cols="auto"
              >Period: <b>{{ yearsCount }} Years</b></b-col
            >
            <b-col cols="auto"
              >Levels:
              <b v-for="level in selectedLevel" :key="level"
                >{{ level }},</b
              ></b-col
            >
          </b-row>
          <b-row
            align-h="end"
            class="mt-5 text-right"
            v-if="
              indicatorsCount && dataSourceCount && yearsCount && selectedLevel
            "
          >
            <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col>
            <b-col cols="auto"
              ><b-button @click="approveData">approve Data</b-button></b-col
            >
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import IndicatorsSelection from '../components/preferences/selection/IndicatorsSelection.vue';
import DataSource from '../components/preferences/selection/DataSourceSelection.vue';
import YearsSelection from '../components/preferences/selection/YearsSelection.vue';
import LevelSelection from '../components/preferences/selection/LevelSelection.vue';
import DataTable from '../components/preferences/dataTable/DataTable.vue';
import Notes from '../components/preferences/notes/Notes.vue';

export default {
  name: 'data-preferences',
  components: {
    IndicatorsSelection,
    DataSource,
    YearsSelection,
    LevelSelection,
    DataTable,
    Notes,
  },
  mounted() {
    this.$store.commit('updateStep', 2);
  },
  data() {
    return {
      showNotes: false,
      showList: false,
    };
  },
  computed: {
    indicatorsCount() {
      let count = 0;
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              count++;
            }
            return child;
          });
        }
        return element;
      });
      return count;
    },
    dataSourceCount() {
      let count = 0;
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              child.sources.map((source) => {
                count = source.children.length;
                return source;
              });
            }
            return child;
          });
        }
        return element;
      });
      return count;
    },
    yearsCount() {
      let count = 0;
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              child.years.map((year) => {
                if (year.selected === true) {
                  count++;
                }
                return year;
              });
            }
            return child;
          });
        }
        return element;
      });
      return count;
    },
    selectedLevel() {
      let selectedLevels = [];
      this.$store.getters.getprogramArea.map((element) => {
        if (element.parent.isChildSelected === true) {
          element.children.map((child) => {
            if (child.selected === true) {
              child.levels.map((level) => {
                if (level.selected === true) {
                  selectedLevels.push(level.value);
                } else {
                  selectedLevels;
                }
                return level;
              });
            }
            return child;
          });
        }
        return element;
      });
      selectedLevels = [...new Set(selectedLevels)];
      return selectedLevels;
    },
  },
  methods: {
    showNote(data) {
      this.showNotes = data;
    },
    SelectiveIndicator(data) {
      this.showList = data;
    },

    approveData() {
      this.$router.push('data-table');
      // console.log(this.selectedIndicator.value);
      // this.$store.dispatch('selectedIndicator', this.selectedIndicator);
      // this.$store.dispatch('selectedDataSource', this.selectedDataSource);
      // this.$store.dispatch('selectedYears', this.selectedYears);
      // this.$store.dispatch('selectedLevels', this.selectedLevel);
    },
  },
};
</script>

<style lang="scss" scoped>
.program-areas {
  background-color: #f3f3f3;
  border-color: #f3f3f3;
  max-height: 27.00000675px;
  color: #202020;
  font-family: 'DM Sans', sans-serif;
  font-weight: normal;
  font-size: 12.000003px;
}
.indicators {
  max-height: 27.00000675px;
  color: #202020;
  font-family: 'DM Sans', sans-serif;
  font-weight: normal;
  font-size: 12.000003px;
}
input {
  margin: 0px 7.342501836px 0px 0px;
}
.baseline {
  margin-top: auto !important;
}

div.scroll {
  // max-height: 110px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 27.750006938px;
}
.selection-header {
  color: #202020;
  font-size: 13.5px;
}
.table-responsive {
  font-family: 'DM Sans', sans-serif;
  font-weight: normal;
}
.b-table-top-row {
  background-color: #cee4e9;
  color: #000000;
  font-weight: bold;
  font-size: 12px;
  height: 33.750000008px;
  pointer-events: none;
}
thead {
  font-weight: normal !important;
  font-size: 10.500000003px;
  color: #202020;
  height: 73px;
}
.table td {
  padding-right: 40px !important;
  padding-left: 25.384615385px;
  font-size: 10.769230769px;
}

.other-tables {
  thead {
    display: none;
  }
}

.btn {
  background-color: #3f8994;
  color: #ffffff;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #3f8994;
  font-size: 15.00000375px;
}
#link-to-about {
  color: #1496b1;
}
</style>
