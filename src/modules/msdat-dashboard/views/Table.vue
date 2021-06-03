<template>
    <div>
        <h1>MSDAT DASHBOARD</h1>
        <table-component2 />
        <TableComponent
        :dataArray="exampleData">
          <!-- nhmis details (numerator - denominator) -->
          <template #NHMIS-DETAILS>
            <div class="nhmis-details d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <span class="mr-1">nhmis</span> <span>2016</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <b>numerator:</b>
                  <span>Total number of doses - 858,814</span>
                </div>
                <div>
                  <b>denominator:</b>
                  <span>total number of children - 923,456</span>
                </div>
              </div>
            </div>
          </template>

          <!-- main indicator dropdown select -->
          <template
            v-for="(n, index) in ['indicator-0', 'indicator-1', 'indicator-2']"
            v-slot:[n]="{indicator}"
          >
            <select
              :key="index"
              @change="indicatorChanged"
              v-model="selectedIndicator"
              :class="`indicator-${index}`"
              :value="indicator.indicator"
            >
              <optgroup>
                <option class="indicator-group" disabled>{{indicator.indicator}}</option>
                <option class="indicator-group" disabled>mortality</option>
                <option
                  class="py-3"
                  value="skilled attendance at delivery or birth"
                >skilled attendance at delivery Or birth</option>
                <option
                  class="py-3"
                  value="skilled attendance at delivery or birth2"
                >skilled attendance at delivery Or birth2</option>
              </optgroup>
            </select>
          </template>
        </TableComponent>
    </div>
</template>

<script>
import TableComponent2 from '../components/table/TableComponent2.vue';
import TableComponent from '../components/table/TableComponent.vue';
import exampleData from '../components/table/data-format.example';

export default {
  data() {
    return {
      exampleData,
      /* main indicator selected */
      selectedIndicator: 'skilled attendance at delivery or birth',
      /* related indicator selected */
      relatedIndicator: 'related skilled attendance at delivery or birth',
    };
  },
  components: { TableComponent, TableComponent2 },
  methods: {
    /** updates data for selected indicator */
    indicatorChanged(indicator) {
      console.log(indicator);
    },
  },
};
</script>

<style lang="scss" scoped>

.classification-row{
  font-size: 10px;
}

// dropdown select for main and related indicators
select {
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: bolder;
  text-transform: uppercase;

  // main indicator multiselect
  &.indicator-0 {
    color: #ffffff;
  }

  // related indicator(s) multiselect
  &:not(&.indicator-0) {
    color: #005d59;
  }

  // select element on focus
  &:focus,
  &:active {
    border: none;
    outline: none;
    outline-offset: 0;
  }

  optgroup {
    border: 1px solid #E0E2E4;
    color: #000000;

    option {
      font-family: 'Work Sans';
      font-size: 13px;
      font-weight: 500;
      text-align: left;
      letter-spacing: 0px;
      background-color: #ffffff;
      color: #000000;

      // indicator group
      &.indicator-group {
        border: 1px solid #E0E2E4;
        font-size: 14px;
        font-weight: bolder;
        background-color: #D4E4DE;
        color: #000000 !important;
      }
    }
  }
}

// numerator - denominator section
div.nhmis-details {
  background-color: #2b5d5b;

  // nhmis year column
  & > div:first-child {
    width: 20%;

    span {
      font-size: 12px;
      font-weight: bolder;
      text-transform: uppercase;
      color: #ffffff;
    }
  }
  // numerator and denominator value column
  & > div:last-child {
    width: 80%;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 0.7% 1.5%;
    color: #000000;
    font-size: 12px;
    text-transform: capitalize;

    span:last-child {
      font-weight: lighter !important;
    }
  }
}

</style>
