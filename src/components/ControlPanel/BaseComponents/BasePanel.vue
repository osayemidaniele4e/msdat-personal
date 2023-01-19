<template>
  <div class="">
    <ul
      class="d-flex list-unstyled step-sections mb-0 border-b mx-lg-5 mx-3 cursor-pointer main tabs-sec"
    >
      <li
        class="mb-0 tab-link h6 text-black-50 bg-tab-color work-sans main"
        :class="[i === selectedIndex ? 'active font-weight-bold' : '']"
        v-for="(el, i) in controls"
        :key="i"
        :id="`panel-${i}`"
        @click="changeControl(i)"
      >
        {{ el.title }}
      </li>
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
      checkIndex: 0,
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

    selectedPanel: {
      require: false,
      default: 0,
    },
  },
  methods: {
    changeControl(index) {
      this.selectedIndex = index;
      this.checkIndex = index;
      this.selectControl(index);
      this.$emit('showSection', index);
    },
    selectControl(controlIndex) {
      this.selectedIndex = controlIndex;
      // loop over all the tabs
      this.controls.forEach((control, index) => {
        // eslint-disable-next-line no-param-reassign
        control.active = index === controlIndex;
      });
    },
    // selectControll(controlIndex) {
    //   this.selectedIndex = controlIndex;
    //   // loop over all the tabs

    //   this.abc.forEach((control) => {
    //     // eslint-disable-next-line no-param-reassign
    //     control.active = control.id === controlIndex;
    //   });
    // },
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
    },

    selectedIndex(newValue) {
      this.changeControl(newValue);
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
      if (newValue === 5) {
        this.title = 'Disaggregation';
      }
    },
  },
  computed: {
    // abc() {
    //   return this.$store.getters.arrangedSections.filter((element) => element.isShow === true);
    // },
    customDashboard() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard;
    },
  },
  mounted() {
    this.selectControl(0);
  },
  created() {
    this.controls = this.$children;
  },
};
</script>

<style lang="scss" scoped>
// $primary: #2b5d5b;
@import '@/scss/abstracts/_variables.scss';

.main {
  display: inherit;
}

.border-b {
  border-bottom: 0.5px solid #759b99;
}
.bg-tab-color {
  color: #515151;
}

.tabs-sec {
  // max-width: 1200px;
}

.tab-link.active {
  // border-bottom: 2.5px solid $primary;
  // border: 1px solid #2B5D5B;
  // background-color: #2B5D5B;
  border: 1px solid $primary;
  background-color: $primary;
  color: white !important;
  // padding: 20px;
}

.tab-link {
  // border-bottom: 2.5px solid $primary;
  // border: 1.0px solid #007d53;
  border: 1px solid $primary;
  background-color: white;
  color: black !important;
  padding: 1rem;
  height: 1rem;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
  font-weight: 200;
  font-size: 1rem;
  &:first-child {
    margin-left: 0;
  }
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
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 16px/19px
      var(--unnamed-font-family-work-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 16px/19px Work Sans;
    letter-spacing: 0px;
    // color: #2b5d5b;
    color: $primary;
    opacity: 1;
    text-decoration: underline;
    margin: 5px;
    padding: 5px;
  }
}
</style>
