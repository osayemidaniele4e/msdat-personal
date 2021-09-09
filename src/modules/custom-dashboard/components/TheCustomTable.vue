<template>
  <!-- <div> -->
  <div class="table-responsive work-sans">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="width: 35%">INDICATOR</th>
          <th scope="col" style="width: 25%">DATA SOURCES</th>
          <th scope="col" style="width: 20%">LEVEL</th>
          <th scope="col" style="width: 20%">YEARS</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr>
        <th id="par" class="span" colspan="5" scope="colgroup">RMNCH</th>
      </tr>
      <tr>
        <td>Maternal Health</td>
        <td>
          NHMIS NDHS NHMIS NDHS<br />
          NDHS NDHS NHMIS NDHS
        </td>
        <td>National Zonal Subnational LGA</td>
        <td>
          2019 2018 2017 2016 2005 <br />
          2019 2018 2017 2016 2005
        </td>
      </tr> -->
        <template v-for="(i, index) in groupIndicators">
          <tr :key="index" style="background-color: #cee4e9">
            <th id="par" class="span" colspan="5" scope="colgroup">
              {{ i.program_area }}
            </th>
          </tr>
          <template v-for="(j, index2) in i.indicators">
            <tr :key="`${index2}${j.id}`">
              <td class="span" scope="colgroup">
                {{ j.short_name }}
              </td>
              <td class="span" scope="colgroup">
                {{ datasources.join(' ') }}
              </td>
              <td class="span" scope="colgroup">
                {{ level.join(' ') }}
              </td>
              <td class="span" scope="colgroup">
                {{ period.join(' ') }}
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
  <!-- </div> -->
</template>

<script>
import { groupIndicator } from '@/util/helper';

export default {
  name: 'TheCustomTable',
  data() {
    return {
      // groupIndicators: [],
      indicators: '',
      // datasources: [],
      // period: [],
      // level: [],
      item: '',
    };
  },
  props: {
    values: {
      type: Object,
    },
  },
  computed: {
    groupIndicators: {
      get() {
        const indicator = this.$store.state.CUSTOM_DASHBOARD_STORE.indicatorsSelected;
        // return groupIndicator(indicator, 'program_area');
        if (indicator.length > 0) {
          return groupIndicator(indicator, 'program_area');
        }
        return [];
      },
      set(value) {
        return value;
      },
    },
    datasources: {
      get() {
        const datasource = this.$store.state.CUSTOM_DASHBOARD_STORE.dataSourceSelected;
        if (datasource.length > 0) {
          return datasource.map((item) => item.datasource);
        }
        return [];
      },
      set(value) {
        return value;
      },
    },
    level: {
      get() {
        const level = this.$store.state.CUSTOM_DASHBOARD_STORE.levelSelected;
        if (level.length > 0) {
          return level;
        }
        return [];
      },
      set(value) {
        return value;
      },
    },
    period: {
      get() {
        const period = this.$store.state.CUSTOM_DASHBOARD_STORE.periodSelected;
        if (period.length > 0) {
          return period;
        }
        return [];
      },
      set(value) {
        return value;
      },
      // debugger;
    },
  },

  watch: {
    values: {
      handler(newVal) {
        console.log(newVal);
        this.indicators = newVal.indicatorsSelected;
        console.log(this.indicators);
        this.groupIndicators = groupIndicator(this.indicators, 'program_area');
        this.datasources = newVal.dataSourceSelected.map(
          (item) => item.datasource,
        );
        this.period = newVal.periodSelected ? newVal.periodSelected : [];
        this.level = newVal.levelSelected ? newVal.levelSelected : [];
        // this.groupIndicators();
        console.log(this.groupIndicators);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.selection-header {
  color: #202020;
  font-size: 13.5px;
}
.scroll {
  // max-height: 110px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 27.750006938px;
  max-height: 300px;
}
</style>
