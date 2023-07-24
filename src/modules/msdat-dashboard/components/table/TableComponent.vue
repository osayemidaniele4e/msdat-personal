<template>
  <div class="">
    <div v-if="!loading" class="table-responsive">
      <table class="table table-bordered align-middle text-nowrap">
        <tbody>
          <tr>
            <td rowspan="2" scope="col" class="text-center align-middle border-0"></td>
            <th
              rowspan="2"
              scope="col"
              class="align-middle text-center text-uppercase h6 font-weight-bold"
            >
              <div class="d-flex justify-content-between align-items-center">
                <span>Indicators</span>
                <!-- <span id="reset" @click="$emit('clickedReset')"><b-icon-arrow-clockwise /></span> -->
              </div>
            </th>
            <!-- This loop through the available classification eg. Routine,Survey,Estimate -->
            <td
              v-for="(value, i) in classify"
              :key="`${i}-row1`"
              :colspan="value[1]"
              class="classification-row text-uppercase text-center align-middle p-0"
            >
              {{ value[0] }}

            </td>
          </tr>
          <!-- This loop through the available dataSource from the dataOptions
          eg. Routine,Survey,Estimate -->
          <tr v-if="$route.params.name === 'Health_Outcomes_and_Service_Coverage' && hasNhmis">
            <div class="nhmis_month_head">NHMIS-DHIS2 (monthly)</div>
            <TableDataSourceCell
              v-for="(dt, i) in source"
              :key="`${i}-row3`"
              :source="dt"
              @source:click="log($event)"
              @source-info:click="$emit('selected:source-info', $event)"
              :selectedSource="selectedSource"
              @value="getValue"
              @key="getKey"
            />
          </tr>
          <tr v-else>
            <TableDataSourceCell
              v-for="(dt, i) in source"
              :key="`${i}-row4`"
              :source="dt"
              @source:click="log($event)"
              @source-info:click="$emit('selected:source-info', $event)"
              :selectedSource="selectedSource"
              @value="getValue"
              @key="getKey"
            />
          </tr>

          <!-- The display the the first indicator of the array of indicator -->
          <!-- please note that the first indicator is assumed to be
          the main indicator and others, the related indicators -->

          <TableDataRow
            class="base_subCard_header text-white"
            :rowData="dataArray[0]"
            @indicator-info:clicked="$emit('selected:indicator-info', $event)"
          >
            <template v-slot:indicator="props">
              <slot name="indicator-0" :indicator="props"></slot>
            </template>
            <template
              #default
              v-if="$route.params.name === 'Health_Outcomes_and_Service_Coverage' && hasNhmis"
            >
              <!-- input this with NHMIS data -->
              <!-- conditonal statement checking if 'NHMIS monthly data' for the respective indicator is present -->
              <div class="nhmis-month-text1" v-if="nhmisMonthData[0]">
                <!-- static data (only for overview table) for NHMIS data -->

                <span v-if="nhmisMonthData[0].value === null"> - </span>
                <span v-else> {{ nhmisMonthData[0].value }}%</span>
              </div>
              <div class="nhmis-month-text1" v-else>
                <!-- static data (only for overview table) for NHMIS data -->
                -
              </div>
              <div class="nhmis-month-text2" v-if="nhmisMonthData[0]">
                <span v-if="nhmisMonthData[0].value === null"> - </span>
                <span v-else> {{ nhmisMonthData[0].period }}</span>
              </div>
              <div class="nhmis-month-text2" v-else>-</div>

              <td class="text-center p-2" v-for="(dt, index) in source" :key="index" scope="col">
                <TableDataCell
                  :cellData="getValueForColumn(dataArray[0].values, dt)"
                  :dataColors="' '"
                />
              </td>
            </template>
            <template #default v-else>
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
            <tr class="border-0" v-show="numDenum && values.numdenum">
              <td class="border-0"></td>
              <!-- Use this slot to set the NHMIS DETAIL example(Num Denum) -->
              <td class="num-denom pt-3 align-center text-light">
                <slot name="NHMIS-DETAILS">
                  <h5>{{ values.datasource.datasource }}: {{ values.year }}</h5>
                </slot>
              </td>
              <td colspan="20" class="num-denom-content">
                <slot name="NHMIS-DETAILS">
                  <div class="numDemValues text-center">
                    <div>
                      <p><span>Numerator: </span> {{ numerator }}</p>
                    </div>
                    <div>
                      <p><span>Denominator: </span> {{ denominator }}</p>
                    </div>
                  </div>
                </slot>
              </td>
            </tr>
          </transition>

          <!-- RELATED INDICATOR -->
          <tr class="" v-if="dataArray.length > 1">
            <td class="border-0"></td>
            <td colspan="30" class="border-0 heading_alt">
              <h6 class="font-weight-bold mb-0">Related Indicators</h6>
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
              <template
                #default
                v-if="$route.params.name === 'Health_Outcomes_and_Service_Coverage' && hasNhmis"
              >
                <!-- conditonal statement checking if 'NHMIS monthly data' for the respective indicator is present -->
                <td class="text-center p-2" v-if="nhmisMonthData[index]">
                  <TableDataCell />
                  <!-- id's -->
                  <!-- static data (only for overview table) for NHMIS data -->
                  <div class="nhmis-rel-text1">
                    <span v-if="nhmisMonthData[index].value === null"> - </span>
                    <span v-else> {{ nhmisMonthData[index].value }}%</span>
                  </div>
                  <div class="nhmis-rel-text2">
                    <span v-if="nhmisMonthData[index].value === null"> - </span>
                    <span v-else> {{ nhmisMonthData[index].period }}</span>
                  </div>
                </td>

                <td v-else>
                  <TableDataCell />
                  <div class="nhmis-rel-text1 text-center">-</div>
                  <div class="nhmis-rel-text2">-</div>
                </td>
                <td
                  class="text-center p-2"
                  v-for="(dt, i) in source"
                  :key="`${i}-row9`"
                  scope="col"
                >
                  <TableDataCell
                    :cellData="getValueForColumn(indicatorData.values, dt)"
                    :dataColors="'#515151; #888888;'"
                  />
                </td>
              </template>
              <template #default v-else>
                <td
                  class="text-center p-2"
                  v-for="(dt, i) in source"
                  :key="`${i}-row10`"
                  scope="col"
                >
                  <TableDataCell
                    :cellData="getValueForColumn(indicatorData.values, dt)"
                    :dataColors="'#515151; #888888;'"
                  />
                </td>
              </template>
            </TableDataRow>

            <!-- This creates a space between the related indicators table rows -->
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
import mixin from '@/modules/data-layer/mixin';
import TableDataCell from './TableDataCell.vue';
import TableDataSourceCell from './TableDataSourceCell.vue';
import TableDataRow from './TableDataRow.vue';

export default {
  name: 'TableComponent',
  mixins: [mixin],
  components: {
    TableDataCell,
    TableDataSourceCell,
    TableDataRow,
  },
  props: {
    /**
     * Main Control panel props
     */
    values: {
      type: Object,
      required: false,
    },
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
        'NHMIS-DHIS2',
        'NHMIS-DHIS2 (MONTHLY)',
        'SMoH-DHPRS',
        'MICS',
        'NDHS',
        'NARHS',
        'NMIS',
        'NNHS',
        'PCCS',
        'NHSPSS',
        'NHA',
        'KDGHS',
        'NAIIS',
        'NHFS',
        'NLSS',
        'GHS',
        'AAS',
        'NHWCP',
        'World Bank',
        'IHME',
        'WHO-GHO',
        'WUENIC',
        'UNAIDS',
        'UNWPP',
        'NPC',
        'ILOSTAT',
        'UN IGME',
        'USCB',
        'GEOPODE',
        'UNDP (HDR)',
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
       * The classification object (considering NHMIS monhtly)
       */
      classify_nm: {},
      /**
       * This send the selected Source to the Child component to Highlight
       */
      selectedSource: {},
      /**
       * This store the all the data sources available in the data parsed
       */
      source: [],
      customSource: [],
      classificationOrder: ['Routine', 'Survey', 'Estimate'],

      // data for NHMIS monthly
      NHMIS_monthly: {},
      indicators: [],
      nhmisMonthData: [],
      denominator: null,
      numerator: null,
      numDenum: false,
      hasNhmis: false,
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
      // console.log('🚀valueObj', valueObj);
      if (valueObj) {
        return valueObj;
      }
      return null;
    },

    /**
     * This gets the maximum amount to dataSource classification
     * for each classification(Routine,Survey,Estimate) in the data
     * array provided
     *
     */
    getDataSourcesClassification() {
      const countClassification = this.dataArray.map((e) => e.values.map((et) => et.classification));
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
        (a, b) => this.classificationOrder.indexOf(a[0]) - this.classificationOrder.indexOf(b[0]),
      );
      // console.log(resultSorted, 'resultsorted');
      this.classify = resultSorted;
      this.classify_nm = resultSorted;
      // adding an extra column for NHMIS monthly
      if (this.$route.params.name === 'Health_Outcomes_and_Service_Coverage') {
        this.classify_nm[0][1] += 1;
      }
    },

    /**
     * this filter thorough the array of data parse and et all available  Parsed
     */
    getAvailableDataSources() {
      const arraySource = this.dataArray.map((e) => e.values.map((et) => et.dataSources));
      const allAvailableSources = uniq(flatten(arraySource));
      // add this to use only datasource on the dropdown for the table component
      /**
       * order AvailableSources according to the OrderSourceBy Array;
       */
      const sortedSource = allAvailableSources.sort(
        (a, b) => this.orderSourceBy.indexOf(a.datasource) - this.orderSourceBy.indexOf(b?.datasource),
      );
      this.source = sortedSource;

      // checking if it has NHMIS as a datasource
      if (this.source.some((item) => item.id === 6)) {
        this.hasNhmis = true;
      }

      // console.log('this.source', this.source);
    },

    log(e) {
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
    /**
     * This fetches numerator denominator data from
     * dexie using the control panel props
     */
    async getNumDenumData() {
      if (this.values?.datasource.id !== undefined) {
        const {
          indicator, year, location, datasource,
        } = this.values;

        const numeratorData = await this.dlQuery({
          datasource: datasource.id,
          indicator: indicator.id,
          period: year,
          location: location.id,
          value_type: 6,
        });
        const denominatorData = await this.dlQuery({
          datasource: datasource.id,
          indicator: indicator.id,
          period: year,
          location: location.id,
          value_type: 7,
        });
        if (numeratorData.length > 0 || denominatorData.length > 0) {
          this.numDenum = true;
          if (numeratorData.length > 0) {
            const numeratorName = this.dlGetDataSourceSpecificIndicator({
              indicator: indicator.id,
              datasource: datasource.id,
            })[0].measurement_numerator;
            const numerator = numeratorData[0];
            this.numerator = `${numeratorName} - ${Number(numerator.value).toLocaleString()}`;
          } else {
            this.numerator = 'N/a';
          }
          if (denominatorData.length > 0) {
            const denominatorName = this.dlGetDataSourceSpecificIndicator({
              indicator: indicator.id,
              datasource: datasource.id,
            })[0].measurement_denominator;
            const denominator = denominatorData[0];
            this.denominator = `${denominatorName} - ${Number(denominator.value).toLocaleString()}`;
          } else {
            this.denominator = 'N/a';
          }
        } else {
          this.numDenum = false;
        }
      }
    },

    // getting NHMIS monthly for the 1st realted indicator
    // get the data Arrays
    // use the function similar

    async getNhmisMonthly() {
      this.indicators = [];
      this.nhmisMonthData = [];
      this.dataArray.map(async (element) => {
        await this.indicators.push({
          datasource: 30, // nhmis monthly id
          indicator: element.indicator.id,
          location: this.values.location.id,
        });
      });
      // Step 2: get the data for the selected indicator and the related indicator
      Promise.all(
        this.indicators.map(async (el) => {
          const data = await this.getNhmisData(el);
          if (data === undefined) {
            const updatedData = { ...data, value: null };
            this.nhmisMonthData.push(updatedData);
          } else {
            const updatedData = { ...data, value: parseFloat(data.value).toFixed(1) };
            this.nhmisMonthData.push(updatedData);
          }
        }),
      );
    },
  },
  watch: {
    dataArray: {
      async handler() {
        this.getAvailableDataSources();
        this.getDataSourcesClassification();
        if (
          this.$route.params.name === 'Health_Outcomes_and_Service_Coverage_and_Service_Coverage'
        ) {
          await this.getNhmisMonthly();
        }
      },
      deep: true,
      immediate: true,
    },
    // eslint-disable-next-line func-names
    'values.indicator': function () {
      this.getNumDenumData();
    },
    // eslint-disable-next-line func-names
    'values.location': async function () {
      this.getNumDenumData();
      if (this.$route.params.name === 'Health_Outcomes_and_Service_Coverage_and_Service_Coverage') {
        await this.getNhmisMonthly();
      }
    },
    // eslint-disable-next-line func-names
    'values.datasource': function () {
      this.getNumDenumData();
    },
    // eslint-disable-next-line func-names
    'values.year': function () {
      this.getNumDenumData();
    },
    setSelectedSource(newValue) {
      this.selectedSource = newValue;
    },
  },

  computed: {
    datatest(id) {
      return id + 2;
    },
    customDashboard() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard;
    },
  },

  async mounted() {
    // Add a delay to get nhmis monthly data
    setTimeout(async () => {
      if (this.$route.params.name === 'Health_Outcomes_and_Service_Coverage') {
        await this.getNhmisMonthly();
      }
    }, 500);
    await this.getNumDenumData();

    // checking if it has NHMIS as a datasource
    if (this.source.some((item) => item.id === 6)) {
      this.hasNhmis = true;
    }
    console.log('source', this.source);
  },

  // async mounted() {
  //   // set all datasources to show in the trend analysis chart on first load
  //   this.$emit('clickedReset');
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/scss/abstracts/_variables.scss';
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
  td.heading_alt {
    padding: 0.5rem;
  }
  // selected data source
  .table-active {
    // background-color: #2b5d5b;
    background-color: #348481;
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
          // color: #2b5d5b;
          // color: $primary;
          cursor: pointer;
        }
      }
    }

    // numerator - denominator section
    td.num-denom {
      // background-color: #2b5d5b;
      background-color: $primary;
      padding-top: 10px;
      h5 {
        font-size: 15px !important;
        font-weight: 300;
      }
    }
    td.num-denom-content {
      padding-top: 10px;
      // background-color: #2b5d5b;
      background-color: $primary;
      div.numDemValues {
        background-color: #fff;
        color: rgb(15, 14, 14);
        height: 34px;
        display: flex;
        border-radius: 4px;
        padding: 7px 10px 0;
        gap: 10px;
        justify-content: space-evenly;
        p {
          font-size: 13px !important;
          font-weight: 300;
          span {
            font-weight: 600 !important;
            font-size: 13px !important;
          }
        }
      }
    }
  }
}
</style>

<style scoped>
/* to remove */
#reset {
  transform: rotate(360deg);
  transition: all 1s ease-in-out;
  /* background-color: black; */
}

#reset:hover {
  font-weight: 700;
  transform: rotate(180deg);
}

.nhmis-month-text1 {
  margin-top: 9px;
  font-size: 0.7rem;
  text-align: center;
  font-weight: 700;
}

.nhmis-month-text2 {
  margin-top: 5px;
  font-size: 0.7rem;
  text-align: center;
}

.nhmis-rel-text1 {
  font-weight: 700;
}

.nhmis-rel-text2 {
  margin-top: 5px;
  font-size: 0.7rem;
  text-align: center;
  color: rgb(136, 136, 136);
}

.nhmis_month_head {
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.meta_icon {
  color: #007d53 !important;
  font-size: 15.5px;
  margin-left: 10px;
  margin-top: 2px;
}
</style>
