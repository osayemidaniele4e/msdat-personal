<template>
  <b-container class="text-justify px-5" fluid>
    <p><b>Select your preferences</b></p>
    <p>
      Select the Program Areas, Data Sources, Period and Coverage Levels you are
      interested in.
    </p>
    <p id="link-to-about">
      <b>View datasheet</b>- see all available data in database
    </p>
    <b-card>
      <b-row>
        <b-col sm="12" lg="3">
          <SideSelection />
        </b-col>
        <b-col>
          <div class="vl" lg="1"></div>
        </b-col>
        <b-col sm="12" lg="8">
          <TheCustomTable />
          <b-row align-h="end" class="text-right work-sans">
            <b-col cols="auto"
              >Indicators:
              <b
                >{{
                  $store.getters[
                    'CUSTOM_DASHBOARD_STORE/indicatorsSelectedLength'
                  ]
                }}
                selected</b
              ></b-col
            >
            <b-col cols="auto"
              >Data Sources:
              <b
                >{{
                  $store.getters[
                    'CUSTOM_DASHBOARD_STORE/dataSourceSelectedLength'
                  ]
                }}
                Selected</b
              ></b-col
            >
            <b-col cols="auto"
              >Period:
              <b
                >{{
                  $store.getters['CUSTOM_DASHBOARD_STORE/periodSelectedLength']
                }}
                Years</b
              ></b-col
            >
            <b-col cols="auto"
              >Levels: <b>National, Zonal, SubNational</b></b-col
            >
          </b-row>
          <b-row align-h="end" class="mt-5 text-right work-sans">
            <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col>
            <b-col cols="auto">
              <router-link class="btn" to="/my-dashboard/preview"
                >approve Data</router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import fetchData from './fetchData';
import TheCustomTable from './TheCustomTable.vue';
import SideSelection from './sideSelection.vue';

export default {
  name: 'data-preferences',
  mixins: [fetchData],
  components: { TheCustomTable, SideSelection },
  computed: {
    // selectAll:{
    //   get:function(){
    //     return this.programAreaNIndicators ? th
    //   }
    // }
  },
  mounted() {
    this.$store.commit('updateStep', 2);
  },
  data() {
    return {
      selected: {
        indicators: [],
        period: [],
        sources: [],
      },
      indicatorsSelected: [],
      dataSourceSelected: [],
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
      ],
      periodSelected: [],
      levelSelected: [],
      levelOptions: ['National', 'Zonal', 'LGA', 'State'],
      allSelected: true,
      indeterminate: false,
      programAreas: [
        {
          name: 'RMNCH',

          indicators: [
            'Total Fertility Rate',
            'ANC Coverage Rate (at least 1 visit)',
            'Skilled Birth Attendance',
            'Prevalence of Child with diarrhoea',
          ],
        },
        {
          name: 'NUTRITION',

          indicators: [
            'Percentage of children under 6 months exclusiv...',
            'Prevalence of stunting in children under 5 years',
            'Prevalence of wasting in children under 5 years',
            'Underweight prevalence in children under 5 ye...',
          ],
        },
      ],
      category: [
        {
          name: 'ROUTINE',
          sources: ['NHMIS Annual', 'NHMIS Quarterly', 'NHMIS Monthly'],
        },
        {
          name: 'SURVEYS',
          sources: [
            'NDHS',
            'NHA',
            'KDGHS',
            'NARHS',
            'NAIIS',
            'NMIS',
            'NHSPSS',
            'PCCS',
            'MICS',
          ],
        },
      ],
      value: [],
      fields: [
        // A column that needs custom formatting
        { key: 'indicator', label: 'Indicators' },
        { key: 'datasource', label: 'Datasources' },
        { key: 'level', label: 'Level' },
        { key: 'year', label: 'years' },
      ],
      items: [
        {
          indicator: 'Maternal Health',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
        {
          indicator: 'Skilled attendance at delivery or birth',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
        {
          indicator: 'Total fertility rate',
          datasource: ['NHMIS', 'NNHS', 'NDHS', 'IHME'],
          level: ['National', 'Zonal', 'Subnational', 'LGA'],
          year: [
            '2019',
            '2018',
            '2017',
            '2016',
            '2005',
            '2001',
            '1999',
            '1998',
          ],
        },
      ],
    };
  },
  methods: {
    isAllSelected(available, selected) {
      let value = true;
      available.every((element) => {
        if (!this.indicatorsSelected[selected].includes(element)) {
          value = false;
          return false;
        }
        value = true;
        return true;
      });
      return value;
    },
    toggle(item, arr) {
      if (this.selected[arr].includes(item)) {
        const index = this.selected[arr].indexOf(item);
        if (index > -1) {
          this.selected[arr].splice(index, 1);
        }
      } else {
        this.selected[arr].push(item);
      }
    },
    toggleAllProgramAreaIndicator(e, indicators) {
      console.log(e, indicators);
      this.indicatorsSelected = indicators ? this.flavours.slice() : [];
    },
    toggleAll(available, selected) {
      console.log(available, selected);
      if (this.isAllSelected(available, selected)) {
        this.indicatorsSelected[selected] = [];
      } else {
        available.forEach((element) => {
          if (!this.indicatorsSelected[selected].includes(element)) {
            this.indicatorsSelected[selected].push(element);
          }
        });
      }
    },
    isSelected(item, collection) {
      return this.selected[collection].includes(item);
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
.vl {
  border-left: 1px solid #E3E3E3;
  height: 100%;
  width: 10px !important;
  padding: 0px !important;
  margin: 0px !important;
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
</style>
