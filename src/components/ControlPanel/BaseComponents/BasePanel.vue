<template>
  <div class="">

  <!-- Toggleable tab links here -->
    <ul
      class="d-flex list-unstyled step-sections mb-0
       justify-content-between border-b mx-5 cursor-pointer"
   >
      <li
        class="mb-0 tab-link h6 py-2 pt-4 text-black-50 bg-tab-color work-sans"
        :class="[index === selectedIndex ? 'active font-weight-bold' : '']"
        v-for="(control, index) in controls"
        :key="index"
        :id="`panel-${index}`"
        @click='changeControl(index)'
      >
        {{ control.title }}

      </li>
    </ul>

    <!-- Multiselect dropdown here -->
    <!-- <div :class="['mx-5 step-controls styles', selectedIndex === 0 ? '' : 'pb-3 pt-1']"> -->
      <div class="mx-5 step-controls styles pt-1 pb-2">
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
</style>
