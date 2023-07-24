<template>
  <!-- Label to show when there is no available data as requested -->
  <!-- @open="initialCSS" -->
  <multiselect :id="formattedID" v-model="selected" :options="options" searchable close-on-select
    :allow-empty="allowEmpty" placeholder="Pick a value" v-bind="multiSelectProps" selectLabel="" data-visted="notVisited"
    deselectLabel="" autocomplete="off">
    <!-- @open="initialCSS" -->
    <span class="text-capitalize" slot="noOptions">{{ NoDataLabel }}</span>
    <!---
      START
      THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
      THAT HAVE GROUPED OPTIONS
    -->
    <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
      <!-- {{ multiSelectProps['group-values'] }} {{ section }} {{ props }} -->
      <template v-if="props.option.$groupLabel">
        <span class="overflow-text" :data-parent="props.option.$groupLabel">
          {{ props.option.$groupLabel }}
          <span v-if="multiSelectProps['group-values'] === 'indicators' &&
            section !== 'Indicator-Comparison'
            "></span>
        </span>
      </template>
      <template v-if="props.option.item">
        <div v-if="!props.option.$groupLabel" class="overflow-text"
          :data-child="modifyDataSourceChildLabel(props.option.item)">
          {{ props.option.item }}
        </div>
      </template>
      <template v-else-if="props.option.full_name">
        <div v-if="!props.option.$groupLabel" class="overflow-text text-wrap" :data-child="props.option.program_area">
          {{ props.option.full_name }}
        </div>
      </template>
    </template>
    <!---
    END
    THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
    THAT HAVE GROUPED OPTIONS
    -->
  </multiselect>
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
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        if (val && typeof val === 'object' && val.id !== undefined && val.program_area !== undefined) {
          this.selectedOption = val;
          const item = {
            payload: val,
            entity: 'indicator',
          };
          this.SET_SELECTED_CONFIG(item);
        } else if (
          typeof val === 'object'
          && val.id !== undefined
          && val.methodology !== undefined
        ) {
          // console.log(val, 'val');

          const item = {
            payload: val,
            entity: 'dataSource',
          };
          this.SET_SELECTED_CONFIG(item);
        } else if (
          typeof val !== 'object'
          && val.id === undefined
          && val.created_at === undefined
        ) {
          const item = {
            payload: val,
            entity: 'period',
          };
          this.SET_SELECTED_CONFIG(item);
        }
        this.$emit('input', val);
      },
    },
    formattedID() {
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
  },
  watch: {
    options: {
      async handler(newValue) {
        console.log('newVlaue', newValue);
        this.loading = true;
        if (Array.isArray(newValue) && newValue.length > 0) {
          if (this.options && this.options?.length > 0) {
            if (this.multiSelectProps['preselect-first']) {
              if (newValue[0]) {
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
        }
        this.loading = false;
      },
    },
    deep: true,
    immediate: false,
  },
  methods: {
    ...mapMutations('MSDAT_STORE', [
      'SET_SELECTED_CONFIG',
      'UPDATE_ALL_DATASOURCES',
      'UPDATE_ALL_YEARS',
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
      this.loading = true;
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'click') {
        const parent = event.target?.children[0]?.children[0]?.dataset?.parent;
        // if (parent === undefined) return;
        const all = Array.from(event.target?.parentNode?.children);
        all.forEach(async (element) => {
          // eslint-disable-next-line prefer-destructuring
          const child = await element?.children[0]?.children[0]?.dataset?.child;
          const tempParent = await element?.children[0]?.children[0]?.dataset?.parent;
          // if (child === undefined || tempParent === undefined) return;
          if (parent === child) {
            if (element.style.display === 'none') {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'block';
              // eslint-disable-next-line no-unused-expressions
              element?.children[0]?.children[0]?.classList.toggle('open-caret');
            } else {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'none';
            }
          }
          if (parent === tempParent) {
            // eslint-disable-next-line no-unused-expressions
            element?.children[0]?.children[0]?.children[0]?.classList.toggle('open-caret');
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
    // async initialCSS(multiselectID) {
    //   this.section = multiselectID;
    //   if (
    //     this.multiSelectProps['group-values'] !== 'indicators'
    //     || multiselectID === 'Indicator-Comparison'
    //   ) {
    //     return;
    //   }
    //   this.loading = true;
    //   if (this.multiSelectProps['group-values']) {
    //     const specificPart = document.querySelector(`input#${multiselectID}`);
    //     if (this.options?.length !== 0) {
    //       const iterable = await specificPart.parentNode.nextElementSibling.children[0]?.children;
    //       const tell = await specificPart.parentElement.parentElement.attributes['data-visted']
    //         .value;
    //       // eslint-disable-next-line no-plusplus
    //       for (let i = 0; i <= iterable.length; i++) {
    //         if (iterable[i]?.children[0]?.children[0]?.dataset.child) {
    //           iterable[i].style.display = 'none';
    //         } else if (tell === 'notVisited') {
    //           if (iterable[i] === undefined) return;
    //           iterable[i].addEventListener('click', (e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             this.pickProgramArea(e);
    //           });
    //           specificPart.parentElement.parentElement.attributes['data-visted'].value = null;
    //         }
    //       }
    //     }
    //   }
    //   this.loading = false;
    // },
  },
  mounted() {
    // console.log(this.options[0], 'Options');
    // console.log('options', this.options);
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

.open-caret {
  transform: rotate(360deg);
  transition: all 0.25s ease-out;
  cursor: pointer;
}

ul li.multiselect__element {
  // border-bottom: 1px solid #0000;
  transition: all 1.5s ease-in-out;
  cursor: pointer;
}

.overflow-text {
  // text-overflow: ellipsis;
  // overflow: hidden;
  // white-space: nowrap;
  cursor: pointer;
}
</style>
