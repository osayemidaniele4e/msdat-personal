<template>
  <div class="w-100 mb-3">
    <div class="row wrap">
      <!-- -------- -->
      <div class="mb-3" :class="[DSValue === '' ? 'col-12' : 'col-md-3']">
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
      <div class="col-md-3 mb-3" v-if="showselectors">
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
          />
        </div>
      </div>
      <!-- -------- -->
      <div class="col-md-3 mb-3" v-if="showselectors">
        <div class="form-group">
          <label for="period">Value Type</label>
          <multiselect
            v-model="typeValue"
            label="value_type"
            value="id"
            :options="typeList"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
          />
        </div>
      </div>
      <!-- -------- -->
      <div class="col-md-3 mb-3" v-if="showselectors">
        <div class="form-group">
          <label for="period">Location</label>
          <multiselect
            v-model="locValue"
            label="name"
            value="id"
            :options="locList"
            :close-on-select="true"
            :show-labels="false"
            :allow-empty="false"
            :hide-selected="true"
          />
        </div>
      </div>
    </div>
    <!-- -------- PROGRAM AREA ACCORDIONS-->

    <div class="accordion h-75" role="tablist">
      <div class="w-100 d-flex align-items-center justify-content-center" v-if="loading">
        <Theloader />
      </div>
      <b-card no-body class="mb-1" v-for="(el, i) in programAreas" :key="i" v-else>
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle="`accordion-${[i]}`" variant="primary">{{
            el.programArea
          }}</b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${[i]}`" accordion="data-entry" role="tabpanel">
          <b-card-body class="p-1">
            <div class="list_entry">
              <div class="row">
                <div class="col-md-6 ms-2">
                  <label class="font-weight-bold text-uppercase">indicator</label>
                </div>
                <div class="col-md-6">
                  <label class="font-weight-bold text-uppercase text-start">Value</label>
                </div>
              </div>
            </div>
            <!-- <pre>{{ el }}</pre> -->
            <div class="" v-for="(ef, j) in el.data" :key="j">
              <div class="row d-flex align-items-center">
                <div class="col-md-6 mb-sm-3">
                  <h5>{{ ef.full_name }}</h5>
                </div>
                <div class="col-md-4 mb-sm-3">
                  <div class="form-group">
                    <label class="font-weight-bold text-uppercase sr-only" for="value">Value</label>
                    <input
                      type="number"
                      name="value"
                      :id="`${[ef.id]}`"
                      @change="onChange($event)"
                      class="form-control"
                      placeholder="input Value"
                    />
                  </div>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
      <div class="w-100 d-flex justify-content-end" v-if="entry.length > 0">
        <b-button v-b-modal.modal-1 @click.prevent="handleSubmit">Submit</b-button>
      </div>
      <DataTable v-if="entry.length > 0" :tableData="entry" @proceed="handleProceed" />
    </div>
  </div>
</template>

<script lang="js">
import DataEntryService from '../services';
import DataTable from './dataTable.vue';
import Theloader from './theLoader.vue';

export default {
  name: 'panel',
  components: {
    Theloader,
    DataTable,
  },
  data() {
    return {
      showselectors: false,
      showDataTable: false,
      loading: false,
      DSValue: '',
      DSList: [],
      DSLoading: false,
      periodValue: '',
      periodList: [],
      typeValue: '',
      typeList: [],
      locValue: '',
      locList: [],
      programAreas: [],
      entry: [],
      row: [],
    };
  },
  computed: {
    DSValueString() {
      return this.DSValue?.id;
    },
    locValueString() {
      return this.locValue?.id;
    },
  },
  watch: {
    async locValueString(newVal) {
      this.loading = true;
      if (newVal !== undefined) {
        const resp = await DataEntryService.getLocation({ DS: this.DSValueString, locationId: newVal });
        this.programAreas = resp;
      }
      this.loading = false;
    },
    periodValue(value) {
      const newArr = this.entry.map((el) => {
        const { period, ...others } = el;
        const newObj = {
          ...others,
          period: value,
        };
        return newObj;
      });
      this.entry = newArr;
    },
    typeValue(value) {
      const newArr = this.entry.map((el) => {
        // eslint-disable-next-line camelcase
        const { value_type, ...others } = el;
        const newObj = {
          ...others,
          value_type: value.value_type,
        };
        return newObj;
      });
      this.entry = newArr;
    },
  },

  methods: {
    handleSubmit() {
      if (this.entry.length > 0) {
        this.$bvModal.hide('data-enty');
      } else {
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          icon: 'warning',
          title: "Values can't be empty, please select a program area and input available data",
        });
      }
    },
    async handleProceed() {
      this.loading = true;

      try {
        const validEntry = this.entry.map((el) => ({
          datasource: el.datasource,
          indicator: el.indicator,
          location: el.location,
          period: el.period,
          value: el.value,
          value_type: Number(this.typeValue.id),
        }));
        const dataVal = {
          name: `${this.locValue.name}-${this.periodValue}-data`,
          file_type: 'Data',
          data: validEntry,
          application: 'NGF',
        };
        await DataEntryService.postDataEntry(dataVal);
        this.$swal({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 6000,
          icon: 'success',
          title: 'data entry has been submitted successfully',
        });
        this.loading = false;
      } catch (error) {
        console.log(error.error);
      } finally {
        this.loading = false;
      }
    },
    onChange(event) {
      // eslint-disable-next-line eqeqeq
      const row = this.programAreas.map((el) => el.data.filter((ef) => ef.id === Number(event.target.id)));
      row.map((ef) => {
        if (ef.length > 0) {
          const newObj = {
            id: ef[0].id,
            indicator: ef[0].id,
            indicatorName: ef[0].full_name,
            value: event.target.value,
            datasource: this.DSValue.name,
            location: this.locValue.name,
            period: this.periodValue,
            value_type: this.typeValue.value_type,
          };
          this.entry.push(newObj);
          this.entry.map((el) => {
            if (el.indicator === newObj.indicator) {
              this.entry[this.entry.indexOf(el)] = newObj;
            }
            return el;
          });
          this.entry = [...new Set(this.entry.map((item) => item))];
          console.log(this.entry, 'entry');
        }
        return this.entry;
      });
    },
    async dispatchDataSource() {
      if (this.DSValueString !== undefined) {
        const resp = await DataEntryService.getDataSources(this.DSValueString);
        this.showselectors = true;
        this.periodList = resp.period;
        this.periodValue = this.periodList[0];
        this.typeList = resp.classification;
        this.typeValue = this.typeList[0];
        this.locList = resp.location;
      }
    },
  },

  async mounted() {
    this.DSLoading = true;
    this.DSList = await DataEntryService.getDataSources();
    this.DSLoading = false;
  },
};
</script>

<style scoped>
.wrap {
  transition-duration: 2s;
  transition-timing-function: ease-in;
  transition-delay: 5s;
}
.btn {
  text-align: start;
}
</style>
