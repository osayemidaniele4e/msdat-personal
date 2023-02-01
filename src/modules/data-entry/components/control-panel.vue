<template>
  <div class="w-100">
    <div class="row">
      <!-- -------- -->
      <div class="col-md-3 mb-3">
        <div class="form-group">
          <label for="period">Datasource</label>
          <multiselect
            v-model="DSValue"
            :options="DSList"
            placeholder="Pick a value"
            label="name"
            value="id"
            searchable
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
            @select="dispatchDataSource"
            selectLabel=""
            :loading="DSLoading"
          />
        </div>
      </div>
      <!-- -------- -->
      <div class="col-md-3 mb-3">
        <div class="form-group">
          <label for="period">Period</label>
          <multiselect
            v-model="periodValue"
            placeholder="Pick a value"
            :options="periodList"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
            :loading="periodLoading"
          />
        </div>
      </div>
      <!-- -------- -->
      <div class="col-md-3 mb-3">
        <div class="form-group">
          <label for="period">Value Type</label>
          <multiselect
            v-model="typeValue"
            :options="typeList"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
            :loading="periodLoading"
          />
        </div>
      </div>
      <!-- -------- -->
      <div class="col-md-3 mb-3">
        <div class="form-group">
          <label for="period">Location</label>
          <multiselect
            v-model="LocValue"
            :options="locList"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
            :loading="periodLoading"
          />
        </div>
      </div>
    </div>
    <!-- -------- PROGRAM AREA ACCORDIONS-->
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1" v-for="(el, i) in programAreas" :key="i">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="`accordion-${[i]}`" variant="primary">{{ el.programArea }}</b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${[i]}`" accordion="data-entry" role="tabpanel">
          <b-card-body v-for="(ef, j) in el.data" :key="j">
            <div class="list_entry">
              <div class="row">
                <div class="col-md-6">
                  <label class="font-weight-bold text-uppercase">indicator</label>
                </div>
                <div class="col-md-3">
                  <label class="font-weight-bold text-uppercase">Value</label>
                </div>
              </div>
            </div>
            <div class="">
              <div class="row d-flex align-items-center">
                <div class="col-md-6 mb-sm-3">
                  <p>{{ ef.full_name }}</p>
                </div>
                <div class="col-md-6 mb-sm-3">
                  <div class="form-group">
                    <label class="font-weight-bold text-uppercase sr-only" for="value">Value</label>
                    <input
                      type="text"
                      name="value"
                      id=""
                      class="form-control"
                      placeholder="Value"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <div class="w-100 d-flex justify-content-end">
        <b-button>Submit</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import DataEntryService from '../services';

export default {
  name: 'panel',
  data() {
    return {
      options: ['list', 'of', 'options'],
      DSValue: '',
      DSList: [],
      DSLoading: false,
      periodValue: '',
      periodList: [],
      periodLoading: false,
      typeValue: '',
      typeList: [],
      LocValue: '',
      locList: [],
      programAreas: [],
    };
  },
  computed: {
    DSValueString() {
      return this.DSValue?.id;
    },
  },
  methods: {
    async dispatchDataSource() {
      this.periodLoading = true;
      if (this.DSValueString !== undefined) {
        const resp = await DataEntryService.getDataSources(this.DSValueString);
        console.log(resp, 'resp');
        this.periodList = resp.period;
        this.typeList = resp.classification.map((el) => el.value_type);
        this.locList = resp.location.map((el) => el.name);
        // this.programAreas = resp.indicators;
      }
      this.periodLoading = false;
    },
  },
  async mounted() {
    this.DSLoading = true;
    this.DSList = await DataEntryService.getDataSources();
    this.DSLoading = false;
  },
};
</script>
