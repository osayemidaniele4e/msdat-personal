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
            >NOTE: Sources for each of the indicators in the graph below were selected based on most
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
              <p class="value text-right">{{HRGuidelinesValue}}%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
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
              <p class="value text-right">{{facilityMng}}%</p>
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
              <p class="value text-right">{{facilityReadiness[0]}}%</p>
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
              <p class="value text-right">{{facilityReadiness[1]}}%</p>
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
              <p class="value text-right">{{drugsAndCommodities[0]}}%</p>
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
              <p class="value text-right">{{drugsAndCommodities[1]}}%</p>
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

export default {
  name: 'programAreaOverview',
  components: {
    BaseBar,
    ProgramAreaIcon,
  },
  mixins: [dataMixins],
  props: {
    state: String,
    programArea: Object,
  },
  computed: {
    ...mapState([]),
    stateObj() {
      const allLocations = this.$store.state.DL.location;
      let states = '';
      const val = this.state;
      allLocations.map((el) => {
        if (el.name == val) {
          states = el;
        }
      });
      // console.log(states)

      return states;
    },
  },
  data() {
    return {
      iconUrl: `@/assets/state-profile/svg/${this.programArea.icon}.svg`,
      isDefinitionVisible: false,
      nationalObjects: [],
      stateObjects: [],
      HRGuidelinesValue: 0,
      financing: 0,
      facilityMng: 0,
      facilityReadiness:[0,0],
      drugsAndCommodities: [0, 0],
      singleNational: 100,
      singleStateValue: 10,
      temp: {},
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
    getIndicatorShortName(id) {
      return this.dlGetIndicator(id).short_name;
    },
    getDataSource(src) {
      return this.dlGetDataSource(src).datasource;
    },
    presentData(all) {
      const data = [];
      // format
      //  ['Under-5 mortality rate (NHDS 2018)', 17],
       // {
      //   y: 9,
      //   name: 'Prevalence of HIV (NAIIS 2019)',
      //   color: this.programArea.colors[1],
      // }
      if(all){
         console.log(this.barChartOptions)
         this.programArea.specificIndicators.map(value => {
        this.nationalObjects.map(element => {
            if(value.indicator == element.indicator && value.dataSource == element.datasource){
              element.color = value.color
            }
        })
      })
          this.nationalObjects.map((val) => {
        data.push({
          y: Number(val.value),
          name: `${this.getIndicatorShortName(val.indicator)} (${this.getDataSource(val.datasource)} ${val.period})`,
          color: val.color,
        });
      });
      } else {
          this.nationalObjects.map((val) => {
        data.push([`${this.getIndicatorShortName(val.indicator)} (${this.getDataSource(val.datasource)} ${val.period}), `, Number(val.value)]);
      });
      }
        if(this.programArea.name == 'mortality'){
      this.singleNational = data[0][1];
        }
      this.barChartOptions.series[0].data = data;
      this.populateCategories()
    },
    populateCategories() {
      const indicatorShortNames = [];
      this.nationalObjects.map((id) => {
        indicatorShortNames.push(this.getIndicatorShortName(id.indicator));
      });
      this.barChartOptions.xAxis.categories = indicatorShortNames;
    },
     async getHealthFacilityData(){
      // let facilityDataIndicators = [34, 58, 61, 39, 41, 49, 50]
      // let allData = []
      let data
      // facilityDataIndicators.map(async el => {
      //    data = await this.dlQuery({
      //     datasource: 4,
      //     //indicator: el,
      //    // period: 2016,
      //   });
      //   console.log(data)
      // })
       data = await this.dlQuery({
          datasource: 17,
         // indicator: 34,
          // period: 2018
        });
      

       console.log({data})
    },
    presentStateData() {
      const data = [];
      // format
      // {
      //   y: 9,
      //   name: 'Prevalence of HIV (NAIIS 2019)',
      //   color: this.programArea.colors[1],
      // }
      this.programArea.specificIndicators.map(value => {
        this.stateObjects.map(element => {
            if(value.indicator == element.indicator && value.dataSource == element.datasource){
              element.color = value.color
            }
        })
      })
      this.stateObjects.map((val) => {
        data.push({
          y: Number(val.value),
          name: `${this.getIndicatorShortName(val.indicator)} (${this.getDataSource(val.datasource)} ${val.period})`,
          color: val.color,
        });
      });
      console.log(this.state)
      if(this.programArea.name == 'mortality'){
        this.singleStateValue = data[0].y;
      }
      this.barChartOptions.series[1].data = data;
       this.barChartOptions.series[1].name = this.state
    },
    extractNationalDataObjects() {
      this.temp = this.barChartOptions.series.pop()
      this.programArea.specificIndicators.map(async (val) => {
        const runner = await this.dlQuery({
          datasource: val.dataSource,
          indicator: val.indicator,
          location: 1,
          period: JSON.stringify(val.year),
        });
       // console.log({runner})
        if(runner.length != 0){
          const filtered = runner.filter((el) => el.value_type !== 3 && el.value_type !== 4);
           this.nationalObjects.push(filtered[0]);
           // console.log(this.nationalObjects)
           
        }
        this.presentData();
      });
    },
    justNationalData (){
         this.programArea.specificIndicators.map(async (val) => {
        const runner = await this.dlQuery({
          datasource: val.dataSource,
          indicator: val.indicator,
          location: 1,
          period: JSON.stringify(val.year),
        });
       // console.log({runner})
        if(runner.length != 0){
          const filtered = runner.filter((el) => el.value_type !== 3 && el.value_type !== 4);
           this.nationalObjects.push(filtered[0]); 
        }
        this.presentData(true);
      });
    },
    extractStateObjects() {
      this.programArea.specificIndicators.map(async (val, index, array) => {
        const runner = await this.dlQuery({
          datasource: val.dataSource,
          indicator: val.indicator,
          period: JSON.stringify(val.year),
          location: this.stateObj.id,
        });
          if(runner.length != 0){
            const filtered = runner.filter((el) => el.value_type !== 3 && el.value_type !== 4);
            this.stateObjects.push(filtered[0]);
          }
        this.presentStateData();
      });
    },
  },
  watch: {
    state(newVal, oldVal){
      if(oldVal == 'National'){
        console.log(this.temp)
         this.barChartOptions.series.push(this.temp)
      }
          this.barChartOptions.series[0].data = []
           this.nationalObjects = []
          this.barChartOptions.series[1].data = []
          this.stateObjects = []
        this.extractNationalDataObjects();
        this.extractStateObjects();
        //  this.getHealthFacilityData();
    }
  },
  mounted() {
    if(this.state == 'National'){
      this.justNationalData()
    } else {
      this.extractNationalDataObjects();
      this.extractStateObjects();
    }
  // this.getHealthFacilityData()
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
