<template>
  <!-- Label to show when there is no available data as requested
  for by chiamaka on the 2-12-2021 during msdat meeting -->
  <multiselect
    v-model="selected"
    :options="options"
    searchable
    close-on-select
    :allow-empty="allowEmpty"
    placeholder="Pick a value"
    v-bind="multiSelectProps"
    selectLabel=""
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
        :data-child="props.option.datasource">
        {{props.option.item}}
        </div>
      </template>
      <template v-else-if="props.option.full_name">
        <div v-if="!props.option.$groupLabel"
        :data-child="props.option.program_area">
        {{props.option.full_name}}
        </div>
      </template>

    </template> -->
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
      open: false,
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
  },
  props: {
    options: {
      type: Array,
      default: () => [],
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
    open(newVal, oldVal) {
      if (!oldVal && newVal) {
        if (this.multiSelectProps['group-values']) {
          const all = document.querySelectorAll('div.multiselect__content-wrapper > ul > li');
          // this.open = true;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i <= all.length; i++) {
            if (all[i].children[0].children[0]?.dataset.parent) {
              all[i].removeEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.pickProgramArea(e);
              });
              all[i].addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.pickProgramArea(e);
              });
            }
          }
        }
      }
    },
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
            element.classList.toggle('noShow');
          }
          if (parent === tempParent) {
            element.children[0].children[0].children[0].classList.toggle('open-caret');
          }
        });
      }
    },
    // hideOptions() {
    //   if (this.multiSelectProps['group-values']) {
    //     const all = document.querySelectorAll('div.multiselect__content-wrapper > ul > li');
    //     // eslint-disable-next-line no-plusplus
    //     for (let i = 0; i <= all.length; i++) {
    // eslint-disable-next-line max-len
    //       if (Array.from(all[i].children[0].classList).indexOf('multiselect__option--disabled') === -1) {
    //         all[i].classList.add('noShow');
    //       } else {
    //         all[i].removeEventListener('click', (e) => {
    //           this.pickProgramArea(e);
    //         });
    //       }
    //     }
    //   }
    // },
    /**
     *  This methods acts only on multiselects having
     *  grouped options like the indicator multiselects.
     *  It makes this distinction based on the prop value
     *  @var multiselectProps, its "group-value" property.
     *
     */
    initialCSS() {
      if (this.multiSelectProps['group-values']) {
        const all = document.querySelectorAll('div.multiselect__content-wrapper > ul > li');
        this.open = true;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= all.length; i++) {
          if (all[i].children[0].children[0]?.dataset.child) {
            all[i].classList.add('noShow');
          }
        }
      }
    },
  },
  // mounted() {
  //   console.log(this.multiSelectProps)
  // }
};
</script>

<style lang="scss">
.noShow{
  display: none;
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
