<template>
  <div>
    <div v-if="!loading" class="table-responsive">
      <table class="table table-bordered align-middle text-nowrap">
        <tbody>
          <tr>
            <td rowspan="2" scope="col" class="text-center align-middle border-0"></td>
            <th
              rowspan="2"
              scope="col"
              class="
                align-middle
                text-center text-uppercase
                h6
                font-weight-bold
              "
            >
              <div class="d-flex justify-content-between align-items-center">
                <span>Indicators</span>
                <span id="reset" @click="$emit('reset')" ><b-icon-arrow-clockwise /></span>
              </div>
            </th>
            <!-- This loop through the available classification eg. Routine,Survey,Estimate -->
            <td
              v-for="(value, index) in classify"
              :key="index"
              :colspan="value[1]"
              class="
                classification-row
                text-uppercase text-center
                align-middle
                p-0
              "
            >
              {{ value[0] }}
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
                @source-info:click="$emit('selected:source-info', $event)"
                :selectedSource="selectedSource"

                @value="getValue"
                @key="getKey"
              />
            </template>
          </tr>

          <!-- The display the the first indicator of the array of indicator -->
          <!-- please note that the first indicator is assumed to be
          the main indicator and others, the related indicators -->

          <TableDataRow
            class="bg-primary text-white"
            :rowData="dataArray[0]"
            @indicator-info:clicked="$emit('selected:indicator-info', $event)"
          >
            <template v-slot:indicator="props">
              <slot name="indicator-0" :indicator="props"></slot>
            </template>
            <template #default>
              <td class="text-center p-2" v-for="(dt, index) in source" :key="index" scope="col">
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
            <tr class="border-0" v-if="selectedSource === 'NHMIS'">
              <td class="border-0"></td>
              <!-- Use this slot to set the NHMIS DETAIL example(Num Denum) -->
              <td colspan="30" class="num-denom">
                <slot name="NHMIS-DETAILS">
                  <h5>NUM DENUM SLOTS</h5>
                </slot>
              </td>
            </tr>
          </transition>

          <tr class="" v-if="dataArray.length > 1">
            <td class="border-0"></td>
            <td colspan="30" class="border-0">
              <h6 class="text-uppercase font-weight-bold">Related Indicators</h6>
            </td>
          </tr>

          <!-- This loops  the the other indicator of the array of indicators -->
          <!-- TODO: fix -->
          <template v-for="(indicatorData, index) in dataArray">
            <TableDataRow
              :key="indicatorData.indicator.id"
              v-if="index > 0"
              :rowData="indicatorData"
              @indicator-info:clicked="$emit('selected:indicator-info', $event)"
            >
              <template v-slot:indicator="props">
                <slot :name="`indicator-${index}`" :indicator="props"></slot>
              </template>

              <template #default>
                <td class="text-center p-2" v-for="(dt, index) in source" :key="index" scope="col">
                  <TableDataCell
                    :cellData="getValueForColumn(indicatorData.values, dt)"
                    :dataColors="'#515151; #888888;'"
                  />
                </td>
              </template>
            </TableDataRow>

            <!-- This creates a space between the related indicators table rows -->
            <div :key="index" class="py-2"></div>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="d-flex justify-content-center text-center">
      <div class="spinner-border" style="width: 4rem; height: 4rem" role="status"></div>
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
      // SOMEONE NEEDS TO COME AND REFACTOR THIS IMPLEMENTATION ASAP
      default: () => [
        'NHMIS',
        'NGF',
        'MICS',
        'NHWCP',
        'AAS',
        'GHS',
        'NLSS',
        'DSB',
        'NHFS',
        'PCCS',
        'UNAIDS',
        'NHSPSS',
        'NHA',
        'KDGHS',
        'NAIIS',
        'NDHS',
        'NARHS',
        'NNHS',
        'NMIS',
        'World Bank',
        'WHO-GHO',
        'IHME',
        'ILOSTAT',
        'WUENIC',
        'UNDP',
      ],
    },

    setSelectedSource: {
      type: Object,
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
      selectedSource: {},
      /**
       * This store the all the data sources available in the data parsed
       */
      source: [],

      classificationOrder: ['Routine', 'Survey', 'Estimate'],
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
      const arraySource = this.dataArray.map((e) => e.values.map((et) => et.dataSources));
      const allAvailableSources = uniq(flatten(arraySource));
      // debugger;
      /**
       * order AvailableSources according to the OrderSourceBy Array;
       */
      const sortedSource = allAvailableSources.sort(
        (a, b) => this.orderSourceBy.indexOf(a.datasource)
         - this.orderSourceBy.indexOf(b.datasource),
      );
      this.source = sortedSource;
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
      // Order classification following the Order
      const result = Object.keys(classic).map((key) => [key, classic[key]]);
      const resultSorted = result.sort(
        (a, b) => this.classificationOrder.indexOf(a[0])
          - this.classificationOrder.indexOf(b[0]),
      );
      this.classify = resultSorted;
    },

    log(e) {
      // console.log(e);
      if (this.selectedSource === e) {
        this.selectedSource = '';
        return;
      }
      this.selectedSource = e;
      this.$emit('selected:source', e);
      // this.rowShow = !this.rowShow;
    },

    // new emits

    getValue(value) {
      this.$emit('clickedDatasource', value);
    },
    getKey(key) {
      this.$emit('key', key);
    },
  },
  watch: {
    dataArray: {
      handler() {
        // console.log(newValues);
        this.getAvailableDataSources();
        this.getDataSourcesClassification();
      },
      deep: true,
      immediate: true,
    },

    setSelectedSource(newValue) {
      this.selectedSource = newValue;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
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

  & > tbody {
    & > tr:first-child {
      // Indicator text, Refresh button and Classifications
      th > div {
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

<style scoped>
/* to remove */
    #reset{
      transform: rotate(360deg);
      transition: all 1s ease-in-out;
      /* background-color: black; */
  }

    #reset:hover{
      font-weight: 700;
       transform: rotate(180deg);
  }
</style>
