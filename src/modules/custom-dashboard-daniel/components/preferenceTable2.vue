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
      <div class="row">
        <div class="col-3">
          <b-form-group label="Program Area" label-for="programArea">
          </b-form-group>
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'data-preferences',
  components: {},
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
        if (!this.selected[selected].includes(element)) {
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
    toggleAll(available, selected) {
      if (this.isAllSelected(available, selected)) {
        this.selected[selected] = [];
      } else {
        available.forEach((element) => {
          if (!this.selected[selected].includes(element)) {
            this.selected[selected].push(element);
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
