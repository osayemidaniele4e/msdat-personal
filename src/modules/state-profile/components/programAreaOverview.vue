/* eslint-disable array-callback-return */ /* eslint-disable no-param-reassign */ /* eslint-disable
no-param-reassign */
<template>
  <b-container fluid>
    <hr style="border-top: 1px dashed #cccccc" class="mb-5 mt-5" />
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
      <b-col sm="12" :md="this.programArea.name == 'Health Services' ? 'auto' : '8'">
        <div class="ml-3" v-if="this.programArea.name != 'Health Services'">
          <b-row>
            <b-col>
              <p>{{ this.barChartOptions.xAxis.categories[0] }}</p>
              <p class="source">
                {{ `${this.programArea.name == 'mortality' ? 'Per 100,000' : 'In Percentage'}` }}
              </p>
            </b-col>
            <b-col cols="auto">
              <p>National</p>
              <p class="grey-value">{{ this.singleNational }}</p>
            </b-col>
            <b-col cols="auto">
              <p v-if="state != 'National'">{{ this.state }}</p>
              <p class="grey-value" v-if="state != 'National'">{{ this.singleStateValue }}</p>
              <p class="source">Source:{{ this.singleSrcnYear }}</p>
            </b-col>
          </b-row>
          <hr />
        </div>
        <BaseBar
          v-show="this.programArea.name != 'Health Services'"
          :chartOptions="barChartOptions"
        />
        <b-row
          style="color: #ffffff; font-size: 12px"
          class="pl-5 mt-4"
          v-show="this.programArea.name == 'REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH'"
        >
          <b-col
            class="px-auto"
            style="background-color: #054a80; border: 1px solid white; height: 40px"
          >
            <p class="mx-auto">Pre-pregnancy</p>
          </b-col>
          <b-col style="background-color: #2c8cca; border: 1px solid white; height: 40px">
            <p>Pregnancy</p>
          </b-col>
          <b-col style="background-color: #3f7299; border: 1px solid white; height: 40px">
            <p>Birth</p>
          </b-col>
          <b-col style="background-color: #43893b; border: 1px solid white; height: 40px">
            <p>Postnatal</p>
          </b-col>
          <b-col style="background-color: #2c9f35; border: 1px solid white; height: 40px">
            <p>Infancy</p>
          </b-col>
          <b-col style="background-color: #8fb438; border: 1px solid white; height: 40px">
            <p>Childhood</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="auto" v-show="this.programArea.name == 'Health Services'">
        <div class="vl"></div>
      </b-col>
      <b-col class="text-left" v-show="this.programArea.name == 'Health Services'">
        <div class="mb-4">
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{ HRGuidelinesValue.value }}%</p>
              <p class="source text-right">Source: NHFS {{ HRGuidelinesValue.year }}</p>
            </b-col>
          </b-row>
        </div>
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
              <p class="value text-right">{{ facilityMng.value }}%</p>
              <p class="source text-right">Source: NHFS {{ facilityMng.year }}</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="auto" v-show="this.programArea.name == 'Health Services'">
        <div class="vl"></div>
      </b-col>
      <b-col class="text-left" v-show="this.programArea.name == 'Health Services'">
        <div class="mb-4">
          <p class="blue-heading">Facility readiness to deliver services</p>
          <b-row>
            <b-col>
              <p class="hfs-details">Percentage of facilities with malaria test capacity</p>
            </b-col>
            <b-col>
              <p class="value text-right">{{ facilityReadiness[0].value }}%</p>
              <p class="source text-right">Source: NHFS {{ facilityReadiness[0].year }}</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
          <b-row>
            <b-col>
              <p class="hfs-details">
                Percentage of PHFs that offer HIV testing as part of routine ANC
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{ facilityReadiness[1].value }}%</p>
              <p class="source text-right">Source: NHFS {{ facilityReadiness[1].year }}</p>
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
              <p class="value text-right">{{ drugsAndCommodities[0].value }}%</p>
              <p class="source text-right">Source: NHFS {{ drugsAndCommodities[0].year }}</p>
            </b-col>
          </b-row>
        </div>
        <div>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of health facilities with basic medical equipment
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">{{ drugsAndCommodities[1].value }}%</p>
              <p class="source text-right">Source: NHFS {{ drugsAndCommodities[1].year }}</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row v-show="this.isDefinitionVisible">
      <p>
        <b> Indicator definitions </b>
      </p>
      <ul>
        <li v-for="(definition, index) in definitions" :key="index">
          {{ `- ${definition.indicator_definition}` }}
        </li>
      </ul>
    </b-row>
  </b-container>
</template>

<script>
import BaseBar from '@/components/Barchart/BaseBarChart.vue';
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
    indicatorDefinitions: Array,
  },
  data() {
    return {
      iconUrl: `@/assets/state-profile/svg/${this.programArea.icon}.svg`,
      isDefinitionVisible: false,
      nonDemographicData: [],
      nationalObjects: [],
      allDataSources: [],
      allIndicators: [],
      definitions: [],
      singleSrcnYear: '',
      HRGuidelinesValue: {
        id: 34,
        value: 0,
        year: 2000,
      },
      facilityMng: {
        id: 61,
        value: 0,
        year: 2000,
      },
      facilityReadiness: [
        {
          id: 39,
          value: 0,
          year: 2000,
        },
        {
          id: 41,
          value: 0,
          year: 2000,
        },
      ],
      drugsAndCommodities: [
        {
          id: 49,
          value: 0,
          year: 2000,
        },
        {
          id: 50,
          value: 0,
          year: 2000,
        },
      ],
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
              format: this.programArea.name === 'mortality' ? '{y}' : '{y}%',
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
            text: this.programArea.name !== 'mortality' ? 'Percentage(%)' : 'Per 100,000',
          },
        },
        xAxis: {
          type: 'category',
          categories: [],
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
            data: [],
            pointPadding: 0.1,
            pointPlacement: 0,
          },
          {
            name: this.state,
            className: 'test',
            color: this.programArea.colors[1],
            data: [],
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
      return this.allIndicators.results.find((item) => item.id === id);
    },
    getDataSourceInfo(src) {
      return this.allDataSources.results.find((item) => item.id === src);
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
            if (
              value?.indicator === element?.indicator
              && value.dataSource === element?.datasource
            ) {
              // eslint-disable-next-line no-param-reassign
              element.color = value.color;
            }
          });
          return true;
        });
        // eslint-disable-next-line array-callback-return
        this.nationalObjects.map((val) => {
          if (val !== undefined) {
            data.push({
              y: Number(val.value),
              name: `${this.getIndicatorInfo(val.indicator).short_name} (${
                this.getDataSourceInfo(val.datasource).datasource
              } ${val.period})`,
              color: val.color,
            });
          }
        });
      } else {
        // eslint-disable-next-line array-callback-return
        this.nationalObjects.map((val) => {
          if (val !== undefined) {
            data.push([
              `${this.getIndicatorInfo(val?.indicator).short_name} (${
                this.getDataSourceInfo(val?.datasource).datasource
              } ${val.period}), `,
              Number(val.value),
            ]);
          }
        });
      }
      if (data?.length > 0) {
        this.singleSrcnYear = data[0][0]
          ? `(${data[0][0].split('(')[1]}`
          : `(${data[0].name.split('(')[1]}`;
        // eslint-disable-next-line prefer-destructuring
        this.singleNational = Array.isArray(data[0]) ? data[0][1] : data[0].y;
        // eslint-disable-next-line max-len
        this.barChartOptions.series[0].color = noStates
          ? this.programArea.colors[1]
          : this.programArea.colors[0];
        this.barChartOptions.series[0].data = data;
        this.populateCategories();
      }
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
        if (id !== undefined) {
          indicatorShortNames.push(this.getIndicatorInfo(id?.indicator).short_name);
        }
      });
      this.barChartOptions.xAxis.categories = indicatorShortNames;
    },
    /**
     * This sets the health facility data to zero
     * as the default state before new data comes in
     */
    resetHealthFacilityData() {
      this.HRGuidelinesValue.value = 0;
      this.HRGuidelinesValue.year = null;
      this.facilityMng.value = 0;
      this.facilityMng.year = null;
      this.facilityReadiness[0].value = 0;
      this.facilityReadiness[0].year = null;
      this.facilityReadiness[1].value = 0;
      this.facilityReadiness[1].year = null;
      this.drugsAndCommodities[0].value = 0;
      this.drugsAndCommodities[0].year = null;
      this.drugsAndCommodities[1].value = 0;
      this.drugsAndCommodities[1].year = null;
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
        if (el === undefined) {
          return;
        }
        if (el.indicator === this.HRGuidelinesValue.id) {
          this.HRGuidelinesValue.value = el.value;
          this.HRGuidelinesValue.year = el.period;
        }
        if (el.indicator === this.facilityMng.id) {
          this.facilityMng.value = el.value;
          this.facilityMng.year = el.period;
        }
        if (el.indicator === this.facilityReadiness[0].id) {
          this.facilityReadiness[0].value = el.value;
          this.facilityReadiness[0].year = el.period;
        }
        if (el.indicator === this.facilityReadiness[1].id) {
          this.facilityReadiness[1].value = el.value;
          this.facilityReadiness[1].year = el.period;
        }
        if (el.indicator === this.drugsAndCommodities[0].id) {
          this.drugsAndCommodities[0].value = el.value;
          this.drugsAndCommodities[0].year = el.period;
        }
        if (el.indicator === this.drugsAndCommodities[1].id) {
          this.drugsAndCommodities[1].value = el.value;
          this.drugsAndCommodities[1].year = el.period;
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
            if (value.indicator === element.indicator && value.dataSource === element.datasource) {
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
            name: `${this.getIndicatorInfo(val.indicator).short_name} (${
              this.getDataSourceInfo(val.datasource).datasource
            } ${val.period})`,
            color: val.color,
          });
        }
      });
      this.singleStateValue = data[0].y;
      this.barChartOptions.series[1].data = data;
      this.barChartOptions.series[1].name = this.state;
    },
    addIndicatorDefinitions() {
      this.definitions = [];
      // eslint-disable-next-line array-callback-return
      this.programArea.specificIndicators.map((el) => {
        // eslint-disable-next-line array-callback-return
        this.indicatorDefinitions.map((val) => {
          if (val.indicator === el.indicator && val.datasource === el.dataSource) {
            this.definitions.push(val);
          }
        });
      });
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
      const { newNational, newState } = await requests.getRegularData(
        this.programArea.specificIndicators,
        selectedState.id,
      );
      this.$emit('overviewLoading');
      newNational.map((el) => this.nationalObjects.push(el.results[0]));
      newState.map((el) => this.nonDemographicData.push(el.results[0]));
      this.presentNationalData();
      this.presentStateData();
      this.getHealthFacilityData();
    },
  },
  watch: {
    async state(newVal, oldVal) {
      this.resetHealthFacilityData();
      // eslint-disable-next-line eqeqeq
      if (oldVal == 'National') {
        this.barChartOptions.series.push(this.stateSeries);
      }
      this.barChartOptions.series[0].data = [];
      this.nationalObjects = [];
      this.barChartOptions.series[1].data = [];
      this.nonDemographicData = [];
      if (oldVal !== 'National' && newVal === 'National') {
        const { newNational } = await requests.getRegularData(
          this.programArea.specificIndicators,
          this.locations[0].id,
        );
        newNational.map((el) => this.nationalObjects.push(el.results[0]));
        this.$emit('overviewLoading');
        this.justNationalData();
      } else {
        this.prepareStateAndNationalData();
      }
      this.getHealthFacilityData();
    },
    indicatorDefinitions() {
      this.addIndicatorDefinitions();
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
        const { newNational } = await requests.getRegularData(
          this.programArea.specificIndicators,
          selectedState.id,
        );
        newNational.map((el) => this.nationalObjects.push(el.results[0]));
        this.$emit('overviewLoading');
        this.justNationalData();
        this.getHealthFacilityData();
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
  font-family: 'Muli', sans-serif !important;
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
  font-family: 'Muli', sans-serif;
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
