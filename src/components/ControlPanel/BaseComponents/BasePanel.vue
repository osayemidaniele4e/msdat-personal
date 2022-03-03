<template>
<div>
    <div class="">

  <!-- Toggleable tab links here -->

      <div class="control-title">{{title}}</div>
    <!-- Multiselect dropdown here -->
    <!-- <div :class="['mx-5 step-controls styles', selectedIndex === 0 ? '' : 'pb-3 pt-1']"> -->
      <div class="mx-lg-5 mx-3 step-controls styles pt-1 pb-2">
      <slot v-bind:selectControl="selectControl" />
    </div>
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
      type: Number,
      require: false,
      default: 1,
    },
  },
  methods: {
    changeControl(index) {
      this.selectControl(index);
      this.$emit('showSection', index);
    },
    selectControl(controlIndex) {
      this.selectedIndex = controlIndex;
      // loop over all the tabs
      this.controls.forEach((control, index) => {
        // eslint-disable-next-line no-param-reassign
        control.active = (index === controlIndex);
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
      this.changeControl(newValue);
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
  mounted() {
    this.selectControl(0);
  },
  created() {
    this.controls = this.$children;
    console.log(this.controls);
  },

};
</script>

<style lang="scss" scoped>
$primary: #2b5d5b;

.border-b {
  border-bottom: 2px solid #ebebeb;
}
.bg-tab-color{
  color:#515151;
}

.tab-link.active {
  border-bottom: 2.5px solid $primary;
}

.cursor-pointer {
  cursor: pointer;
}

.control-title{
  display: none;
}

@media (max-width: 576px) {

  .section-tab{
    display: none;
  }

  .control-title{
  display: inherit;
font: var(--unnamed-font-style-normal)
normal var(--unnamed-font-weight-bold)
 16px/19px var(--unnamed-font-family-work-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal bold 16px/19px Work Sans;
letter-spacing: 0px;
color: #2B5D5B;
opacity: 1;
text-decoration: underline;
margin: 5px;
padding: 5px;
}

}
</style>
