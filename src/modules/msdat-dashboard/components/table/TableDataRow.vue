<template>
  <tr>
    <template>
      <!-- DO NOT REMOVE class that begin we table- they
      help control the tour guid feature on the platform -->
      <!-- A test case could be added to ensure that this alway there -->
      <!-- <pre>{{ rowData  }}</pre> -->
      <td class="align-middle table-info-icon">
        <div class="d-flex justify-content-center">
          <b-icon-info-circle-fill
            @click="$emit('indicator-info:clicked', rowData.indicator)"
            class="info-circle"
          />
        </div>
      </td>
      <td class="align-middle p-2 table-indicators-1" id="table-indicators-1">
        <!-- Use this slot to set the related indicator multiselect and it options -->
        <div
          class="d-flex flex-column indicator-container"
          v-if="dashboardName === 'Health_Facility'"
        >
          <slot :name="`indicator`" :indicator="rowData.indicator.id">
            <div class="indicator-name">{{ rowData.indicator.full_name }}</div>
          </slot>
          <span style="font-size: 10px; margin: 0 5px">
            {{ factor.trim() ? `(${factor})` : '' }}</span
          >
        </div>

        <div class="d-flex flex-column" v-else>
          <slot :name="`indicator`" :indicator="rowData.indicator.id">
            <div class="d-flex justify-content-between">
              <div class="span">{{ rowData.indicator.full_name }}</div>
              <b-icon-caret-up-fill
                @click="toggleDropdown"
                v-if="related === 'related' && showDropdown === false"
                class="info-circle icon-up"
              />
              <b-icon-caret-down-fill
                @click="toggleDropdown"
                v-if="related === 'related' && showDropdown === true"
                class="info-circle icon-up"
              />
            </div>
          </slot>
          <span style="font-size: 10px; margin: 0 5px">
            {{ factor.trim() ? `(${factor})` : '' }}</span
          >
          <div class="drop-width" v-if="showDropdown">
            <!-- <selectWrapper
              :value="tempValue"
              :placeholder="'Select indicator'"
              :options="getIndicators"
              :multiSelectProps="dropdownProps"
              id="Indicator_Overview"
              NoDataLabel="indicator(s)"
            /> -->
            <multiselect
              v-model="value"
              :options="getIndicators"
              :multiple="false"
              group-values="indicators"
              group-label="program_area"
              :group-select="false"
              placeholder="Type to search"
              track-by="full_name"
              label="full_name"
              :hide-selected="true"
              @select="handleSelect"
            >
            </multiselect>

          </div>
        </div>
      </td>
      <!-- the default slot for the system -->
      <slot></slot>
    </template>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

import formatter from '@/modules/msdat-dashboard/mixins/formatter';

export default {
  mixins: [formatter],

  data() {
    return {
      dashboardName: '',
      showDropdown: false,
      groupIndex: null,
      dropdownProps: {
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },

    };
  },
  props: {
    rowData: {
      type: [Object, String],
      required: false,
    },
    related: {
      type: String,
      required: false,
    },
    value: {},
  },
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIndicators', 'getControlConfig']),

    factor() {
      return this.dlGetFactor(this.rowData.indicator.factor).display_factor;
    },
    payload() {
      if (this.groupIndex != null) {
        // this is to take into consideration control panel that
        // are grouped example is Multi-source comparison section
        return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload[
          this.groupIndex
        ];
      }
      return this.$store.state.MSDAT_STORE.controlConfig[this.controlIndex].payload;
    },
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleOpen() {
      console.log('Dropdown opened');
    },
    handleClose() {
      console.log('Dropdown closed');
    },
    async dlGetLatestSourceAndIndicatorData(queryObject) {
      const routeTitle = this.$route.path;
      const filteredIndicator = await this.dlQuery(queryObject);
      if (routeTitle.endsWith('Demographics')) {
        if (filteredIndicator.length > 0) {
          const presentYear = new Date().getFullYear();
          return filteredIndicator.reduce((max, currentValues) => {
            if (currentValues.period > max.period && currentValues.period <= presentYear) {
              return currentValues;
            }
            return max;
          });
        }
      } else if (filteredIndicator.length > 0) {
        return filteredIndicator.reduce((max, currentValues) => {
          if (currentValues.period > max.period) {
            return currentValues;
          }
          return max;
        });
      }
      return null;
    },

    async handleSelect(option) {
      console.log('Option selected:', option);
      const dataSources = this.dlGetDashboardDataSource();
      console.log('Option selected:', dataSources);
      // console.log('Option selected 3:', this.getControlConfig);
      const data = [];
      const formattedData = [];
      for (let index = 0; index < dataSources.length; index += 1) {
        const element = dataSources[index];
        // eslint-disable-next-line no-await-in-loop
        const ab = await this.dlGetLatestSourceAndIndicatorData({
          indicator: option.id,
          datasource: element.id,
          location: this.getControlConfig.location.id,
        });
        data.push(ab);
      }
      console.log('Option selected 3:', data);
      formattedData.push(this.tableComponentDataFormatter(option, data));
      const params = {
        formattedData, oldData: this.rowData,
      };
      // console.log('Option selectedx 4:', formattedData);
      this.$emit('replaceContent', params);
    },
    handleRemove(option) {
      console.log('Option removed:', option);
    },
  },
  mounted() {
    const { name } = this.$route.params;
    this.dashboardName = name;
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/abstracts/_variables.scss';

tr {
  // icon column
  & > td:first-child {
    border: none;
    background-color: #ffffff;

    svg {
      // color: #2b5d5b;
      color: #348481;
      cursor: pointer;
    }
  }
}

.info-circle {
  font-size: 16px;
}

.indicator-container {
  max-width: 100ch; /* Limit to 20 characters */
  word-wrap: break-word; /* Force text to wrap within the cell */
  white-space: initial; /* Reset white-space property */
}

.indicator-name {
  word-wrap: break-word; /* Allow text to wrap */
}

.icon-up {
  cursor: pointer;
  color: green;
}
.drop-width {
  width: 400px;
  height: 300px;
}
</style>
