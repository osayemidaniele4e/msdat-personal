<template>
  <!-- Label to show when there is no available data as requested
  for by chiamaka on the 2-12-2021 during msdat meeting -->
    <!--  -->
  <multiselect
    :id="formattedID"
    v-model="selected"
    @open="initialCSS"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    placeholder="Pick a value"
    v-bind="multiSelectProps"
    selectLabel=""
    data-visted="notVisited"
    deselectLabel=""
    >
    <span class="text-capitalize" slot="noOptions">{{ NoDataLabel }}s</span>
    <!---
      START
      THIS TEMPLATE IS ONLY ADDED ON MULTISELECTS
      THAT HAVE GROUPED OPTIONS
    -->
    <!-- <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
       <template v-if="props.option.$groupLabel">
      <span class="topicHead"
       :data-parent="props.option.$groupLabel">
       {{props.option.$groupLabel}} <span class="down-caret"></span> </span>
      </template>
      <template v-if="props.option.item">
        <div v-if="!props.option.$groupLabel"
        :data-child="modifyDataSourceChildLabel(props.option.item)">
        {{props.option.item}}
        </div>
      </template>
      <template v-else-if="props.option.full_name">
        <div v-if="!props.option.$groupLabel"
        :data-child="props.option.program_area">
        {{props.option.full_name}}
        </div>
      </template> -->

    <!-- </template> -->
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
      allowEmpty: false,
      dummyVariable: false,
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
      handler(newValue) {
        if (this.multiSelectProps['preselect-first']) {
          if (has(this.multiSelectProps, 'group-values')) {
            // eslint-disable-next-line prefer-destructuring
            this.selected = newValue[0][this.multiSelectProps['group-values']][0];
          } else if (newValue.length > 0) {
            // debugger;
            // eslint-disable-next-line prefer-destructuring
            this.selected = this.options[0];
          } else {
            const date = new Date();
            const year = date.getFullYear() - 1;
            this.selected = year.toString();
          }
        }
      },
    },
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
    pickProgramArea(event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.type === 'click') {
        const { parent } = event.target.children[0].children[0].dataset;
        const all = Array.from(event.target.parentNode.children);
        all.forEach((element) => {
          // eslint-disable-next-line prefer-destructuring
          const child = element.children[0].children[0].dataset.child;
          const tempParent = element.children[0].children[0].dataset.parent;
          if (parent === child) {
            if (element.style.display === 'none') {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'block';
            } else {
              // eslint-disable-next-line no-param-reassign
              element.style.display = 'none';
            }
          }
          if (parent === tempParent) {
            element.children[0].children[0].children[0].classList.toggle('open-caret');
          }
        });
      }
    },
    /**
     *  This methods acts only on multiselects having
     *  grouped options like the indicator multiselects.
     *  It makes this distinction based on the prop value
     *  @var multiselectProps, its "group-value" property.
     *
     */
    initialCSS(multiselectID) {
      if (this.multiSelectProps['group-values']) {
        const specificPart = document.querySelector(`input#${multiselectID}`);
        const iterable = specificPart.parentNode.nextElementSibling.children[0].children;
        const tell = specificPart.parentElement.parentElement.attributes['data-visted'].value;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= iterable.length; i++) {
          if (iterable[i].children[0].children[0]?.dataset.child) {
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
      }
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
}

.open-caret {
    transform: rotate(180deg);
    transition: all .25s ease-out;
  }

li.multiselect__element{
  border-bottom: 1px solid #0000;
  transition: all 3.5 ease-in
}

</style>
