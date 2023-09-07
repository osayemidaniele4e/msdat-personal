<!-- eslint-disable vue/no-parsing-error -->
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
        <div v-for="(value, index) in values" :key="index">
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
      <b-col md="12" lg='12' sm="12">
        <div class="d-flex mb-5">
        <!-- <b-col cols="auto"
          ><b-button
            @click="approveData"
            class="nextBtn"
            style="font-family: Work Sans"
            >COMPLETE</b-button
          ></b-col
        > -->

        <!-- v-b-modal.modal-visibility -->

        <button id="popover-button-event">Create dashboard</button>

        <b-popover ref="popover" target="popover-button-event" triggers="hover" title="Choose visibility">
     <span @click="createPrivateDashboard()" class="choose-visibility-option">
      <b-icon icon="person-fill" style="color: #7952b3;"></b-icon>
      Private dashboard</span>
     <br>
     <span
     class="choose-visibility-option"
     v-b-modal.modal-public-dashboard>
     <b-icon icon="globe" style="color: #7952b3;"></b-icon>
     Public dashboard</span>
    </b-popover>

    <b-modal id="modal-in-review" title="BootstrapVue" size="lg" hide-footer hide-header>
      <div class="in-review">
        <b-icon icon="exclamation-circle" style="color: #7952b3;"></b-icon>
        <br>
        <h2>Your dashboard is currently in review</h2>
        <span>You will be notified when your dashboard is published</span>
        <br>
        <span>you will be directed to your dashboard in 5 seconds</span>
        <!-- <button>Continue</button> -->
      </div>

</b-modal>

    <b-modal id="modal-public-dashboard" title="BootstrapVue" size="lg" hide-footer hide-header>
      <div class="modal-form-div">
        <span class="modalHeader1">Create a Public Dashboard</span>
      <br><br>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col>        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="public_creator.name"
          placeholder="Full name"
          class="input"
          required
        ></b-form-input>
      </b-form-group></b-col>

      <b-col>
        <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        required
      >
        <b-form-input
          id="input-1"
          v-model="public_creator.email"
          type="email"
          placeholder="Enter email"
          class="input"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
        </b-row>

      <b-form-group id="input-group-2" label="Organisation:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="public_creator.organization"
          placeholder="Organization"
          class="input"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Reason:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="public_creator.Reason"
          placeholder="Reason"
          class="input"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Dashboard name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="public_creator.name_of_dashboard"
          placeholder="Dashboard name"
          class="input"
          required
        ></b-form-input>
      </b-form-group>
<br>
      <b-button type="submit" variant="primary" class="create_dashboard_btn">Create Dashboard</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
      </div>


</b-modal>

<b-modal id="modal-visibility" title="BootstrapVue" size="lg" hide-footer>
  <b-button v-b-toggle.collapse-private variant="primary">Create a private dashboard</b-button>
  <b-collapse id="collapse-private" class="mt-2">
    <!-- <b-button
            @click="approveData"
            class="nextBtn"
            style="font-family: Work Sans"
            >COMPLETE</b-button
          > -->
          <button @click="createPrivateDashboard()">Private dashboard</button>

  </b-collapse>

  <b-button v-b-toggle.collapse-public variant="primary" hide-header>Create a public dashboard</b-button>
  <b-collapse id="collapse-public" class="mt-2">
    <b-card>
      <b-form-input v-model="public_creator.name" placeholder="Full name" class="input"></b-form-input>
      <br>
      <b-form-input v-model="public_creator.email" placeholder="Email address"></b-form-input>
      <br>
      <b-form-input v-model="public_creator.organization" placeholder="Organisation"></b-form-input>
      <br>
      <b-form-input v-model="public_creator.Reason" placeholder="Reason"></b-form-input>
      <br>
      <b-form-input v-model="public_creator.name_of_dashboard" placeholder="Name of Dashboard"></b-form-input>
      <br>
      <button @click="createPublicDashboard()">Public dashboard</button>
    </b-card>
  </b-collapse>
<!--
  <button @click="changeVisibility('private')">
    change to private
  </button>

  <button @click="changeVisibility('public')">
    change to public
  </button> -->
</b-modal>
        </div>
      </b-col>
      <!-- <b-col md="4" sm="12">
        <div class="dragable-list">
          <dragable-list />
          <b-row align-h="center" class="mt-3 text-right">
            // eslint-disable-next-line vue/no-parsing-error
            <!- <b-col class="align-baseline" cols="auto"
              ><p class="baseline">Save for Later</p>
            </b-col> -->
      <!-- <b-col cols="auto"
              ><b-button
                @click="approveData"
                class="nextBtn"
                style="font-family: Work Sans"
                >COMPLETE</b-button
              ></b-col
            > -->
      <!-- <b-col cols="auto"
              ><b-button class="SFL" disabled style="font-family: Work Sans"
                >Save for Later</b-button
              ></b-col
            > -->
      <!-- </b-row>
        </div>
      </b-col> -->
      <br />
    </b-row>
  </b-container>
</template>
<script>
import DragableList from '../components/Custom-dashboard-sections/Dragable-List.vue';

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
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
          fieldName: 'Indicator Comparison',
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
          fieldName: 'Multi-source Comparison',
          selected: this.$store.state.MSDAT_STORE.multisourceComparison,
          fieldImage: '/img/dashboardPreviewImages/MultiSourceComparison.PNG',
        },
      ],
      public_creator: {
        name: '',
        email: '',
        organization: '',
        Reason: '',
        name_of_dashboard: '',
      },
      form: {
        email: '',
        name: '',
        food: null,
        checked: [],
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true,
    };
  },
  mounted() {
    this.$store.commit('updateStep', 4);
    // Deactivate all dashboard sections by default
    this.$store.dispatch('deactivateAllSections');
  },
  computed: {
    dashboardDetails() {
      return this.$store.getters.dashboardDetails;
    },
  },
  methods: {
    async onSubmit(event) {
      await event.preventDefault();
      await this.createPublicDashboard();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.public_creator.name = '';
      this.public_creator.email = '';
      this.public_creator.organization = '';
      this.public_creator.Reason = '';
      this.public_creator.name_of_dashboard = '';
    },
    changeVisibility(status) {
      if (status === 'private') {
        this.$store.dispatch('setVisibility', 'private');
      }

      if (status === 'public') {
        this.$store.dispatch('setVisibility', 'public');
      }
    },

    async createPublicDashboard() {
      // send the request to create a public dashboard
      await this.$store.dispatch('setDashboardRequest', this.public_creator);
      // hide the 'modal-public-dashboard'
      await this.$bvModal.hide('modal-public-dashboard');
      // show the 'modal-in-review'
      await this.$bvModal.show('modal-in-review');

      // Wait for 10 seconds using setTimeout
      setTimeout(() => {
        // After waiting for 10 seconds, call the approveData() function
        this.approveData();
      }, 5000); // 10000 milliseconds = 10 seconds
    },

    async createPrivateDashboard() {
      // send the request to create a public daashboard

      // change the visibility
      await this.changeVisibility('private');
      // create the dashboard using the approveData() function
      await this.approveData();
    },

    // Below function is excuted when approve data button is clicked

    approveData() {
      if (!this.dashboardDetails.name) {
        // eslint-disable-next-line no-alert
        this.$swal('Dashboard name not provided');
        return;
      }
      this.$store.dispatch('customDashboard', true);
      const t = this.dashboardDetails.name.replace(/\s+/g, '_').toLowerCase();
      this.$router.push({
        path: `/dashboard/${t}`,
        component: () => import('../../dynamic-dashboard/index.vue'),
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
      if (fieldName === 'Indicator Comparison') {
        this.$store.state.MSDAT_STORE.indicatorComparsionByPeriod = e.target.checked;
      }

      if (fieldName === 'Multi-source Comparison') {
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
  }
}

@media screen and (max-width: 520px) {
  .dragable-list {
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

.modalHeader1{
  font: var(--unnamed-font-style-normal) normal bold 35px/47px var(--unnamed-font-family-dm-sans);
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--unnamed-color-202020);
text-align: left;
font: normal normal bold 35px/47px DM Sans;
letter-spacing: 0px;
color: #202020;
opacity: 1;
}

.modal-form-div{
  padding: 20px;
}

.input{
  /* UI Properties */
background: #EAEAEA 0% 0% no-repeat padding-box;
opacity: 1;
border: none;
padding: 20px;
}

.create_dashboard_btn{
  background: #3F8994 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000029;
border-radius: 10px;
opacity: 1;
width: 188px;
height: 43px;
font-size: 15px;
}


.in-review{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.choose-visibility-option{
  cursor: pointer;
}

.choose-visibility-option:hover{
  opacity: 0.7;
}
</style>
