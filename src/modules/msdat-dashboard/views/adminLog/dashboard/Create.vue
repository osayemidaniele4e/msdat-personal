<template>
  <div>
    <div class="pb-1">
      <!-- top -->
      <div v-if="$route.query.edit" class="px-5 py-4">
        <el-link
          type="danger"
          href="/#/dashboard/list"
          class="btn btn-link text-danger"
          :underline="false"
        >
          <strong>&lt; Back to Dashboard Management</strong>
        </el-link>
      </div>
      <div v-else class="px-5 py-4 shadow-sm">
        <h4 class="h3 text-muted font-weight-bold">Dashboard Management</h4>
        <span>You can manage existing dashboard by clicking on the "Existing Dashboard Link".</span>
        <el-link
          type="primary"
          href="/#/dashboard/list"
          class="btn btn-link text-primary"
          :underline="false"
          style="text-decoration: underline"
        >
          <strong>Existing Dashboard</strong>
        </el-link>
      </div>
      <div class="my-3 row mx-5 p-5 border rounded d-flex flex-column" style="top: 75px">
        <h4 class="text-primary mt-2">{{ $route.query.edit ? "Edit" : "Create" }} Dashboard</h4>
        <strong>Dashboard Details</strong>
        <b-row v-loading="loading">
          <b-col cols="12" lg="6" class="mt-4">
            <label for="name">Name of dashboard *</label>
            <el-input
              id="name"
              v-model="form.name"
              class="w-100"
              placeholder="Enter dashbaord name (min: 3 characters)"
            ></el-input>
          </b-col>
          <b-col cols="12" lg="6" class="mt-4">
            <label for="description">Dashboard Description</label>
            <el-input
              id="description"
              v-model="form.description"
              class="w-100"
              placeholder="Enter short description for dashboard"
              disabled
            ></el-input>
          </b-col>
          <b-col cols="12" lg="6" class="mt-4">
            <label for="category">Dashboard Category</label><br />
            <!-- v-model="form.category" -->
            <el-select
              id="category"
              v-model="form.category"
              class="w-100"
              placeholder="Select Category"
              disabled
            >
              <el-option v-for="item in categories" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </b-col>
          <b-col cols="12" lg="6" class="mt-4">
            <label for="category">Sections</label><br />
            <!-- v-model="form.category" -->
            <el-select
              id="category"
              v-model="form.sections"
              multiple
              class="w-100"
              placeholder="Select sections in order"
              disabled
            >
              <el-option v-for="item in sections" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </b-col>
          <dropCard
            name="indicator"
            placeholder="Select an indicator that will appear on default"
            label="Select Default Indicator"
            :list="finalIndicatorList"
            :value.sync="form.indicator"
            :error="dashboardError.indicators"
          />
          <dropCard
            name="indicators"
            placeholder="Select Other Indicators That Will Appear On Dashboard"
            label="Select Other Indicators"
            :list="finalIndicatorList"
            :values.sync="form.indicators"
            multiple
            :default-selected="form.indicator"
            :error="dashboardError.indicators"
          />
          <dropCard
            name="datasource"
            placeholder="Select the datasource that will appear on default"
            label="Select Default Datasource"
            :list="finalDatasourceList"
            :value.sync="form.datasource"
            :error="dashboardError.datasources"
          />
          <dropCard
            name="datasources"
            placeholder="Please Select Other Datasources"
            label="Select Other Datasources"
            :list="finalDatasourceList"
            :values.sync="form.datasources"
            multiple
            :default-selected="form.datasource"
            :error="dashboardError.datasources"
          />
          <b-col v-if="validationMsg" cols="12" class="text-danger mt-4 d-flex align-items-center">
            <svg-icon icon-class="warning" />&nbsp;
            {{ validationMsg }}
          </b-col>
          <b-col cols="12" class="mt-3 pt-3">
            <b-button v-loading="submitting" class="px-4 pt-2" @click="onCreate">{{
              $route.query.edit ? "Update and Save" : "Create Dashboard"
            }}</b-button>
            <el-popconfirm
              v-if="$route.query.edit"
              confirm-button-type="danger"
              icon-color="red"
              title="This will permanently delete the dashboard. Continue?"
              @confirm="onDelete"
            >
              <b-button
                slot="reference"
                v-loading="submitting"
                class="btn shadow px-4 pt-2 mx-2"
                variant="danger"
                >Delete Dashboard</b-button
              >
            </el-popconfirm>
          </b-col>
        </b-row>
        <el-dialog
          v-if="$route.query.edit"
          :visible.sync="dialogVisible"
          :before-close="(edit = null)"
          width="480px"
          class="pt-0 mt-0"
        >
          <el-result class="pt-0 mt-0">
            <template slot="icon">
              <b-icon icon="check-circle-fill" style="color: #409eff"></b-icon>
            </template>
            <template slot="title">
              <h4>Dashboard Updated!</h4>
            </template>
            <template slot="subTitle">
              <span>Do you want to preview dashboard</span>
            </template>
          </el-result>
          <div class="d-flex flex-column align-items-center mb-4">
            <el-button class="w-50 mx-auto mb-2" type="primary" @click="openWindow"
              >Yes, Launch Dashboard</el-button
            >
            <el-button type="text" class="w-50 mx-auto" @click="$router.push('/dashboard/list')"
              >Back to Dashboard Management</el-button
            >
          </div>
        </el-dialog>
        <el-dialog v-else :visible.sync="dialogVisible" width="480px" class="pt-0 mt-0">
          <el-result class="pt-0 mt-0">
            <template slot="icon">
              <b-icon icon="check-circle-fill" style="color: #409eff"></b-icon>
            </template>
            <template slot="title">
              <h4 class="p-3">
                MSDAT Dashboard<br />
                Successfully Created!
              </h4>
            </template>
            <template slot="subTitle">
              <span>Today, {{ new Date().toDateString() }}</span>
            </template>
            <template slot="extra">
              <strong>{{ form.name }}</strong>
            </template>
          </el-result>
          <div class="d-flex flex-column align-items-center mb-4">
            <el-button class="w-50 mx-auto mb-2" type="primary" @click="openWindow"
              >Launch Dashboard</el-button
            >
            <el-button class="w-50 mx-auto mt-2" @click="$router.push('/dashboard/list')"
              >View Dashboards List</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const newForm = {
  id: null,
  created: null,
  name: '',
  category: 'Health Outcomes',
  description: 'New Dashboard',
  indicator: -1,
  indicators: [],
  datasource: -1,
  datasources: [],
  sections: [
    'Indicator Overview',
    'Zonal Analysis',
    'Indicator Comparison',
    'Dataset Comparison',
    'Multi-source Comparison',
  ],
};
export default {
  components: {
  },
  data() {
    return {
      form: { ...newForm },
      categories: [
        'Population',
        'Health Input',
        'Health Ouptuts',
        'Health Outcomes',
        'Other Dashboards',
      ],
      sections: [
        'Indicator Overview',
        'Zonal Analysis',
        'Indicator Comparison',
        'Dataset Comparison',
        'Multi-source Comparison',
      ],
      validationMsg: '',
      dialogVisible: false,
      submitting: false,
      link: '',
      edit: this.$route.query.edit,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['indicators', 'datasources', 'dashboards', 'dashboardError', 'user']),
    finalIndicatorList() {
      let list = [];
      const indicators = [...this.indicators]
        .map((ind) => ({ ...ind, name: ind.full_name }))
        .sort((a, b) => a.id - b.id);
      const groups = [...new Set(indicators.map((ind) => ind.program_area))];
      groups.forEach((group) => {
        list.push({
          id: group.replace(/s+/g, '_'),
          name: group,
          pa: true,
        });
        list = list.concat(indicators.filter((ind) => ind.program_area === group));
      });
      return list;
    },
    finalDatasourceList() {
      return this.datasources.map((source) => ({ ...source, name: source.datasource }));
    },
    nameState() {
      return this.name.length >= 3;
    },
  },
  watch: {
    form: {
      handler() {
        if (this.validationMsg) this.validateForm();
      },
      deep: true,
    },
    datasources: {
      handler(value) {
        this.form.datasources = value.map((dt) => dt.id);
      },
      immediate: true,
    },
  },
  async mounted() {
    if (!this.indicators.length || this.dashboardError.indicators) this.loadIndicators();
    if (!this.datasources.length || this.dashboardError.datasources) this.loadDatasources();

    if (this.$route.query.edit) {
      this.edit = this.$route.query.edit;
      this.loading = true;
      if (!this.dashboards.length || this.dashboardError.dashboards) await this.loadDashboards();
      const edit = this.dashboards.find((dashboard) => dashboard.id === this.$route.query.edit);
      if (!edit) {
        this.$notify.error({
          title: 'An Error Occurred',
          message: 'Unable to retrieve dashboard!',
        });
        this.edit = null;
      } else {
        this.form = {
          id: edit.id,
          name: edit.title,
          category: 'Health Outcomes',
          description: 'Existing Dashboard',
          indicator: edit.initialIndicator,
          indicators: edit.indicators,
          datasource: edit.initialDataSource,
          datasources: edit.dataSources,
          sections: this.sections,
        };
        this.defaultIndicators = edit.defaultIndicators;
      }
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('dashboard', [
      'loadIndicators',
      'loadDatasources',
      'loadDashboards',
      'uploadDashboard',
      'removeDashboard',
    ]),
    async onCreate() {
      if (!this.submitting && this.validateForm()) {
        this.submitting = true;
        const {
          indicator, indicators, datasource, datasources,
        } = this.form;
        // add default indicator to indicators list
        if (!indicators.includes(indicator)) {
          this.form.indicators = [indicator, ...indicators];
        }
        // add default datasource to datasources list
        if (!datasources.includes(datasource)) {
          this.form.datasources = [datasource, ...datasources];
        }
        // send api request
        const id = this.form.id || null;
        const defaultIndicators = this.defaultIndicators
          ? this.defaultIndicators
          : indicators.slice(0, 3);
        const payload = {
          id,
          title: this.form.name,
          show_table_related_indicator: true,
          visibility: 'public',
          user: 1,
          initial_indicator: indicator,
          initial_datasource: datasource,
          initial_location: 1,
          indicators,
          default_indicators: defaultIndicators,
        };
        console.log('payload: ', payload);
        const dashboardName = await this.uploadDashboard(payload);
        if (this.dashboardError.upload) {
          this.$notify.error({
            title: 'An Error Occurred',
            message: 'Unable to upload dashboard, please try again!',
          });
        } else {
          this.link = `https://msdat.fmohconnect.gov.ng/dashboard/${dashboardName}?indicator=${indicator}&datasource=${datasource}`;
          this.form = { ...newForm };
          this.dialogVisible = true;
        }
        this.loadDashboards();
        this.submitting = false;
      }
    },
    async onDelete() {
      this.submitting = true;
      const response = await this.removeDashboard(this.form.id);
      if (response) {
        this.$notify({
          title: 'Dashboard Deleted',
          message: 'Dashboard has been deleted successfully!',
          type: 'success',
        });
      } else {
        this.$notify.error({
          title: 'An Error Occurred',
          message: 'Unable to delete Dashboard!',
        });
      }
      this.loadDashboards();
      this.$router.push('/dashboard/list');
      this.submitting = false;
    },
    validateForm() {
      Object.keys(this.form).forEach((key) => {
        if (['id', 'created'].includes(key)) return;
        if (['name', 'description'].includes(key)) {
          if (this.form[key].trim().length < 3) {
            this.validationMsg = `Dashboard ${key} must not be less than 3 characters!`;
            this.validationMsg = `Dashboard ${key} must not be less than 3 characters!`;
          }
          return;
        }
        const param = this.form[key];
        if (
          (typeof param !== 'number' && !param.length)
          || (typeof param === 'number' && param < 1)
        ) {
          this.validationMsg = `${this.capitalise(key)} is/are required!`;
          // eslint-disable-next-line
          return false;
        }
      });
      this.validationMsg = '';
      return true;
    },
    capitalise(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    openWindow() {
      window.open(this.link, '_blank');
    },
  },
};
</script>
