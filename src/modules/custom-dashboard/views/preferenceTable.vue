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
          <!-- <b class="selection-header">indicators selection</b><br />
          <div class="scroll">
            <div v-for="(p, index) in programAreas" :key="index">
              <div class="program-areas my-2 ">
                <input
                  :checked="isAllSelected(p.indicators, 'indicators')"
                  @click="toggleAll(p.indicators, 'indicators')"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
                {{ p.name }}
                <span style="float: right">▼</span>
              </div>
              <div v-for="(i, index) in p.indicators" :key="index" class="indicators">
                <input
                  class=""
                  id=""
                  :checked="isSelected(i, 'indicators')"
                  @click="toggle(i, 'indicators')"
                  type="checkbox"
                />
                <span>{{ i }}</span>
              </div>
            </div>
          </div> -->
          <indicators-selection
            @save-indicator="saveIndicator"
            @IndicatorSelect="SelectiveIndicator"
          />
          <!-- <indicators-selection :heading="'Years Selection'"/> -->
          <!-- <indicators-selection
            :heading="'Data Source Selection'"
            :programArea="this.category"
          /> -->

          <!-- <b class="selection-header">Data Source Selection</b><br />
          <div class="scroll">
            <div v-for="(c, index) in category" :key="index">
              <div class="program-areas my-2 ">
                {{ c.name }}
                <span style="float: right">▼</span>
              </div>
              <div v-for="(s, index) in c.sources" :key="index" class="indicators">
                <input class="" id="" @change="toggle(s, 'sources')" type="checkbox" />
                {{ s }}
              </div>
            </div>
          </div> -->
          <br />
          <data-source @save-dataSource="saveData" />
          <br />
          <div v-if="showList">
            <years-selection @save-year="saveYear" /> <br />
            <level-selection @save-level="saveLevel" />
          </div>
          <!-- <data-source /> -->
        </b-col>

        <!-- ****** Selected Items Table ****** -->

        <b-col sm="12" lg="9">
          <data-table
            :indicator="selectedIndicator"
            :dataSource="selectedDataSource"
            :years="selectedYears"
            :level="selectedLevel"
          />
          <!-- <div v-for="(area, index) in programAreas" :key="index">
            <b-table
              outlined
              :class="area == programAreas[0] ? 'first-table' : 'other-tables'"
              responsive
              :fields="fields"
              :items="items"
            >
              <template #head()="data">
                <p class="main-table-header text-center m-0">
                  {{ data.label.toUpperCase() }}
                </p>
              </template>
              <template #top-row="" :columns="1">
                <b-td colspan="12"
                  ><span class="">{{ area.name.toUpperCase() }}</span></b-td
                >
              </template>
              <template #cell(datasource)="data">
                <b-row align-h="start">
                  <b-col
                    cols="auto"
                    class=""
                    v-for="i in data.value"
                    :key="data.value.indexOf(i)"
                    ><span>{{ i }}</span></b-col
                  >
                </b-row>
              </template>
              <template #cell(level)="data">
                <b-row align-h="start">
                  <b-col
                    cols="auto"
                    class=""
                    v-for="i in data.value"
                    :key="data.value.indexOf(i)"
                    ><span>{{ i }}</span></b-col
                  >
                </b-row>
              </template>
              <template #cell(year)="data">
                <b-row align-h="start">
                  <b-col
                    cols="auto"
                    class=""
                    v-for="i in data.value"
                    :key="data.value.indexOf(i)"
                    ><span>{{ parseInt(i) }}</span></b-col
                  >
                </b-row>
              </template>
            </b-table>
          </div> -->
          <b-row align-h="end" class="text-right">
            <b-col cols="auto"
              >indicators: <b>{{ selectedIndicator.length }}</b></b-col
            >
            <b-col cols="auto"
              >Data Sources: <b>{{ selectedDataSource.length }}</b></b-col
            >
            <b-col cols="auto"
              >Period: <b>{{ selectedYears.length }} Years</b></b-col
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
              selectedIndicator.length > 0 &&
              selectedYears.length > 0 &&
              selectedDataSource.length > 0 &&
              selectedLevel.length > 0
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

export default {
  name: 'data-preferences',
  components: {
    IndicatorsSelection,
    DataSource,
    YearsSelection,
    LevelSelection,
    DataTable,
  },
  mounted() {
    this.$store.commit('updateStep', 2);
  },
  data() {
    return {
      selected: {
        indicators: [],
        period: [],
        sources: [],
      },
      selectedIndicator: [],
      selectedDataSource: [],
      selectedYears: [],
      selectedLevel: [],
      showList: false,
      allSelected: true,
      indeterminate: false,
      programAreas: [
        {
          name: 'RMNCH',

          fields: [
            'Total Fertility Rate',
            'ANC Coverage Rate (at least 1 visit)',
            'Skilled Birth Attendance',
            'Prevalence of Child with diarrhoea',
          ],
        },
        {
          name: 'NUTRITION',

          fields: [
            'Percentage of children under 6 months exclusiv...',
            'Prevalence of stunting in children under 5 years',
            'Prevalence of wasting in children under 5 years',
            'Underweight prevalence in children under 5 ye...',
          ],
        },
      ],
      category: [
        {
          name: 'ROUTINE',
          fields: ['NHMIS Annual', 'NHMIS Quarterly', 'NHMIS Monthly'],
        },
        {
          name: 'SURVEYS',
          fields: [
            'NDHS',
            'NHA',
            'KDGHS',
            'NARHS',
            'NAIIS',
            'NMIS',
            'NHSPSS',
            'PCCS',
            'MICS',
          ],
        },
      ],
      value: [],
      // programAreas: [
      //   "Reproductive, Maternal, Newborn & Child Health",
      //   "NUTRITION",
      //   "IMMUNIZATION",
      //   "MALARIA"
      // ],
      fields: [
        // A column that needs custom formatting
        { key: 'indicator', label: 'Indicators' },
        { key: 'datasource', label: 'Datasources' },
        { key: 'level', label: 'Level' },
        { key: 'year', label: 'years' },
      ],
      items: [
        {
          indicator: 'Maternal Health',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
        {
          indicator: 'Skilled attendance at delivery or birth',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
        {
          indicator: 'Total fertility rate',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
      ],
    };
  },
  methods: {
    isAllSelected(available, selected) {
      let value = true;
      available.every((element) => {
        if (!this.selected[selected].includes(element)) {
          value = false;
          return false;
        }
        value = true;
        return true;
      });
      return value;
    },
    saveIndicator(data) {
      this.selectedIndicator = data;
    },
    SelectiveIndicator(data) {
      this.showList = data;
    },
    saveData(data) {
      this.selectedDataSource = data;
    },
    saveYear(data) {
      this.selectedYears = data;
    },
    saveLevel(data) {
      this.selectedLevel = data;
    },
    approveData() {
      this.$router.push('data-table');
    },
    // toggle(item, arr) {
    //   if (this.selected[arr].includes(item)) {
    //     const index = this.selected[arr].indexOf(item);
    //     if (index > -1) {
    //       this.selected[arr].splice(index, 1);
    //     }
    //   } else {
    //     this.selected[arr].push(item);
    //   }
    // },
    // toggleAll(available, selected) {
    //   if (this.isAllSelected(available, selected)) {
    //     this.selected[selected] = [];
    //   } else {
    //     available.forEach((element) => {
    //       if (!this.selected[selected].includes(element)) {
    //         this.selected[selected].push(element);
    //       }
    //     });
    //   }
    // },
    // isSelected(item, collection) {
    //   return this.selected[collection].includes(item);
    // },
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
