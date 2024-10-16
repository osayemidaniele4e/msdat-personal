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
              <b-icon-caret-down-fill
                @click="toggleDropdown"
                v-if="related === 'related' && showDropdown === false"
                class="info-circle icon-up"
              />
              <b-icon-caret-up-fill
                @click="toggleDropdown"
                v-if="related === 'related' && showDropdown === true"
                class="info-circle icon-up"
              />
            </div>
          </slot>
          <span style="font-size: 10px; margin: 0 5px">
            {{ factor.trim() ? `(${factor})` : '' }}</span
          >
          <div
            class="drop-width"
            v-if="showDropdown"
            :class="[isCollapsibleDropActive === true ? 'drop-height ' : '']"
          >
            <!-- changed :options to now use getIndicators || options -->
            <multiselect
              v-model="rowData.indicator"
              :options="getIndicators || options"
              :multiple="false"
              placeholder="Type to search"
              track-by="full_name"
              label="full_name"
              @select="handleSelect"
              v-bind="multiSelectProps"
              close-on-select
              :allow-empty="true"
              selectLabel=""
              data-visted="notVisited"
              deselectLabel=""
              autocomplete="off"
              class="custom-placeholder"
              @open="handleOpen"
              @close="handleClose"
              searchable
              @search-change="handleSearchChange"
              :id="formattedID"
            >
              <span class="text-capitalize" slot="noOptions">{{ NoDataLabel }}</span>
              <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
                <template v-if="props.option.$groupLabel">
                  <span class="overflow-textg" :data-parent="props.option.$groupLabel">
                    {{ props.option.$groupLabel }}
                    <span
                      v-if="isCollapsibleActive"
                      class="newGrouplabel"
                      :class="{ 'open-caret': groupLabelStates[props.option.$groupLabel] }"
                      @click="toggleGroupLabel(props.option.$groupLabel)"
                    >
                      {{
                        groupLabelStates[props.option.$groupLabel]
                          ? 'Click to collapse ▲'
                          : 'Click to expand ▼'
                      }}
                    </span>
                  </span>
                </template>
                <template v-if="props.option.item">
                  <div
                    v-if="!props.option.$groupLabel"
                    class="overflow-text"
                    :data-child="modifyDataSourceChildLabel(props.option.item)"
                  >
                    {{ props.option.item }}
                  </div>
                </template>
                <template v-else-if="props.option.full_name">
                  <div
                    v-if="!props.option.$groupLabel"
                    class="overflow-text text-wrap"
                    :data-child="props.option.program_area"
                  >
                    {{ props.option.full_name }}
                  </div>
                </template>
              </template>
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
import { integer } from 'vee-validate/dist/rules';

export default {
  mixins: [formatter],

  data() {
    return {
      dashboardName: '',
      showDropdown: false,
      groupIndex: null,
      loading: false,
      dropdownProps: {
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },
      multiSelectProps: {
        'group-values': 'indicators',
        'group-label': 'program_area',
        label: 'full_name',
      },
      groupLabelStates: {},
      groupLabels: {},
      isCollapsibleActive: false,
      isSearchActive: false,
      isCollapsibleDropActive: false,
      NoDataLabel: 'indicator(s)',
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
    replaceContent: {
      type: Function,
      required: true,
    },
    index: {
      type: integer,
      required: true,
    },
  },

  watch: {},
  computed: {
    ...mapGetters('MSDAT_STORE', ['getIndicators', 'getControlConfig']),

    factor() {
      return this.dlGetFactor(this.rowData.indicator.factor).display_factor;
    },
    // initialized the formattedID with the indicator id so it is unique
    formattedID() {
      return `indicator-${this.rowData.indicator.id}`;
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
    // this does not necessarily control the group label
    toggleGroupLabel(groupLabel) {
      console.log(groupLabel, 'groupLabel');
      // if (this.isCollapsibleActive) {
      //   this.$set(this.groupLabelStates, groupLabel, !this.groupLabelStates[groupLabel]);
      // }
    },

    modifyDataSourceChildLabel(tag) {
      const tempArray = tag.split(' ');
      tempArray.pop();
      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i][0].toUpperCase() + tempArray[i].substr(1);
      }
      return tempArray.join(' ');
    },
    // revamped the handleOpen method to ensure that the collapsible is active when multiselect opens
    handleOpen() {
      this.isCollapsibleActive = true;
      this.isCollapsibleDropActive = true;
      this.resetState();
      this.$nextTick(() => {
        this.initialCSS(this.formattedID);
      });
      console.log('opened');
    },
    // added the handleSearchChange method to ensure that the search disables collapsible when multiselect opens
    handleSearchChange() {
      this.isCollapsibleActive = false;
      this.openAllGroupLabels();

      // Ensure all items with data-child attribute and role="option" are visible
      this.$nextTick(() => {
        const iterable = document.querySelectorAll('[data-child][role="option"]');
        iterable.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'block';
        });

        // this fix works for now
        //  Ensure all elements in data-child with id ending in -1 are always shown
        const elementsWithEnding1 = document.querySelectorAll('[role="option"][id$="-1"]');
        elementsWithEnding1.forEach((element) => {
          // eslint-disable-next-line no-param-reassign
          element.style.display = 'block';
        });
      });
      this.isSearchActive = true;
    },
    resetState() {
      this.isCollapsibleActive = true;
      this.isSearchActive = false;
      this.groupLabelStates = {};
      this.groupLabels = {};
      this.$nextTick(() => {
        const iterable = document.querySelectorAll('[data-child][role="option"]');
        iterable.forEach((item) => {
          // eslint-disable-next-line
          item.style.display = 'none';
        });
      });
    },
    handleClose() {
      this.resetState();
      this.isSearchActive = false;
      console.log('closed');
      this.isCollapsibleDropActive = false;
    },

    openAllGroupLabels() {
      if (this.multiSelectProps['group-values']) {
        this.groupLabelStates = {};
        this.getIndicators
          .filter((option) => option.$groupLabel)
          .forEach((option) => {
            this.$set(this.groupLabelStates, option.$groupLabel, true);
          });
      }
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
      const dataSources = this.dlGetDashboardDataSource();
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
      formattedData.push(this.tableComponentDataFormatter(option, data));
      const params = {
        formattedData,
        oldData: this.rowData,
        index: this.index,
      };
      this.replaceContent(params);
    },
    handleRemove(option) {
      console.log('Option removed:', option);
    },

    // this method is used to toggle the collapsible drop down and it's content
    async pickProgramArea(event) {
      if (!this.isCollapsibleActive) return;

      this.loading = true;
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'click') {
        const parent = event.target?.children[0]?.children[0]?.dataset?.parent;
        const all = Array.from(event.target?.parentNode?.children);
        all.forEach(async (element) => {
          const child = await element?.children[0]?.children[0]?.dataset?.child;
          const tempParent = await element?.children[0]?.children[0]?.dataset?.parent;
          if (parent === child) {
            if (element.style.display === 'none') {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'block';
              this.$set(this.groupLabelStates, parent, true);
              // eslint-disable-next-line no-unused-expressions
              element?.children[0]?.children[0]?.classList.toggle('open-caret');
            } else {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'none';
              this.$set(this.groupLabelStates, parent, false);
            }
          }
          if (parent === tempParent) {
            // eslint-disable-next-line no-unused-expressions
            element?.children[0]?.children[0]?.children[0]?.classList.toggle('open-caret');
          }
          if (parent && !this.groupLabels[parent]) {
            this.$set(this.groupLabels, parent, true);
          }
        });
      }
      this.loading = false;
    },
    // this method is used to set the initial css for the collapsible drop down and it was revamped to cater for the getIndicators value
    initialCSS(multiselectID) {
      this.loading = true;
      if (this.multiSelectProps['group-values']) {
        const specificPart = document.querySelector(`input#${multiselectID}`);
        if (this.getIndicators?.length !== 0 && specificPart) {
          const iterable = specificPart.parentNode.nextElementSibling.children[0]?.children;
          if (iterable) {
            Array.from(iterable).forEach((element) => {
              if (element.children[0]?.children[0]?.dataset.child) {
                // eslint-disable-next-line
                element.style.display = 'none';
              } else {
                element.removeEventListener('click', this.pickProgramArea);
                element.addEventListener('click', this.pickProgramArea);
              }
            });
          }
          specificPart.parentElement.parentElement.setAttribute('data-visted', 'visited');
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    const { name } = this.$route.params;
    this.dashboardName = name;
  },
};
</script>

<style lang="scss" scoped>
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
  width: 300px;
  z-index: 1;
}
.drop-height {
  height: 200px;
  margin-bottom: 100px;
}

.down-caret {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #58af5f transparent transparent transparent;
  top: 13px;
  right: 5% !important;
  position: absolute;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
}
.newGrouplabel {
  position: absolute;
  right: 5%;
  top: 13px;
  font-weight: 400;
  cursor: pointer;
  color: #a4fab7;
  transition: all 1.25s ease-in;
}

.open-caret {
  transform: rotate(0deg);
  transition: all 0.25s ease-out;
  cursor: pointer;
}
ul li.multiselect__element {
  transition: all 1.5s ease-in-out;
  cursor: pointer;
}
span.multiselect__single::-webkit-scrollbar {
  border-radius: 30px;
  height: 0.23rem;
  background: transparent;
  border: 1px solid gainsboro;
}
span.multiselect__single::-webkit-scrollbar-thumb {
  background-color: #b3b3b3;
}
.overflow-text {
  cursor: pointer;
  z-index: 999;
}
.overflow-textg {
  display: inline-block;
  max-width: 200px;

  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

multiselect,
input::placeholder {
  font-size: 11.5px !important; /* Adjust the font size as needed */
}
</style>
