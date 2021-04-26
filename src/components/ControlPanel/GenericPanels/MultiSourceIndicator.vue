<template>
  <div class="">
    <!-- Indicator1 here -->
    <div class="row">
      <div class="col work-sans">
        <label class="h6 text-uppercase work-sans">indicators</label>
        <div>
          <multiselect
            v-model="payload.indicator"
            :options="indicatorOptions"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            :preselect-first="true"
            class="work-sans"
          ></multiselect>
        </div>
      </div>
    </div>

    <!-- filter-tab here -->
    <div class="row">
      <div class="col">
      <label class="h6 text-uppercase work-sans">Select Visualization</label>
        <div class="row">
          <div class="col">
            <div class="btn-group btn-block mb-1 work-sans" role="group">
              <button
                type="button"
                @click="payload.visualization = 'zonal_map'"
                class="btn btn-sm btn-outline-secondary"
                :class="{ active:  (payload.visualization === 'zonal_map') }"
              >
                Zones Map
                <img
                  :src="require('../svg/zonal_map.svg')"
                  alt=""
                  srcset=""
                />
              </button>
              <button
                type="button"
                @click="payload.visualization = 'state_map'"
                class="btn btn-sm btn-outline-secondary"
                :class="{ active:  (payload.visualization === 'state_map') }"
              >
               State Map
               <img
                  class="text-danger"
                  :src="require('../svg/state_map.svg')"
                  alt=""
                  srcset=""
                />
              </button>
              <button
                type="button"
                @click="payload.visualization = 'line'"
                class="btn btn-sm btn-outline-secondary"
                :class="{ active:  (payload.visualization === 'line') }"
              >
               Line <img :src="require('../svg/line.svg')" alt="" srcset="" />
              </button>
              <button
                type="button"
                @click="payload.visualization = 'column'"
                class="btn btn-sm btn-outline-secondary"
                :class="{ active:  (payload.visualization === 'column') }"
              >
               Column<img
                  :src="require('../svg/column.svg')"
                  alt=""
                  srcset=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- data sources here -->
      <div class="col">
        <label class="h6 text-uppercase work-sans">data sources</label>

        <div>
          <multiselect
            v-model="payload.dataSource"
            :options="dataSourceOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :preselect-first="true"
          ></multiselect>
        </div>
      </div>

      <!-- year here -->
      <div class="col">
      <label class="h6 text-uppercase work-sans">year</label>
        <div>
          <multiselect
            v-model="payload.year"
            :options="yearOptions"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            :preselect-first="true"
          ></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import ControlMixins from '@/components/ControlPanel/ControlMixins';

export default {
  mixins: [ControlMixins],
  components: { Multiselect },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
/*  */
</style>
