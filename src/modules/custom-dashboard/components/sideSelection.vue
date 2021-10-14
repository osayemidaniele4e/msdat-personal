<template>
  <div>
    <b class="selection-header">indicators selection</b><br />
    <div class="scroll">
      <div v-for="(p, index) in programAreaNIndicators" :key="index">
        <div class="program-areas my-2">
          <div class="form-check">
            <!-- <input class="form-check-input" type="checkbox" /> -->
            <label class="form-check-label" for="defaultCheck1">
              {{ p.program_area }}
            </label>
          </div>
        </div>
        <b-form-group v-slot="{ ariaDescribedby }">
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
          <span style="float: right">▼</span>
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
  </div>
</template>

<script>
import fetchData from './fetchData';

export default {
  mixins: [fetchData],
  data() {
    return {
      periodOptions: [
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
        '1999',
        '1998',
        '1997',
        '1996',
        '1995',
        '1994',
        '1993',
        '1992',
        '1991',
      ],
      levelOptions: ['National', 'Zonal', 'LGA', 'State'],
    };
  },
  computed: {
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
#link-to-about {
  color: #1496b1;
}
// .custom-control-label::after {
//     position: absolute;
//     top: 0.25rem;
//     left: -1.5rem;
//     display: block;
//     width: 1rem;
//     height: 1rem;
//     content: "";
//     background: no-repeat 50%/50% 50%;
//     border: 1px solid black;
//     border-radius: 2px;
// }
// .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
//     background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e);
// }
</style>
