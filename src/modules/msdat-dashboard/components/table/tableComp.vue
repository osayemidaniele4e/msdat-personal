<template>
  <div>
    <div v-if="!loading" class="table-responsive">
      <table class="table table-bordered align-middle">
        <tbody>
          <tr>
            <td
              rowspan="2"
              scope="col"
              class="text-center align-middle border-0"
            ></td>
            <th
              rowspan="2"
              scope="col"
              class="align-middle text-center text-uppercase h6 font-weight-bold"
            >
              <div class="d-flex justify-content-between align-items-center">
                <span>Indicators</span>
                <b-icon-arrow-clockwise />
              </div>
            </th>
            <!-- This loop through the available classification eg. Routine,Survey,Estimate -->
            <td
              v-for="(value, name) in classify"
              :key="name"
              :colspan="value"
              class="classification-row text-uppercase text-center align-middle p-0"
            >
              {{ name }}
            </td>
          </tr>
          <!-- This loop through the available dataSource from the dataOptions
          eg. Routine,Survey,Estimate -->
          <tr>
            <template v-for="(dt, index) in source">
              <TableDataSourceCell
                :key="index"
                :source="dt"
                @source:click="log($event)"
                @source-info:click="$emit('selected:source-info',$event)"
                :selectedSource="selectedSource"
              />
            </template>
          </tr>

          <!-- The display the the first indicator of the array of indicator -->
          <!-- please note that the first indicator is assumed to be
          the main indicator and others, the related indicators -->

          <TableDataRow class="bg-primary text-white" :rowData="dataArray[0]">
            <template #indicator>
              <slot name="indicator-0"></slot>
            </template>
            <template #default>
              <td
                class="text-center p-2"
                v-for="(dt, index) in source"
                :key="index"
                scope="col"
              >
                <!-- percentage values and year -->
                <TableDataCell
                  :cellData="getValueForColumn(dataArray[0].values, dt)"
                  :dataColors="' '"
                />
              </td>
            </template>
          </TableDataRow>

          <!-- The is the Row or the NHMIS detail of the related indicators -->
          <transition name="fade">
            <tr class="border-0" v-show="selectedSource === 'NHMIS'">
              <td class="border-0"></td>
              <!-- Use this slot to set the NHMIS DETAIL example(Num Denum) -->
              <td colspan="8" class="num-denom">
                <slot name="NHMIS-DETAILS"></slot>
              </td>
            </tr>
          </transition>

          <tr class="">
            <td class="border-0"></td>
            <td colspan="8"  class="border-0">
              <h6 class="text-uppercase font-weight-bold">Related Indicators</h6>
            </td>
          </tr>

          <!-- This loops  the the other indicator of the array of indicators -->
          <template v-for="(indicatorData, index) in dataArray">
              <TableDataRow
                :key="indicatorData.indicator"
                v-if="index > 0"
                :rowData="indicatorData"
              >
                <template #indicator>
                  <slot :name="`indicator-${index}`"></slot>
                </template>

                <template #default>
                  <td
                    class="text-center p-2"
                    v-for="(dt, index) in source"
                    :key="index"
                    scope="col"
                  >
                    <TableDataCell
                      :cellData="getValueForColumn(indicatorData.values, dt)"
                      :dataColors="'#515151; #888888;'"
                    />
                  </td>
                </template>
              </TableDataRow>

              <!-- This craetes a space between the related indicators table rows -->
              <div
                :key="index"
                v-if="index===1"
                class="py-2"
              ></div>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="d-flex justify-content-center text-center">
      <div
        class="spinner-border"
        style="width: 4rem; height: 4rem"
        role="status"
      ></div>
    </div>
  </div>
</template>

<script>
import { flatten, uniq, countBy } from 'lodash';
import TableDataCell from './TableDataCell.vue';
import TableDataSourceCell from './TableDataSourceCell.vue';
import TableDataRow from './TableDataRow.vue';

export default {
  name: 'TableComponent',
  components: {
    TableDataCell,
    TableDataSourceCell,
    TableDataRow,
  },
  props: {
    /**
     * The data array of data to be displayed in a particular format on the
     * data
     */
    dataArray: {
      type: [Array],
      required: true,
    },
    /**
    * To toggle the Loading state of the table
    */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
    * To controls the order of the indicators
    * @description please note that the order comes according to there
    * classification(Routine,Survey then Estimate)
    * meaning in the order all routine data sources comes first in the array then survey
    * following that pattern
    *
    */
    orderSourceBy: {
      type: [Array],
      required: false,
      default: () => (['NHMIS', 'MICS', 'NDHS', 'NARHS', 'IHME', 'IHME SDG']),
    },
  },
  data() {
    return {
      /**
       * The classification object
       */
      classify: {},
      /**
       * This send the selected Source to the Child component to Highlight
       */
      selectedSource: '',
      /**
       * This store the all the data sources available in the data parsed
       */
      source: []
    };
  },
  methods: {
    /**
     * @param {array}  valueArray Array of values to be
     * @param {string} column The data source associated to the column
     * @return {object} object of the  data source relating to the dataSource Column
     *  @example
     *  {
              dataSources: 'NHMIS',
              value: '20',
              factor: '%',
              year: 2020,
              classification: 'Routine',
            },
     *
     */
    getValueForColumn(valueArray, column) {
      const valueObj = valueArray.find((e) => e.dataSources === column);
      if (valueObj) {
        return valueObj;
      }
      return null;
    },
    /**
     * this filter thorough the array of data parse and et all available  Parsed
     */
    getAvailableDataSources() {
      const arraySource = this.dataArray.map(
        (e) => e.values.map((et) => et.dataSources),
      );
      const allAvailableSources = uniq(flatten(arraySource));
      /**
       * order AvailableSources according to the OrderSourceBy Array;
       */
      allAvailableSources.sort(
        (a, b) => this.orderSourceBy.indexOf(a) - this.orderSourceBy.indexOf(b),
      );
      this.source = allAvailableSources;
    },
    /**
     * This gets the maximum amount to dataSource classification
     * for each classification(Routine,Survey,Estimate) in the data
     * array provided
     *
     */
    getDataSourcesClassification() {
      const countClassification = this.dataArray.map(
        (e) => e.values.map((et) => et.classification),
      );
      const counted = countClassification.map((e) => countBy(e));
      const classic = {};
      counted.forEach((e) => {
        const objectKey = Object.keys(e);
        objectKey.forEach((key) => {
          if (e[key] > 0) {
            if (!(key in classic)) {
              classic[key] = 0;
            }
            if (classic[key] < e[key]) {
              classic[key] = e[key];
            }
          }
        });
      });
      this.classify = classic;
    },

    log(e) {
      console.log(e);
      if (this.selectedSource === e) {
        this.selectedSource = '';
        return;
      }
      this.selectedSource = e;
      this.$emit('selected:source', e);
      // this.rowShow = !this.rowShow;
    }
  },
  watch: {
    dataArray: {
      handler() {
        this.getAvailableDataSources();
        this.getDataSourcesClassification();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");

  // table scroll bar
  ::-webkit-scrollbar {
    height: 8px;
    border: 1px solid #b7b7b7;
  }
  ::-webkit-scrollbar-track {
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bebebe;
    border-radius: 4px;
  }

  table.table {
    // selected data source
    .table-active {
      background-color: #2b5d5b;
    }

    .classification-row {
      font-size: 10px;
    }

    // numerator & denominator transition
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }

    &>tbody {
      &>tr:first-child {
        // Indicator text, Refresh button and Classifications
        th>div {
          svg {
            font-size: 20px;
            color: #2b5d5b;
            cursor: pointer;
          }
        }
      }

      // numerator - denominator section
      td.num-denom {
        background-color: #2b5d5b;
      }
    }
  }
</style>
