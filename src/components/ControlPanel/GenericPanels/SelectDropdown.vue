<template>
  <!-- Label to show when there is no available data as requested -->
    <!-- @open="initialCSS" -->
  <multiselect
    :id="formattedID"
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    placeholder="Pick a value"
    v-bind="multiSelectProps"
    selectLabel=""
    data-visted="notVisited"
    deselectLabel=""
    @open="initialCSS"
    >
    <span class="text-capitalize" slot="noOptions">{{ NoDataLabel }}</span>
    <!---
      START
      THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
      THAT HAVE GROUPED OPTIONS
    -->
    <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
       <template v-if="props.option.$groupLabel">
      <span class="topicHead"
      style="cursor:pointer;"
       :data-parent="props.option.$groupLabel"

      >
       {{props.option.$groupLabel}} <span class="down-caret"></span> </span>
      </template>
      <template v-if="props.option.item">
        <div v-if="!props.option.$groupLabel"
        style="cursor:pointer;"
        :data-child="modifyDataSourceChildLabel(props.option.item)">
        {{props.option.item}}
        </div>
      </template>
      <template v-else-if="props.option.full_name">
        <div v-if="!props.option.$groupLabel"
        style="cursor:pointer;"
        :data-child="props.option.program_area">
        {{props.option.full_name}}
        </div>
      </template>
    </template>
    <!---
    END
    THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
    THAT HAVE GROUPED OPTIONS
    -->
    </multiselect
  >
</template>
<script>
import { has } from 'lodash';

export default {
  data() {
    return {
      allowEmpty: true,
      dummyVariable: false,
      loading: false,
    };
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
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
        this.loading = true;
        if (this.multiSelectProps['preselect-first']) {
          // this.selected = newValue[0];
          if (has(this.multiSelectProps, 'group-values')) {
            // this.selected = newValue[0][this.multiSelectProps['group-values']][0];
            this.selected = await newValue[0];
          } else if (newValue.length > 0) {
            this.selected = await this.options[0];
          } else {
            const date = new Date();
            const year = date.getFullYear() - 1;
            this.selected = year.toString();
          }
        }
        // update the selected datasource
        if (this.multiSelectProps.label === 'datasource') {
          this.selected = {};
          this.selected = await newValue[0];
        }
        this.loading = false;
      },
    },
    deep: true,
    immediate: false,
  },
  methods: {
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
        const { parent } = event.target?.children[0]?.children[0]?.dataset;
        const all = Array.from(event.target?.parentNode?.children);
        all.forEach(async (element) => {
          // eslint-disable-next-line prefer-destructuring
          const { child } = await element?.children[0]?.children[0]?.dataset;
          const tempParent = await element?.children[0]?.children[0]?.dataset.parent;
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
    async initialCSS(multiselectID) {
      this.loading = true;
      if (this.multiSelectProps['group-values']) {
        const specificPart = document.querySelector(`input#${multiselectID}`);
        if (this.options.length !== 0) {
          const iterable = await specificPart.parentNode.nextElementSibling.children[0]?.children;
          const tell = await specificPart.parentElement.parentElement.attributes['data-visted'].value;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i <= iterable.length; i++) {
            if (iterable[i].children[0]?.children[0]?.dataset.child) {
              iterable[i].style.display = 'none';
            } else if (tell === 'notVisited') {
              iterable[i].addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.pickProgramArea(e);
              });
              specificPart.parentElement.parentElement.attributes['data-visted'].value = null;
            }
          }
          // else{
          //   iterable[i].style.display = 'block';
          // }
          // console.log(iterable[i].children[0]?.children[0]?.dataset.child, 'child')
        }
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
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
  transition: all .25s ease-in;
  cursor: pointer;
}
.open-caret {
    transform: rotate(360deg);
    transition: all .25s ease-out;
    cursor: pointer;
  }
li.multiselect__element{
  border-bottom: 1px solid #0000;
  transition: all 3.5 ease-in;
  cursor: pointer;
}
</style>
