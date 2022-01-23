<template>
  <!-- Label to show when there is no available data as requested
  for by chiamaka on the 2-12-2021 during msdat meeting -->
  <multiselect
    @open="initialCSS"
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

    <template v-if="multiSelectProps['group-values']" slot="option" slot-scope="props">
       <template v-if="props.option.$groupLabel">
      <span class="topicHead"
       :data-parent="props.option.$groupLabel">
       {{props.option.$groupLabel}}</span>
      </template>
    <div v-if="!props.option.$groupLabel"
     :data-child="props.option.program_area">
     {{props.option.full_name}}
    </div>

    </template>
    </multiselect
  >
</template>

<script>
import { has } from 'lodash';

export default {
  data() {
    return {
      allowEmpty: false,
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
    pickProgramArea(event) {
      const { parent } = event.target.children[0].children[0].dataset;
      const all = Array.from(event.target.parentNode.children);
      all.forEach((element) => {
        // eslint-disable-next-line prefer-destructuring
        const child = element.children[0].children[0].dataset.child;
        if (parent === child) {
          element.classList.toggle('noShow');
        }
      });
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
    initialCSS() {
      if (this.multiSelectProps['group-values']) {
        const all = document.querySelectorAll('div.multiselect__content-wrapper > ul > li');
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= all.length; i++) {
          if (Array.from(all[i].children[0].classList).indexOf('multiselect__option--disabled') === -1) {
            all[i].classList.add('noShow');
          } else {
            console.log(all[i]);
            all[i].addEventListener('click', (e) => {
              this.pickProgramArea(e);
            });
          }
        }
      }
    },
  },

};
</script>

<style lang="scss">
.noShow{
  display: none;
}

.showContent{
  display: block;
}

li.multiselect__element{
  border-bottom: 1px solid #0000;
  transition: all 3.5 ease-in
}

</style>
