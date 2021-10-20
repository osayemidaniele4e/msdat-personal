/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */
<template>
  <b-container fluid>
    <hr style="  border-top: 1px dashed #CCCCCC;" class="mb-5 mt-5" />
    <b-row class="mb-5">
      <program-area-icon :programArea="this.programArea" />
      <h2 class="my-auto">
        <b>{{ this.programArea.name.toUpperCase() }}</b>
      </h2>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="">
        <p class="mb-4">
          {{ programArea.detail }}
        </p>
        <p class="mb-4 note">
          <b
            >NOTE: Sources for each of the indicators in the graph were selected based on most
            recent and most reliable estimates.
          </b>
        </p>
        <p class="mb-4 sources">Sources: {{ this.programArea.sources }}</p>
        <b-button @click="toggleDefinition" v-show="!isDefinitionVisible" class="toggle">
          Show indicator definitions
          <b-icon icon="caret-down-fill"></b-icon>
        </b-button>
        <b-button @click="toggleDefinition" v-show="isDefinitionVisible" class="toggle">
          Hide indicator definitions
          <b-icon icon="caret-up-fill"></b-icon>
        </b-button>
      </b-col>
      <b-col sm="12" :md="this.programArea.name == 'Health Facility Survey' ? 'auto' : '8'">
        <div class="ml-3" v-show="this.programArea.name == 'mortality'">
          <b-row>
            <b-col>
              <p>Maternal Mortality Ratio</p>
              <p class="source">per 100,000</p>
            </b-col>
            <b-col cols="auto">
              <p>National</p>
              <p class="grey-value">{{this.singleNational}}</p>
            </b-col>
            <b-col cols="auto" v-if="state != 'national'">
              <p>{{ this.state }}</p>
              <p class="red-value">{{this.singleStateValue}}</p>
              <p class="source">Source: NDHS 2018</p>
            </b-col>
          </b-row>
          <hr />
        </div>
        <BaseBar
          v-show="this.programArea.name != 'Health Facility Survey'"
          :chartOptions="barChartOptions"
        />
        <b-row
          style="color: #FFFFFF; font-size: 12px;"
          class="pl-5 mt-4"
          v-show="this.programArea.name == 'REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH'"
        >
          <b-col
            class="px-auto"
            style="
            background-color: #054A80;
            border: 1px solid white;
            height: 40px"
          >
            <p class="mx-auto">Pre-pregnancy</p>
          </b-col>
          <b-col style="background-color: #2C8CCA; border: 1px solid white;
            height: 40px">
            <p>Pregnancy</p>
          </b-col>
          <b-col style="background-color: #3F7299; border: 1px solid white;
            height: 40px">
            <p>Birth</p>
          </b-col>
          <b-col style="background-color: #43893B; border: 1px solid white;
            height: 40px">
            <p>Postnatal</p>
          </b-col>
          <b-col style="background-color: #2C9F35; border: 1px solid white;
            height: 40px">
            <p>Infancy</p>
          </b-col>
          <b-col style="background-color: #8FB438; border: 1px solid white;
            height: 40px">
            <p>Childhood</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="auto" v-show="this.programArea.name == 'Health Facility Survey'">
        <div class="vl"></div>
      </b-col>
      <b-col class="text-left" v-show="this.programArea.name == 'Health Facility Survey'">
        <div class="mb-4">
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{HRGuidelinesValue.value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>

        <!-- <div class="mb-4">
          <p class="blue-heading">Financing</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHCs receiving funds in cash and kind
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{financing}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div> -->

        <div>
          <p class="blue-heading">Facility Management</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Percentage of PHFs who ISS documentation contain recommendations on QOC or facility
                supervision
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{facilityMng.value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="auto" v-show="this.programArea.name == 'Health Facility Survey'">
        <div class="vl"></div>
      </b-col>
      <b-col class="text-left" v-show="this.programArea.name == 'Health Facility Survey'">
        <div class="mb-4">
          <p class="blue-heading">Facility readiness to deliver services</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Percentage of facilities with malaria test capacity
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{facilityReadiness[0].value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
          <!-- <p class="blue-heading">HR Guideline and Workforce</p> -->
          <b-row>
            <b-col>
              <p class="hfs-details">
                Percentage of PHFs that offer HIV testing as part of routine ANC
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{facilityReadiness[1].value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
          <p class="blue-heading">Drugs and Commodities</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of essential drugs available in health facilities
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{drugsAndCommodities[0].value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div>
          <!-- <p class="blue-heading">HR Guideline and Workforce</p> -->
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of health facilities with basic medical equipment
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{drugsAndCommodities[1].value}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row v-show="this.isDefinitionVisible">
      <p>
        <b>
          Indicator definitions
        </b>
      </p>
      <ul>
        <li v-for="definition in this.programArea.definitions" :key="definition">
          {{ definition }}
        </li>
      </ul>
    </b-row>
  </b-container>
</template>

<script>
import BaseBar from '@/components/Barchart/BaseBarChart.vue';
import { mapState } from 'vuex';
import ProgramAreaIcon from './programAreaIcon.vue';
import dataMixins from '../../DataLayer/mixin';
import * as requests from '../requests';

export default {
  name: 'programAreaOverview',
  components: {
    BaseBar,
    ProgramAreaIcon,
  },
  mixins: [dataMixins],
  props: {
    state: String,
    locations: Array,
    programArea: Object,
  },
  computed: {
    ...mapState([]),
  },
  data() {
    return {
      iconUrl: `@/assets/state-profile/svg/${this.programArea.icon}.svg`,
      isDefinitionVisible: false,
      nonDemographicData: [],
      nationalObjects: [],
      allDataSources: [],
      allIndicators: [],
      HRGuidelinesValue: {
        id: 34,
        value: 0,
      },
      // financing: {
      //   id:61,
      //   value: 0
      // },
      facilityMng: {
        id: 61,
        value: 0,
      },
      facilityReadiness: [{
        id: 39,
        value: 0,
      },
      {
        id: 41,
        value: 0,
      },
      ],
      drugsAndCommodities: [{
        id: 49,
        value: 0,
      },
      {
        id: 50,
        value: 0,
      }],
      singleNational: 0,
      singleStateValue: 0,
      stateSeries: {},
      barChartOptions: {
        annotations: [
          {
            visible: true,
          },
        ],
        plotOptions: {
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{y} %',
              style: {
                textOverflow: 'ellipsis',
                fontWeight: 'normal',
              },
            },
          },
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          x: -10,
          y: 0,
          floating: false,
          symbolRadius: 0,
        },
        chart: {
          type: 'column',
          plotBorderWidth: 1,
        },
        title: {
          text: this.programArea.chartTitle,
          align: 'left',
          style: {
            fontSize: '16px',
            fontFamily: '"Muli", sans-serif',
            fontWeight: 'normal',
          },
        },
        yAxis: {
          title: {
            text: 'Percentage(%)',
          },
        },
        xAxis: {
          type: 'category',
          categories: [

          ],
          labels: {
            rotation: 0,
            style: {
              fontSize: '8px',
              fontFamily: '"Muli", sans-serif',
            },
          },
        },
        series: [
          {
            name: 'National',
            color: this.programArea.colors[0],
            data: [
            ],
            pointPadding: 0.1,
            pointPlacement: 0,
          },
          {
            name: this.state,
            className: 'test',
            data: [

            ],
            pointPadding: 0.3,
            pointPlacement: 0,
          },
        ],
      },
    };
  },
  methods: {
    toggleDefinition() {
      this.isDefinitionVisible = !this.isDefinitionVisible;
    },
    getIndicatorInfo(id) {
      return this.allIndicators.find((item) => item.id === id);
    },
    getDataSourceInfo(src) {
      return this.allDataSources.find((item) => item.id === src);
    },
    /**
     * This function sets the national
     * series to the highcharts Object
     * It has slightly different implementations
     *
     * It has slightly varied implementations
     * based on if the higchart object is supposed
     * to contain just the national series
     * or both the national and state series,
     * hence the @argument noStates
     */
    presentNationalData(noStates) {
      const data = [];
      if (noStates) {
        this.programArea.specificIndicators.map((value) => {
          // eslint-disable-next-line array-callback-return
          this.nationalObjects.map((element) => {
            if (value.indicator === element.indicator && value.dataSource === element.datasource) {
              // eslint-disable-next-line no-param-reassign
              element.color = value.color;
            }
          });
          return true;
        });
        // eslint-disable-next-line array-callback-return
        this.nationalObjects.map((val) => {
          data.push({
            y: Number(val.value),
            name: `${this.getIndicatorInfo(val.indicator).short_name} (${this.getDataSourceInfo(val.datasource).datasource} ${val.period})`,
            color: val.color,
          });
        });
      } else {
        // eslint-disable-next-line array-callback-return
        this.nationalObjects.map((val) => {
          data.push([`${this.getIndicatorInfo(val.indicator).short_name} (${this.getDataSourceInfo(val.datasource).datasource} ${val.period}), `, Number(val.value)]);
        });
      }
      if (this.programArea.name === 'mortality') {
        // eslint-disable-next-line prefer-destructuring
        this.singleNational = data[0][1];
      }
      this.barChartOptions.series[0].data = data;
      this.populateCategories();
    },
    /**
     * This fills in the names of the various data points
     * on the highcharts object
     * based on the available data using the
     * @var this.nationalObjects
     */
    populateCategories() {
      const indicatorShortNames = [];
      // eslint-disable-next-line array-callback-return
      this.nationalObjects.map((id) => {
        indicatorShortNames.push(this.getIndicatorInfo(id.indicator).short_name);
      });
      this.barChartOptions.xAxis.categories = indicatorShortNames;
    },
    /**
     * This sets the health facility data to zero
     * as the default state before new data comes in
     */
    resetHealthFacilityData() {
      this.HRGuidelinesValue.value = 0;
      this.facilityMng.value = 0;
      this.facilityReadiness[0].value = 0;
      this.facilityReadiness[1].value = 0;
      this.drugsAndCommodities[0].value = 0;
      this.drugsAndCommodities[1].value = 0;
    },
    /**
     * This sets the health facility data
     * based on data gotten from the API
     *
     * @var this.nationalObjects holds data
     * for the national series while
     * @var this.nonDemographicData holds
     * data for the state series
     */
    getHealthFacilityData() {
      let availableData;
      // eslint-disable-next-line eqeqeq
      if (this.state == 'National') {
        availableData = this.nationalObjects;
      } else {
        availableData = this.nonDemographicData;
      }
      // eslint-disable-next-line array-callback-return
      availableData.map((el) => {
        if (el.indicator === this.HRGuidelinesValue.id) {
          this.HRGuidelinesValue.value = el.value;
        }
        if (el.indicator === this.facilityMng.id) {
          this.facilityMng.value = el.value;
        }
        if (el.indicator === this.facilityReadiness[0].id) {
          this.facilityReadiness[0].value = el.value;
        }
        if (el.indicator === this.facilityReadiness[1].id) {
          this.facilityReadiness[1].value = el.value;
        }
        if (el.indicator === this.drugsAndCommodities[0].id) {
          this.drugsAndCommodities[0].value = el.value;
        }
        if (el.indicator === this.drugsAndCommodities[1].id) {
          this.drugsAndCommodities[1].value = el.value;
        }
      });
    },
    /**
     * This function sets the national
     * series to the highcharts Object
     * It has slightly different implementations
     * It uses @param this.nonDemographicData
     * since it holds data for the state series
     */
    presentStateData() {
      const data = [];
      // eslint-disable-next-line array-callback-return
      this.programArea.specificIndicators.map((value) => {
        // eslint-disable-next-line array-callback-return
        this.nonDemographicData.map((element) => {
          if (element) {
            if (value.indicator === element.indicator
          && value.dataSource === element.datasource) {
            // eslint-disable-next-line no-param-reassign
              element.color = value.color;
            }
          }
        });
      });
      // eslint-disable-next-line array-callback-return
      this.nonDemographicData.map((val) => {
        if (val) {
          data.push({
            y: Number(val.value),
            name: `${this.getIndicatorInfo(val.indicator).short_name} (${this.getDataSourceInfo(val.datasource).datasource} ${val.period})`,
            color: val.color,
          });
        }
      });
      if (this.programArea.name === 'mortality') {
        this.singleStateValue = data[0].y;
      }
      this.barChartOptions.series[1].data = data;
      this.barChartOptions.series[1].name = this.state;
    },
    /**
     * This is meant to prepare the chart for
     * for strictly national data; it removes the state series
     * from the highchart object and calls
     * @function this.presentNationalData with
     * the 'true' argument to indicate that its
     * populating for just the national series
     *
     * It stores the state series object in
     * @var this.stateSeries to be added
     * back later when needed
     */
    justNationalData() {
      this.stateSeries = this.barChartOptions.series.pop();
      this.presentNationalData(true);
    },
    /**
     * This fetches the data from the API based
     * @param this.programArea.specificIndicators
     * which gives the required indicator, datasource
     * and period, while the locationId is gotten from
     * @param selectedState
     *
     * It then calls the required functions
     * to popuulate and display the graph
     *
     * Finally, it emits an event to the parent
     * component to show that its done fetching
     */
    async prepareStateAndNationalData() {
      let selectedState;
      this.locations.forEach((el) => {
        // eslint-disable-next-line eqeqeq
        if (el.name == this.state) {
          selectedState = el;
        }
      });
      const { national, state } = await requests.getRegularData(this.programArea.specificIndicators,
        selectedState.id);
      this.$emit('overviewLoading');
      national.map((el) => this.nationalObjects.push(el.data[0]));
      state.map((el) => this.nonDemographicData.push(el.data[0]));
      this.presentNationalData();
      this.presentStateData();
      this.getHealthFacilityData();
    },
  },
  watch: {
    state(newVal, oldVal) {
      this.resetHealthFacilityData();
      // eslint-disable-next-line eqeqeq
      if (oldVal == 'National') {
        this.barChartOptions.series.push(this.stateSeries);
      }
      this.barChartOptions.series[0].data = [];
      this.nationalObjects = [];
      this.barChartOptions.series[1].data = [];
      this.nonDemographicData = [];
      this.prepareStateAndNationalData();
      this.getHealthFacilityData();
    },
  },
  async mounted() {
    const { theIndicators, theSources } = await requests.getIndicatorsAndSources();
    this.allDataSources = theSources.data;
    this.allIndicators = theIndicators.data;
    let selectedState;
    this.resetHealthFacilityData();
    try {
      // eslint-disable-next-line eqeqeq
      if (this.state == 'National') {
        // eslint-disable-next-line prefer-destructuring
        selectedState = this.locations[0];
        const { national } = await requests.getRegularData(this.programArea.specificIndicators,
          selectedState.id);
        national.map((el) => this.nationalObjects.push(el.data[0]));
        this.$emit('overviewLoading');
        this.justNationalData();
      } else {
        this.prepareStateAndNationalData();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss">
.container-fluid {
  font-family: "Muli", sans-serif !important;
}
.program-area-icon {
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  height: 84px;
  width: 84px;
}
p {
  margin-bottom: 0px;
  font-family: "Muli", sans-serif;
}
ul {
  list-style-type: none;
}
.toggle {
  background-color: #f2f2f2;
  border: 1px solid #cccccc;
  color: #232323;
}
.btn-secondary:hover {
  background-color: #f2f2f2 !important;
  border: 1px solid #cccccc !important;
  color: #232323 !important;
}
.vl {
  border: 1px dashed rgba(197, 197, 197, 1);
  width: 1px;
  opacity: 1;
  height: 100%;
}
.test {
  position: absolute;
  left: 50%;
  margin-left: 30px;
}
.title {
  font-size: 21.0000525px;
  font-weight: 800;
}
.sources {
  color: #5a5a5a;
  font-size: 15px;
}
.source {
  color: #5a5a5a;
  font-size: 12px;
}
.note {
  font-weight: 900;
  font-size: 15px;
}
.blue-heading {
  color: #0592bd;
  font-weight: 800;
}
.hfs-details {
  font-size: 12px;
  font-weight: 800;
}
.value {
  font-weight: 900;
}
.grey-balue {
  color: #5c5c5c;
  font-weight: 900;
}
.red-value {
  color: #ff0000;
  font-weight: 900;
}
</style>
