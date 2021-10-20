<template>
  <div>
    <b class="selection-header">indicators selection</b><br />
    <div class="scroll">
      <div v-for="(p, index) in programAreaIndicators" :key="index">
        <div class="program-areas my-2">
          <b-form-checkbox v-model="fullProgramAreaSelected" :key="p.id" :value="p">
            {{ p.program_area.toUpperCase() }}
          </b-form-checkbox>
          <span @click="toggleDropDown(p)" style="float: right; color: #D3D3D3;">▼</span>
        </div>
        <b-form-group v-show="dropIsToggled(p)" v-slot="{ ariaDescribedby }">
          <b-form-checkbox
            v-for="option in p.indicators"
            v-model="indicatorsSelected"
            :key="option.id"
            :value="option"
            :aria-describedby="ariaDescribedby"
          >
            {{ option.short_name }}
          </b-form-checkbox>
        </b-form-group>
      </div>
    </div>

    <b class="selection-header">Data Source Selection</b><br />
    <div class="scroll">
      <div v-for="(c, index) in groupedDataSource" :key="index">
        <div class="program-areas my-2">
          {{ c.classification }}
        </div>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox
            v-for="option in c.indicators"
            v-model="dataSourceSelected"
            :key="option.id"
            :value="option"
            :aria-describedby="ariaDescribedby"
            inline
          >
            {{ option.datasource }}
          </b-form-checkbox>
        </b-form-group>
      </div>
    </div>

    <b class="selection-header">Period Selection</b><br />
    <p>Select available years under each source</p>
    <div class="scroll">
      <div v-for="(c, index) in dataSourceSelected" :key="index">
        <div class="program-areas my-2">
          {{ c.datasource }}
          <span style="float: right">▼</span>
        </div>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="periodSelected"
            :options="distinctYears"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
    </div>
    <!-- LEVEL SELECTION -->
    <b class="selection-header">Level Selection</b><br />
    <div class="scroll">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="levelSelected"
          :options="levelOptions"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>
    <!-- NOTES -->
    <b class="selection-header">Notes</b><br />
    <div class="mb-4 mb-lg-0">
      <label for="notes" class="form-label"></label>
      <input type="text" class="form-control" id="notes" :aria-describedby="notes" />
    </div>
  </div>
</template>

<script>
import fetchData from './fetchData';

export default {
  mixins: [fetchData],
  data() {
    return {
      levelOptions: ['National', 'Zonal', 'LGA', 'State'],
      expandedProgramAreas: [],
    };
  },
  computed: {
    fullProgramAreaSelected: {
      get() {
        return this.$store.state.CUSTOM_DASHBOARD_STORE.fullProgramAreaSelected;
      },
      set(values) {
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setFullProgramAreaSelected', values);
      },
    },
    indicatorsSelected: {
      get() {
        return this.$store.state.CUSTOM_DASHBOARD_STORE.indicatorsSelected;
      },
      set(values) {
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setIndicatorSelected', values);
      },
    },
    dataSourceSelected: {
      get() {
        return this.$store.state.CUSTOM_DASHBOARD_STORE.dataSourceSelected;
      },
      set(values) {
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setDataSourceSelected', values);
      },
    },
    periodSelected: {
      get() {
        return this.$store.state.CUSTOM_DASHBOARD_STORE.periodSelected;
      },
      set(value) {
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setPeriodSelected', value);
      },
    },
    levelSelected: {
      get() {
        return this.$store.state.CUSTOM_DASHBOARD_STORE.levelSelected;
      },
      set(value) {
        this.$store.commit('CUSTOM_DASHBOARD_STORE/setLevelSelected', value);
      },
    },
  },

  watch: {
    fullProgramAreaSelected(newValue) {
      const indicators = [];
      newValue.forEach(function e(programArea) {
        this.push(...programArea.indicators);
      }, indicators);
      this.$store.commit('CUSTOM_DASHBOARD_STORE/setIndicatorSelected', indicators);
    },
  },

  methods: {
    toggleDropDown(programArea) {
      const index = this.expandedProgramAreas.indexOf(programArea);
      if (index > -1) {
        this.expandedProgramAreas.splice(index, 1);
      } else {
        this.expandedProgramAreas.push(programArea);
      }
    },
    dropIsToggled(programArea) {
      return this.expandedProgramAreas.includes(programArea);
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
  max-height: 300px;
  border: 2px solid #f3f3f3;
  padding: 4px;
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
.custom-control-label {
  display: block !important;
}
#link-to-about {
  color: #1496b1;
}
#notes {
  height: 15vh;
}
</style>
