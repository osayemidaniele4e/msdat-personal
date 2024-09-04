<template>
  <div class="">
  <!-- <pre>{{ groupLabelStates }}</pre> -->
    <multiselect
    :id="formattedID"
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    :placeholder="placeholder"
    v-bind="multiSelectProps"
    selectLabel=""
    data-visted="notVisited"
    deselectLabel=""
    autocomplete="off"
    class="custom-placeholder"
    @open="handleOpen"
    @close="handleClose"
    @search-change="handleSearchChange"
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
            @click.stop="toggleGroupLabel(props.option.$groupLabel)"
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
</template>
<script>
import { has } from 'lodash';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      allowEmpty: true,
      dummyVariable: false,
      loading: false,
      section: '',
      indicatorId: 7,
      datasourceId: 6,
      groupLabelStates: {},
      groupLabels: {},
      isCollapsibleActive: false,
      isSearchActive: false,
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        if (
          val
          && typeof val === 'object'
          && val.id !== undefined
          && val.program_area !== undefined
        ) {
          this.selectedOption = val;
          // this.indicatorId = val.id;
          // this.saveIndicatorToStorage(val.id);
          const item = {
            payload: val,
            entity: 'indicator',
          };
          const indicatorId = val.id;
          const indicatorFirstRelated = val.first_related;
          const indicatorSecondRelated = val.second_related;
          localStorage.setItem('indicatorID', indicatorId);
          localStorage.setItem('indicatorFirstRelated', indicatorFirstRelated);
          localStorage.setItem('indicatorSecondRelated', indicatorSecondRelated);
          this.SET_SELECTED_CONFIG(item);
        } else if (
          val
          && typeof val === 'object'
          && val.id !== undefined
          && val.methodology !== undefined
        ) {
          // this.saveDataSourceToStorage(val.id);
          const item = {
            payload: val,
            entity: 'dataSource',
          };
          this.SET_SELECTED_CONFIG(item);
        } else if (
          val
          && typeof val !== 'object'
          && val.id === undefined
          && val.created_at === undefined
        ) {
          const item = {
            payload: val,
            entity: 'period',
          };

          this.SET_SELECTED_CONFIG(item);
          // this.addQueryParamToUrl();
        } else if (val && val.parent !== undefined) {
          localStorage.setItem('locationId', val.id);
          // this.SET_LOCATION()
        }
        this.$emit('input', val);
      },
    },
    formattedID() {
      console.log(this.id, 'DROPDOWN');
      if (this.multiSelectProps['group-values']) {
        if (this.multiSelectProps['group-label'] === 'datasource') {
          return 'groupedSources';
        }

        return this.id;
      }
      return null;
    },
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
    value: {},
    multiSelectProps: {
      type: Object,
      default: () => ({}),
    },
    NoDataLabel: {
      type: String,
      default: () => 'List is empty',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  watch: {
    options: {
      async handler(newValue) {
        // this.addQueryParamToUrl();
        this.loading = true;
        if (this.options?.length > 0) {
          if (this.multiSelectProps['preselect-first']) {
            if (has(this.multiSelectProps, 'group-values')) {
              this.selected = newValue[0][this.multiSelectProps['group-values']][0];
            } else if (newValue.length > 0) {
              const { name } = this.$route.params;
              if (name === 'Demographics') {
                this.selected = '';
                const newArr = this.options.filter(
                  (year) => parseInt(year, 10) < new Date().getFullYear() + 1,
                );

                this.selected = newArr[0];
              } else {
                this.selected = '';
                this.selected = await this.options[0];
              }
              this.UPDATE_ALL_YEARS(this.options);
              // this was commented out because it updates all the selected year across all section in the multi-source comparison section

              // this.UPDATE_MULTI_YEARS(this.options);
            } else {
              const { name } = this.$route.params;
              if (name === 'Demographics') {
                const date = new Date();
                const year = date.getFullYear() - 1;
                this.selected = {};
                const newArr = this.newValue.filter(
                  (item) => parseInt(item, 10) < new Date().getFullYear() + 1,
                );

                this.selected = newArr[0] || year.toString();
                this.UPDATE_ALL_YEARS(newValue || year.toString());
              } else {
                const date = new Date();
                const year = date.getFullYear() - 1;
                this.selected = {};
                this.selected = newValue[0] || year.toString();
                this.UPDATE_ALL_YEARS(newValue || year.toString());
              }
            }
          }

          /**
           * @description check if the update is for datasource
           * if it is, check if the list is an array,
           * if it is an array check if the previously selected DS is included in the list, if yes select it if not select the first DS from the list.
           * if its not an array, make the object the default selected
           */

          if (this.multiSelectProps?.label === 'datasource') {
            if (Array.isArray(newValue) && newValue?.length > 0) {
              this.UPDATE_ALL_DATASOURCES(newValue);
              const defaultSelected = newValue.find((item) => item?.id === this.selected?.id);
              if (defaultSelected?.id !== undefined) {
                this.selected = {};
                this.selected = defaultSelected;
                return;
              }
              this.selected = {};
              this.selected = await newValue[0];
            }
            this.selected = {};
            this.selected = await newValue[0];
          }
        }
        this.loading = false;
      },
    },
    selected(newValue) {
      if (newValue && newValue.parent !== undefined) {
        this.setSelectedState(newValue);
      }
    },
    deep: true,
    immediate: false,
  },
  methods: {
    toggleGroupLabel(groupLabel) {
      if (this.isCollapsibleActive) {
        this.$set(this.groupLabelStates, groupLabel, !this.groupLabelStates[groupLabel]);
      }
    },
    // this function is called when the multiselect is opened thereby it checks if collapsible is active and calls the initialCSS function
    handleOpen() {
      if (!this.isSearchActive) {
        this.isCollapsibleActive = true;
      }
      this.initialCSS(this.formattedID);
      console.log('opened');
    },

    // this function is called when the search input is activated thereby it makes the program areas open automaatically when search is active
    handleSearchChange() {
      this.isCollapsibleActive = false;
      this.openAllGroupLabels();
      this.dummy();

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
      this.isCollapsibleActive = false;
      this.groupLabelStates = {};
      this.groupLabels = {};
    },
    handleClose() {
      this.resetState();
      this.isSearchActive = false;
      console.log('closed');
    },

    openAllGroupLabels() {
      if (this.multiSelectProps['group-values']) {
        this.groupLabelStates = {};
        this.options
          .filter((option) => option.$groupLabel)
          .forEach((option) => {
            this.$set(this.groupLabelStates, option.$groupLabel, true);
          });
      }
    },
    ...mapMutations('MSDAT_STORE', [
      'SET_SELECTED_CONFIG',
      'UPDATE_ALL_DATASOURCES',
      'UPDATE_ALL_YEARS',
      'UPDATE_MULTI_YEARS',
      'setSelectedState',
      'SET_LOCATION',
    ]),
    modifyDataSourceChildLabel(tag) {
      const tempArray = tag.split(' ');
      tempArray.pop();
      for (let i = 0; i < tempArray.length; i++) {
        tempArray[i] = tempArray[i][0].toUpperCase() + tempArray[i].substr(1);
      }
      return tempArray.join(' ');
    },

    /**
     * This method is called when a program area title
     * is clicked, handles the show and hide of its
     * child nodes and also the dropdown caret rotation
     */
    async pickProgramArea(event) {
      if (!this.isCollapsibleActive) return;

      this.loading = true;
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'click') {
        const parent = event.target?.children[0]?.children[0]?.dataset?.parent;
        console.log('Program Area Clicked:', parent);
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
    /**
     *  This methods acts only on multiselects having
     *  grouped options like the indicator multiselects.
     *  It makes this distinction based on the prop value
     *  @var multiselectProps, its "group-value" property.
     *
     */
    initialCSS(multiselectID) {
      this.loading = true;
      if (this.multiSelectProps['group-values']) {
        const specificPart = document.querySelector(`input#${multiselectID}`);
        if (this.options?.length !== 0) {
          const iterable = specificPart.parentNode.nextElementSibling.children[0]?.children;

          const tell = specificPart.parentElement.parentElement.attributes['data-visted'].value;

          for (let i = 0; i < iterable.length; i++) {
            if (iterable[i]?.children[0]?.children[0]?.dataset.child) {
              if (!this.isCollapsibleActive) {
                iterable[i].style.display = 'block';
              } else {
                iterable[i].style.display = 'none';
              }
            } else if (tell === 'notVisited' || this.isSearchActive) {
              // Modified this condition
              iterable[i].removeEventListener('click', this.pickProgramArea); // Remove existing listener
              iterable[i].addEventListener('click', this.pickProgramArea); // Add new listener
              specificPart.parentElement.parentElement.attributes['data-visted'].value = null;
            }
          }
        }
      }
      this.loading = false;
    },
    // saveIndicatorToStorage(item) {
    //   localStorage.setItem('indicatorId', item);
    // },
    // saveDataSourceToStorage(item) {
    //   localStorage.setItem('datasourceId', item);
    // },
    // addQueryParamToUrl() {
    //   const paramName = 'indicatorId';
    //   const param2Name = 'datasourceId';

    //   const savedIndicatorId = localStorage.getItem('indicatorId');
    //   const savedDataSourceId = localStorage.getItem('datasourceId');

    //   // console.log(savedIndicatorId, 'savedIndicatorId');

    //   // Get the current URL and parse its query parameters
    //   const url = new URL(window.location.href);
    //   const searchParams = new URLSearchParams(url.search);

    //   // Add or update the query parameter
    //   searchParams.set(paramName, savedIndicatorId);

    //   // Add or update the second query parameter
    //   searchParams.set(param2Name, savedDataSourceId);

    //   // Modify the URL without navigating using replaceState
    //   window.history.replaceState(null, '', `${url.pathname}?${searchParams.toString()}`);

    //   // Now the URL has the new parameter, but you stay on the same page
    // },
  },
  mounted() {
    // console.log(this.options[0], 'Options');
  },
};
</script>
<style lang="scss">
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
