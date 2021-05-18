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
      <b-col
        sm="12"
        :md="this.programArea.name == 'Health Facility Survey' ? 'auto' : '8'"
      >
        <div class="ml-3" v-show="this.programArea.name == 'mortality'">
          <b-row>
            <b-col>
              <p>Maternal Mortality Ratio</p>
              <p class="source">per 100,000</p>
            </b-col>
            <b-col cols="auto">
              <p>National</p>
              <p class="grey-value">232.5</p>
            </b-col>
            <b-col cols="auto">
              <p>{{ this.state }}</p>
              <p class="red-value">183.7</p>
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
            style="background-color: #054A80; border: 1px solid white; height: 20px"
          >
            <p class="mx-auto">Pre-pregnancy</p>
          </b-col>
          <b-col style="background-color: #2C8CCA; border: 1px solid white">
            <p>Pregnancy</p>
          </b-col>
          <b-col style="background-color: #3F7299; border: 1px solid white">
            <p>Birth</p>
          </b-col>
          <b-col style="background-color: #43893B; border: 1px solid white">
            <p>Postnatal</p>
          </b-col>
          <b-col style="background-color: #2C9F35; border: 1px solid white">
            <p>Infancy</p>
          </b-col>
          <b-col style="background-color: #8FB438; border: 1px solid white">
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
              <p class="value text-right">54.3%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">54.3%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div>
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">54.3%</p>
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
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">54.3%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div class="mb-4">
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">54.3%</p>
              <p class="source text-right">Source: NHFS 2018</p>
            </b-col>
          </b-row>
        </div>
        <div>
          <p class="blue-heading">HR Guideline and Workforce</p>
          <b-row>
            <b-col>
              <p class="hfs-details">
                Proportion of PHF health workers interviewed who had received prior training in IMCI
              </p>
            </b-col>
            <b-col>
              <p class="value text-right">54.3%</p>
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
import ProgramAreaIcon from './programAreaIcon.vue';

export default {
  name: 'programAreaOverview',
  components: {
    BaseBar,
    ProgramAreaIcon,
  },
  props: {
    state: String,
    programArea: Object,
  },
  data() {
    return {
      iconUrl: `@/assets/state-profile/svg/${this.programArea.icon}.svg`,
      isDefinitionVisible: false,
      barChartOptions: {
        plotOptions: {
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0,
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
            color: this.programArea.colors[1],
            data: [
              ['Prevalence of HIV (NAIIS 2019)', 278],
              [
                'Percentage of people age 15-49 who have been tested for HIV and know their results (MICS 2016)',
                143,
              ],
              ['Measles immunization coverage (NHMIS 2018)', 575],
              ['Under-5 mortality rate (NHDS 2018)', 523],
              ['Adapt chart height to legend height', 278],
            ],
            pointPadding: 0.1,
            pointPlacement: 0,
          },
          {
            name: this.state,
            className: 'test',
            color: this.programArea.colors[0],
            data: [
              ['Prevalence of HIV (NAIIS 2019)', 278],
              [
                'Percentage of people age 15-49 who have been tested for HIV and know their results (MICS 2016)',
                143,
              ],
              ['Measles immunization coverage (NHMIS 2018)', 575],
              ['Under-5 mortality rate (NHDS 2018)', 523],
              ['Adapt chart height to legend height', 278],
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
