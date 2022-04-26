  <!-- Auther: Ghufran Ahmed -->

<template>
  <b-container>
    <b-row>
      <h2
        style="
          color: #202020;
          font-family: Work Sans;
          font-size: 25px;
          margin-top: -24px;
        "
        class="ml-3"
      >
        Select your sections and arrange your widgets
      </h2>
      <br />
      <b-col md="8" sm="12">
        <div v-for="(value,index) in values" :key="index">
          <div class="">
            <input
              type="checkbox"
              name="dashboard"
              id="dashboard"
              :checked="isSelected(value)"
              @click="selectedComponent($event, value.fieldName)"
            />
            <!-- //:checked="isSelected(value)"/> -->
            <label for="dashboard" class="fields">{{ value.fieldName }}</label>
          </div>
          <p style="width: 100%; font-family: Work Sans; font-size: 14px">
            This section shows an overview of your dashboard. This is a brief
            description...
          </p>
          <img :src="value.fieldImage" class="layout" />
        </div>
      </b-col>
      <b-col md="4" sm="12">
        <div class="dragable-list">
          <dragable-list />
          <b-row align-h="center" class="mt-3 text-right">
            <!-- <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col> -->
            <b-col cols="auto"
              ><b-button
                @click="approveData"
                class="nextBtn"
                style="font-family: Work Sans"
                >COMPLETE</b-button
              ></b-col
            >
            <b-col cols="auto"
              ><b-button class="SFL" disabled style="font-family: Work Sans"
                >Save for Later</b-button
              ></b-col
            >
          </b-row>
        </div>
      </b-col>
      <br />
    </b-row>
  </b-container>
</template>
<script>
import DragableList from '../components/Custom-dashboard-sections/Dragable-List.vue';

export default {
  components: {
    DragableList,
  },
  data() {
    return {
      values: [
        {
          fieldName: 'Indicator Overview',
          selected: this.$store.state.MSDAT_STORE.indicatorComparision,
          fieldImage: '/img/dashboardPreviewImages/Dashboard.PNG',
        },
        {
          fieldName: 'Zonal Analysis',
          selected: this.$store.state.MSDAT_STORE.zonalAnalysis,
          fieldImage: '/img/dashboardPreviewImages/ZonalAnalysis.PNG',
        },
        {
          fieldName: 'Indicator Comparsion - By Period ',
          selected: this.$store.state.MSDAT_STORE.zonalAnalysis,
          fieldImage:
            '/img/dashboardPreviewImages/IndicatorComparision-byPeriod.PNG',
        },
        {
          fieldName: 'Dataset Comparison',
          selected: this.$store.state.MSDAT_STORE.datasetComperision,
          fieldImage: '/img/dashboardPreviewImages/DataSetComparison.PNG',
        },
        {
          fieldName: 'Multi-source Indicator Comparison',
          selected: this.$store.state.MSDAT_STORE.multisourceComparison,
          fieldImage: '/img/dashboardPreviewImages/MultiSourceComparison.PNG',
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('updateStep', 4);
  },
  computed: {
    dashboardDetails() {
      return this.$store.getters.dashboardDetails;
    },
  },
  methods: {
    // Below function is excuted when approve data button is clicked
    approveData() {
      if (!this.dashboardDetails.name) {
        // eslint-disable-next-line no-alert
        alert('Dashboard name not provided');
        return;
      }
      const cDashboard = true;
      this.$store.dispatch('customDashboard', cDashboard);
      this.$router.push({
        name: 'my-custom-dashboard',
        params: {
          title: this.dashboardDetails.name.replace(/\s+/g, '_').toLowerCase(),
        },
      });
    },

    // PRESELECTION OF Dashboard widgets
    selectedComponent(e, fieldName) {
      const payload = {
        checked: e.target.checked,
        checkedField: fieldName,
      };
      this.$store.dispatch('dynamicSection', payload);
      if (fieldName === 'Indicator Overview') {
        this.$store.state.MSDAT_STORE.indicatorComparision = e.target.checked;
      }
      if (fieldName === 'Zonal Analysis') {
        this.$store.state.MSDAT_STORE.zonalAnalysis = e.target.checked;
      }
      if (fieldName === 'Indicator Comparsion - By Period') {
        this.$store.state.MSDAT_STORE.indicatorComparsionByPeriod = e.target.checked;
      }

      if (fieldName === 'Multi-source Indicator Comparison') {
        this.$store.state.MSDAT_STORE.multisourceComparison = e.target.checked;
      }
      if (fieldName === 'Dataset Comparison') {
        this.$store.state.MSDAT_STORE.datasetComperision = e.target.checked;
      }
    },
    isSelected(value) {
      return value.selected;
    },
  },
};
</script>

<style scoped>
@media (min-width: 740px) {
  .dragable-list {
    display: inline-block;
    position: fixed;
    /* margin-top: -45px; */
  }
}

@media screen and (max-width: 520px) {
  .dragable-list {
    /* display: block; */
    /* margin-top: -45px;  */
    position: relative;
  }
  .fields {
    width: 80% !important;
  }
}

.layout {
  top: 522px;
  left: 140px;
  width: 100%;
  height: 269px;
  margin-bottom: 24px;
}
.fields {
  background: #f5f5f5;
  width: 40%;
  height: 25px;
  padding-left: 5px;
  margin-left: 10px;
  font-family: 'Work Sans';
  font-size: 16px;
}
.nextBtn {
  background-color: #3f8994;
  color: #ffffff;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #3f8994;
  font-size: 15.00000375px;
}
.editBtn {
  background-color: #eaeaea;
  color: #000000;
  max-width: 253.500000063px;
  text-transform: uppercase;
  border-color: #eaeaea;
  font-size: 15.00000375px;
}
</style>
