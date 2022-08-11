<template>
  <div class="">
    <!-- Toggleable tab links here -->
    <ul
      class="
        d-flex
        list-unstyled
        step-sections
        mb-0
        justify-content-between
        border-b
        mx-lg-5 mx-3
        cursor-pointer
        main
      "
    >
      <template v-if="customDashboard === true">
        <li
          class="
            mb-0
            tab-link
            h6
            py-2
            pt-4
            text-black-50
            bg-tab-color
            work-sans
            main
          "
          :class="[index === mainIndex ? 'active font-weight-bold' : '']"
          v-for="(control, index) in controls"
          :key="index"
          :id="`panel-${index}`"
          @click="changeControl(index)"
        >

        {{index}} index
        {{mainIndex}} select
          {{ control.title }}
        </li>
      </template>
      <template v-if="customDashboard === false">
        <li
          class="
            mb-0
            tab-link
            h6
            py-2
            pt-4
            text-black-50
            bg-tab-color
            work-sans
            main
          "
          :class="[index === mainIndex ? 'active font-weight-bold' : '']"
          v-for="(control, index) in controls"
          :key="index"
          :id="`panel-${index}`"
          @click="changeControl(index)"
        >
            {{index}} index
        {{mainIndex}} select
          {{ control.title }}
        </li>
      </template>
    </ul>

    <div class="control-title">{{ title }}</div>
    <!-- Multi-select dropdown here -->
    <div class="mx-lg-5 px-2 mx-auto pb-3 pt-1 step-controls styles">
      <slot v-bind:selectControl="selectControl" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePanel',
  data() {
    return {
      controls: [],
      selectedIndex: 0,
      title: 'Indicator Overview',
      mainIndex: 0,
    };
  },

  props: {
    tabs: {
      type: Array,
    },

    position: {
      type: Number,
      require: false,
      default: 0,
    },

    changeIndex: {
      require: false,
      default: 1,
    },
  },
  methods: {
    changeControl(index) {
      //       this.selectedIndex = index;
      //       this.checkIndex = index;
      this.selectControl(index);
      // this.$emit('showSection', index);
    },
    selectControl(controlIndex) {
      console.log('control-index', controlIndex);
      this.mainIndex = controlIndex;
      console.log('control-index', controlIndex);
      // loop over all the tabs
      // console.log('Controls', this.controls);
      this.controls.forEach((control, index) => {
        console.log('INDEX', index, controlIndex);
        // eslint-disable-next-line no-param-reassign
        control.active = index === controlIndex;
      });
    },
    selectControll(controlIndex) {
      console.log('control-index', controlIndex);
      this.mainIndex = controlIndex;
      // loop over all the tabs
      // console.log('Controls', this.abc);
      this.abc.forEach((control, index) => {
        console.log('INDEX', index, controlIndex);
        // eslint-disable-next-line no-param-reassign
        control.active = control.id === controlIndex;
      });
    },
  },

  watch: {
    position(newValue) {
      this.selectedIndex = newValue;
      this.selectControl(this.selectedIndex);
    },

    // if the index is changed
    changeIndex(newValue) {
      this.selectedIndex = newValue;
      this.changeControl(newValue);
      console.log('newIndex', newValue);
    },

    selectedIndex(newValue) {
      if (newValue === 0) {
        this.title = 'Indicator Overview';
      }
      if (newValue === 1) {
        this.title = 'Zonal Analysis';
      }
      if (newValue === 2) {
        this.title = 'Indicator Comparison';
      }
      if (newValue === 3) {
        this.title = 'Dataset Comparison';
      }
      if (newValue === 4) {
        this.title = 'Multi-Source Overview';
      }
    },
  },
  computed: {
    abc() {
      // console.log('ar', this.$store.getters.arrangedSections);
      // const data2 = this.$store.getters.arrangedSections
      // console.log('data1', data2);
      return this.$store.getters.arrangedSections.filter(
        (element) => element.isShow === true,
      );
    },
    customDashboard() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard;
    },
  },
  mounted() {
    this.selectControl(0);
  },
  created() {
    this.controls = this.$children;
    console.log('controls', this.controls);
  },
};
</script>

<style lang="scss" scoped>
$primary: #2b5d5b;

.main {
  display: inherit;
}

.border-b {
  border-bottom: 2px solid #ebebeb;
}
.bg-tab-color {
  color: #515151;
}

.tab-link.active {
  border-bottom: 2.5px solid $primary;
}

.cursor-pointer {
  cursor: pointer;
}

.control-title {
  display: none;
}

@media (max-width: 576px) {
  .main {
    display: none;
  }

  .section-tab {
    display: none;
  }

  .control-title {
    display: inherit;
    font: var(--unnamed-font-style-normal) normal
      var(--unnamed-font-weight-bold) 16px/19px
      var(--unnamed-font-family-work-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 16px/19px Work Sans;
    letter-spacing: 0px;
    color: #2b5d5b;
    opacity: 1;
    text-decoration: underline;
    margin: 5px;
    padding: 5px;
  }
}
</style>
